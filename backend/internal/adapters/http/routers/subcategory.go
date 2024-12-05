package routers

import (
	"family-wallet/internal/adapters/http/handlers"
	"family-wallet/internal/middlewares"

	"github.com/gorilla/mux"
)

func RegisterSubcategoryRoutes(subcategory *handlers.Subcategory, router *mux.Router, jwtMiddleware *middlewares.Auth) {
	router.Use(jwtMiddleware.Middleware)
	router.HandleFunc("/category/{category_id}/", subcategory.New).Methods("POST")
	router.HandleFunc("/category/{category_id}/", subcategory.GetAll).Methods("GET")
	router.HandleFunc("/category/{category_id}/{subcategory_id}", subcategory.Update).Methods("UPDATE")
	router.HandleFunc("/category/{category_id}/{subcategory_id}", subcategory.Delete).Methods("DELETE")
}
