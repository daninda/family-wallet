package routers

import (
	"family-wallet/internal/adapters/http/handlers"
	"family-wallet/internal/middlewares"

	"github.com/gorilla/mux"
)

func RegisterCategoryRoutes(category *handlers.Category, router *mux.Router, jwtMiddleware *middlewares.Auth) {
	router.Use(jwtMiddleware.Middleware)
	router.HandleFunc("/category/create", category.New).Methods("POST")
	router.HandleFunc("/categories", category.GetAll).Methods("GET")
	router.HandleFunc("/category/{id}/", category.Delete).Methods("DELETE")
	router.HandleFunc("/category/{id}/", category.Update).Methods("UPDATE")
}
