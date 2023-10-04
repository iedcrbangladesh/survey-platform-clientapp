"use client";
import { ReactNode, useEffect, useState, useCallback } from 'react';
import {Formik, Form, yupToFormErrors, validateYupSchema, useFormikContext} from 'formik';
import { useRouter } from "next/navigation";
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
  const { values } = useFormikContext();

  useEffect(() => {
    console.log("FormObserver::values", values);
    if(typeof window !== 'undefined'){
      localStorage.setItem('data',JSON.stringify(values));
    }
  }, [values]);

  return null;
};

const CatincdLayout = ({ children }: CatincdLayoutProps) => {
  const router = useRouter();  
  const authCtx = useAuth();
  const userid = authCtx.userId;
  const mobileNumber = authCtx.activeMobileNumber;
  const contactId = authCtx.activeContactId;

  const [sidebarOpen, setSidebarOpen] = useState(false);

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
vegatables_consumption_amount:{value:'',label:''},
salt_consumption:{value:'',label:''},
salt_consumption_extra:{value:'',label:''},
salt_consumption_mixed:{value:'',label:''},
salt_consumption_frequency:{value:'',label:''},
},
relax_information:{
relax:{hour:0, minute:0},
},
physical_status:{
blood_pressure_measured:{value:'',label:''},
blood_pressure_notify:{value:'',label:''},
blood_pressure_medicare:[],
blood_sugar_diabetics_measured:{value:'',label:''},
blood_sugar_diabetics_notify:{value:'',label:''},
diabetic_medicine_taken:[],
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
finish:{
},

  };

  
  const fetchCatincdData = useCallback(async()=>{
    const response = await axios.get(`${url}get-question/${contactId}`);
    if(typeof window !== 'undefined' && response.data.data!=null){
      localStorage.setItem('data',JSON.stringify(response.data.data));
    }
  },[contactId]);

  useEffect(()=>{
    fetchCatincdData();      
  },[fetchCatincdData]);

  let previous_data = typeof window !== 'undefined'?localStorage.getItem('data'):null;

  if(previous_data!=null && typeof window !== 'undefined'){
    //console.log(JSON.parse(previous_data))
    Catincd = JSON.parse(previous_data)
  }

  const handleFormSubmit = async(values:any)=>{
    //console.log(values);
    await axios.post(`${url}save-question`, 
    {
    userid:authCtx.userId,
    data:values,
    contactnumber:mobileNumber,
    done:1
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
      }
      router.push('/dashboard/callinterface')

    })

    

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
                  await validateYupSchema(value, CatincdSchema, false, {'interviewer_permission':value.introduction_permission.interviewer_permission});
                } catch (err) {
                  return yupToFormErrors(err); //for rendering validation errors
                }
              
                return {};
              }} 
              onSubmit={handleFormSubmit}>              
                <Form className='mt-2 rounded-md border border-stroke p-2 py-1 dark:border-strokedark sm:py-2.5 sm:px-2 xl:px-2.5'>
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
