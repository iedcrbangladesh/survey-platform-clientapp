"use client";
//Library
import Link from "next/link";
import RadioComponent from "@/app/components/RadioComponent";
import CheckComponent from "@/app/components/CheckComponent";
import SelectComponent from '@/app/components/SelectComponent';
import SelectNonCreatableComponent from '@/app/components/SelectNonCreatableComponent';
import useAuth from '@/app/hooks/useAuth';
import { useRouter } from "next/navigation";
import sectionLink from "@/app/json/sectionlink.json";
const sections:any = sectionLink;


import {Field, FieldArray ,useFormikContext} from 'formik';
import {useState, useCallback, useEffect} from 'react';

//Data
import option_data from "@/app/json/catincd_data.json";


//Logical On Off
import { disable_logic, skip_logic } from "@/app/api/logic-checker";

const Finish = ()=>{

const router = useRouter();
const authCtx = useAuth();
const focus_element:any = authCtx.focusElement;
const redirect:any = authCtx.redirect;


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

},[focus_element, authCtx,focus_element_logic])

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

const next_url = "";



const { isValid, isSubmitting,values,errors, touched, setFieldValue, setFieldTouched }:any = useFormikContext();
    return(
        <>
        <div className='grid grid-cols-1 gap-9 sm:grid-cols-1'>
          
          <div className='flex flex-col gap-9'>        
          <div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">

{Object.keys(errors).length > 0 &&
<table className='table-auto border-collapse border border-slate-400'>
  <tr>
    <th className="border border-slate-300 w-2/4 p-1 text-[#B45454]"  colSpan={2}>
    চেক করুন , এই সেকশন সমূহে   ডাটা বাদ পরেছে 
    </th>
  </tr>   
  {Object.keys(errors).map((error:any, index:number)=>{
    return(

      <tr key={index} className='bg-gray-2 text-left dark:bg-meta-4'>
        <td className="border border-slate-300 w-2/4 p-1">
          {sections.find((elem:any) =>elem.href == error)?.label}
          </td>
        
      </tr>
    )

  })}
      
</table>
}
{authCtx.focusElement !="terminate" &&
<div className="my-1">
	<span id="submit"></span>
    <button type="submit" className='flex w-full justify-center rounded bg-primary p-3 font-medium text-gray'>
        Complete
      </button>
 </div>
}

</div>
<div className="flex flex-col">
  <div className="py-2">
  সমাপনী বক্তব্য বলুনঃ
আপনার মূল্যবান সময় দিয়ে জরিপে অংশগ্রহণ করার জন্য ধন্যবাদ। সাবান দিয়ে হাত ধোয়ার অভ্যাস বজায় রাখুন, আর সরকারী নির্দেশনায় মাস্ক পরুন, ভিড় এড়িয়ে চলুন, এবং সুস্থ থাকুন।
  </div>
</div>
</div>

          </div>

                    
          
        </div>        
        </>

    )
};
export default Finish;
    