import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Dropdown } from 'primereact/dropdown';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { ScrollTop } from 'primereact/scrolltop';

//import { surveyService } from './service/surveyService';
import { useEffect, useState } from 'react';
    import { useGetSurveysQuery } from './surveysApiSlice';
import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';
import SurveyDialog from './SurveyDialog';
import DeleteDialog from './DeleteDialog';
import Survey from './Survey';
import { Dialog } from 'primereact/dialog';
import AddSurvey from './AddSurvey';
import { Inplace, InplaceContent, InplaceDisplay } from 'primereact/inplace';
import { InputText } from 'primereact/inputtext';
import SurveyItem from './SurveyItem';
const Surveys=()=>{
const {
data:surveys,
isLoading,
isError,
error,
refetch
} = useGetSurveysQuery({status:'',sector:'',sex:'',birthDate:''})
const [currentSurvey,setCurrentSurvey]=useState('')
const [edit,setEdit]=useState(false)
const [add,setAdd]=useState(false)
const [survey,setSurvey]=useState(false)
const [visible,setVisible]=useState(false)
const [visible1,setVisible1]=useState(false)


const [del,setDel]=useState(false)
const [status,setStatus]=useState(false)


    const [data,setData]=useState(surveys)
    const [sortKey, setSortKey] = useState('');
    const [sortOrder, setSortOrder] = useState(0);
    const [sortField, setSortField] = useState('');
    const sortOptions = [
        { label: 'Price High to Low', value: '!price' },
        { label: 'Price Low to High', value: 'price' }
    ];

    // useEffect(() => {
    //    // surveyService.getsurveysSmall().then((data) => setsurveys(data.slice(0, 5)));
    // }, []);

    const getIcon = (survey) => {
        switch (survey.status) {
            case 'creating':
                return 'pi pi-wrench';

            case 'in process':
                return 'pi pi-lock-open';

            case 'closed':
                return 'pi pi-lock';

            case 'completed':
                return 'pi pi-chart-line';
    
            default:
                return null;
        }
    };
    const getColor = (survey) => {
        switch (survey.status) {
            case 'creating':
                return '#30ee60';

            case 'in process':
                return '#dd50cc';

            case 'closed':
                return '#ee3333';

            case 'completed':
                return '#35ffee';
    
            default:
                return null;
        }
    };


    const onSortChange = (event) => {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            setSortOrder(-1);
            setSortField(value.substring(1, value.length));
            setSortKey(value);
        } else {
            setSortOrder(1);
            setSortField(value);
            setSortKey(value);
        }
    };
    let i = 1
    const header = () => {

        return <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By Price" onChange={onSortChange} className="w-full sm:w-14rem" />;
    };

    const itemTemplate = (survey, index) => {
        return ( 
            
            <div className="col-12" key={survey.id}>
               
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    {/* <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`https://primefaces.org/cdn/primereact/images/survey/${survey.image}`} alt={survey.name} /> */}
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{survey.title}</div>
                           
                            {/* <Rating value={survey.rating} readOnly cancel={false}></Rating> */}
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <span className="font-semibold">{survey.category}</span> 
                                    <Avatar icon={getIcon(survey)} className="mr-2" size="large" style={{color:getColor(survey)}} shape="circle" />


                                </span>
                               
                               

                            </div>
                        </div>
                        <div className="flex-auto">
                                    
                                    <Avatar className="p-overlay-badge" icon="pi pi-user" size="large" shape="circle">
                                        <Badge value={survey.count} size={'normal'} />
                                    </Avatar>
                                </div> 
                        <div className="flex align-items-center gap-3">
                        <Button icon="pi pi-chart-bar" className="p-button-rounded" style={{color:'#10bbbb', backgroundColor:'#e5e7eb'}}  disabled={survey.status != 'closed'}></Button>

                            <Button  onClick={()=>{setVisible(true); setCurrentSurvey(survey)}} icon="pi pi-file-edit" className="p-button-rounded"  style={{color:'#10bbbb', backgroundColor:'#e5e7eb'}}  disabled={survey.status != 'creating'}></Button>
                            <Button onClick={()=>{setDel(true);setCurrentSurvey(survey)}} icon="pi pi-times" className="p-button-rounded" style={{color:'#10bbbb', backgroundColor:'#e5e7eb'}}  disabled={survey.status === 'in process'}></Button>
                            <Button onClick={()=>{setStatus(true);setCurrentSurvey(survey)}} icon="pi pi-lock" className="p-button-rounded" style={{color:'#10bbbb', backgroundColor:'#e5e7eb'}}/*disabled={survey.status === 'in process'}*/></Button>


                        </div>
                        


                        {/* <Avatar className="p-overlay-badge" icon="pi pi-user" size="xlarge">
                         <Badge value="4" />
                         </Avatar> */}
                    </div>
                </div>
            </div>
        );
    };

    const listTemplate = (items) => {
        if (!items || items.length === 0) return null;

        let list = items.map((survey, index) => {
            return itemTemplate(survey, index);
        });
        
        return <div className="grid grid-nogutter">{list}</div>;
    };
    if (isLoading) return <h1>Loading</h1>
    if(isError) return <h2>{error}</h2>
    return (
        <div className="cardSurvey">
            {/* <div className="card flex flex-column align-items-center" style={{ height: '2000px' }}>
        </div> */}
            
            <Button  onClick={()=>{setVisible1(true); /*setCurrentSurvey(survey)*/}} icon="pi pi-plus" className="p-button-rounded"  style={{color:'#10bbbb', backgroundColor:'#e5e7eb'}}></Button>
            {surveys.map((s)=><SurveyItem refetch ={refetch} survey={s}/>)}
            
              <Dialog 
                visible={visible1} style={{ width: '50vw', height:'200vw' }} onHide={() => setVisible1(false)}>
        
                <p className="m-0">
                    <AddSurvey survey={{title:'', questions:[],answers:[]}} setVisible1={setVisible1} refetch={refetch} type={'add'}/>
                </p>
            </Dialog> 
            <ScrollTop />


            
        </div>
        
     
    )
}
export default Surveys


