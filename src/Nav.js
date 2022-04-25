import React,{useEffect} from 'react';
import { BrowserRouter, Routes, Route,useLocation } from 'react-router-dom';
import TestReport from './screen/TestReport';
import AddTest from './screen/AddTest';
import EditTest from './screen/EditTest';
import UsersReport from './screen/UsersReport';
import AddUer from './screen/AddUser';
import EditUser from './screen/EditUser';
import Login from './screen/Login';


const Navigation = (props) => {
  return(
  <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} exact />
            <Route path="/test" element={<TestReport />} exact />
            <Route path="/AddTest" element={<AddTest />} exact />
            <Route path="/EditTest/:id" element={<EditTest />} exact />
            <Route path="/user" element={<UsersReport />} exact />
            <Route path="/AddUser" element={<AddUer />} exact />
            <Route path="/EditUser/:id" element={<EditUser />} exact />
          </Routes>
  </BrowserRouter>
 );
}
export default Navigation;
