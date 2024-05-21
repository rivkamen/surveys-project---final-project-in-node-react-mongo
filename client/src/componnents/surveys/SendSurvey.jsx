
import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useDeleteSurveyMutation, useStatusSurveyMutation } from "./surveysApiSlice";

const SendSurvey=(props)=>{
   const {setVisible,setVisibleS,visible,survey,refetch}=props

   const [deleteFunc, {isError, error, isSuccess,data}] =
   useDeleteSurveyMutation()
   const [changeStatusFunc, {isError:changeStatusIsError, error:changeStatusError, isSuccess:changeStatusIsSuccess,data:changeStatus}] =useStatusSurveyMutation()

   const changestatus = async (e) => {
    // await addSurveyFunc({title:title.current.value,sex:selectedSex.name,sector:selectedSector.name,age:ages,questions:questions}).then(()=>
   changeStatusFunc({_id:survey?.data?._id,status:"in process"}).then(()=>refetch())
   }
    const footerContent = (
        <div>
            <Button label="לא עכשיו" icon="pi pi-times" onClick={async() =>{ await setVisible(false);setVisibleS(false)}} className="p-button-text" />
            <Button label="שלח" icon="pi pi-check" onClick={async() => {setVisible(false); await changestatus(); setVisibleS(false) }} autoFocus />
        </div>
    );

    return (
        <div className="card flex justify-content-center">
            <Dialog visible={visible} style={{ width: '30vw' }} onHide={async() =>{ await setVisible(false);setVisibleS(false)}} footer={footerContent}>
                <p className="m-0" style={{textAlign:'center'}}>
                    ?מזל טוב!, סקר חדש נוסף! לשלוח את הסקר למשתמשים </p>
            </Dialog>
        </div>
    )
}
export default SendSurvey
        