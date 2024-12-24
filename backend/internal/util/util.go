package util

import (
	"errors"
	"net/http"
	"strconv"
)

func GetIntPathParam(r *http.Request, name string) (int, error) {
	categoryId := r.URL.Query().Get(name)

	if categoryId == "" {
		return -1, errors.New("param is required")
	}

	categoryIdInt, err := strconv.Atoi(categoryId)
	if err != nil {
		return -1, errors.New("param must be an integer")
	}
	return categoryIdInt, err
}

const (
	DateAsc int = iota
	DateDesc
	CostAsc
	CostDesc
)

func GetSort(sortString string) int {
	switch sortString {
	case "date_asc":
		return DateAsc
	case "date_desc":
		return DateDesc
	case "cost_asc":
		return CostAsc
	case "cost_desc":
		return CostDesc
	default:
		return DateAsc
	}
}
