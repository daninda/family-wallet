package entities

type User struct {
	Id int `json:"id" db:"id"`
	Name string `json:"name" db:"name"`
	Email string `json:"email" db:"email"`
	PasswordHash string `json:"passwordHash" db:"password_hash"`
	HouseholdId int `json:"householdId" db:"household_id"`
	Accepted bool `json:"accepted" db:"accepted"`
	IsAdmin bool `json:"isAdmin" db:"is_admin"`
	Limitation *int `json:"limitation" db:"limitation"`
}