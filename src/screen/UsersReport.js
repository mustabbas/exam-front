import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { Link,useNavigate } from 'react-router-dom';
import {GetUsersAction,deleteUserAction} from '../api/User';
import Spinner from 'react-bootstrap/Spinner';
import NavBar from '../components/NavBar';
import { FaPlus } from 'react-icons/fa';

const  UserReport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const tokenCookies = cookies.get('token');
  const users = useSelector((state) => state.usersReducer) || [];
  const  DeleteHandler = (id) => {
    dispatch(deleteUserAction(id,tokenCookies)).then(() => alert('you delete user ')).then(() => dispatch(GetUsersAction(tokenCookies))).then(() => {navigate('/user')});
  }

  useEffect(() => {
    if (!tokenCookies) {
      {navigate('/')}
    }
    if (users.length < 0) {
      alert('you don not have permission')
      cookies.remove('token')
      {navigate('/')}
    }
    dispatch(GetUsersAction(tokenCookies))
  },[users.isFecthingDone])

    return(
      <div >
        <NavBar/>
      {users.loading ? (<div className="centerText"><Spinner animation="border" /></div>) : (
        <div className = "container mt-5">
        
        <Link className ="custom_button mb-4" to="/AddUser"><FaPlus/> New User</Link>
          <table className="table table-striped Fullborder ">
            <thead className="table_header">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Action</th>
              </tr>
          </thead>
          <tbody>
            {users.users.map((item) => (
              <tr>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
              <td><Link to={{ pathname: `/EditUser/${item.id}` }} >Edit</Link> <a href = "#" onClick = {() => DeleteHandler(item.id)}>Delete</a></td>
            </tr>
            ))}
          </tbody>
        </table> 
        </div> 
      )}
      </div>
    
    )
}

export default UserReport;