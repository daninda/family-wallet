package services

import (
	"log"
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
	tokenText, err :=  token.SignedString([]byte(j.secret))
	log.Println("generating")
	log.Println(tokenText);
	log.Println(err);
	res, err := j.ValidateToken(tokenText);

	log.Println("validating:")
	log.Println(res)
	log.Println(err)
	return tokenText, err
}

func (j *Jwt) ValidateToken(tokenString string) (int, error) {
	
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, jwt.ErrSignatureInvalid
		}

		return []byte(j.secret), nil
	})

	if err != nil || !token.Valid {
		println("token validity error")
		return 0, err
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		println("claims error")
		return 0, jwt.ErrSignatureInvalid
	}
	
	userId, ok := claims["user_id"].(float64)
	if !ok {
		println("user_id error")
		return 0, jwt.ErrSignatureInvalid
	}

	return int(userId), nil
}
