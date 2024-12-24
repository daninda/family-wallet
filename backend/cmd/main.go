package main

import (
	"family-wallet/config"
	"family-wallet/internal/adapters/http/handlers"
	"family-wallet/internal/adapters/http/routers"
	"family-wallet/internal/middlewares"
	"family-wallet/internal/services"
	"log"
	"net/http"

	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/gorilla/mux"

	"github.com/go-playground/validator/v10"

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
	householdService := services.NewHousehold(db)
	authService := services.NewAuth(db, jwtService, passwordService)
	categoryService := services.NewCategory(db)
	subcategoryService := services.NewSubcategory(db)
	recordService := services.NewRecordService(db)
	validator := validator.New()

	jwtMidlleware := middlewares.NewAuthMiddleware(jwtService)
	authHandler := handlers.NewAuth(authService, validator, jwtService)
	categoryHandler := handlers.NewCategory(categoryService, householdService, validator)
	subcategoryHandler := handlers.NewSubcategory(subcategoryService, householdService, validator)
	recordHandler := handlers.NewRecord(recordService, householdService, validator)

	router := mux.NewRouter()

	routers.RegisterAuthRoutes(authHandler, router.PathPrefix("/auth").Subrouter())
	routers.RegisterCategoryRoutes(categoryHandler, router.PathPrefix("/categories").Subrouter(), jwtMidlleware)
	routers.RegisterSubcategoryRoutes(subcategoryHandler, router.PathPrefix("/subcategories").Subrouter(), jwtMidlleware)
	routers.RegisterRecordRoutes(recordHandler, router.PathPrefix("/records").Subrouter(), jwtMidlleware)

	log.Printf("Server started on 127.0.0.1:%s", cfg.Port)

	if err := http.ListenAndServe(":"+cfg.Port, router); err != nil {
		log.Fatal(err)
	}
}
