package routers

import (
	"family-wallet/internal/adapters/http/handlers"
	"family-wallet/internal/middlewares"

	"github.com/gorilla/mux"
)

func RegisterMemberRoutes(member *handlers.Member, router *mux.Router, jwtMiddleware *middlewares.Auth) {
	router.Use(jwtMiddleware.Middleware)
	router.HandleFunc("/family-code", member.GetFamilyCode).Methods("GET")
	router.HandleFunc("/join-requests", member.GetJoinRequests).Methods("GET")
	router.HandleFunc("/accept-request", member.AcceptRequest).Methods("POST")
	router.HandleFunc("/family-members", member.GetFamilyMembers).Methods("GET")
	router.HandleFunc("/{id}/limit", member.SetLimit).Methods("POST")
	router.HandleFunc("/{id}/limit-remove", member.RemoveLimit).Methods("DELETE")
	router.HandleFunc("/{id}", member.Kick).Methods("DELETE")
}
