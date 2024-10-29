package services

import (
	"errors"
	"family-wallet/internal/entities"
	"family-wallet/internal/services/dto"

	"github.com/jmoiron/sqlx"
)

type Auth struct {
	db       *sqlx.DB
	jwt      *Jwt
	password *Password
}

func NewAuth(db *sqlx.DB, jwt *Jwt, password *Password) *Auth {
	return &Auth{db: db, jwt: jwt, password: password}
}

func (a *Auth) Register(
	input *dto.RegisterInput,
) (*dto.RegisterOutput, error) {
	row := a.db.QueryRowx(`
		SELECT id FROM users WHERE email = $1
	`, input.Email)

	var existsId int

	if err := row.Scan(&existsId); err == nil {
		return nil, errors.New("user already exists")
	}

	var household entities.Household

	if input.IsAdmin {
		row := a.db.QueryRowx(`
			INSERT INTO households (id) VALUES (DEFAULT) RETURNING *
		`)

		if err := row.Scan(&household.Id); err != nil {
			return nil, errors.New("could not create household")
		}
	} else {
		row := a.db.QueryRowx(`
			SELECT * FROM households WHERE id = $1 RETURNING *
		`, input.HouseholdId)

		if err := row.Scan(&household); err != nil {
			return nil, errors.New("could not find household")
		}
	}

	passwordHash, _ := a.password.hashPassword(input.Password)

	user := entities.User{
		Id:           0,
		Name:         input.Name,
		Email:        input.Email,
		PasswordHash: passwordHash,
		Accepted:     input.Accepted,
		IsAdmin:      input.IsAdmin,
		Limitation:   nil,
		HouseholdId:  household.Id,
	}

	row = a.db.QueryRowx(`
		INSERT INTO users (name, email, password_hash, is_admin, accepted, household_id) 
		VALUES ($1, $2, $3, $4, $5, $6) RETURNING id
	`, user.Name, user.Email, user.PasswordHash, user.IsAdmin, user.Accepted, user.HouseholdId,
	)

	if err := row.Scan(&user.Id); err != nil {
		return nil, errors.New("could not create user")
	}

	token, err := a.jwt.GenerateToken(user.Id)

	if err != nil {
		return nil, errors.New("could not generate token")
	}

	return &dto.RegisterOutput{User: dto.UserOutput{Id: user.Id, Name: user.Name, Email: user.Email, Accepted: user.Accepted, IsAdmin: user.IsAdmin, HouseholdId: user.HouseholdId}, Token: token}, nil
}

func (a *Auth) Login(input *dto.LoginInput) (*dto.LoginOutput, error) {
	row := a.db.QueryRowx(`
		SELECT * FROM users WHERE email = $1
	`, input.Email)

	var user entities.User

	if err := row.Scan(&user); err != nil {
		return nil, errors.New("wrong email or password")
	}

	if !a.password.checkPassword(input.Password, user.PasswordHash) {
		return nil, errors.New("wrong email or password")
	}

	token, err := a.jwt.GenerateToken(user.Id)

	if err != nil {
		return nil, errors.New("could not generate token")
	}

	return &dto.LoginOutput{User: dto.UserOutput{Id: user.Id, Name: user.Name, Email: user.Email, Accepted: user.Accepted, IsAdmin: user.IsAdmin, HouseholdId: user.HouseholdId}, Token: token}, nil
}
