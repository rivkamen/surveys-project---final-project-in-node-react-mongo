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

const Survey=(props)=>{
    const {visible1,setVisible1,refetch,survey}=props
    let {type}=props
    const [ed,setEd]=useState(false)
    const [selectedSex, setSelectedSex] = useState({name:null,code:''});
    const [selectedSector, setSelectedSector] = useState({name:null,code:''});
    const [selectedAge, setSelectedAge] = useState({name:null,code:''});
    const [selectedBirthDate, setSelectedBirthDate] = useState(Date);
const title=useRef(survey.title)
const [text,setText]=useState(survey.title)

const [updateFunc, {isError2, error2, isSuccess2,data2}] = useUpdateSurveyMutation()
const edit = async (e) => {
    // setEd(true)
    console.log("editSurvey");
        //e.preventDefault();
    await updateFunc({_id:survey._id,title:title.current.value,sex:selectedSex.name,sector:selectedSector.name,birthDate:selectedBirthDate}).then(refetch());
    // type='edit'
};
    

   const [addQuestionFunc,{isError3,error3,isSuccess3,data3}]=useAddQuestionMutation()
   
       const addQuestion=()=>{
        addQuestionFunc({_id:survey._id,body:'enter question'}).then(()=>refetch())
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
        { name: 'זכר', code: '1' },
        { name: 'נקבה', code: '2' }
    ];
    const sector = [
        { name: "דתי לאומי", code: '11' },
        { name: 'חרדי', code: '12' },
        { name: 'חילוני', code: '13' },
        { name: "לא משתייך", code: '14' },
        { name: 'מסורתי', code: '15' }

    ];
    const age = [
        { name: "0-10", code: 10 },
        { name: '10-20', code: 20 },
        { name: "20-30", code: 30 },
        { name: '30-40', code: 40 },
        { name: "40-50", code: 50 },
        { name: '50-60', code: 60 },
        { name: "60-70", code: 70 },
        { name: '70-80', code: 80 },
        { name: "80-90", code: 90 },
        { name: '90-100', code: 100 },
        { name: "100-120", code: 120 }
        ];

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
            <StyleClass nodeRef={toggleBtnRef} selector="@next" toggleClassName="p-disabled" />
            <Button ref={toggleBtnRef} icon={icon} onClick={()=>{changeIcon();edit()}}/>&nbsp;&nbsp;
            <InputText ref={title}onChange={(e)=>setText(e.value)} defaultValue={title.current.value}/>
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
            <Dropdown value={selectedSex} onChange={(e) => setSelectedSex(e.value)} options={sex} optionLabel="name" placeholder="Select a sex" 
                filter valueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate} className="w-full md:w-14rem" />
        </div>  
        <div className="card flex justify-content-center">
            <Dropdown value={selectedAge} onChange={async(e) => {setSelectedAge(e.value);await d.setFullYear(d.getFullYear()-(e.value.code));await setSelectedBirthDate(d); console.log(d)}} options={age} optionLabel="name" placeholder="Select a age" 
                filter valueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate} className="w-full md:w-14rem" />
        </div> 
        <div className="card flex justify-content-center">
            <Dropdown value={selectedSector} onChange={(e) => setSelectedSector(e.value)} options={sector} optionLabel="name" placeholder="Select a sector" 
                filter valueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate} className="w-full md:w-14rem" />
        </div>   
       

        {survey?.questions.map(q=><Question refetch={refetch} question={q} survey={survey}/>)}
        <Button onClick={()=>{changestatus();setVisible1(false)}} icon="pi pi-send" rounded />

        <Button onClick={()=>{addQuestion(true)}} icon="pi pi-plus" rounded /> 
        <Button onClick={()=>{edit()}} icon="pi pi-save" rounded /> 
        {/* {editt && <QuestionDialog survey={survey}/>} */}
       

        </>
    )
}
export default Survey

/*

import React, { useState } from "react";

export default function FilterDemo() {
    

    return (
        
    )
}
        

*/