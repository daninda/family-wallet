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