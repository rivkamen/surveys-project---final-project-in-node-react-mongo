import React, { useState } from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { SplitButton } from 'primereact/splitbutton';
import { InputText } from 'primereact/inputtext';
import { Inplace, InplaceContent, InplaceDisplay } from 'primereact/inplace';
import {useDeleteAnswerMutation, useUpdateAnswerMutation} from './ansApiSlice'
const Answer=(props)=> {
    const {survey,question,answer,refetch}=props
    const [text, setText] = useState('');

    const [updateFunc, {isError1, error1, isSuccess1,data1}] = useUpdateAnswerMutation()
    var [visible, setVisible] = useState(true);

    const update = (e) => {
        console.log("abbddQuestion");
            //e.preventDefault();
            console.log(question._id);
            updateFunc({_id:survey._id,questionId:question._id,answerId:answer._id,body:text})};
    const [delFunc, {isError, error, isSuccess,data}] = useDeleteAnswerMutation()
    var [visible, setVisible] = useState(true);

    const delet = (e) => {
        console.log("aaaddQuestion");
            //e.preventDefault();
            console.log(question._id);
            delFunc({_id:survey._id,questionId:question._id,answerId:answer._id}).then(()=>refetch())};
    
    
    
    console.log("answer")
    const items = [
        {
            label: 'Update',
            icon: 'pi pi-refresh' 
        },
        {
            label: 'Delete',
            icon: 'pi pi-times' 
        }
    ];

    const startContent = (
        <React.Fragment>
        <Button icon="pi pi-trash" onClick={delet} rounded />
        </React.Fragment>
    );

    const centerContent = (
        <span classclassName="p-input-icon-left">
            {/* <i classclassName="pi pi-search" /> */}
            <div >
            <Inplace closable closeIcon='pi pi-save' onClose={update} rounded>
                <InplaceDisplay>{text || "Click to edit"}</InplaceDisplay>
                <InplaceContent>
                    <InputText placeholder={answer.body} value={text} onChange={(e) => setText(e.target.value)} />
                </InplaceContent>
            </Inplace></div>
       

            
        </span>
    );

    const endContent = (
        <React.Fragment>
            {/* <SplitButton label="Save" model={items} icon="pi pi-check" ></SplitButton> */}
        </React.Fragment>
    );

    return (
        <div className="card">
            <Toolbar start={startContent} center={centerContent} end={endContent} /> 
        </div>
    );
}
export default Answer