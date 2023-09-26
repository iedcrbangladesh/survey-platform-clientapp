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

const Drinkingrelated = ()=>{

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

<span id="drinking_related_alchohol_usage"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৮ . ১ আপনি কি গত ১২ মাসে কোন ধরণের মদ পান করেছেন কি?
  </label>
  
{ option_data.drinking_related.alchohol_usage && option_data.drinking_related.alchohol_usage.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="drinking_related.alchohol_usage"
            checked={values.drinking_related.alchohol_usage.value === v.value}
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
  errors.drinking_related
  &&
  errors.drinking_related.alchohol_usage
  &&
  touched.drinking_related
  &&
  touched.drinking_related.alchohol_usage && ( 
      <span className="mb-3 font-semibold text-[#B45454]">
          {errors.drinking_related.alchohol_usage.label}
      </span>   
  )}
</div>
<div className="flex flex-col">
  <div className="py-2">
  উত্তর না হলে বা অস্বীকৃিত জানালে সমাপনি বক্তব্য দিন।
  </div>
</div>
</div>

</div>


<div>

<span id="drinking_related_alchohol_usage_frequency"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৮ . ২  গত ১২ মাসে কত ঘন ঘন মদ বা ঐ জাতীয় পাণীয়ের অন্ততঃ একটি গ্রহণ করেছেন?
  </label>
  
{ option_data.drinking_related.alchohol_usage_frequency && option_data.drinking_related.alchohol_usage_frequency.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="drinking_related.alchohol_usage_frequency"
            checked={values.drinking_related.alchohol_usage_frequency.value === v.value}
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
  errors.drinking_related
  &&
  errors.drinking_related.alchohol_usage_frequency
  &&
  touched.drinking_related
  &&
  touched.drinking_related.alchohol_usage_frequency && ( 
      <span className="mb-3 font-semibold text-[#B45454]">
          {errors.drinking_related.alchohol_usage_frequency.label}
      </span>   
  )}
</div>
<div className="flex flex-col">
  <div className="py-2">
  * বছরের সবমাসে একবারও না, অর্থাৎ মাসে গড়ে ১ বারের কম
  </div>
</div>
</div>

</div>


<div>

<span id="drinking_related_thirty_days_alchohol_usage"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৮ . ৩  আপনি কি গত ৩০ দিনে কখনো মদ পান করেছেন?
  </label>
  
{ option_data.drinking_related.thirty_days_alchohol_usage && option_data.drinking_related.thirty_days_alchohol_usage.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="drinking_related.thirty_days_alchohol_usage"
            checked={values.drinking_related.thirty_days_alchohol_usage.value === v.value}
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
  errors.drinking_related
  &&
  errors.drinking_related.thirty_days_alchohol_usage
  &&
  touched.drinking_related
  &&
  touched.drinking_related.thirty_days_alchohol_usage && ( 
      <span className="mb-3 font-semibold text-[#B45454]">
          {errors.drinking_related.thirty_days_alchohol_usage.label}
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
export default Drinkingrelated;
    