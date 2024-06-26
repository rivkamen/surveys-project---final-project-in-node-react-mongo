import { Button } from "primereact/button"
import { useRef, useState } from "react"
import { useAddQuestionMutation } from "../questions/questApiSlice"
import QuestionDialog from "../questions/QuestionDialog"
import Question from "../questions/Question"
import { useAddSurveyMutation, useStatusSurveyMutation, useUpdateSurveyMutation } from "./surveysApiSlice"
import { Dialog } from "primereact/dialog"
import { Inplace, InplaceContent, InplaceDisplay } from "primereact/inplace"
import { InputText } from "primereact/inputtext"
import { Dropdown } from 'primereact/dropdown';
import { StyleClass } from "primereact/styleclass"
import { Slider } from "primereact/slider"

const Survey=(props)=>{
    const {visible1,setVisible1,refetch,survey}=props
    const [ed,setEd]=useState(false)
    const [selectedSex, setSelectedSex] = useState({name:survey.sex,code:''});
    const [selectedSector, setSelectedSector] = useState({name:survey.sector,code:''});
    const [selectedAge, setSelectedAge] = useState({name:survey.age,code:''});
    const [selectedBirthDate, setSelectedBirthDate] = useState(Date);
const title=useRef(survey.title)
const [text,setText]=useState(survey.title)
let [questions,setQuestions]=useState(survey.questions.map(q=>{return{_id:q._id,body:q.body,createdAt:q.createdAt,answers:q.answers.map(a=>{return{_id:a._id,body:a.body,createdAt:a.createdAt}})}}));
let [newQuestions,setNewQuestions]=useState([]);

console.log(questions);
const [updateFunc, {isError2, error2, isSuccess2,data2}] = useUpdateSurveyMutation()
const edit = async (e) => {
    // setEd(true)
    console.log("editSurvey");
        //e.preventDefault();
        
    // await newQuestions.forEach(q=>{console.log("**************************"+q.body);addQuestionFunc({_id:survey._id,body:q.body,answers:q.answers})})
    await updateFunc({_id:survey._id,title:title.current.value,sex:selectedSex.name,sector:selectedSector.name,age:ages,questions:questions,newQuestions:newQuestions}).then(refetch());
    // type='edit'
};
    
   const [addQuestionFunc,{isError3,error3,isSuccess3,data3}]=useAddQuestionMutation()
   
       const addQuestion=()=>{
            //  addQuestionFunc({_id:survey._id,body:'enter question'}).then(()=>refetch())
            setQuestions([...questions,{_id:null,body:"enter a question",createdAt:null,answers:[{_id:null,body:"enter an answer", createdAt:null}]}])
          //  <Question question={questions} /*survey={surveyQuestion.data} */ refetch={refetch}/>
            // await addQuestionFunc({_id:survey.data._id,body:'enter question'}).then(()=>refetch())
            // console.log(survey?.data?.questions);
            // setQuest(true)
        
     }
    // const [editt,setEditt]=useState(false)
    const [changeStatusFunc, {isError, error, isSuccess,data}] =useStatusSurveyMutation()
    const changestatus = (e) => {
      // e.preventDefault();
       changeStatusFunc({_id:survey._id,status:"in process"}).then(refetch())
    }

    const toggleBtnRef = useRef(null);
    let [icon,setIcon] =useState('pi pi-save')
    const changeIcon=()=>{
        icon==='pi pi-save'?setIcon('pi pi-send'):setIcon('pi pi-save')
    }
    const d=new Date()
   


    const sex = [
        { name: 'לא מוגבל', code: '0' },
        { name: 'זכר', code: '1' },
        { name: 'נקבה', code: '2' }
    ];
    const sector = [       
         { name: 'לא מוגבל', code: '16' },
        { name: "דתי לאומי", code: '11' },
        { name: 'חרדי', code: '12' },
        { name: 'חילוני', code: '13' },
        { name: "לא משתייך", code: '14' },
        { name: 'מסורתי', code: '15' }

    ];

const[ages,setAges]=useState(survey.age);
    const selectedCountryTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code}`} style={{ width: '18px' }} />
                    <div>{option.name}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const countryOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code}`} style={{ width: '18px' }} />
                <div>{option.name}</div>
            </div>
        );
    };
    return(
        <>
        
        <div className="card" >

        <div>
            {/* <StyleClass nodeRef={toggleBtnRef} selector="@next" toggleClassName="p-disabled" />
            <Button ref={toggleBtnRef} icon={icon} onClick={()=>{changeIcon();edit()}}/>&nbsp;&nbsp; */}
            <InputText ref={title}onChange={(e)=>setText(e.value)} defaultValue={title.current}/>
        </div>
            {/* <div>
            <Inplace style={{bottom:'90%', fontFamily:'monospace'}} closable closeIcon={'pi pi-save'} onClose={()=>{type=='add'?add():edit()}}>
                <InplaceDisplay >{title.current.value || "Click to edit"}</InplaceDisplay>
                <InplaceContent>
                    <InputText  placeholder={survey.title} value={text} ref={title} onChange={(e) => setText(e.target.value) }/>
                </InplaceContent>
            </Inplace></div> */}
       </div>
       <div className="card flex justify-content-center">
            <Dropdown value={selectedSex} onChange={(e) => setSelectedSex(e.value)} options={sex} optionLabel="name" placeholder={selectedSex.name||"Select a sex" }
                filter valueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate} className="w-full md:w-14rem" />
        </div>  
        {/* <div className="card flex justify-content-center">
            <Dropdown value={selectedAge} onChange={async(e) => {setSelectedAge(e.value);await d.setFullYear(d.getFullYear()-(e.value.code));await setSelectedBirthDate(d); console.log(d)}} options={age} optionLabel="name" placeholder="Select a age" 
                filter valueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate} className="w-full md:w-14rem" />
        </div>  */}
        <div className="card flex justify-content-center">
            <div className="w-14rem">
                <label>Select an ages range</label>
                <InputText value={ages} onChange={(e) => setAges(e.target.value)} className="w-full" disabled/>
                <Slider value={ages} onChange={(e) => setAges(e.value)} className="w-14rem" range step={10}min={0}max={120}/>
            </div>
        </div>
        <div className="card flex justify-content-center">
            <Dropdown value={selectedSector} onChange={(e) => setSelectedSector(e.value)} options={sector} optionLabel="name" placeholder={selectedSector.name||"Select a sector" }
                filter valueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate} className="w-full md:w-14rem" />
        </div>   
       
        {/* questions?.map((q,i)=><Question question={q} questions={questions} index={i} refetch={refetch}/>) */}
        {questions?.map((q,i)=><Question setQuestions={setQuestions} refetch={refetch} questions={questions} question={q} survey={survey} index={i}/>)}
        {newQuestions?.map((q,i)=><Question setNewQuestions={setNewQuestions} refetch={refetch} questions={newQuestions} question={q} survey={survey} index={i}/>)}
        <Button onClick={()=>{changestatus();setVisible1(false)}} icon="pi pi-send" rounded />
        <Button onClick={()=>{addQuestion(true)}} icon="pi pi-plus" rounded /> 
        <Button onClick={()=>{edit();setVisible1(false)}} icon="pi pi-save" rounded /> 
        {/* {editt && <QuestionDialog survey={survey}/>} */}
       

        </>
    )
}
export default Survey

/*       

*/