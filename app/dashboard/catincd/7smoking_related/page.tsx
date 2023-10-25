"use client";
//Library
import Link from "next/link";
import RadioComponent from "@/app/components/RadioComponent";
import CheckComponent from "@/app/components/CheckComponent";
import SelectComponent from '@/app/components/SelectComponent';
import SelectNonCreatableComponent from '@/app/components/SelectNonCreatableComponent';
import useAuth from '@/app/hooks/useAuth';
import { useRouter, usePathname } from "next/navigation";
import axios from 'axios';



import {Field, FieldArray ,useFormikContext} from 'formik';
import {useState, useCallback, useEffect, useMemo} from 'react';

//Data
import option_data from "@/app/json/catincd_data.json";


//Logical On Off
import { disable_logic, skip_logic } from "@/app/api/logic-checker";

const Smokingrelated = ()=>{

const router = useRouter();
const pathname = usePathname();
const authCtx = useAuth();
const focus_element:any = authCtx.focusElement;
const redirect:any = authCtx.redirect;
const boundary_reached:any = authCtx.boundaryReached;

const { isValid, isSubmitting,values,errors, touched, setFieldValue, setFieldTouched }:any = useFormikContext();




const redirect_logic = useCallback(()=>{
  
  const last_section = typeof window !== 'undefined'?localStorage.getItem('last_section'):null;
  
  if(redirect!=null && redirect!=""){
    router.push(redirect)    
    authCtx.redirect = null;
    authCtx.setRedirect(null);
  }

  if(last_section!=null && last_section!="" && typeof window !== 'undefined'){
    localStorage.removeItem('last_section')
    router.push(last_section);
    
  }

},[authCtx,redirect,router])

const focus_element_logic = useCallback(()=>{
  
  if(focus_element!=null && focus_element!="" && focus_element!="terminate" && typeof window!='undefined'){
      const fel = '#'+focus_element.replace('.','_');
      const scrollElement:any = document.querySelector(fel);
      //console.log(scrollElement)
      if(scrollElement!=null){
        scrollElement.scrollIntoView({ behavior: "smooth",block: 'center'})
        
        authCtx.focusElement = null;
        authCtx.setFocusElement(null);
      }
      
    }

    if(focus_element!=null && focus_element!="" && focus_element =="terminate" && typeof window!='undefined'){
      
      const fel = '#'+focus_element;
      const scrollElement:any = document.querySelector(fel);
      //console.log(scrollElement)
      if(scrollElement!=null){
        scrollElement.scrollIntoView({ behavior: "smooth",block: 'start'})
                
        //authCtx.focusElement = null;
        //authCtx.setFocusElement(null);
      }
    }

},[authCtx,focus_element])

useEffect(()=>{
  
    redirect_logic()

},[redirect,router,authCtx,redirect_logic])


useEffect(()=>{  
    
    focus_element_logic()

},[redirect,router,authCtx,focus_element_logic])

const redirect_or_focus_location = (v:any, name:any, type:any)=>{
  if(v!=null){

    const pass_value = typeof v.value != 'undefined'?v.value:v;
    const redirect_element = skip_logic(name,pass_value,type);

    if(redirect_element.redirect!=null){
      authCtx.setRedirect(redirect_element.redirect)   
    }    
    if(redirect_element.focusElement!=null){
      
      authCtx.setFocusElement(redirect_element.focusElement)
    }
  }
}

const next_url = "8drinking_related";


      const GoNext =()=>{
        if(focus_element !== 'terminate'){
          router.push(next_url)
        }
        redirect_logic()
        focus_element_logic()
      }


    return(
        <>
        <div className='grid grid-cols-1 gap-9 sm:grid-cols-1'>
          
          <div className='flex flex-col gap-9'>        
          <div className="my-1 grid grid-cols-1 gap-4">
  <div className="flex flex-col">

    <table className='table-auto border-collapse border border-slate-400'>
      <tr className='bg-gray-2 text-left dark:bg-meta-4'>        
        <td className="border border-slate-300 w-2/4 p-1">পরবর্তী প্রশ্নগুলো ধূমপান (সিগারেট, বিড়ি, হুক্কা), ধোয়াবিহীন তামাক (জর্দা, গুল, সাদা পাতা, খৈনি, নস্যি ইত্যাদি) ব্যবহার সম্পর্কে। <br/>কোন প্রশ্ন আবার শুনতে চাইলে পূনরায় জানতে চাইতে পারেন এবং কোন প্রশ্নের উত্তর দিতে না চাইলে জানাতে পারেন।</td>
      </tr>
    </table>
  </div>
</div>

<div className="my-1 grid grid-cols-1 gap-4">
  <div className="flex flex-col">

    <table className='table-auto border-collapse border border-slate-400'>
      <tr className='bg-gray-2 text-left dark:bg-meta-4'>
        <td className="border border-slate-300 w-2/4 p-1">৭.১ ধূমপান (সিগারেট, বিড়ি, হুক্কা) বিষয়ক প্রশ্নঃ</td>
        <td className="border border-slate-300 w-2/4 p-1">পরবর্তী প্রশ্নগুলো ধূমপান (সিগারেট, বিড়ি, হুক্কা) ইত্যাদির ব্যবহার সম্পর্কে। দয়া করে এখানে ধোয়াবিহীন তামাক, যেমন জর্দা, গুল, সাদা পাতা, খৈনি, নস্যি, অথবা ই-সিগারেট, যেমন ভেপ, ভেপ-পেন, ই-শিশা, ই-পাইপ, ইত্যাদি সম্পর্কে কিছু বলবেন না।</td>
      </tr>
    </table>
  </div>
</div>


<div>

<span id="smoking_related_smoking_habit"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৭ .১.১  আপনি কি বর্তমানে ধূমপান করেন?
  </label>
  
{ option_data.smoking_related.smoking_habit && option_data.smoking_related.smoking_habit.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="smoking_related.smoking_habit"
            checked={values.smoking_related.smoking_habit.value === v.value}
            onChange={(e:any) => {}}
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
  উত্তর না হলে বা অস্বীকৃতি জানালে প্রশ্ন ৭.১.৩-এ যান।
  </div>
</div>
</div>

</div>

{parseInt(values.smoking_related.smoking_habit.value) < 2 && (
<div>

<span id="smoking_related_smoking_habit_reguler"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৭ .১.২ আপনি কি বর্তমানে প্রতিদিন ধূমপান করেন?
  </label>
  
{ option_data.smoking_related.smoking_habit_reguler && option_data.smoking_related.smoking_habit_reguler.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="smoking_related.smoking_habit_reguler"
            checked={values.smoking_related.smoking_habit_reguler.value === v.value}
            onChange={(e:any) => {}}
            onClick={(e:any) => {
                const {checked, name} = e.target;
                
                
 redirect_or_focus_location(v,name,"radio"); 
                
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
  উত্তর যাইহোক প্রশ্ন ৭.২-এ যাবে।
  </div>
</div>
</div>

</div>
)}
{parseInt(values.smoking_related.smoking_habit.value) > 1 && (
<div>

<span id="smoking_related_smoking_habit_previous"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৭ .১.৩ আপনি কি পূর্বে কখনও ধূমপান করেছেন?
  </label>
  
{ option_data.smoking_related.smoking_habit_previous && option_data.smoking_related.smoking_habit_previous.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="smoking_related.smoking_habit_previous"
            checked={values.smoking_related.smoking_habit_previous.value === v.value}
            onChange={(e:any) => {}}
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
  
  </div>
</div>
</div>

</div>
)}
<div className="my-1 grid grid-cols-1 gap-4">
  <div className="flex flex-col">

    <table className='table-auto border-collapse border border-slate-400'>
      <tr className='bg-gray-2 text-left dark:bg-meta-4'>
        <td className="border border-slate-300 w-2/4 p-1">৭.২ ধোয়াবিহীন তামাক (জর্দা, গুল, সাদা পাতা, খৈনি, নস্যি ইত্যাদি) সম্পর্কে প্রশ্নঃ</td>
        <td className="border border-slate-300 w-2/4 p-1"> ধোয়াবিহীন তামাক হল যা চিবানো হয় অথবা মুখের ভেতর রাখা হয়।</td>
      </tr>
    </table>
  </div>
</div>


<div>

<span id="smoking_related_non_smoking_habit"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৭ .২.১ বর্তমানে আপনি কি পানের সাথে অথবা <br/>শুধু জর্দ্দা, সাদাপাতা, খৈনি, নস্যি বা গুল ইত্যাদি ব্যবহার করেন?
  </label>
  
{ option_data.smoking_related.non_smoking_habit && option_data.smoking_related.non_smoking_habit.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="smoking_related.non_smoking_habit"
            checked={values.smoking_related.non_smoking_habit.value === v.value}
            onChange={(e:any) => {}}
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
  উত্তর না হলে বা অস্বীকৃিত জানালে প্রশ্ন ৭.২.৩-এ যান।
  </div>
</div>
</div>

</div>

{parseInt(values.smoking_related.non_smoking_habit.value)  < 2 && (
<div>

<span id="smoking_related_non_smoking_habit_reguler"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৭ .২.২  আপনি কি ধোয়াবিহীন তামাকজাত ঐসব দ্রব্যাদি প্রতিদিন ব্যবহার করেন?
  </label>
  
{ option_data.smoking_related.non_smoking_habit_reguler && option_data.smoking_related.non_smoking_habit_reguler.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="smoking_related.non_smoking_habit_reguler"
            checked={values.smoking_related.non_smoking_habit_reguler.value === v.value}
            onChange={(e:any) => {}}
            onClick={(e:any) => {
                const {checked, name} = e.target;
                
                
 redirect_or_focus_location(v,name,"radio"); 
                
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
  উত্তর যাইহোক সেকশন ৮-এ যাবে।
  </div>
</div>
</div>

</div>
)}
{parseInt(values.smoking_related.non_smoking_habit.value)  > 1 && (
<div>

<span id="smoking_related_non_smoking_habit_previous"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৭ .২.৩ আপনি কি পূর্বে কখনও পানের সাথে অথবা<br/> শুধু জর্দ্দা, সাদাপাতা, খৈনি, নস্যি বা গুল ইত্যাদি ব্যবহার করেছেন?
  </label>
  
{ option_data.smoking_related.non_smoking_habit_previous && option_data.smoking_related.non_smoking_habit_previous.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="smoking_related.non_smoking_habit_previous"
            checked={values.smoking_related.non_smoking_habit_previous.value === v.value}
            onChange={(e:any) => {}}
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
)}

          
          </div>          

          

      <div className="my-1 grid grid-cols-2 gap-4">
            <div className="flex flex-col">                
              {
              authCtx.focusElement =="terminate" && authCtx.boundaryReached == null &&
              
              <button type="submit" className="w-1/2 justify-center rounded bg-[#f1e56c] p-3 font-medium text-black">
              Submit
              </button>

              }
            </div>
            <div className="flex flex-col">
            {
              authCtx.focusElement !="terminate" && authCtx.boundaryReached == null &&
              <button id="terminate" type='button' className="w-1/2 justify-center rounded bg-[#f1e56c] p-3 font-medium text-black" onClick={GoNext}>
              Next
              </button>
            }
            </div>
        </div>

                
          
        </div>        
        </>

    )
};
export default Smokingrelated;
    