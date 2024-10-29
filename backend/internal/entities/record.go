package entities

type Record struct {
	Id int `json:"id" db:"id"`
	UserId int `json:"userId" db:"user_id"`
	SubcategoryId int `json:"subcategoryId" db:"subcategory_id"`
	Price int `json:"price" db:"price"`
	Date string `json:"date" db:"date"`
	Description string `json:"description" db:"description"`
}