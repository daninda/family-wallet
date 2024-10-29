package entities

type DataPoint struct {
	Categories []CategoryStats `json:"categories"`
	Date int64 `json:"date"`
}

type CategoryStats struct {
	CategoryId int `json:"category_id"`
	Sum int `json:"sum"`
}