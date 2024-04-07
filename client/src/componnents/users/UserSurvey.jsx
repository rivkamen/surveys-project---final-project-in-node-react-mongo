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
const UserSurvey=(props)=>{
    const {setVisible,visible,refetch,survey}=props
   // let {type}=props
   // const [ed,setEd]=useState(false)
   let [select,setSelect]=useState(survey.questions.map(q=>{return{_id:q._id,select:q.select}}))


 const [countFunc, {isError1, error1, isSuccess1,data1}] = useCountSurveyMutation()
// var [visible, setVisible] = useState(true);
// const [updateFunc, {isError2, error2, isSuccess2,data2}] = useUpdateSurveyMutation()
const count=()=>{
    countFunc({_id:survey._id}).then(()=>refetch())
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
        
       
       

        {survey?.questions.map(q=><UserQuestion select={select} setSelect={setSelect} refetch={refetch} question={q} survey={survey}/>)}

        <Button onClick={()=>{
            count(); chooseSegment();setVisible(false)
            
        }} icon="pi pi-save" rounded /> 
       

        </>
    )
}
export default UserSurvey

/*

*/