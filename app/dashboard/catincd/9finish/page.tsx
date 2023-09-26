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

const Finish = ()=>{

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
          <div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">

<code>
    <pre>Values: {JSON.stringify(values, null, 2)}</pre>
    <pre>Errors: {JSON.stringify(errors, null, 2)}</pre>
{/*<pre>Touched: {JSON.stringify(touched, null, 2)}</pre>*/}
</code>

<div className="my-1">
	<span id="submit"></span>
    <button type="submit" className='flex w-full justify-center rounded bg-primary p-3 font-medium text-gray'>
        Save
      </button>
 </div>

</div>
<div className="flex flex-col">
  <div className="py-2">
  সমাপনী বক্তব্য বলুনঃ
<br/>
আপনার মূল্যবান সময় দিয়ে জরিপে অংশগ্রহণ করার জন্য ধন্যবাদ। দয়া করে মাস্ক পরুন, ভিড় এড়িয়ে চলুন, সাবান দিয়ে হাত ধুন এবং সুস্থ্য থাকুন।
  </div>
</div>
</div>

          </div>
          
        </div>        
        </>

    )
};
export default Finish;
    