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


