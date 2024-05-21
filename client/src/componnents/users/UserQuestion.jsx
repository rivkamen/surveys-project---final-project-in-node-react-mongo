

import React, { useRef, useState } from 'react';

import { InputText } from 'primereact/inputtext';

import UserAnswer from './UserAnswer';
import { RadioButton } from 'primereact/radiobutton';
import { Card } from 'primereact/card';


const UserQuestion=(props)=> {
const {select,setSelect,refetch,question,survey}=props
const index=select.indexOf(select.find(q=>q._id==question._id))
const [selectedCategory, setSelectedCategory] =  useState(select[index].select);


let bodyAnswers=question.answers.map(a=>{return {key:a._id,name:a.body}});
console.log(question.answers);
console.log(bodyAnswers[0].key);


const categories = bodyAnswers
    return (
        // <div className="card">
           
        //       <div className="flex flex-wrap gap-3">
        //     <h3>{question.body} </h3>
        // </div>
           
               
                   
        //              {categories.map((category) => {
        //             return ( 
        //             <span classclassName="p-input-icon-left">
           
        //             <Card>
                     
        //               <div  key={category.key} dir='rtl'  className="flex align-items-center" style={{ position: 'sticky', top: 200,fontFamily:'Yehuda CLM'}}>

        //                 {console.log('cccccccc'+category.key)}
        //                     <RadioButton inputId={category.key} name="category" value={category.key} onChange={(e) =>{select[index].select=e.value; setSelectedCategory(e.value.checked);setSelect(select)}} checked={selectedCategory===category.key}/>
        //                     <label htmlFor={category.key} className="ml-2">{category.name}</label>
        //                 </div></Card>
              
       
                   
        //        </span>
                        
        //             );
        //         })}
           
        // </div>


        <div className="card">  
              <div className="card flex justify-content-center">
            <h3>{question.body} </h3>
        </div>
           
        {categories.map((category) => {
                    return (
                        <span classclassName="p-input-icon-left">  
                            <Card>
                                <div key={category.key} className="flex align-items-center">
                                        <RadioButton inputId={category.key} name="category" value={category.key} onChange={(e) =>{select[index].select=e.value;setSelect(select);setSelectedCategory(e.value);console.log(selectedCategory);}} 
                                        checked={selectedCategory=== category.key} />
                                        <label htmlFor={category.key} className="ml-2">{category.name}</label>
                                </div>
                            </Card>
                        </span>               
                    );
                })}
                  </div>
    )
}
export default UserQuestion



        


