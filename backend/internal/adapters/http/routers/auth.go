package routers

import (
	"family-wallet/internal/adapters/http/handlers"

	"github.com/gorilla/mux"
)

func RegisterAuthRoutes(auth *handlers.Auth, router *mux.Router) {
	router.HandleFunc("/auth/register", auth.Register).Methods("POST")
}
