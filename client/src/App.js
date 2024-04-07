import logo from './logo.svg';
import './App.css';
import Start from './componnents/Start'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
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

function App() {

  const{
    data:myUser,
    isLoading:userIsLoading,
    isError:userIsError,
    error:userError,
    isSuccess:userIsSuccess,
    refetch:userRefetch
    } = useGetUserQuery({id:''})
    console.log(myUser);
  return (
    <>
      <div style={{position:'sticky', top:'10'}}>
        {/* <Orders /> */}
        
        <BaseNavBar/>
         </div>
        {/* <AdminAppBar/> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/Surveys' element={<Surveys />} />
          <Route path='/login' element={<Start />} />
          <Route path='/NavBar' element={<NavBar/>} />
          <Route path='/BaseNavBar' element={<BaseNavBar/>} />

          <Route path='/UserSurveys' element={<UserSurveys myUser={myUser}/*sex={myUser.sex} sector={myUser.sector} birthDate={myUser.birthDate}*//>} />
          <Route path='/surveySegmentation' element={<SegmentSurveys />} />
          <Route path='/segments' element={<Segments />} />
          <Route path='/UsersNavBar' element={<UsersNavBar myUser={myUser}/>} />
          <Route path='/we' element={<About myUser={myUser}/>} />



          {/* <Route path='/view' element={<BasicDemo />} />
          <Route path='/PreviousOrders' element={<PreviousOrders />} />
          <Route path='/adminAppBar' element={<AdminAppBar/>}/>
          <Route path='/orders' element={<Orders/>}/>
          <Route path='/adminAppBar' element={<AdminAppBar/>} />
          <Route path='/viewAdmin' element={<ViewAdmin/>} /> */}
        </Routes>

     

    </>
  );
}

export default App;
