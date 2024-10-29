package entities

type Filter struct {
    MinPrice *int `json:"minPrice"`
    MaxPrice *int `json:"maxPrice"`
    From *int64 `json:"from"`// unix timestamp
    To *int64 `json:"to"` //unix timestamp
    CategoryId *int `json:"categoryId"`
    SubcategoryId *int `json:"subcategoryId"`
}