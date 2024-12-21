package routers

import (
	"family-wallet/internal/adapters/http/handlers"
	"family-wallet/internal/middlewares"

	"github.com/gorilla/mux"
)

func RegisterCategoryRoutes(category *handlers.Category, router *mux.Router, jwtMiddleware *middlewares.Auth) {
	
	router.Use(jwtMiddleware.Middleware)
	router.HandleFunc("/create", category.New).Methods("POST")
	router.HandleFunc("/all", category.GetAll).Methods("GET")
	router.HandleFunc("/{id}/", category.Delete).Methods("DELETE")
	router.HandleFunc("/{id}/", category.Update).Methods("UPDATE")
}
