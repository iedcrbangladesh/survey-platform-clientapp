"use client";
import { ReactNode, useEffect, useState, useCallback } from 'react';
import {Formik, Form, yupToFormErrors, validateYupSchema, useFormikContext} from 'formik';
import { useRouter, usePathname } from "next/navigation";
import axios from 'axios';

import Header from '@/app/components/Header';
import Sidebar from '@/app/components/Sidebar';
import useAuth from '@/app/hooks/useAuth';
import SectionLink from '@/app/components/SectionLink';


const url = process.env.api_url;

import CatincdSchema from '@/app/utils/CatincdSchema';
import sectionLink from "@/app/json/sectionlink.json";


interface CatincdLayoutProps {
  children: ReactNode;
}

const FormObserver =() => {
  const { values }:any = useFormikContext();
  const pathname = usePathname();
  const authCtx = useAuth();
  useEffect(() => {
    //console.log("FormObserver::values", values);
    if(typeof window !== 'undefined'){
      
      if(authCtx.activeContactId!=null){
        localStorage.setItem('data',JSON.stringify(values));
      }


      const eligibility_timeselection_url = '2eligibility_timeselection';
      
      if(pathname.slice(-eligibility_timeselection_url.length) == eligibility_timeselection_url){

        let boundary:any = localStorage.getItem('boundary');
        
        
        const gender = values.eligibility_timeselection.gender?.value;
        const age = values.eligibility_timeselection.age?.value;
        const city_or_village = values.eligibility_timeselection.city_or_village?.value;
        const area_code = values.eligibility_timeselection.district.parent;
        const education = values.eligibility_timeselection.education?.value;
        //gender
        let gender_string = 'male';
        if(gender > 1){
          gender_string = 'female';
        }
        //education
        let education_string = 'no_education'
        if(education > 1){
        
          if([2,3].includes(education)){
            education_string = 'primary'
          }
          if([4,5,6,7].includes(education)){
            education_string = 'primary_up'
          }
        }
        //city or village
        let city_or_village_string = 'urban';
        if(city_or_village > 1){
          city_or_village_string = 'rural'
        }
        if(boundary != null){
          
          boundary = JSON.parse(boundary);
          
          const selected_boundary:any =  boundary.filter((el:any)=>{
             return( 
            (el.area_code == area_code) 
              && ( age>=el.age_start && age<=el.age_end )
              && (el.urban_rural == city_or_village_string) 
              && (el.education_group == education_string)
              && (el.gender == gender_string)) && (el.target <(el.done+1)) && el;
          })
          
          if(selected_boundary.length > 0){
            authCtx.boundaryReached = selected_boundary[0]
            authCtx.setBoundaryReached(JSON.stringify(selected_boundary[0]))
            
          }else{

            axios.post(`${url}boundary_check`, 
            
              values, 
            {    
              headers: {
                'Content-Type': 'application/json'
              }
            }
            ) .then(function (response:any) {

                if(response.data.boundary!=null){
                  authCtx.boundaryReached = response.data.boundary
                  authCtx.setBoundaryReached(JSON.stringify(response.data.boundary))

                }else{

                  authCtx.boundaryReached = null;
                  authCtx.setBoundaryReached(null);
                  localStorage.removeItem('boundaryReached');

                }
            });
                        
            
          }
        }

      }
      

      
    }
  }, [values,pathname,authCtx]);

  return null;
};

const CatincdLayout = ({ children }: CatincdLayoutProps) => {
  const router = useRouter();  
  const authCtx = useAuth();
  const userid = authCtx.userId;
  const mobileNumber = authCtx.activeMobileNumber;
  const contactId = authCtx.activeContactId;
  let boundary_reached = authCtx.boundaryReached;


  const [sidebarOpen, setSidebarOpen] = useState(false);
  

  const fetchBounday = useCallback(async()=>{
    const {data} = await axios.get(`${url}boundary`);
    if(typeof window !== 'undefined'){
      localStorage.setItem('boundary',JSON.stringify(data.boundary))
    }
  },[])

  useEffect(()=>{
        fetchBounday() 
          
  },[fetchBounday])

  let Catincd ={
    introduction_permission:{
interviewer_permission:{value:'',label:''},
denied_reason:[],
},
eligibility_timeselection:{
gender:{value:'',label:''},
age:{value:'',label:''},
city_or_village:{value:'',label:''},
district:{value:'',label:'',parent:''},
city_corporation:{value:'',label:'',parent:''},
municipal:{value:'',label:'',parent:''},
upazilla:{value:'',label:'',parent:''},
education:{value:'',label:''},
name_of_person:{text:'',reason:{value:'',label:''}},
},
demographic_information:{
religion:{value:'',label:''},
marital_status:{value:'',label:''},
occupation:{value:'',label:''},
current_location:{value:'',label:''},
man_women_count:{man:'',women:''},
have_electricity:{value:'',label:''},
have_flash_toilet:{value:'',label:''},
have_landline_phone:{value:'',label:''},
have_mobile_phone:{value:'',label:''},
have_television:{value:'',label:''},
have_refrigerator:{value:'',label:''},
have_washing_machine:{value:'',label:''},
have_computer_or_laptop:{value:'',label:''},
have_bycycle:{value:'',label:''},
have_rickshaw:{value:'',label:''},
have_private_car:{value:'',label:''},
have_moped_scooter_bike_autorickhshaw:{value:'',label:''},
},
food_habits:{
fruits_consumption:{value:'',label:''},
fruits_consumption_quantity:{value:'',label:''},
vegatables_consumption:{value:'',label:''},
vegatables_consumption_amount:{salad:'',cooked_vegatables:'',total:''},
salt_consumption:{value:'',label:''},
salt_consumption_extra:{value:'',label:''},
salt_consumption_mixed:{value:'',label:''},
salt_consumption_frequency:{value:'',label:''},
},
relax_information:{
relax:{hour:'', minute:''},
},
physical_status:{
blood_pressure_measured:{value:'',label:''},
blood_pressure_medicare_location:[],
blood_pressure_notify:{value:'',label:''},
blood_pressure_medicare_taken:{value:'',label:''},
blood_sugar_diabetics_measured:{value:'',label:''},
diabetic_medicare_location:[],
blood_sugar_diabetics_notify:{value:'',label:''},
diabetic_medicine_taken:{value:'',label:''},
},
smoking_related:{
smoking_habit:{value:'',label:''},
smoking_habit_reguler:{value:'',label:''},
smoking_habit_previous:{value:'',label:''},
non_smoking_habit:{value:'',label:''},
non_smoking_habit_reguler:{value:'',label:''},
non_smoking_habit_previous:{value:'',label:''},
},
drinking_related:{
alchohol_usage:{value:'',label:''},
alchohol_usage_frequency:{value:'',label:''},
thirty_days_alchohol_usage:{value:'',label:''},
},

  };

  
  const fetchCatincdData = useCallback(async()=>{
    const response = await axios.get(`${url}get-question/${contactId}`);
      
    if(typeof window !== 'undefined'){
      if(response.data.data!=null){
        localStorage.setItem('data',JSON.stringify(response.data.data));
      }
      if(response.data.last_section!=null){
        localStorage.setItem('last_section',response.data.last_section)
      }
      if(response.data.schedule_count!=null){
        localStorage.setItem('schedule_count',response.data.schedule_count)
      }
      
      if(response.data.snowball!=null){        
        localStorage.setItem('snowball',JSON.stringify(response.data.snowball))
      }

      if(response.data.snowball_count!=null){        
        localStorage.setItem('snowball_count',response.data.snowball_count)
      }
      
    }


  },[contactId]);

  useEffect(()=>{
    fetchCatincdData();      
  },[fetchCatincdData]);

  let previous_data = typeof window !== 'undefined'?localStorage.getItem('data'):null;
  let snowball_data = typeof window !== 'undefined'?localStorage.getItem('snowball'):null;

  if(previous_data!=null && snowball_data == null && typeof window !== 'undefined'){
    //console.log(JSON.parse(previous_data))
    Catincd = JSON.parse(previous_data)
  }

  const handleFormSubmit = async(values:any)=>{
    //console.log(values);
    const done = authCtx.focusElement =="terminate" || boundary_reached !=null ? 0:1;
    let dispose_status:any = null;    
    //console.log(values);
    if(done> 0){
      dispose_status = {"value":1,"label":"1 সম্পূর্ণ"};
    }
    const age_value = values?.eligibility_timeselection?.age?.value;
    const interviewer_permission = values?.introduction_permission?.interviewer_permission?.value;
    if(age_value < 18){
      dispose_status = {"value":12,"label":"12 বয়স ১৮ এর নিচে"};
    }
    if(age_value  > 120){
      dispose_status = {"value":15,"label":"15 বয়স নিয়ে তথ্য পাওয়া যাইনি"};
    }
    if(interviewer_permission >2){
      dispose_status = {"value":5,"label":"5 অসম্মত"};
    }
    if(boundary_reached != null){
      dispose_status = {"value":14,"label":"14 কোটা পূর্ণ হয়ে গেছে"};
      boundary_reached = JSON.parse(boundary_reached)
    }
    await axios.post(`${url}save-question`, 
    {
    userid:userid,
    data:values,
    contactnumber:mobileNumber,
    done:done,
    dispose_status:dispose_status,
    boundary_reached:boundary_reached
    }, 
    {    
      headers: {
        'Content-Type': 'application/json'
      }
    }
    ) .then(function (response:any) {

      if(typeof window !== 'undefined' && response.data.contact_question_id){
            localStorage.removeItem('data');
            authCtx.activeMobileNumber = null;
            authCtx.selectedMobile(null);
            localStorage.removeItem("MobileNumber")

            localStorage.removeItem("ContactID")
            authCtx.activeContactId = null;
            authCtx.selectedContactId(null);
                                                
            //remove skip rules
            authCtx.redirect =null;
            authCtx.setRedirect(null);
            authCtx.focusElement = null;
            authCtx.setFocusElement(null);

            localStorage.removeItem("redirect")
            localStorage.removeItem('focusElement');
            localStorage.removeItem('last_section');
            localStorage.removeItem('schedule_count');            
            localStorage.removeItem('boundaryReached');
            
            localStorage.removeItem('snowball');
            localStorage.removeItem('snowball_count');


            authCtx.boundaryReached = null;
            authCtx.setBoundaryReached(null)
            
            

            router.push('/dashboard/callinterface')
      }
      

    })

    

  }

  function onKeyDown(keyEvent:any) {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  }

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden bg-slate-800">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-1 md:p-2 2xl:p-10">
              <SectionLink linkdata={sectionLink}/>
              <Formik 
              initialValues={Catincd}              
              validate={async (value) => {
                try {
                  await validateYupSchema(value, CatincdSchema, false, {
                  'interviewer_permission':value.introduction_permission.interviewer_permission,
                  'age':value.eligibility_timeselection.age,
                  'city_or_village':value.eligibility_timeselection.city_or_village,
                  'district':value.eligibility_timeselection.district,
                  'education':value.eligibility_timeselection.education,
                  'boundary_reached':boundary_reached
                  });
                } catch (err) {
                  return yupToFormErrors(err); //for rendering validation errors
                }
              
                return {};
              }} 
              onSubmit={handleFormSubmit}>              
                <Form onKeyDown={onKeyDown} className='mt-2 rounded-md border border-stroke p-2 py-1 dark:border-strokedark sm:py-2.5 sm:px-2 xl:px-2.5'>
                    <FormObserver />
                    {children}
                </Form>
              </Formik>
              
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default CatincdLayout;
