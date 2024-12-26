package handlers

import (
	"encoding/json"
	"family-wallet/internal/entities"
	"family-wallet/internal/middlewares"
	"family-wallet/internal/services"
	"family-wallet/internal/services/dto"
	"family-wallet/internal/util"
	"fmt"
	"log"
	"net/http"
	"strconv"

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
	var body *dto.NewSubcategory

	err := json.NewDecoder(r.Body).Decode(&body)
	if err != nil {
		log.Println(err.Error())
		http.Error(w, "Could not decode body", http.StatusBadRequest)
		return
	}

	if err := s.Validator.Struct(body); err != nil {
		var validationErrors []string
		for _, fieldError := range err.(validator.ValidationErrors) {
			validationErrors = append(validationErrors, fieldError.Error())
		}
		log.Println(validationErrors)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"errors": validationErrors,
		})
		return
	}

	userId := r.Context().Value(middlewares.User_id).(int)

	isAdmin, err := s.household.IsAdmin(userId)

	if err != nil {
		log.Println(err.Error())
		http.Error(w, "User not found", http.StatusTeapot)
		return
	}

	if !isAdmin {
		http.Error(w, "Permission denied", http.StatusUnauthorized)
		return
	}

	res, err := s.subcategory.Create(body.CategoryId, body.Name)

	if err != nil {
		log.Println(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(res)
}

func (s *Subcategory) GetAll(w http.ResponseWriter, r *http.Request) {
	userId := r.Context().Value(middlewares.User_id).(int)
	categoryIdText := r.URL.Query().Get("category_id")
	categoryId, err := strconv.Atoi(categoryIdText)


	if err != nil {
		log.Println(err.Error())
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	household, err := s.household.GetHousehold(userId)

	if err != nil {
		log.Println(err.Error())
		http.Error(w, "User not found", http.StatusTeapot)
		return
	}

	hasCategory, err := s.household.HasCategory(household.Id, categoryId)

	if err != nil || !hasCategory {
		log.Println(err.Error())
		http.Error(w, "Not Found", http.StatusNotFound)
		return
	}

	subcategories, err := s.subcategory.GetAll(categoryId)

	if err != nil {
		log.Println(err.Error())
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
		log.Println(err.Error())
		http.Error(w, "User not found", http.StatusTeapot)
		return
	}

	if !isAdmin {
		http.Error(w, "Permission denied", http.StatusUnauthorized)
		return
	}

	subcategoryId, err := util.GetIntPathParam(r, "id")

	if err != nil {
		fmt.Printf("Error: %s\n", err.Error())
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	err = s.subcategory.Delete(subcategoryId)

	if err != nil {
		log.Println(err.Error())
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (s *Subcategory) Update(w http.ResponseWriter, r *http.Request) {
	userId := r.Context().Value(middlewares.User_id).(int)

	isAdmin, err := s.household.IsAdmin(userId)

	if err != nil {
		log.Println(err.Error())
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
		log.Println(err.Error())

		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	subcategoryId, err := util.GetIntPathParam(r, "subcategoryId")

	if err != nil {
		log.Println(err.Error())
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	var subcategory = entities.Subcategory{
		Id:         subcategoryId,
		Name:       body.Name,
		CategoryId: body.CategoryId,
	}

	_, err = s.subcategory.Update(subcategoryId, &subcategory)

	if err != nil {
		log.Println(err.Error())
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}
