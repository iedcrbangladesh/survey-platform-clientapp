import {Formik, Form, Field, yupToFormErrors, validateYupSchema} from 'formik';
import { object, array, string, number, StringSchema } from "yup";
import useAuth from '@/app/hooks/useAuth';
import { useRouter, usePathname } from "next/navigation";
import {useState, useEffect} from 'react';
import axios from 'axios';
import SelectComponent from '@/app/components/SelectComponent';
import contact_status from '@/app/json/contactstatus.json';
const url = process.env.api_url;

const ContactScheduleComponent = ()=>{
    const router = useRouter();
    const pathname = usePathname();
    const authCtx = useAuth();
    const userid = authCtx.userId;
    const mobile_no = authCtx.activeMobileNumber;

    const ContactStatus = {
        dispose_status:{value:'',label:''}        
    }
    const ContactStatusSchema = object().shape({
        dispose_status:object().shape({
            value: string().required("Select A Call Status"),
            label: string().required("!..you must select a call status..!")
          })
          .nullable(),
    });

    const handleFormSubmit =async(values:any)=>{
        //console.log(values);

        let data = typeof window !='undefined'? localStorage.getItem('data'):null;
        if(data !=null){
            data = JSON.parse(data);
        }
        await axios.post(`${url}contact-running-status`, 
        {
        userid:userid,
        dispose_status:values.dispose_status,
        mobile_no:mobile_no,
        questionid:authCtx.activeContactId,
        data:data
        }, 
        {    
          headers: {
            'Content-Type': 'application/json'
          }
        }
        ) .then(function (response) {
    
          if(typeof window !== 'undefined' 
          && 
          response.data.user_contact_status > 0 
          && 
          response.data.contact_question_status > 0){
            //console.log('here comes one');
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

    return(
        <Formik 
              initialValues={ContactStatus}
              validationSchema={ContactStatusSchema} 
              onSubmit={handleFormSubmit}
              render={({isValid, isSubmitting,values,errors, touched, setFieldValue, setFieldTouched})=>(
              
                <Form >
<div className="w-full">
<label className="mb-3 block text-black dark:text-white">
                  Select Call status
                </label>

                <SelectComponent defaultValueArray={{  }}
                                 placeholder="Select Call status"
                                 isSearchable
                                 isClearable                                 
                                  name="dispose_status" options={contact_status.schedule_status} 
                           onParentChange={(value:any,name:any)=>{

                           }}       
                      />

{
    errors.dispose_status
    &&
    touched.dispose_status && ( 
        <span className="mb-3 font-semibold text-[#B45454]">
            {errors.dispose_status.label}
        </span>   
    )}     
    </div>

    <div className="w-full mt-5">
<button 
disabled={!isValid || isSubmitting} type="submit"
 className="flex w-full justify-center rounded bg-[#f1e56c] p-3 font-medium text-black">
  Submit
</button>
                    </div>


                </Form>
        )}
        />
    )


}
export default ContactScheduleComponent;