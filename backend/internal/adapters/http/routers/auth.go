package routers

import (
	"family-wallet/internal/adapters/http/handlers"

	"github.com/gorilla/mux"
)

func RegisterAuthRoutes(auth *handlers.Auth, router *mux.Router) {
	router.HandleFunc("/register", auth.Register).Methods("POST")
	router.HandleFunc("/login", auth.Login).Methods("POST")
	router.HandleFunc("/check", auth.CheckToken).Methods("GET")
	router.HandleFunc("/accepted", auth.Accepted).Methods("GET")
}
