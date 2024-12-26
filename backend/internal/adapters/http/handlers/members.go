package handlers

import (
	"encoding/json"
	"family-wallet/internal/middlewares"
	"family-wallet/internal/services"
	"family-wallet/internal/util"
	"fmt"

	"family-wallet/internal/services/dto"
	"net/http"

	"github.com/go-playground/validator/v10"
)

type Member struct {
	members *services.Members
	household *services.Household
	Validator *validator.Validate
}

func NewMember(members *services.Members, household *services.Household, validator *validator.Validate) *Member {
	return &Member{
		members,
		household,
		validator,
	}
}

func (m *Member) GetFamilyCode(w http.ResponseWriter, r *http.Request)  {
	userId := r.Context().Value(middlewares.User_id).(int)

	household, err := m.household.GetHousehold(userId)
	if err != nil {
		http.Error(w, "Household for user not found", http.StatusTeapot)
		return
	}

	familyCode, err := m.members.GetFamilyCode(household.Id)
	
	if err != nil {
		http.Error(w, "Could not get family code", http.StatusTeapot)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(familyCode)
}

func (m *Member) GetJoinRequests(w http.ResponseWriter, r *http.Request)  {
	userId := r.Context().Value(middlewares.User_id).(int)

	isAdmin, err := m.household.IsAdmin(userId)

	if err != nil {
		http.Error(w, "User not found", http.StatusTeapot)
		return
	}

	if !isAdmin {
		http.Error(w, "Permission denied", http.StatusUnauthorized)
		return
	}

	household, err := m.household.GetHousehold(userId)

	if err != nil {
		http.Error(w, "User not found", http.StatusTeapot)
		return
	}

	joinRequests, err := m.members.GetJoinRequests(household.Id)

	if err != nil {
		http.Error(w, "Could not get join requests", http.StatusTeapot)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(joinRequests)
}

func (m *Member) GetFamilyMembers(w http.ResponseWriter, r *http.Request)  {
	userId := r.Context().Value(middlewares.User_id).(int)

	household, err := m.household.GetHousehold(userId)

	if err != nil {
		http.Error(w, "User not found", http.StatusTeapot)
		return
	}


	isAdmin, err := m.household.IsAdmin(userId)

	if err != nil {
		http.Error(w, "User not found", http.StatusTeapot)
		return
	}

	if !isAdmin {
		http.Error(w, "Permission denied", http.StatusUnauthorized)
		return
	}

	familyMembers, err := m.members.GetFamilyMembers(household.Id)

	if err != nil {
		http.Error(w, "Could not get family members", http.StatusTeapot)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(familyMembers)
}

func (m *Member) Test(w http.ResponseWriter, r *http.Request)  {
	w.WriteHeader(http.StatusOK)
}

func (m *Member) AcceptRequest(w http.ResponseWriter, r *http.Request)  {
	userId := r.Context().Value(middlewares.User_id).(int)

	isAdmin, err := m.household.IsAdmin(userId)

	if err != nil {
		http.Error(w, "User not found", http.StatusTeapot)
		return
	}

	if !isAdmin {
		http.Error(w, "Permission denied", http.StatusUnauthorized)
		return
	}

	var body *dto.AcceptRequest
	err = json.NewDecoder(r.Body).Decode(&body)

	if err != nil {
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	household, err := m.household.GetHousehold(userId)

	if err != nil {
		http.Error(w, "User not found", http.StatusTeapot)
		return
	}

	err = m.members.AcceptRequest(household.Id, body.UserId)

	if err != nil {
		http.Error(w, "Could not accept request", http.StatusTeapot)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (m *Member) RejectRequest(w http.ResponseWriter, r *http.Request)  {
	userId := r.Context().Value(middlewares.User_id).(int)
	memberId, err := util.GetIntPathParam(r, "id")

	if err != nil {
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	isAdmin, err := m.household.IsAdmin(userId)

	if err != nil {
		println("Could not determine user's household. That should never happen")
		http.Error(w, "User not found", http.StatusTeapot)
		return
	}

	if !isAdmin {
		http.Error(w, "Permission denied", http.StatusUnauthorized)
		return
	}

	household, err := m.household.GetHousehold(userId)

	if err != nil {
		println("Could not find household for user. That should never happen")
		http.Error(w, "Household not found", http.StatusTeapot)
		return
	}

	err = m.members.RejectRequest(household.Id, memberId)

	if err != nil {
		fmt.Printf("Could not reject request: %s\n", err.Error())
		http.Error(w, "Could not reject request", http.StatusTeapot)
		return
	}

	w.WriteHeader(http.StatusOK)
	fmt.Print("Rejected request")
}

func (m *Member) SetLimit(w http.ResponseWriter, r *http.Request)  {
	userId := r.Context().Value(middlewares.User_id).(int)

	isAdmin, err := m.household.IsAdmin(userId)

	if err != nil {
		http.Error(w, "User not found", http.StatusTeapot)
		return
	}

	if !isAdmin {
		http.Error(w, "Permission denied", http.StatusUnauthorized)
		return
	}

	memberId, err := util.GetIntPathParam(r, "id")

	if err != nil {
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	var limit int
	json.NewDecoder(r.Body).Decode(&limit)

	println(limit)
	household, err := m.household.GetHousehold(userId)

	if err != nil {
		http.Error(w, "User not found", http.StatusTeapot)
		return
	}

	m.members.SetLimit(household.Id, memberId, limit)

	w.WriteHeader(http.StatusOK)
}

func (m *Member) RemoveLimit(w http.ResponseWriter, r *http.Request)  {
	userId := r.Context().Value(middlewares.User_id).(int)

	isAdmin, err := m.household.IsAdmin(userId)

	if err != nil {
		http.Error(w, "User not found", http.StatusTeapot)
		return
	}

	if !isAdmin {
		http.Error(w, "Permission denied", http.StatusUnauthorized)
		return
	}

	memberId, err := util.GetIntPathParam(r, "id")

	if err != nil {
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	household, err := m.household.GetHousehold(userId)

	if err != nil {
		http.Error(w, "User not found", http.StatusTeapot)
		return
	}

	m.members.RemoveLimit(household.Id, memberId)

	w.WriteHeader(http.StatusOK)
}

func (m *Member) Kick(w http.ResponseWriter, r *http.Request)  {
	userId := r.Context().Value(middlewares.User_id).(int)
	memberId, err := util.GetIntPathParam(r, "id")

	result := r.URL.Query().Encode()
	println(result)
	if err != nil {
		print("Error: ")
		println(err.Error())
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	isAdmin, err := m.household.IsAdmin(userId)

	
	if err != nil {
		http.Error(w, "User not found", http.StatusTeapot)
		return
	}

	if !isAdmin {
		http.Error(w, "Permission denied", http.StatusUnauthorized)
		return
	}
	household, err :=m.household.GetHousehold(userId)
	
	if err != nil {
		http.Error(w, "User not found", http.StatusTeapot)
		return
	}

	m.members.Delete(household.Id, memberId);
}