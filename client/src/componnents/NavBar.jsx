import React from 'react'; 
import { TabMenu } from 'primereact/tabmenu';
import { Menubar } from 'primereact/menubar';
import {useNavigate} from "react-router-dom"
// import useAuth from "./auth/useAuth";
import { useState } from "react"
const NavBar=(props)=> {
     const permission='admin'
     let items=[];
     if(permission==='admin'){
    items = [
        { label: 'home', icon: 'pi pi-home',url:'/' },
        { label: 'login', icon: 'pi pi-check-circle',url:'/login' },
        { label: 'userSurveys', icon: 'pi pi-list',url:'UserSurveys' },
        { label: 'surveys', icon: 'pi pi-inbox',url:'/Surveys' },
        { label: 'surveys segmentation', icon: 'pi pi-inbox',url:'/surveySegmentation' },
        { label: 'segmented', icon: 'pi pi-inbox',url:'/segments' }
    ]}
    else{
        if(permission==='user'){
       items = [
            { label: 'home', icon: 'pi pi-home',url:'/' },
            { label: 'userSurveys', icon: 'pi pi-list',url:'UserSurveys' },
            { label: 'segmented', icon: 'pi pi-inbox',url:'/segments' }

    ]} else{
        items = [
            { label: 'כניסה', icon: 'pi pi-check-circle',url:'/login' },
            { label: 'סקר', icon: 'pi pi-home',url:'/' },
            { label: '?מי אנחנו', icon: 'pi pi-inbox',url:'/we' }

    ]
    }
    }
   
    // const navigate=useNavigate()

    // const home = () => {
    //     console.log("!!!!!!");
    //     if(localStorage.getItem("user")) {
    //         navigate(`/myAccount`)
    //     }
    //     navigate(`/auth`)
    // }

    // const barArr = [
    //     {
    //         label:"home", 
    //         command: ()=>{navigate(`/home`)}
    //     },
    //     {
    //         label:"login", 
    //         command: ()=>{navigate(`/login`)}
    //     },
    //     {
    //         label:"השתתפות בסקר", 
    //         command: ()=>{navigate(`'UserSurveys'`)}
    //     },
    //     {
    //         label:"", 
    //         command: ()=>{navigate(`/orders`)}
    //     },


    // ]
    // const barArrChef=[...barArr,
    //     {
    //         label:"my product", 
    //         command: ()=>{navigate(`/table`)}
    //     }, 
    // ]

    return (
        <div className="card" style={{position:"fixed"}}>
            <TabMenu model={items} />
        </div>
    )
}
         

export default NavBar

/*import React from "react";
import { Menubar } from 'primereact/menubar';
import {useNavigate} from "react-router-dom"
import useAuth from "./auth/useAuth";
import { useState } from "react";



const NavBar = () => {
    const {role}=useAuth()
    )
     
    

    const navigate=useNavigate()

    const myAccount = () => {
        console.log("!!!!!!");
        if(localStorage.getItem("user")) {
            navigate(`/myAccount`)
        }
        navigate(`/auth`)
    }

    const barArr = [
        {
            label:"my account", 
            command: myAccount
        },
        {
            label:"products", 
            command: ()=>{navigate(`/countries`)}
        },
        {
            label:"my basket", 
            command: ()=>{navigate(`/basket`)}
        },
        {
            label:"orders", 
            command: ()=>{navigate(`/orders`)}
        },


    ]
    const barArrChef=[...barArr,
        {
            label:"my product", 
            command: ()=>{navigate(`/table`)}
        }, 
    ]*/