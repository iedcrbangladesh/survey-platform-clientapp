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

const Relaxinformation = ()=>{

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
	
	<label className="mb-1 block text-black dark:text-white">
    	৫ . ১ সাধারন একটি দিনে আপনি (ঘুম ব্যতীত) বসে অথবা হেলান  দিয়ে ঐরকমভাবে কত ঘন্টা সময় কাটান?
  	</label>
  	<span id="relax_information_relax"></span>


<div className="grid grid-cols-3">
<div className="flex flex-col">
<Field 
    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
name="relax_information.relax.hour" placeholder="Hour" type="number" min={0} max={24} />

</div>

<div className="flex flex-col">
	<span className="font-medium my-2">:</span>
</div>

<div className="flex flex-col">
<Field 
    className="ml-0 w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
name="relax_information.relax.minute" placeholder="Minute" type="number" min={0} max={60} />

</div>
</div>

</div>


<div className="flex flex-col">
  <div className="py-2">
  
  </div>
</div>
</div>



          </div>
          
        </div>        
        </>

    )
};
export default Relaxinformation;
    