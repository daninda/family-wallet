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

func (m *Members) SetLimit(household_id int, userId int, limit int) error {
	result, err := m.db.Exec("UPDATE users SET limitation = $1 WHERE id = $2 AND household_id = $3", limit, userId, household_id)

	if err != nil {
		println(err.Error())
		
		return err
	}

	println(result.RowsAffected())
	return err
}

func (m *Members) RemoveLimit(household_id int, userId int) error {
	_, err := m.db.Exec("UPDATE users SET limitation = null WHERE id = $1 AND household_id = $2", userId, household_id)
	return err
}

func (m *Members) RejectRequest(household_id int, id int) error {
	return m.Delete(household_id, id)
}

func (s *Members) Delete(household_id int, id int) error {
	_, err := s.db.Exec("DELETE FROM users WHERE id = $1 AND household_id = $2", id, household_id)
	if err != nil {
		return err
	}
	return nil
}
