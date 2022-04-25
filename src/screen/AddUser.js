import React, {useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import {AddUserAction} from '../api/User';
import NavBar from '../components/NavBar';

const  AddUser =() =>{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const tokenCookies = cookies.get('token');
  const { register, handleSubmit,control } = useForm();
  const onSubmit = data => dispatch(AddUserAction(data,tokenCookies)).then(() => alert('you Add new user ')).then(() => {navigate('/user')});

  useEffect(() => {
    if (!tokenCookies) {
      {navigate('/')}
    }
  },[])

  return (
    <>
    <NavBar/>
    <div className = "container mt-5">
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="d-flex mb-4">
      <div className="form-group ">
          <input onClick = {()=> {navigate('/user')}} value ="Back" type="submit" className="custom_button" />
      </div>
      <div className="form-group mx-3">
          <input value ="Save" type="submit" className="custom_button" />
      </div>
      </div>
      <div className="form-group row mb-4">
        <label className="col-sm-2 col-form-label">Name</label>
        <div className="col-sm-10">
          <input  {...register("name")} placeholder="name" className="form-control" />
        </div>
      </div>
      <div className="form-group row mb-4">
        <label className="col-sm-2 col-form-label">Email</label>
        <div className="col-sm-10">
          <input {...register("email")} placeholder="email" className="form-control" />
        </div>
      </div>
      <div className="form-group row mb-4">
        <label className="col-sm-2 col-form-label">Password</label>
        <div className="col-sm-10">
          <input {...register("password")} placeholder="password" className="form-control" />
        </div>
      </div>
      <div className="form-group row mb-4">
        <label className="col-sm-2 col-form-label">Role</label>
        <div className="col-sm-10">
          <select {...register("role")}  className="form-control">
            <option value="Teacher">Teacher</option>
            <option value="Student">Student</option>
          </select>
        </div>
      </div>
    </form>
    </div>
    </>
  );
}

export default AddUser;
