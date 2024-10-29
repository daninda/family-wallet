package entities

type Category struct {
	Id int `json:"id" db:"id"`
	Name string `json:"name" db:"name"`
	HouseholdId int `json:"householdId" db:"household_id"`
}