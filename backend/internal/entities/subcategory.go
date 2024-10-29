package entities

type Subcategory struct {
	Id int `json:"id" db:"id"`
	Name string `json:"name" db:"name"`
	CategoryId int `json:"categoryId" db:"category_id"`
}