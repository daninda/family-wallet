package services

import (
	"time"

	"github.com/golang-jwt/jwt/v4"
)

type Jwt struct {
	secret     string
	expiration time.Duration
}

func NewJwt(secret string, expiration time.Duration) *Jwt {
	return &Jwt{
		secret:     secret,
		expiration: expiration,
	}
}

func (j *Jwt) GenerateToken(userId int) (string, error) {
	claims := jwt.MapClaims{
		"user_id": userId,
		"exp":     time.Now().Add(j.expiration).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(j.secret)
}

func (j *Jwt) ValidateToken(tokenString string) (int, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, jwt.ErrSignatureInvalid
		}
		return j.secret, nil
	})

	if err != nil || !token.Valid {
		return 0, err
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		return 0, jwt.ErrSignatureInvalid
	}

	userId, ok := claims["user_id"].(int)
	if !ok {
		return 0, jwt.ErrSignatureInvalid
	}

	return userId, nil
}
