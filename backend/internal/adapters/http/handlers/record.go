package handlers

import (
	"encoding/json"
	"family-wallet/internal/entities"
	"family-wallet/internal/services"
	"family-wallet/internal/services/dto"
	"family-wallet/internal/util"
	"net/http"

	"github.com/go-playground/validator/v10"
)

type Record struct {
	record   *services.Record
	household *services.Household
	Validator *validator.Validate
}

func NewRecord(record *services.Record, household *services.Household, validator *validator.Validate) *Record {
	return &Record{record: record, household: household, Validator: validator}
}

func (h *Record) GetAll(w http.ResponseWriter, r *http.Request) {
	userId := r.Context().Value("userId").(int)
	filter := entities.Filter{}
	records, err := h.record.GetAllFiltered(userId, filter)

	if err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(records)
}

func (h *Record) New(w http.ResponseWriter, r *http.Request) {
	userId := r.Context().Value("userId").(int)
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
	userId := r.Context().Value("userId").(int)
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
	userId := r.Context().Value("userId").(int)
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