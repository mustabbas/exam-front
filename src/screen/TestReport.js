import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { Link,useNavigate } from 'react-router-dom';
import {GetTestAction,deleteTestAction} from '../api/Test';
import Spinner from 'react-bootstrap/Spinner';
import NavBar from '../components/NavBar';

const  TestReport = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const cookies = new Cookies();
  const tokenCookies = cookies.get('token');
  const tests = useSelector((state) => state.testsReducer) || [];

  const  DeleteHandler = (id) => {
    dispatch(deleteTestAction(id,tokenCookies)).then(() => alert('you delete item ')).then(() => dispatch(GetTestAction(tokenCookies))).then(() => {navigate('/test')});
  }

  useEffect(() => {
    if (!tokenCookies) {
      {navigate('/')}
    }
    dispatch(GetTestAction(tokenCookies))
  },[tests.isFecthingDone])

    return(
      <div>
         <NavBar/>
      {tests.loading ? (<div className="centerText"><Spinner animation="border" /></div>) : (
        <div className = "container mt-5">
      <Link className ="custom_button mb-4" to="/AddTest">New Test</Link>
        <table className="table table-striped Fullborder">
          <thead className="table_header">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Question</th>
              <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
          {tests.tests.map((item) => (
            <tr>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.question_quantity}</td>
            <td><Link to={{ pathname: `/EditTest/${item.id}` }} >Edit</Link> <a href = "#" onClick = {() => DeleteHandler(item.id)}>Delete</a></td>
          </tr>
          ))}
        </tbody>
      </table> 
      </div> 
      ) }
      </div>
    )
}

export default TestReport;