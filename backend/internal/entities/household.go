package entities

type Household struct {
	Id int `json:"id" db:"id"`
	AdminId string `json:"adminId" db:"admin_id"`
}