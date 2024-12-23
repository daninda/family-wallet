package services

import (
	"family-wallet/internal/entities"

	"github.com/jmoiron/sqlx"
)

type Household struct {
	db *sqlx.DB
}

func NewHousehold(db *sqlx.DB) *Household {
	return &Household{
		db,
	}
}

func (s *Household) IsAdmin(user_id int) (bool, error) {
	household_id, err := s.GetHousehold(user_id)

	if err != nil {
		return false, err
	}

	head_id, err := s.GetHouseholdHead(household_id.Id)

	if err != nil {
		return false, err
	}

	return *head_id == user_id, nil
}

func (s *Household) GetHousehold(user_id int) (*entities.Household, error) {
	row := s.db.QueryRow(`SELECT households.id FROM households JOIN users ON households.id = users.household_id WHERE users.id = $1`, user_id)

	var id int
	err := row.Scan(&id)

	if err != nil {
		return nil, err
	}

	return &entities.Household{Id: id}, nil
}

func (s *Household) GetHouseholdHead(household_id int) (*int, error) {
	row := s.db.QueryRow(`SELECT users.id FROM users WHERE users.household_id = $1 AND users.is_admin = true`, household_id)

	var id int
	err := row.Scan(&id)

	if err != nil {
		return nil, err
	}

	return &id, nil
}

func (s *Household) HasCategory(household_id int, category_id int) (bool, error) {
	row := s.db.QueryRow(`SELECT id FROM categories WHERE household_id = $1 AND id = $2`, household_id, category_id)

	var id int
	err := row.Scan(&id)

	if err != nil {
		return false, err
	}

	return true, nil
}
