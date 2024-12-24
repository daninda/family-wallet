package dto

type RecordOutput struct {
	Id            int    `json:"id" db:"id"`
	UserId        int    `json:"userId" db:"user_id"`
	Category      string `json:"category" db:"category"`
	CategoryId    int    `json:"categoryId" db:"category_id"`
	Subcategory   string `json:"subcategory" db:"subcategory"`
	SubcategoryId int    `json:"subcategoryId" db:"subcategory_id"`
	Price         int    `json:"price" db:"price"`
	Date          string `json:"date" db:"date"`
	Description   string `json:"description" db:"description"`
}

type NewRecord struct {
	SubcategoryId int    `json:"subсategoryId"`
	Description   string `json:"description"`
	Price         int    `json:"price"`
	Date          int    `json:"date"`
}
