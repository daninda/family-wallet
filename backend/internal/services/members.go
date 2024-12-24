package services

import (
	"family-wallet/internal/entities"

	"github.com/jmoiron/sqlx"
)

type Members struct {
	db        *sqlx.DB
	household *Household
}

func NewMembers(db *sqlx.DB, household *Household) *Members {
	return &Members{
		db, household,
	}
}

func (s *Members) GetAll(householdId int) ([]entities.User, error) {
	var users []entities.User
	err := s.db.Select(&users, "select * from users where household_id = $1", householdId)

	return users, err
}

func (m *Members) GetFamilyCode(householdId int) (int, error) {
	return householdId, nil
}

func (m *Members) GetFamilyMembers(householdId int) ([]entities.User, error) {
	var users []entities.User
	err := m.db.Select(&users, "select * from users where household_id = $1 and accepted = true", householdId)

	if err != nil {
		return nil, err
	}

	return users, nil
}

func (m *Members) GetJoinRequests(householdId int) ([]entities.User, error) {
	var users []entities.User
	err := m.db.Select(&users, "select * from users where household_id = $1 and accepted = false and is_admin = false", householdId)

	if err != nil {
		return nil, err
	}

	if users == nil {
		return []entities.User{}, nil
	}

	return users, nil
}

func (m *Members) AcceptRequest(householdId int, userId int) error {
	_, err := m.db.Exec("UPDATE users SET accepted = true WHERE id = $1", userId)
	return err
}

func (s *Subcategory) Delete(id int) error {
	_, err := s.db.Exec("DELETE FROM subcategories WHERE id = $1", id)
	if err != nil {
		return err
	}
	return nil
}
