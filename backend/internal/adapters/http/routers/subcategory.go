package routers

import (
	"family-wallet/internal/adapters/http/handlers"
	"family-wallet/internal/middlewares"

	"github.com/gorilla/mux"
)

func RegisterSubcategoryRoutes(subcategory *handlers.Subcategory, router *mux.Router, jwtMiddleware *middlewares.Auth) {
	router.Use(jwtMiddleware.Middleware)
	router.HandleFunc("", subcategory.New).Methods("POST")
	router.HandleFunc("", subcategory.GetAll).Methods("GET")
	router.HandleFunc("/{id}", subcategory.Update).Methods("UPDATE")
	router.HandleFunc("/{id}", subcategory.Delete).Methods("DELETE")
}
