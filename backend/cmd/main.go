package main

import (
	"family-wallet/config"
	"family-wallet/internal/adapters/http/handlers"
	"family-wallet/internal/adapters/http/routers"
	"family-wallet/internal/services"
	"log"
	"net/http"

	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/gorilla/mux"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

func main() {
	cfg := config.Load()

	db, err := sqlx.Open("postgres", cfg.DatabaseURL)
	if err != nil {
		log.Fatalf("Could not connect to database: %v", err)
	}
	defer db.Close()

	m, err := migrate.New(
		"file://migrations",
		cfg.DatabaseURL)
	if err != nil {
		log.Fatalf("Could not connect to migrations: %v", err)
	}
	if err := m.Up(); err != nil {
		log.Printf("Could not run migrations: %v", err)
	}

	jwtService := services.NewJwt(cfg.Secret, cfg.Expiration)
	passwordService := services.NewPassword()
	authService := services.NewAuth(db, jwtService, passwordService)
	authHandler := handlers.NewAuth(authService)

	router := mux.NewRouter()
	routers.RegisterRoutes(authHandler, router)

	log.Printf("Server started on 127.0.0.1:%s", cfg.Port)

	if err := http.ListenAndServe(":"+cfg.Port, router); err != nil {
		log.Fatal(err)
	}
}
