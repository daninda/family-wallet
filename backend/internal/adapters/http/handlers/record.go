package handlers

import (
	"encoding/json"
	"family-wallet/internal/entities"
	"family-wallet/internal/middlewares"
	"family-wallet/internal/services"
	"family-wallet/internal/services/dto"
	"family-wallet/internal/util"
	"log"
	"net/http"
	"strconv"

	"github.com/go-playground/validator/v10"
)

type Record struct {
	record    *services.Record
	household *services.Household
	Validator *validator.Validate
}

func NewRecord(record *services.Record, household *services.Household, validator *validator.Validate) *Record {
	return &Record{record: record, household: household, Validator: validator}
}

func (h *Record) GetAll(w http.ResponseWriter, r *http.Request) {
	userId := r.Context().Value(middlewares.User_id).(int)

	query := r.URL.Query()

	filter := entities.Filter{
		MinPrice:      parseIntQueryParam(query, "minPrice"),
		MaxPrice:      parseIntQueryParam(query, "maxPrice"),
		From:          parseInt64QueryParam(query, "from"),
		To:            parseInt64QueryParam(query, "to"),
		CategoryId:    parseIntQueryParam(query, "categoryId"),
		SubcategoryId: parseIntQueryParam(query, "subcategoryId"),
		SortBy:        query.Get("sortBy"),
	}

	records, err := h.record.GetAllFiltered(userId, filter)

	if err != nil {
		log.Println(err.Error())
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(records)
}

func (h *Record) New(w http.ResponseWriter, r *http.Request) {
	userId := r.Context().Value(middlewares.User_id).(int)
	var body *dto.NewRecord
	err := json.NewDecoder(r.Body).Decode(&body)

	if err != nil {
		http.Error(w, "Could not decode body", http.StatusBadRequest)
		return
	}

	record, err := h.record.Create(userId, body.SubcategoryId, body.Description, body.Price, body.Date)

	if err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(record)
}

func (h *Record) Delete(w http.ResponseWriter, r *http.Request) {
	userId := r.Context().Value(middlewares.User_id).(int)
	id, err := util.GetIntPathParam(r, "id")

	if err != nil {
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	err = h.record.Delete(userId, id)

	if err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (h *Record) Update(w http.ResponseWriter, r *http.Request) {
	userId := r.Context().Value(middlewares.User_id).(int)
	id, err := util.GetIntPathParam(r, "id")

	if err != nil {
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	var body *dto.NewRecord
	err = json.NewDecoder(r.Body).Decode(&body)

	if err != nil {
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	record, err := h.record.Update(userId, id, body)

	if err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(record)
}

func parseIntQueryParam(query map[string][]string, key string) int {
	if val, ok := query[key]; ok && len(val) > 0 {
		parsed, err := strconv.Atoi(val[0])
		if err == nil {
			return parsed
		}
	}
	return 0
}

func parseInt64QueryParam(query map[string][]string, key string) int64 {
	if val, ok := query[key]; ok && len(val) > 0 {
		parsed, err := strconv.ParseInt(val[0], 10, 64)
		if err == nil {
			return parsed
		}
	}
	return 0
}
