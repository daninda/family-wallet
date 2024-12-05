package services

import (
	"family-wallet/internal/entities"

	"github.com/jmoiron/sqlx"
)

type Subcategory struct {
	db *sqlx.DB	
}

func NewSubcategory(db *sqlx.DB) *Subcategory {
	return &Subcategory{
		db,
	}
}

func (s *Subcategory) GetAll(categoryId int) ([]entities.Subcategory, error) {
	var subcategories []entities.Subcategory
	err := s.db.Select(&subcategories, "SELECT id, name, category_id FROM subcategories WHERE category_id = $1", categoryId)


	return subcategories, err
}

func (s *Subcategory) Delete(id int) error {
	_, err := s.db.Exec("DELETE FROM subcategories WHERE id = $1", id)
	if err != nil {
		return err
	}
	return nil
}

func (s *Subcategory) Create(categoryId int, name string) (*entities.Subcategory, error) {
	row := s.db.QueryRow("INSERT INTO subcategories (name, category_id) VALUES ($1, $2) RETURNING id", name, categoryId)
	var id int
	err := row.Scan(&id)
	return &entities.Subcategory{Id: id, Name: name, CategoryId: categoryId}, err
}

func (s *Subcategory) Update(id int, subcategory *entities.Subcategory) (*entities.Subcategory, error) {
	row := s.db.QueryRow("UPDATE subcategories SET name = $1 WHERE id = $2 RETURNING id", subcategory.Name, id)
	var newId int
	err := row.Scan(&newId)
	return &entities.Subcategory{Id: newId, Name: subcategory.Name, CategoryId: subcategory.CategoryId}, err
}