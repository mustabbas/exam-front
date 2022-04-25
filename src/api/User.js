import {fetchingUser,fetchUser} from '../redux/usersReducer/usersReducer';
import {fetchingSingelUser,fetchSingelUser} from '../redux/usersReducer/singeluserReducer';
import {loginDone,submitLogin} from '../redux/usersReducer/LoginReducer';
const BASE_URL = 'http://localhost:3000/api/v1';

export const LoginUserAction = (data) => async(dispatch) => {
  dispatch(submitLogin())
  const formData = new FormData()
  formData.append('email', data.email);
  formData.append('password', data.password);
  await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    body: formData,
  }).then((res) => res.json())
  .then((resResponse) => dispatch(loginDone(resResponse)));  
};


export const AddUserAction = (data,userToken) => async() => {
    const formData = new FormData()
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('role', data.role);
    await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Authorization': `${userToken}`,
      },
      body: formData,
    }).then((res) => res.json())
    .then((resResponse) => console.log(resResponse));  
};

export const GetUsersAction = (userToken) => async(dispatch) => {
  dispatch(fetchingUser());
  await fetch(`${BASE_URL}/users`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
      'Authorization': `${userToken}`,
    },
  }).then((res) => res.json())
  .then((resResponse) => dispatch(fetchUser(resResponse)));  
};

export const GetSingelUserAction = (id,userToken) => async(dispatch) => {
  dispatch(fetchingSingelUser());
  await fetch(`${BASE_URL}/user/${id}/edit`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
      'Authorization': `${userToken}`,
    },
  }).then((res) => res.json())
  .then((resResponse) => dispatch(fetchSingelUser(resResponse)));  
};

export const UpdateUserAction = (id,data,userToken) => async(dispatch) => {
  const formData = new FormData()
  formData.append('name', data.name);
  formData.append('email', data.email);
  formData.append('password', data.password);
  formData.append('role', data.role);
  await fetch(`${BASE_URL}/user/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `${userToken}`,
    },
    body: formData,
  }).then((res) => res.json())
  .then((resResponse) => console.log(resResponse));  
};

export const deleteUserAction = (id,userToken) => async(dispatch) => {
  await fetch(`${BASE_URL}/user/${id}/destroy`, {
    method: 'DELETE',
    headers: {
      'Authorization': `${userToken}`,
    },
  }).then((res) => res.json())
  .then((resResponse) => console.log(resResponse));  
};