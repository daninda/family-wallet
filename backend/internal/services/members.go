package services

import (
	"family-wallet/internal/entities"

	"github.com/jmoiron/sqlx"
)

type Members struct {
	db *sqlx.DB
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
