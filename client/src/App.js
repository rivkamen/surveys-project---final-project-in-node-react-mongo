import logo from './logo.svg';
import './App.css';
import Start from './componnents/Start'
import { BrowserRouter, Route, Router, Routes, useNavigate } from 'react-router-dom';
import SurveyList from './componnents/surveys/Surveys';
import Surveys from './componnents/surveys/Surveys';
import SurveyDialog from './componnents/surveys/SurveyDialog';
import DeleteDialog from './componnents/surveys/DeleteDialog';
import Quest from './componnents/questions/Question';
import Survey from './componnents/surveys/Survey'
import HomePage from './componnents/HomePage';
import NavBar from './componnents/NavBar';
import UserSurveys from './componnents/users/UserSurveys';
import SegmentSurveys from './componnents/surveys/SegmentSurveys';
// import SegmentSurveys from './componnents/surveys/SegmentSurveys.jsx';
// import Segments from './componnents/users/Segments'
import Segments from './componnents/users/Segments'
import Diagram from './Diagram';
import UsersNavBar from './componnents/users/UsersNavBar';
import { useGetUserQuery } from './componnents/users/usersApiSlice';
import About from './About';
import BaseNavBar from './componnents/users/BaseNavBar';
import { Provider } from 'react-redux';
import store from './app/store'
import { useEffect, useState } from 'react';
import { setToken } from './app/features/auth/authSlice';
import { useDispatch } from 'react-redux';
import {useLoginMutation} from './app/features/auth/authApiSlice'
import Bar from './Bar';

function App() {
const [rol,setRol]=useState(0);
 const[loginSuccess,setLoginSuccess]=useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [loginFunc, {isError, error, isSuccess,data}] = useLoginMutation();
    const{
        data:myUser,
        isLoading:userIsLoading,
        isError:userIsError,
        error:userError,
        isSuccess:userIsSuccess,
        refetch:userRefetch
        } = useGetUserQuery({id:''})
    useEffect(()=>{
    if(isSuccess){
    dispatch(setToken(data))
         if(userIsSuccess)
         {
          setRol(myUser.roles)
         }
// // // <NavBar role={myUser.roles}/>}
//         myUser.roles=='admin'?navigate('/NavBar'):navigate('/UsersNavBar')}
    
//         navigate('/UsersNavBar')
//         {<UsersNavBar/>}
        setLoginSuccess(true)

 } },[isSuccess,userIsSuccess])


  return (
    <>
      <div style={{position:'sticky', top:'10'}}>
        {/* <Orders /> */}
      {/* <BaseNavBar/> */}
 {<Bar role={rol}/>}</div>
        {/* <AdminAppBar/> */}
  <Provider store={store}>
        
          <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/Surveys' element={<Surveys />} />
          <Route path='/login' element={<Start setRol={setRol}/>} />
          <Route path='/NavBar' element={<NavBar/>} />
          <Route path='/BaseNavBar' element={<BaseNavBar/>} />
          <Route path='/UserSurveys' element={<UserSurveys myUser={myUser}/*sex={myUser.sex} sector={myUser.sector} birthDate={myUser.birthDate}*//>} />
          <Route path='/surveySegmentation' element={<SegmentSurveys />} />
          <Route path='/segments' element={<Segments />} />
          <Route path='/UsersNavBar' element={<UsersNavBar myUser={myUser}/>} />
          <Route path='/we' element={<About myUser={myUser}/>} />
          </Routes>
         
</Provider>

          {/* <Route path='/view' element={<BasicDemo />} />
          <Route path='/PreviousOrders' element={<PreviousOrders />} />
          <Route path='/adminAppBar' element={<AdminAppBar/>}/>
          <Route path='/orders' element={<Orders/>}/>
          <Route path='/adminAppBar' element={<AdminAppBar/>} />
          <Route path='/viewAdmin' element={<ViewAdmin/>} /> */}
       

     
       
    </>
  );
}

export default App;
