import React, {useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { useForm,useFieldArray } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import {AddTestAction} from '../api/Test';
import NavBar from '../components/NavBar';
import Spinner from 'react-bootstrap/Spinner';
import { FaArrowLeft,FaSave,FaPlus } from 'react-icons/fa';
import { RiDeleteBin6Line } from "react-icons/ri";

const  AddTest =() =>{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const tokenCookies = cookies.get('token');
  const addTest = useSelector((state) => state.addTestsReducer) || [];
  const { register, handleSubmit,control } = useForm();
  const onSubmit = data => dispatch(AddTestAction(data,tokenCookies)).then(() => alert('you Add item ')).then(() => {navigate('/test')});
  const {
    fields: questionFields,
    append: questionAppend,
    remove: questionRemove
  } = useFieldArray({ control, name: "question" });


  const Option = ({nestIndex}) => {
    const {
      fields: optionFields,
      append: optionAppend,
      remove: optionRemove
    } = useFieldArray({ control, name: `obj.question[${nestIndex}].option` });
    return(
      <div>
    {optionFields.map((item, k) => (
      <div className ="form-group row my-4">
       <span className="col-sm-1">{k+1}</span>
        <div className="col-sm-7">
        <input {...register(`question[${nestIndex}].option[${k}].nameOption`)} className="form-control"/>
        </div>
        <div className="form-check col-sm-2">
          <input className="form-check-input" type="checkbox" {...register(`question[${nestIndex}].option[${k}].correct`)}/>
          <label className="form-check-label" for="defaultCheck1">
           correct answer
          </label>
        </div>
        <div className="col-sm-2" onClick={() => optionRemove(nestIndex)}><RiDeleteBin6Line size ={30}/></div>
      </div>
    ))}
    <div className="form-group mx-3 custom_button">
          <FaPlus/> <input type="button" onClick={() => optionAppend({ nameOption: "", correct: "" })} value ="option" className="input_button" />
      </div>
    </div>
    )
  }

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
      <div className="d-flex justify-content-between mb-4">
      <div className ="d-flex"> 
      <a onClick = {()=> {navigate('/test')}} className="form-group custom_button">
      <FaArrowLeft/> Back
      </a>
      <div className="form-group mx-3 custom_button">
        <FaSave/> <input value ="Save" type="submit" className="input_button" />
      </div>
      </div>
      <div className="form-group mx-3 custom_button">
      <FaPlus/> <input type="button"  onClick={() => questionAppend({ nameQuestion: "", descriptionQuestion: "" })} value ="Question"  className="input_button" />
      </div>
      </div>
      <div className="form-group row mb-4">
      <label className="col-sm-2 col-form-label">Name</label>
      <div className="col-sm-10">
        <input  {...register("nameTest")} placeholder="Give the test a label here..." className="form-control" />
        </div>
      </div>
      <div className="form-group row">
      <label className="col-sm-2 col-form-label">Description</label>
      <div className="col-sm-10">
        <textarea rows="4" cols="50" {...register("descriptionTest")} placeholder="Enter a description here..." className="form-control" />
        </div>
      </div>
      {questionFields.map((item, index) => (
        <div>
          <div className="form-group row my-4">
          <div className="col-sm-10">
          <input {...register(`question.${index}.nameQuestion`)} className="form-control" placeholder ="Give the question a label here..."/>
          </div>
          <div className="col-sm-2"  onClick={() => questionRemove(index)}><RiDeleteBin6Line size ={30}/></div>
          </div>
          <div className="form-group mb-4">
          <textarea rows="4" cols="50" {...register(`question.${index}.descriptionQuestion`)} className="form-control" placeholder="Enter a description here..."/>
          </div>
          <Option nestIndex={index} />
        </div>
      ))}
    </form>
    </div>
    </>
  );
}

export default AddTest;
