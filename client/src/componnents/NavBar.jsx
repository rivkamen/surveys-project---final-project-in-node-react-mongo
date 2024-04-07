import React from 'react'; 
import { TabMenu } from 'primereact/tabmenu';

const NavBar=()=> {
    const items = [
        { label: 'home', icon: 'pi pi-home',url:'/' },
        { label: 'login', icon: 'pi pi-check-circle',url:'/login' },
        { label: 'userSurveys', icon: 'pi pi-list',url:'UserSurveys' },
        { label: 'surveys', icon: 'pi pi-inbox',url:'/Surveys' },
        { label: 'surveys segmentation', icon: 'pi pi-inbox',url:'/surveySegmentation' },
        { label: 'segmented', icon: 'pi pi-inbox',url:'/segments' }
    ];

    return (
        <div className="card" style={{position:"fixed"}}>
            <TabMenu model={items} />
        </div>
    )
}
         

export default NavBar