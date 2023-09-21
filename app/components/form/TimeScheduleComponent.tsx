import {Formik, Form, Field, yupToFormErrors, validateYupSchema} from 'formik';
import { object, array, string, number, StringSchema } from "yup";
import useAuth from '@/app/hooks/useAuth';
import { useRouter, usePathname } from "next/navigation";
import {useState, useEffect} from 'react';
import axios from 'axios';
import DatePicker,{CalendarContainer} from 'react-datepicker';
import  moment from 'moment';
import 'moment/locale/en-gb'


import 'react-datepicker/dist/react-datepicker.css';
import './time-schedule-style.css'
const url = process.env.api_url;



const TimeScheduleComponent = ()=>{
    const router = useRouter();
    const pathname = usePathname();
    const authCtx = useAuth();
    const userid = authCtx.userId;
    const mobile_no = authCtx.activeMobileNumber;

    
    

    const ContactStatus = {
        schedule_time:''       
    }
    const ContactStatusSchema = object().shape({
        schedule_time:string().required('You must pick a time'),
    });

    const handleFormSubmit =async(values:any)=>{
        //console.log(values);

        const schedule_time = moment(values.schedule_time).format('YYYY-MM-DD HH:mm');

        //alert(schedule_time)

        let data = typeof window !='undefined'? localStorage.getItem('data'):null;
        if(data !=null){
            data = JSON.parse(data);
        }
        
        await axios.post(`${url}contact-schedule-time`, 
        {
        userid:userid,
        schedule_time:schedule_time,
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
          response.data.contact_question_status > 0
          &&
          response.data.contact_schedule_id != null
          ){
            authCtx.activeMobileNumber = null;
            authCtx.selectedMobile(null);
            localStorage.removeItem("MobileNumber")
            authCtx.activeContactId = null;
            authCtx.selectedContactId(null);
            localStorage.removeItem("ContactID")
            localStorage.removeItem('data');
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
                  Select Date and Time
                </label>

                
                <Field name="schedule_time">
            {({ field, form }:{field:any, form:any}) => (
              <DatePicker                
                {...field}
                
                showIcon
                isClearable
                selected={field.value}
                onChange={(date:any) => form.setFieldValue(field.name, date)}
                dateFormat="yyyy-MM-dd HH:mm"                
                //showTimeSelect
                //timeFormat="HH:mm"
                //timeIntervals={15}
                //timeCaption="Time"
                locale="en_GB"
                showTimeSelect
                timeFormat="HH:mm"
                
                showTimeInput
                timeInputLabel="Time:"
                minDate={new Date()}
                
                
                
                popperPlacement="top-end"
                
                //popperPlacement="bottom-start"
                popperModifiers={{
                  strategy: "fixed",
                  offset: {
                    enabled: true,
                    offset: '0px, 12px'
                  },
                  preventOverflow: {
                    enabled: true,
                    escapeWithReference: false, 
                    boundariesElement: 'viewport'
                  }
                }}
          
                className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
              />
            )}
          </Field>
{
    errors.schedule_time
    &&
    touched.schedule_time && ( 
        <span className="mb-3 font-semibold text-[#B45454]">
            {errors.schedule_time}
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

                    <pre>Option Values: {JSON.stringify(values, null, 2)}</pre>


                </Form>
        )}
        />
    )


}
export default TimeScheduleComponent;