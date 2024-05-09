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
const d = new Date(myUser?.birthDate);
const y1=d.getFullYear()
const y2=new Date().getFullYear()
const age=(y2-y1)
// console.log(Date.now()-myUser?.birthDate,'333333333333333333');
console.log(`${y1} & ${y2} & ${age} &${myUser?.birthDate}`);
filteredSurveys=surveys?.filter(s=>s.sex==myUser?.sex || s.sex=='לא מוגבל' && s.sector==myUser.sector || s.sector=='לא מוגבל' && s.age[0]<=age&&s.age[1]>=age||s.age=='')
//filteredSurveys=surveys?.filter(s=>s.sex==myUser.sex || s.sex==''||s.sex==undefined && s.sector==myUser.sector || s.sector=='' ||s.sector==undefined && s.birthDate>=myUser.birthDate||s.birthDate=='' || s.birthDate==undefined)
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


