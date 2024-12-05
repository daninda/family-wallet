package handlers

import (
	"encoding/json"
	"family-wallet/internal/entities"
	"family-wallet/internal/middlewares"
	"family-wallet/internal/services"
	"family-wallet/internal/services/dto"
	"family-wallet/internal/util"
	"net/http"

	"github.com/go-playground/validator/v10"
)

type Subcategory struct {
	subcategory *services.Subcategory
	household   *services.Household
	Validator   *validator.Validate
}

func NewSubcategory(subcategory *services.Subcategory, household *services.Household, validator *validator.Validate) *Subcategory {
	return &Subcategory{subcategory: subcategory, household: household, Validator: validator}
}

func (s *Subcategory) New(w http.ResponseWriter, r *http.Request) {

	userId := r.Context().Value(middlewares.User_id).(int)

	isAdmin, err := s.household.IsAdmin(userId)

	if err != nil {
		http.Error(w, "User not found", http.StatusTeapot)
		return
	}

	if !isAdmin {
		http.Error(w, "Permission denied", http.StatusUnauthorized)
		return
	}
}

func (s *Subcategory) GetAll(w http.ResponseWriter, r *http.Request) {
	userId := r.Context().Value(middlewares.User_id).(int)
	categoryId, err := util.GetIntPathParam(r, "categoryId")

	if err != nil {
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	household, err := s.household.GetHousehold(userId)

	if err != nil {
		http.Error(w, "User not found", http.StatusTeapot)
		return
	}

	hasCategory, err := s.household.HasCategory(household.Id, categoryId)

	if err != nil || !hasCategory {
		http.Error(w, "Not Found", http.StatusNotFound)
		return
	}

	subcategories, err := s.subcategory.GetAll(categoryId)

	if err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(subcategories)
}

func (s *Subcategory) Delete(w http.ResponseWriter, r *http.Request) {
	userId := r.Context().Value(middlewares.User_id).(int)

	isAdmin, err := s.household.IsAdmin(userId)

	if err != nil {
		http.Error(w, "User not found", http.StatusTeapot)
		return
	}

	if !isAdmin {
		http.Error(w, "Permission denied", http.StatusUnauthorized)
		return
	}

	subcategoryId, err := util.GetIntPathParam(r, "subcategoryId")

	if err != nil {
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	err = s.subcategory.Delete(subcategoryId)

	if err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (s *Subcategory) Update(w http.ResponseWriter, r *http.Request) {
	userId := r.Context().Value(middlewares.User_id).(int)

	isAdmin, err := s.household.IsAdmin(userId)

	if err != nil {
		http.Error(w, "User not found", http.StatusTeapot)
		return
	}

	if !isAdmin {
		http.Error(w, "Permission denied", http.StatusUnauthorized)
		return
	}

	var body *dto.NewSubcategory
	err = json.NewDecoder(r.Body).Decode(&body)

	if err != nil {
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	subcategoryId, err := util.GetIntPathParam(r, "subcategoryId")

	if err != nil {
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	var subcategory = entities.Subcategory {
		Id: subcategoryId,
		Name: body.Name,
		CategoryId: body.CategoryId,
	}


	_, err = s.subcategory.Update(subcategoryId, &subcategory)

	if err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}