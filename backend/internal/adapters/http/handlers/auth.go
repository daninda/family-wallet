package handlers

import (
	"encoding/json"
	"family-wallet/internal/services"
	"family-wallet/internal/services/dto"
	"log"
	"net/http"

	"github.com/go-playground/validator/v10"
)

type Auth struct {
	auth      *services.Auth
	Validator *validator.Validate
}

func NewAuth(auth *services.Auth) *Auth {
	return &Auth{auth: auth, Validator: validator.New()}
}

func (a *Auth) Register(w http.ResponseWriter, r *http.Request) {
	var body *dto.RegisterInput

	err := json.NewDecoder(r.Body).Decode(&body)
	if err != nil {
		http.Error(w, "Could not decode body", http.StatusBadRequest)
		return
	}

	if err := a.Validator.Struct(body); err != nil {
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

	res, err := a.auth.Register(body)

	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(res)
}
