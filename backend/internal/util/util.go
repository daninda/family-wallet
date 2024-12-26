package util

import (
	"errors"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

func GetIntPathParam(r *http.Request, name string) (int, error) {
	param := mux.Vars(r)[name]

	if param == "" {
		return -1, errors.New("param is required")
	}

	categoryIdInt, err := strconv.Atoi(param)
	if err != nil {
		return -1, errors.New("param must be an integer")
	}
	return categoryIdInt, err
}

func GetIntQueryParam(r *http.Request, name string) (int, error) {
	param := r.URL.Query().Get(name)

	if param == "" {
		return -1, errors.New("param is required")
	}

	categoryIdInt, err := strconv.Atoi(param)
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
