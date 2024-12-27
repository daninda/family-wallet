package services

import (
	"family-wallet/internal/entities"
	"family-wallet/internal/services/dto"
	"family-wallet/internal/util"
	"log"
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
	maxPrice := int(math.MaxInt32)
	from := int64(0)
	to := int64(math.MaxInt64)
	categoryId := -1
	subcategoryId := -1

	sortBy := util.DateAsc

	if filter.MinPrice != 0 {
		minPrice = filter.MinPrice
	}

	if filter.MaxPrice != 0 {
		maxPrice = filter.MaxPrice
	}

	if filter.From != 0 {
		from = filter.From
	}

	if filter.To != 0 {
		to = filter.To
	}

	if filter.CategoryId != 0 && filter.CategoryId != -1 {
		categoryId = filter.CategoryId
	}

	if filter.SubcategoryId != 0 && filter.SubcategoryId != -1 {
		subcategoryId = filter.SubcategoryId
	}

	if filter.SortBy != "" {
		sortBy = util.GetSort(filter.SortBy)
	}

	params := []any{userId, minPrice, maxPrice, from, to}

	query := ""
	if categoryId != -1 {
		params = append(params, categoryId)
		query += " AND subcategories.category_id = $6"

		if subcategoryId != -1 {
			params = append(params, subcategoryId)
			query += " AND records.subcategory_id = $7"
		}
	}

	sort := ""
	switch sortBy {
	case util.CostDesc:
		sort = " ORDER BY records.price DESC"
	case util.CostAsc:
		sort = " ORDER BY records.price ASC"
	case util.DateDesc:
		sort = " ORDER BY records.date DESC"
	case util.DateAsc:
		sort = " ORDER BY records.date ASC"
	}

	rows, err := s.db.DB.Query(`
		SELECT 
			records.id, 
			records.user_id, 
			categories.name as category, 
			subcategories.category_id, 
			subcategories.name as subcategory, 
			records.subcategory_id, 
			records.price, 
			records.date, 
			records.description 
		FROM records 
		JOIN subcategories ON records.subcategory_id = subcategories.id 
		JOIN categories ON subcategories.category_id = categories.id 
		WHERE records.user_id = $1 AND price >= $2 AND price <= $3 AND date >= $4 AND date <= $5`+query+sort,
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

func (s *Record) GetTotalByMonth(userId int) (int, error) {
	now := time.Now()
	currentYear, currentMonth := now.Year(), now.Month()

	// Начало и конец месяца в миллисекундах
	startOfMonth := time.Date(currentYear, currentMonth, 1, 0, 0, 0, 0, time.UTC).UnixMilli()
	endOfMonth := time.Date(currentYear, currentMonth+1, 1, 0, 0, 0, 0, time.UTC).UnixMilli()

	// SQL-запрос для подсчёта общей суммы
	query := `
		SELECT COALESCE(SUM(price), 0) AS total
		FROM records
		WHERE CAST(date AS BIGINT) >= $1 AND CAST(date AS BIGINT) < $2
		AND user_id = $3`

	var total int
	err := s.db.QueryRow(query, startOfMonth, endOfMonth, userId).Scan(&total)
	if err != nil {
		return 0, err
	}

	return total, nil
}

func (s *Record) Create(userId int, subcategoryId int, description string, price int, date int) (*entities.Record, error) {
	row := s.db.QueryRow(`
		INSERT INTO records (user_id, subcategory_id, description, price, date) 
		VALUES ($1, $2, $3, $4, $5) 
		RETURNING id
	`, userId, subcategoryId, description, price, date)

	var id int
	if err := row.Scan(&id); err != nil {
		log.Println(err.Error())
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
