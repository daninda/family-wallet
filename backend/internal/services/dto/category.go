package dto

type CategoryOutput struct {
	Id   int    `json:"id"`
	Name string `json:"name"`
}

type NewCategory struct {
	Name string `json:"name"`
}