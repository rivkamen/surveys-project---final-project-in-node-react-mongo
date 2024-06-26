import React, { useState } from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { SplitButton } from 'primereact/splitbutton';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import { Steps } from 'primereact/steps';
import { Dialog } from 'primereact/dialog';
import Survey from './Survey';
import { Divider } from 'primereact/divider';
import DeleteDialog from './DeleteDialog';
import { useStatusSurveyMutation } from './surveysApiSlice';
import { Card } from 'primereact/card';
import DeleteDial from './DeleteDial';

const SurveyItem=(props)=> {
    const {survey,refetch}=props
    
   // console.log(survey.status);
   const [visible1,setVisible1]=useState(false)
    const [visible,setVisible]=useState(false)
    const [del,setDel]=useState(false)
    const status=["creating","in process","closed","completed"]
   // console.log(status.indexOf(survey.status));
    const [activeIndex, setActiveIndex] = useState(status.indexOf(survey.status));
    const [changeStatusFunc, {isError, error, isSuccess,data}] =useStatusSurveyMutation()
   const changestatus = (e) => {
    //    e.preventDefault();
       changeStatusFunc({_id:survey._id,status:"closed"}).then(refetch())
       };
    const itemRenderer = (item, itemIndex) => {
        const isActiveItem = activeIndex === itemIndex;
        const backgroundColor = isActiveItem ? 'var(--primary-color)' : 'var(--surface-b)';
        const textColor = isActiveItem ? 'var(--surface-b)' : 'var(--text-color-secondary)';

        return (
            
            <span
            className="inline-flex align-items-center justify-content-center align-items-center border-circle border-primary border-1 h-3rem w-3rem z-1 cursor-pointer"
            style={{ backgroundColor: backgroundColor, color: textColor, marginTop: '-25px' }}
        // onClick={() => setActiveIndex(itemIndex)}
        >
            <i className={`${item.icon} text-xl`} />
        </span>
        );
};

const items = [
    {
        icon: 'pi pi-wrench',
        template: (item) => itemRenderer(item, 0)
    },
    {
        icon: 'pi pi-lock-open',
       template: (item) => itemRenderer(item, 1)
    },
    {
        icon: 'pi pi-lock',
        template: (item) => itemRenderer(item, 2)
    },
    {
        icon: 'pi pi-chart-line',
        template: (item) => itemRenderer(item, 3)
    }

];

    const startContent = (
        <div  >
        <Steps model={items} activeIndex={activeIndex} readOnly={false} className="m-2 pt-4"
        />
    </div>
    );

    const centerContent = (
        <React.Fragment>
           
           <Avatar className="p-overlay-badge" icon="pi pi-user" size="large" shape="circle">
                          <Badge value={survey.count} size={'normal'}/>
                          </Avatar>
        </React.Fragment>



       
    );

    const endContent = (
        <React.Fragment>
            <div className="flex align-items-center gap-3">
                        <Button icon="pi pi-chart-bar" className="p-button-rounded" style={{color:'#10aaaa',backgroundColor:'#e5e7eb'}}disabled={survey.status != 'closed'}
                         ></Button>
                          <Button icon="pi pi-lock" className="p-button-rounded"style={{color:'#10aaaa',backgroundColor:'#e5e7eb'}} disabled={survey.status != 'in process'}
                        onClick={changestatus}></Button> 
                        <Button icon="pi pi-file-edit" className="p-button-rounded" style={{color:'#10aaaa',backgroundColor:'#e5e7eb'}}disabled={survey.status != 'creating'}
                        onClick={()=>{setVisible1(true)}}
                        ></Button>
                         {/* <Button icon="pi pi-times" className="p-button-rounded"style={{color:'#10aaaa',backgroundColor:'#e5e7eb'}} disabled={survey.status === 'in process'}
                        onClick={()=>{setDel(true)}}/*visible={del?false:true}></Button> */}
                        <Button icon="pi pi-times" className="p-button-rounded"style={{color:'#10aaaa',backgroundColor:'#e5e7eb'}} onClick={() => setVisible(true)} />
            </div>
            

        </React.Fragment>
    );
   
    return (<>
       
        <div className="card " >
        
            <Card style={{BlockSize:'250px'}}>
            <h1>{survey.title}</h1>
             {/* <Toolbar start={startContent} center={centerContent} end={endContent} />  */}
            {/* {startContent}
            {centerContent}
            {endContent} */}

<div className="card flex justify-content-center">
            <p style={{width:'30%'}}>
              {startContent}
            </p>
            <Divider layout="vertical" />
            <p style={{width:'30%'}}>
               {centerContent}
               
              
            </p>
            
            <Divider layout="vertical" />
            <p style={{width:'30%',marginRight:0}}>
               
                {endContent}
                 {visible && <DeleteDial visible={visible} setVisible={setVisible} refetch={refetch} survey={survey}/> }

            </p>
        </div></Card>
        </div>
     
         
        <Dialog 
            // header={survey.title} 
            visible={visible1} style={{ width: '50vw', height:'100vw' }} onHide={() => setVisible1(false)}>
            <p className="m-0">
            <Survey refetch={refetch} survey={survey} visible1={visible1} setVisible1={setVisible1}/>
            </p>
        </Dialog>
        {/* {del && <DeleteDialog refetch={refetch} survey={survey}/> } */}
       
        </>
    );
   
}
export default SurveyItem