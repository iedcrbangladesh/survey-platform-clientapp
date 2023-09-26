"use client";
//Library
import Link from "next/link";
import RadioComponent from "@/app/components/RadioComponent";
import CheckComponent from "@/app/components/CheckComponent";
import SelectComponent from '@/app/components/SelectComponent';
import SelectNonCreatableComponent from '@/app/components/SelectNonCreatableComponent';
import useAuth from '@/app/hooks/useAuth';
import { useRouter } from "next/navigation";


import {Field, FieldArray ,useFormikContext} from 'formik';
import {useEffect} from 'react';

//Data
import option_data from "@/app/json/catincd_data.json";

//Logical On Off
import { disable_logic, skip_logic } from "@/app/api/logic-checker";

const Physicalstatus = ()=>{

const router = useRouter();
const authCtx = useAuth();
const focus_element:any = authCtx.focusElement;
const redirect:any = authCtx.redirect;

useEffect(()=>{
  if(redirect!=null && redirect!=""){
    router.push(redirect)    
    authCtx.redirect = null;
    authCtx.setRedirect(null);
  }    
},[redirect,router,authCtx])

useEffect(()=>{

    if(focus_element!=null && focus_element!="" && typeof window!='undefined'){
      const fel = '#'+focus_element.replace('.','_');
      const scrollElement:any = document.querySelector(fel);
      console.log(scrollElement)
      if(scrollElement!=null){
        scrollElement.scrollIntoView({ behavior: "smooth" })
        authCtx.focusElement = null;
        authCtx.setFocusElement(null);
      }
      
    }

},[focus_element, authCtx])

const redirect_or_focus_location = (v:any, name:any, rule:any)=>{
  if(v!=null){
    const redirect_element = skip_logic(name,v.value,rule);
    if(redirect_element.redirect!=null){
      authCtx.setRedirect(redirect_element.redirect)   
    }    
    if(redirect_element.focusElement!=null){
      authCtx.setFocusElement(redirect_element.focusElement)
    }
  }
}
  



const { isValid, isSubmitting,values,errors, touched, setFieldValue, setFieldTouched }:any = useFormikContext();
    return(
        <>
        <div className='grid grid-cols-1 gap-9 sm:grid-cols-1'>
          
          <div className='flex flex-col gap-9'>        
          
<div>

<span id="physical_status_blood_pressure_measured"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৬  . ১১  কখনো ডাক্তার বা স্বাস্থ্যকর্মী আপনার রক্তচাপ বা ব্লাড প্রেশার মেপেছেন?
  </label>
  
{ option_data.physical_status.blood_pressure_measured && option_data.physical_status.blood_pressure_measured.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="physical_status.blood_pressure_measured"
            checked={values.physical_status.blood_pressure_measured.value === v.value}
            onClick={(e:any) => {
                const {checked, name} = e.target;
                
                                
                if (checked) {
                  setFieldTouched(name,true);

                  setFieldValue(
                      name,
                      {value:v.value, label:v.label}
                  );
                }else{
                    setFieldTouched(name,false);
                    setFieldValue(
                        name,
                        {value:'', label:''}
                    );

                }
            
            }}
          />

  </div>
))
}
{
  errors.physical_status
  &&
  errors.physical_status.blood_pressure_measured
  &&
  touched.physical_status
  &&
  touched.physical_status.blood_pressure_measured && ( 
      <span className="mb-3 font-semibold text-[#B45454]">
          {errors.physical_status.blood_pressure_measured.label}
      </span>   
  )}
</div>
<div className="flex flex-col">
  <div className="py-2">
  
  </div>
</div>
</div>

</div>


<div>

<span id="physical_status_blood_pressure_notify"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৬  . ১২  আপনাকে কখনো কোন ডাক্তার বা স্বাস্থ্যকর্মী কি জানিয়েছেন যে, আপনার উচ্চ রক্তচাপ বা হাই ব্লাড প্রেশার আছে?
  </label>
  
{ option_data.physical_status.blood_pressure_notify && option_data.physical_status.blood_pressure_notify.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="physical_status.blood_pressure_notify"
            checked={values.physical_status.blood_pressure_notify.value === v.value}
            onClick={(e:any) => {
                const {checked, name} = e.target;
                
                                
                if (checked) {
                  setFieldTouched(name,true);

                  setFieldValue(
                      name,
                      {value:v.value, label:v.label}
                  );
                }else{
                    setFieldTouched(name,false);
                    setFieldValue(
                        name,
                        {value:'', label:''}
                    );

                }
            
            }}
          />

  </div>
))
}
{
  errors.physical_status
  &&
  errors.physical_status.blood_pressure_notify
  &&
  touched.physical_status
  &&
  touched.physical_status.blood_pressure_notify && ( 
      <span className="mb-3 font-semibold text-[#B45454]">
          {errors.physical_status.blood_pressure_notify.label}
      </span>   
  )}
</div>
<div className="flex flex-col">
  <div className="py-2">
  
  </div>
</div>
</div>

</div>


<div>
<span id="physical_status_blood_pressure_medicare"></span>

<div className="my-1 grid grid-cols-2 gap-4">
<div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৬  . ১৩  গত দুই সপ্তাহে,আপনি কি কখনো উচ্চ রক্তচাপ বা হাই ব্লাড  প্রেশারের জন্য ডাক্তার বা  স্বাস্থ্যকর্মীর দেয়া কোন ঔষধ খেয়েছেন  <br/>কিংবা খাবারের ব্যাপারে কোন উপদেশ মেনে চলছেন?  (একের অধিক উত্তর হতে পারে)
  </label>

{ option_data.physical_status.blood_pressure_medicare && option_data.physical_status.blood_pressure_medicare.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}
            component={CheckComponent}
            name="physical_status.blood_pressure_medicare"
            checked={values.physical_status.blood_pressure_medicare.includes(v.value)}            
            onChange={(e:any) => {
              const {checked, name} = e.target;  
                  
                  if (checked) {
                      setFieldTouched(name,true);
  
                      setFieldValue(
                          name,
                          [...values.physical_status.blood_pressure_medicare, v.value]
                      );
                  }else{
                      setFieldTouched(name,false);

                      setFieldValue(
                          name,
                          values.physical_status.blood_pressure_medicare.filter((val:any) => val !== v.value)
                      );
  
                  }
              }}
          />

  </div>
))
}
{
  errors.physical_status
  &&
  errors.physical_status.blood_pressure_medicare
  &&
  touched.physical_status
  &&
  touched.physical_status.blood_pressure_medicare && ( 
      <span className="mb-3 font-semibold text-[#B45454]">
          {errors.physical_status.blood_pressure_medicare}
      </span>   
  )}


</div>
<div className="flex flex-col">
  <div className="py-2">
  
  </div>
</div>

</div>

</div>


          </div>
          
        </div>        
        </>

    )
};
export default Physicalstatus;
    