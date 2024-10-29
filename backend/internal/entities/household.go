package entities

type Household struct {
	Id int `json:"id" db:"id"`
	AdminId int `json:"adminId" db:"admin_id"`
}