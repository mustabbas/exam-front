import React, {useState, useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { useForm,useFieldArray,FormProvider,Controller } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import {UpdateUserAction,GetSingelUserAction} from '../api/User';
import { useParams } from 'react-router';
import NavBar from '../components/NavBar';
import { FaArrowLeft,FaSave } from 'react-icons/fa';

const  EditTest =() =>{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const tokenCookies = cookies.get('token');
  const user = useSelector((state) => state.singelUserReducer) || [];
  const { id } = useParams();
  useEffect(() => {
    if (!tokenCookies) {
      {navigate('/')}
    }
    dispatch(GetSingelUserAction(id,tokenCookies))
  },[user.isFecthingDone])
  


  const { register, handleSubmit,control } = useForm({});
  const onSubmit = data => dispatch(UpdateUserAction(id,data,tokenCookies)).then(() => alert('you update user ')).then(() => {navigate('/user')});

  return (
    <>
    <NavBar/>
    {user.isFecthingDone ? (
      <div className = "container mt-5">
     <form onSubmit={handleSubmit(onSubmit)}>
     <div className="d-flex mb-4">
     <a onClick = {()=> {navigate('/user')}} className="form-group custom_button">
      <FaArrowLeft/> Back
      </a>
      <div className="form-group custom_button mx-3">
          <FaSave/> <input value ="Save" type="submit" className="input_button" />
      </div>
     </div>
     <div className="form-group row mb-4">
       <label className="col-sm-2 col-form-label">Name</label>
       <div className="col-sm-10">
         <input defaultValue= {user ? user.user.name :''}  {...register("name")} placeholder="name" className="form-control" />
       </div>
     </div>
     <div className="form-group row mb-4">
       <label className="col-sm-2 col-form-label">Email</label>
       <div className="col-sm-10">
         <input defaultValue= {user ? user.user.email :''}  {...register("email")} placeholder="email" className="form-control" />
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
           <option selected={user.user.role == 'Teacher' ?"selected" : ''} value="Teacher">Teacher</option>
           <option selected={user.user.role == 'Student' ?"selected" : ''} value="Student">Student</option>
         </select>
       </div>
     </div>
   </form>
   </div>
    ) : null}
    </>
  );
}

export default EditTest;
