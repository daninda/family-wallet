package routers

import (
	"family-wallet/internal/adapters/http/handlers"
	"family-wallet/internal/middlewares"

	"github.com/gorilla/mux"
)

func RegisterRecordRoutes(record *handlers.Record, router *mux.Router, jwtMiddleware *middlewares.Auth) {
	router.Use(jwtMiddleware.Middleware)
	router.HandleFunc("", record.New).Methods("POST")
	router.HandleFunc("", record.GetAll).Methods("GET")
	router.HandleFunc("/get-total", record.GetTotalByMonth).Methods("GET")
	router.HandleFunc("/{id}", record.Update).Methods("UPDATE")
	router.HandleFunc("/{id}", record.Delete).Methods("DELETE")
}
