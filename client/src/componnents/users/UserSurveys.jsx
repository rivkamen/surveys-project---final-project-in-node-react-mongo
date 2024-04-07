import { Button } from 'primereact/button';

import { ScrollTop } from 'primereact/scrolltop';
import { useEffect, useRef, useState } from 'react';
import { useGetSurveysQuery } from '../surveys/surveysApiSlice';

import UserSurvey from './UserSurvey';
import { Dialog } from 'primereact/dialog';

import SurveyItem from './UserSurveyItem';
import { useGetUserQuery } from './usersApiSlice';
const UserSurveys=(props)=>{
   
 
const status="in process";






 const{
    data:myUser,
    isLoading:userIsLoading,
    isError:userIsError,
    error:userError,
    isSuccess:userIsSuccess,
    refetch:userRefetch
    } = useGetUserQuery({id:''})
    console.log(myUser);
    
const{
data:surveys,
isLoading,
isError,
error,
isSuccess:survesIsSuccess,

refetch
} =  useGetSurveysQuery({status:status/*,sex:'',sector:'',birthDate:''*/})
let filteredSurveys

filteredSurveys=surveys?.filter(s=>s.sex==myUser.sex || s.sex==''||s.sex==undefined && s.sector==myUser.sector || s.sector=='' ||s.sector==undefined && s.birthDate>=myUser.birthDate||s.birthDate=='' || s.birthDate==undefined)
const [visible1,setVisible1]=useState(false)



    if (isLoading) return <h1>Loading</h1>
    if(isError) return <h2>{error}</h2>
    return (
        <div className="cardSurvey" >
           
            {filteredSurveys?.map((s)=><SurveyItem refetch ={refetch} survey={s}/>)}
            
               
            <ScrollTop />


            
        </div>
        
     
    )
}
export default UserSurveys


