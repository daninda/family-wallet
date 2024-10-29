package dto

import (
	"family-wallet/internal/entities"
)

type RegisterInput struct {
	Name        string `json:"name"`
	Email       string `json:"email"`
	Password    string `json:"password"`
	Accepted    bool   `json:"accepted"`
	IsAdmin     bool   `json:"isAdmin"`
	HouseholdId int    `json:"householdId"`
}

type RegisterOutput struct {
	User  entities.User `json:"user"`
	Token string        `json:"token"`
}

type LoginInput struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginOutput = RegisterOutput
