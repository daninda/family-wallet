package services

import (
	"family-wallet/internal/entities"
	"family-wallet/internal/services/dto"

	"github.com/jmoiron/sqlx"
)

type Category struct {
	db *sqlx.DB
}

func NewCategory(db *sqlx.DB) *Category {
	return &Category{
		db: db,
	}
}

func (s *Category) GetAll(householdId int) ([]dto.CategoryOutput, error) {
	rows, err := s.db.DB.Query(`
		SELECT 
			categories.id,
			categories.name
		FROM categories 
		WHERE categories.household_id = $1`,
		householdId)

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var records []dto.CategoryOutput
	for rows.Next() {
		var record dto.CategoryOutput
		err := rows.Scan(&record.Id, &record.Name)
		if err != nil {
			return nil, err
		}
		records = append(records, record)
	}

	return records, err
}

func (s *Category) Create(householdId int, name string) (*entities.Category, error) {
	rows, err := s.db.DB.Query(`
		INSERT INTO categories (household_id, name) 
		VALUES ($1, $2) RETURNING id`,
		householdId, name)

	if err != nil {
		return nil, err
	}

	rows.Close()

	id := 0

	rows.Scan(&id)

	category := &entities.Category{Id: id, Name: name, HouseholdId: householdId}
	return category, nil
}

func (s *Category) Update(id int, categoryName string) error {
	_, error := s.db.Exec("UPDATE categories SET name = $1 WHERE id = $2", categoryName, id)

	if error != nil {
		return error
	}
	return nil
}

func (s *Category) Delete(id int) error {
	_, err := s.db.Exec("DELETE FROM categories WHERE id = $1", id)
	if err != nil {
		return err
	}
	return nil
}
