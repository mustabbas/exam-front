import React, {useEffect} from 'react';
import Cookies from 'universal-cookie';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import {LoginUserAction} from '../api/User';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';

const  Login =() =>{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const user = useSelector((state) => state.loginReducer) || [];
  const { register, handleSubmit,control } = useForm();
  const onSubmit = data => dispatch(LoginUserAction(data));
  const tokenCookies = cookies.get('token');
  const redirectHomePage = () => {
    if (tokenCookies) {
      navigate('/user') 
    }
    if (user.auth.token) {
      if (user.auth.role === 'Teacher') {
        cookies.set('token', user.auth.token);
         navigate('/user') 
      }else {
        alert('you do not have role here')
      }
    }
  }
  useEffect(() => {
    if(user.auth.error === 'unauthorized') {
      alert('Please check your login detail')
    }
    redirectHomePage()
  },[user.isFecthingDone,user.auth])

  return (
    <div className = "container mt-5">
    <div className="row Fullborder">
       <h1 className= "centerText">Administrato Login</h1>
       <div className = "line mb-5"></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group row ">
          <label className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input {...register("email")} placeholder="email" className="form-control" />
          </div>
        </div>
        <div className="form-group row mt-3">
          <label className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input {...register("password")} placeholder="password" className="form-control" />
          </div>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
          <label className="form-check-label" for="defaultCheck1">
            Remmber me
          </label>
        </div>
        <div className = "line mt-5 mb-2"></div>
        <div className="form-group row d-flex justify-content-end mb-2">
          {user.loading ? (
            <div className="col-sm-2"><Spinner animation="border" /></div>
          ) : (
            <div className="col-sm-2">
              <input value ="Login" type="submit" className="btn btn-outline-dark btn-shadow" />
            </div>
          )}
        </div>
      </form>
      
    </div>
    </div>
  );
}

export default Login;
