package config

import (
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
)

type Config struct {
	DatabaseURL string
	Port        string
	Secret      string
	Expiration  time.Duration
}

func Load() *Config {
	if err := godotenv.Load(); err != nil {
		log.Fatal("File .env not found")
	}

	databaseURL := "postgres://" + getEnv("POSTGRES_USER", "username") + ":" + getEnv("POSTGRES_PASSWORD", "password") + "@localhost:" + getEnv("POSTGRES_PORT", "5432") + "/" + getEnv("POSTGRES_DB", "mydb") + "?sslmode=disable"

	expiration, err := time.ParseDuration(getEnv("EXPIRATION", "24h"))
	if err != nil {
		log.Fatal(err)
	}

	return &Config{
		DatabaseURL: databaseURL,
		Port:        getEnv("PORT", "5000"),
		Secret:      getEnv("SECRET", "secret"),
		Expiration:  expiration,
	}
}

func getEnv(key string, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}

	log.Printf("There is no %s in env variables, using the default value", key)
	return defaultValue
}
