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

const Smokingrelated = ()=>{

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

<span id="smoking_related_smoking_habit"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৭  . ১১  আপনি কি বর্তমানে ধূমপান করেন?
  </label>
  
{ option_data.smoking_related.smoking_habit && option_data.smoking_related.smoking_habit.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="smoking_related.smoking_habit"
            checked={values.smoking_related.smoking_habit.value === v.value}
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
  errors.smoking_related
  &&
  errors.smoking_related.smoking_habit
  &&
  touched.smoking_related
  &&
  touched.smoking_related.smoking_habit && ( 
      <span className="mb-3 font-semibold text-[#B45454]">
          {errors.smoking_related.smoking_habit.label}
      </span>   
  )}
</div>
<div className="flex flex-col">
  <div className="py-2">
  উত্তর না হলে বা অস্বীকৃিত জানালে প্রশ্ন ৭.১৩-এ যান।
  </div>
</div>
</div>

</div>


<div>

<span id="smoking_related_smoking_habit_reguler"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৭  . ১২ আপনি কি বর্তমানে প্রতিদিন ধূমপান করেন?
  </label>
  
{ option_data.smoking_related.smoking_habit_reguler && option_data.smoking_related.smoking_habit_reguler.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="smoking_related.smoking_habit_reguler"
            checked={values.smoking_related.smoking_habit_reguler.value === v.value}
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
  errors.smoking_related
  &&
  errors.smoking_related.smoking_habit_reguler
  &&
  touched.smoking_related
  &&
  touched.smoking_related.smoking_habit_reguler && ( 
      <span className="mb-3 font-semibold text-[#B45454]">
          {errors.smoking_related.smoking_habit_reguler.label}
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

<span id="smoking_related_smoking_habit_previous"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৭  . ১৩ আপনি কি পূর্বে কখনও ধূমপান করেছেন?
  </label>
  
{ option_data.smoking_related.smoking_habit_previous && option_data.smoking_related.smoking_habit_previous.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="smoking_related.smoking_habit_previous"
            checked={values.smoking_related.smoking_habit_previous.value === v.value}
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
  errors.smoking_related
  &&
  errors.smoking_related.smoking_habit_previous
  &&
  touched.smoking_related
  &&
  touched.smoking_related.smoking_habit_previous && ( 
      <span className="mb-3 font-semibold text-[#B45454]">
          {errors.smoking_related.smoking_habit_previous.label}
      </span>   
  )}
</div>
<div className="flex flex-col">
  <div className="py-2">
  উত্তর না হলে বা অস্বীকৃিত জানালে প্রশ্ন ৭.২-এ যান।
  </div>
</div>
</div>

</div>


<div>

<span id="smoking_related_non_smoking_habit"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৭  . ২১ বর্তমানে আপনি কি পানের সাথে অথবা শুধু জর্দ্দা, সাদাপাতা, খৈনি, নস্যি বা গুল ইত্যাদি ব্যবহার করেন?
  </label>
  
{ option_data.smoking_related.non_smoking_habit && option_data.smoking_related.non_smoking_habit.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="smoking_related.non_smoking_habit"
            checked={values.smoking_related.non_smoking_habit.value === v.value}
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
  errors.smoking_related
  &&
  errors.smoking_related.non_smoking_habit
  &&
  touched.smoking_related
  &&
  touched.smoking_related.non_smoking_habit && ( 
      <span className="mb-3 font-semibold text-[#B45454]">
          {errors.smoking_related.non_smoking_habit.label}
      </span>   
  )}
</div>
<div className="flex flex-col">
  <div className="py-2">
  উত্তর না হলে বা অস্বীকৃিত জানালে প্রশ্ন ৭.২৩-এ যান।
  </div>
</div>
</div>

</div>


<div>

<span id="smoking_related_non_smoking_habit_reguler"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৭  . ২২  আপনি কি ধোয়াবিহীন তামাকজাত ঐসব দ্রব্যাদি প্রতিদিন ব্যবহার করেন?
  </label>
  
{ option_data.smoking_related.non_smoking_habit_reguler && option_data.smoking_related.non_smoking_habit_reguler.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="smoking_related.non_smoking_habit_reguler"
            checked={values.smoking_related.non_smoking_habit_reguler.value === v.value}
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
  errors.smoking_related
  &&
  errors.smoking_related.non_smoking_habit_reguler
  &&
  touched.smoking_related
  &&
  touched.smoking_related.non_smoking_habit_reguler && ( 
      <span className="mb-3 font-semibold text-[#B45454]">
          {errors.smoking_related.non_smoking_habit_reguler.label}
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

<span id="smoking_related_non_smoking_habit_previous"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৭  . ২৩ আপনি কি পূর্বে কখনও পানের সাথে অথবা শুধু জর্দ্দা, সাদাপাতা, খৈনি, নস্যি বা গুল ইত্যাদি ব্যবহার করেছেন?
  </label>
  
{ option_data.smoking_related.non_smoking_habit_previous && option_data.smoking_related.non_smoking_habit_previous.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="smoking_related.non_smoking_habit_previous"
            checked={values.smoking_related.non_smoking_habit_previous.value === v.value}
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
  errors.smoking_related
  &&
  errors.smoking_related.non_smoking_habit_previous
  &&
  touched.smoking_related
  &&
  touched.smoking_related.non_smoking_habit_previous && ( 
      <span className="mb-3 font-semibold text-[#B45454]">
          {errors.smoking_related.non_smoking_habit_previous.label}
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

<span id="smoking_related_about_e_cigarate"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৭  . ৩১ আপনি কি কখনও ইলেকট্রনিক সিগারেট, ই-সিগারেট, ভ্যাপ, ই-শিশা, ই-পাইপ, বা জুস মেশিন ইত্যাদির কোনটির নাম শুনেছেন?
  </label>
  
{ option_data.smoking_related.about_e_cigarate && option_data.smoking_related.about_e_cigarate.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="smoking_related.about_e_cigarate"
            checked={values.smoking_related.about_e_cigarate.value === v.value}
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
  errors.smoking_related
  &&
  errors.smoking_related.about_e_cigarate
  &&
  touched.smoking_related
  &&
  touched.smoking_related.about_e_cigarate && ( 
      <span className="mb-3 font-semibold text-[#B45454]">
          {errors.smoking_related.about_e_cigarate.label}
      </span>   
  )}
</div>
<div className="flex flex-col">
  <div className="py-2">
  উত্তর   হ্যাঁ  হলে প্রশ্ন ৭.৩২-এ যান।<br/>না বা অস্বীকৃিত হলে প্রশ্ন ৮.১-এ যান।
  </div>
</div>
</div>

</div>


<div>

<span id="smoking_related_usage_e_cigarate"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৭  . ৩২ আপনি কি বর্তমানে ইলেকট্রনিক সিগারেট, ই-সিগারেট, ভ্যাপ, ই-শিশা, ই-পাইপ,<br/> বা জুস মেশিন ইত্যাদির কেনটি ব্যবহার করেন?
  </label>
  
{ option_data.smoking_related.usage_e_cigarate && option_data.smoking_related.usage_e_cigarate.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="smoking_related.usage_e_cigarate"
            checked={values.smoking_related.usage_e_cigarate.value === v.value}
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
  errors.smoking_related
  &&
  errors.smoking_related.usage_e_cigarate
  &&
  touched.smoking_related
  &&
  touched.smoking_related.usage_e_cigarate && ( 
      <span className="mb-3 font-semibold text-[#B45454]">
          {errors.smoking_related.usage_e_cigarate.label}
      </span>   
  )}
</div>
<div className="flex flex-col">
  <div className="py-2">
  উত্তর না বা অস্বীকৃিত হলে প্রশ্ন ৮.১-এ যান।
  </div>
</div>
</div>

</div>


          </div>
          
        </div>        
        </>

    )
};
export default Smokingrelated;
    