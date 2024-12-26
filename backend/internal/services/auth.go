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

	if err := row.StructScan(&existsId); err == nil {
		return nil, errors.New("user already exists")
	}

	var household entities.Household

	// var householdId int
	if input.IsAdmin {
		row := a.db.QueryRowx(`
			INSERT INTO households (id) VALUES (DEFAULT) RETURNING id
		`)

		if err := row.StructScan(&household); err != nil {
			println("error! could not create household: ")
			println(err.Error())
			return nil, errors.New("could not create household")
		}
	} else {
		print("user requested to join household '")
		print(input.HouseholdId)
		println("'")
		row := a.db.QueryRowx(`
			SELECT * FROM households WHERE id = $1
		`, input.HouseholdId)

		println(row)
		if err := row.StructScan(&household); err != nil {
			println(err.Error())
			return nil, errors.New("could not find household")
		}
	}

	passwordHash, _ := a.password.hashPassword(input.Password)

	user := entities.User{
		Id:           0,
		Name:         input.Name,
		Email:        input.Email,
		PasswordHash: passwordHash,
		Accepted:     false,
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

	if err := row.StructScan(&user); err != nil {
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

func (a *Auth) GetUser(id int) (*dto.UserOutput, error) {
	row := a.db.QueryRowx(`
		SELECT * FROM users WHERE id = $1
	`, id)

	var user entities.User

	if err := row.StructScan(&user); err != nil {
		return nil, errors.New("user not found")
	}

	return &dto.UserOutput{Id: user.Id, Name: user.Name, Email: user.Email, Accepted: user.Accepted, IsAdmin: user.IsAdmin, HouseholdId: user.HouseholdId}, nil
}

func (a *Auth) Accepted(id int) (bool, error) {
	row := a.db.QueryRowx(`
		SELECT accepted FROM users WHERE id = $1
	`, id)

	var accepted bool

	if err := row.Scan(&accepted); err != nil {
		return false, errors.New("user not found")
	}


	return accepted, nil
}

