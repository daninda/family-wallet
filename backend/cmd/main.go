package main

import (
	"family-wallet/config"
	"log"
	"net/http"

	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"

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
	if err := m.Steps(1); err != nil {
		log.Printf("Could not run migrations: %v", err)
	}

	log.Printf("Server started on 127.0.0.1:%s", cfg.Port)

	http.ListenAndServe(":"+cfg.Port, nil)
}
