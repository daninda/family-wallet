package dto

type RegisterInput struct {
	Name        string `json:"name"`
	Email       string `json:"email"`
	Password    string `json:"password"`
	IsAdmin     bool   `json:"isAdmin"`
	HouseholdId int    `json:"householdId"`
}

type RegisterOutput struct {
	User  UserOutput `json:"user"`
	Token string     `json:"token"`
}

type UserOutput struct {
	Id          int    `json:"id"`
	Name        string `json:"name"`
	Email       string `json:"email"`
	Accepted    bool   `json:"accepted"`
	IsAdmin     bool   `json:"isAdmin"`
	HouseholdId int    `json:"householdId"`
	Limitation  int    `json:"limitation"`
}

type LoginInput struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginOutput = RegisterOutput
