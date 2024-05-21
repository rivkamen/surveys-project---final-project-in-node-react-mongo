import { Button } from "primereact/button"
import { useRef, useState } from "react"
// import { useAddQuestionMutation } from "../surveys/questions/questionApiSlice"
// import QuestionDialog from "../surveys//questions/QuestionDialog"
// import Question from "../surveys/questions/Question"
import { useAddSurveyMutation, useCountSurveyMutation, useChangeStatusMutation, useUpdateSurveyMutation } from "../surveys/surveysApiSlice"
// import { Dialog } from "primereact/dialog"
// import { Inplace, InplaceContent, InplaceDisplay } from "primereact/inplace"
// import { InputText } from "primereact/inputtext"
import UserQuestion from "./UserQuestion"
import { useChangeAnswerDataMutation } from "../answers/ansApiSlice"
import { useAddUserSurveyMutation } from "./usersApiSlice"
const UserSurvey=(props)=>{
    const {setVisible,visible,refetch,survey,user}=props
   // let {type}=props
   // const [ed,setEd]=useState(false)
   let [select,setSelect]=useState(survey.questions.map(q=>{return{_id:q._id,select:q.select}}))


 const [countFunc, {isError1, error1, isSuccess1,data1}] = useCountSurveyMutation()
 const [addUserSurveyFunc, {isErrorSU, errorSU, isSuccessSU}] = useAddUserSurveyMutation()

// var [visible, setVisible] = useState(true);
// const [updateFunc, {isError2, error2, isSuccess2,data2}] = useUpdateSurveyMutation()
const count=()=>{
    countFunc({_id:survey._id}).then(()=>refetch())
}
const addSurveyForUser=()=>{
    addUserSurveyFunc({_id:user._id,survey:survey})
}

const [ChangeAnswerDataFunc, {isError, error, isSuccess,data}] =useChangeAnswerDataMutation()
const chooseSegment = (e) => {
    // e.preventDefault();
    if(select){
     select.map(q=>ChangeAnswerDataFunc({_id:survey._id,questionId:q._id,answerId:select[select.indexOf(select.find(i=>i._id==q._id))].select}).then(()=>refetch()))}
     else{
        console.log('no select');
     }
};

    return(
        <>
        
       
       
        <div style={{ display: 'flex',flexDirection: 'column', minHeight: '70vh' }}>
      {/* <h1> </h1> */}
      <div style={{ flex: 1 }}> {/* This creates space to push the footer to the bottom */}
     
    
</div>

       <div dir='rtl' style={{ position: 'sticky', top: 200, fontSize:'20px',fontFamily:'Yehuda CLM'}}>
       <div style={{fontSize:'30px',fontFamily:'Yehuda CLM', textAlign:'center'}}>{survey.title}</div>
        {survey?.questions.map(q=><UserQuestion select={select} setSelect={setSelect} refetch={refetch} question={q} survey={survey}/>)}

</div>
      
       </div>  <footer style={{ textAlign: 'center',  padding: '10px' }}>
        <p> <Button onClick={()=>{
            addSurveyForUser();count(); chooseSegment();setVisible(false)
            
        }} label='&nbsp;שמור' icon="pi pi-save"  /> </p>
      </footer>
      

        </>
    )
}
export default UserSurvey

/*

*/