package services

import (
	"family-wallet/internal/entities"
	"family-wallet/internal/services/dto"
	"math"
	"time"

	"github.com/jmoiron/sqlx"
)

type Record struct {
	db *sqlx.DB
}

func NewRecordService(db *sqlx.DB) *Record {
	return &Record{
		db: db,
	}
}

func (s *Record) GetAllFiltered(userId int, filter entities.Filter) ([]dto.RecordOutput, error) {
	minPrice := 0
	maxPrice := 100000000
	from := int64(0)
	var to int64 = math.MaxInt64

	if filter.MinPrice != nil {
		minPrice = *filter.MinPrice
	}

	if filter.MaxPrice != nil {
		maxPrice = *filter.MaxPrice
	}

	if filter.From != nil {
		from = *filter.From
	}

	if filter.To != nil {
		to = *filter.To
	}

	params := []any{userId, minPrice, maxPrice, from, to}

	query := ""
	if filter.SubcategoryId != nil {
		params = append(params, *filter.SubcategoryId)
		query += " AND records.subcategory_id = $6"
	} else if filter.CategoryId != nil {
		params = append(params, *filter.CategoryId)
		query += " AND records.category_id = $6"
	}

	rows, err := s.db.DB.Query(`
		SELECT 
			records.id, 
			records.user_id, 
			categories.name as category, 
			records.category_id, 
			subcategories.name as subcategory, 
			records.subcategory_id, 
			records.price, 
			records.date, 
			records.description 
		FROM records 
		JOIN categories ON records.category_id = categories.id 
		JOIN subcategories ON records.subcategory_id = subcategories.id 
		WHERE records.user_id = $1 AND price >= $2 AND price <= $3 AND date >= $4 AND date <= $5`+query,
		params...)

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var records []dto.RecordOutput
	for rows.Next() {
		var record dto.RecordOutput
		err := rows.Scan(&record.Id, &record.UserId, &record.Category, &record.CategoryId, &record.Subcategory, &record.SubcategoryId, &record.Price, &record.Date, &record.Description)
		if err != nil {
			return nil, err
		}
		records = append(records, record)
	}

	return records, err
}

func (s *Record) Create(userId int, subcategoryId int, description string, price int, date int) (*entities.Record, error) {
	row := s.db.QueryRow(`
		INSERT INTO records (user_id, subcategory_id, description, price, date) 
		VALUES ($1, $2, $3, $4, $5) 
		RETURNING id
	`, userId, subcategoryId, description, price, date)

	var id int
	if err := row.Scan(&id); err != nil {
		return nil, err
	}

	t := time.Unix(int64(date), 0)
	dateString := t.Format(time.DateTime)

	return &entities.Record{
		Id:            id,
		UserId:        userId,
		SubcategoryId: subcategoryId,
		Price:         price,
		Date:          dateString,
		Description:   description,
	}, nil
}

func (r *Record) Update(user_id int, id int, record *dto.NewRecord) (*dto.NewRecord, error) {
	row := r.db.QueryRow(
		`UPDATE records SET description = $1, price = $2, date = $3 
		 WHERE id = $4 AND user_id = $5
		 RETURNING id`,
		record.Description, record.Price, record.Date, id, user_id)

	if err := row.Scan(); err != nil {
		return nil, err
	}

	return record, nil
}

func (r *Record) Delete(userId, id int) error {
	_, err := r.db.Exec("DELETE FROM records WHERE id = $1 AND user_id = $2", id, userId)
	if err != nil {
		return err
	}
	return nil
}
