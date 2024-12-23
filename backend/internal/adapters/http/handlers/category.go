package handlers

import (
	"encoding/json"
	"family-wallet/internal/middlewares"
	"family-wallet/internal/services"
	"family-wallet/internal/services/dto"
	"log"
	"net/http"
	"strconv"

	"github.com/go-playground/validator/v10"
)

type Category struct {
	category  *services.Category
	household *services.Household
	Validator *validator.Validate
}

func NewCategory(category *services.Category, household *services.Household, validator *validator.Validate) *Category {
	return &Category{category: category, household: household, Validator: validator}
}

func (c *Category) New(w http.ResponseWriter, r *http.Request) {
	userId := r.Context().Value(middlewares.User_id).(int)

	var body *dto.NewCategory
	err := json.NewDecoder(r.Body).Decode(&body)

	if err != nil {
		http.Error(w, "Could not decode body", http.StatusBadRequest)
		return
	}

	household, err := c.household.GetHousehold(userId)

	if err != nil {
		http.Error(w, "User not found", http.StatusTeapot)
		return
	}

	head_id, err := c.household.GetHouseholdHead(household.Id)

	if err != nil {
		http.Error(w, "Household head not found", http.StatusTeapot)
		return
	}

	if *head_id != userId {
		http.Error(w, "Permission denied", http.StatusUnauthorized)
		return
	}

	newCategory, err := c.category.Create(household.Id, body.Name)

	if err != nil {
		http.Error(w, "Bad bad category", http.StatusConflict)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(newCategory)
}

func (c *Category) GetAll(w http.ResponseWriter, r *http.Request) {
	userId := r.Context().Value(middlewares.User_id).(int)

	household, err := c.household.GetHousehold(userId)

	if err != nil {
		log.Println(err.Error())
		http.Error(w, "User not found", http.StatusTeapot)
		return
	}

	categories, err := c.category.GetAll(household.Id)

	if err != nil {
		log.Println(err.Error())
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(categories)
}

func (c *Category) Delete(w http.ResponseWriter, r *http.Request) {
	userId := r.Context().Value(middlewares.User_id).(int)

	isAdmin, err := c.household.IsAdmin(userId)

	if err != nil {
		http.Error(w, "User not found", http.StatusTeapot)
		return
	}

	if !isAdmin {
		http.Error(w, "Permission denied", http.StatusUnauthorized)
		return
	}

	id := r.URL.Query().Get("id")

	if id == "" {
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	categoryId, err := strconv.Atoi(id)
	if err != nil {
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}
	err = c.category.Delete(categoryId)

	if err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (c *Category) Update(w http.ResponseWriter, r *http.Request) {
	userId := r.Context().Value(middlewares.User_id).(int)

	isAdmin, err := c.household.IsAdmin(userId)

	if err != nil {
		http.Error(w, "User not found", http.StatusTeapot)
		return
	}

	if !isAdmin {
		http.Error(w, "Permission denied", http.StatusUnauthorized)
		return
	}

	var body *dto.NewCategory
	err = json.NewDecoder(r.Body).Decode(&body)

	if err != nil {
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	id := r.URL.Query().Get("id")

	if id == "" {
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	categoryId, err := strconv.Atoi(id)
	if err != nil {
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	err = c.category.Update(categoryId, body.Name)

	if err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}
