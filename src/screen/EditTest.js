import React, {useState, useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { useForm,useFieldArray,FormProvider,Controller } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import {UpdateTestAction,GetSingelTestAction} from '../api/Test';
import { useParams } from 'react-router';
import NavBar from '../components/NavBar';
import { FaArrowLeft,FaSave,FaPlus } from 'react-icons/fa';
import { RiDeleteBin6Line } from "react-icons/ri";

const  EditTest =() =>{
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const tokenCookies = cookies.get('token');
  const test = useSelector((state) => state.singelTestReducer) || [];
  const { id } = useParams();
  useEffect(() => {
    if (!tokenCookies) {
      {navigate('/')}
    }
    dispatch(GetSingelTestAction(id,tokenCookies))
  },[test.isFecthingDone])
  
  const navigate = useNavigate();
  
  const questionDefualt = []
  if (test.isFecthingDone) {
    if (test.test.question.length > 0  ) {
      test.test.question.forEach(element => {
        questionDefualt.push(
          {nameQuestion: element.name,descriptionQuestion: element.description , otpion : test.test.optionQuestion[element.id]}
        )
      }); 
    } 
  }

  const { register, handleSubmit,control } = useForm({
    defaultValues: {
      question: questionDefualt,
    }
  });
  const onSubmit = data => dispatch(UpdateTestAction(id,data,tokenCookies)).then(() => alert('you update test ')).then(() => {navigate('/test')});

  const {
    fields: questionFields,
    append: questionAppend,
    remove: questionRemove
  } = useFieldArray({ control, name: "question" });

  const Option = ({nestIndex,nestItem}) => {
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
       <input {...register(`question[${nestIndex}].option[${k}].nameOption`)} defaultValue = {nestItem.nameQuestion} placeholder = {nestItem.nameQuestion}  className="form-control"/>
       </div>
       <div className="form-check col-sm-2">
         <input defaultValue = {item.correct} className="form-check-input" type="checkbox" {...register(`question[${nestIndex}].option[${k}].correct`)}/>
         <label className="form-check-label" for="defaultCheck1">
          correct answer
         </label>
       </div>
       <div className="col-sm-2"  onClick={() => optionRemove(nestIndex)}><RiDeleteBin6Line size ={30}/></div>
     </div>
    ))}
     <div className="form-group mx-3 custom_button">
     <FaPlus/>  <input type="button" onClick={() => optionAppend({ nameOption: "", correct: "" })} value ="option" className="input_button" />
      </div>
    </div>
    )
  }
  return (
    <>
    <NavBar/>
    {test.isFecthingDone ? (
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
        <input  defaultValue= {test ? test.test.test.name : ''} {...register("nameTest")} placeholder= {test ? test.test.test.name : ''} className="form-control" />
        </div>
      </div>
      <div className="form-group row">
      <label className="col-sm-2 col-form-label">Description</label>
      <div className="col-sm-10">
        <textarea rows="4" cols="50" defaultValue= {test  ? test.test.test.description : ''} {...register("descriptionTest")} placeholder= {test  ? test.test.test.description : ''} className="form-control" />
        </div>
      </div>
      
     {questionFields.map((item, index) =>  (
         <div>
         <div className="form-group row my-4">
         <div className="col-sm-10">
         <input {...register(`question.${index}.nameQuestion`)} className="form-control" defaultValue = {item.nameQuestion} placeholder = {item.nameQuestion}/>
         </div>
         <div className="col-sm-2"  onClick={() => questionRemove(index)}><RiDeleteBin6Line size ={30}/></div>
         </div>
         <div className="form-group mb-4">
         <textarea rows="4" cols="50" {...register(`question.${index}.descriptionQuestion`)} className="form-control" defaultValue = {item.descriptionQuestion} placeholder = {item.descriptionQuestion}/>
         </div>
         {item.otpion ? item.otpion.map((element,k) => (
           <div className ="form-group row my-4">
           <span className="col-sm-1">{k+1}</span>
            <div className="col-sm-7">
            <input {...register(`question[${index}].option[${k}].nameOption`)} defaultValue = {element.name} placeholder = {element.name}  className="form-control"/>
            </div>
            <div className="form-check col-sm-2">
            {element.correct ? <input checked className="form-check-input" type="checkbox" {...register(`question[${index}].option[${k}].correct`)}/>
             : <input  className="form-check-input" type="checkbox" {...register(`question[${index}].option[${k}].correct`)}/> }
              <label className="form-check-label" for="defaultCheck1">
               correct answer
              </label>
            </div>
            <div className="col-sm-2" ><RiDeleteBin6Line size ={30}/></div>
          </div>
        )) : null}
         <Option nestItem = {item}  nestIndex={index} />
       </div>
     ))}
   </form>
   </div>
    ) : null}
    </>
  );
}

export default EditTest;
