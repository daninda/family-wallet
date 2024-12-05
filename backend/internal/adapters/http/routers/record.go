package routers

import (
	"family-wallet/internal/adapters/http/handlers"
	"family-wallet/internal/middlewares"

	"github.com/gorilla/mux"
)

func RegisterRecordRoutes(record *handlers.Record, router *mux.Router, jwtMiddleware *middlewares.Auth) {
	router.Use(jwtMiddleware.Middleware)
	router.HandleFunc("/record/create", record.New).Methods("POST")
	router.HandleFunc("/records", record.GetAll).Methods("GET")
	router.HandleFunc("/record/{id}/", record.Update).Methods("UPDATE")
	router.HandleFunc("/record/{id}/", record.Delete).Methods("DELETE")
}