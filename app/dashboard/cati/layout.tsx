"use client";
import { ReactNode, useCallback, useEffect, useState } from 'react';
import {Formik, Form, yupToFormErrors, validateYupSchema, useFormikContext} from 'formik';
import { useRouter, usePathname } from "next/navigation";
import Header from '@/app/components/Header';
import Sidebar from '@/app/components/Sidebar';
import axios from 'axios';
import CatiSchema from '@/app/utils/CatiSchema';
import useAuth from '@/app/hooks/useAuth';

const url =process.env.api_url;

const mobileNumber = '01670502284';

interface CatiLayoutProps {
  children: ReactNode;
}

const FormObserver =() => {
  const { values } = useFormikContext();

  useEffect(() => {
    //console.log("FormObserver::values", values);
    if(typeof window !== 'undefined'){
      localStorage.setItem('data',JSON.stringify(values));
    }

  }, [values]);

  

  return null;
};

const CatiLayout = ({ children }: CatiLayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const authCtx = useAuth();
  const userid =authCtx.userId;

  const [sidebarOpen, setSidebarOpen] = useState(false);

  let Cati={
    name_of_person:"",
    gender:"",
    age:0,
    food_choices:[],
    found:[],
    fellings:{value:'',label:''},

  }

  const fetchCatiData = useCallback(async()=>{
    const response = await axios.get(`${url}get-question/${userid}/${mobileNumber}`);
    if(typeof window !== 'undefined' && response.data.data!=null){
      localStorage.setItem('data',JSON.stringify(response.data.data));
    }
  },[userid]);
  

  useEffect(()=>{
    fetchCatiData();  
    //console.log(catiData)
  },[fetchCatiData]);

  
  //console.log(catiData);
  let previous_data = typeof window !== 'undefined'?localStorage.getItem('data'):null;
  ///alert(typeof previous_data)  

  //let Cati:any = catiData;
  if(previous_data!=null && typeof window !== 'undefined'){
    //console.log(JSON.parse(previous_data))
    Cati = JSON.parse(previous_data)
  }

  const handleFormSubmit =async(values:any)=>{
    //console.log(values);
    await axios.post(`${url}save-question`, 
    {
    userid:authCtx.userId,
    data:values,
    contactnumber:mobileNumber
    }, 
    {    
      headers: {
        'Content-Type': 'application/json'
      }
    }
    ) .then(function (response) {

      if(typeof window !== 'undefined' && response.data.contact_question_id){
        localStorage.removeItem('data');
      }
      router.push('/dashboard')

    })

    /*
    setTimeout(() => {

      

    }, 500)
    */

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
              <Formik 
              initialValues={Cati}
              validationSchema={CatiSchema} 
              onSubmit={handleFormSubmit}>              
                <Form >
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

export default CatiLayout;
