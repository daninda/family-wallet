package middlewares

import (
	"context"
	"family-wallet/internal/services"
	"log"
	"net/http"
)

type Auth struct {
	jwtService *services.Jwt
}

type key string

const User_id key = "user_id"

func NewAuthMiddleware(jwtService *services.Jwt) *Auth {
	return &Auth{jwtService}
}

func (middleware *Auth) Middleware(handler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		token := r.Header.Get("Authorization")

		token = token[7:]

		id, err := middleware.jwtService.ValidateToken(token)

		if err != nil {
			log.Println(err.Error())
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		ctx := context.WithValue(r.Context(), User_id, id)
		handler.ServeHTTP(w, r.WithContext(ctx))
	})
}
