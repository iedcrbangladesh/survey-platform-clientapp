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
import {useState, useCallback, useEffect} from 'react';

//Data
import option_data from "@/app/json/catincd_data.json";


//Logical On Off
import { disable_logic, skip_logic } from "@/app/api/logic-checker";

const Relaxinformation = ()=>{

const router = useRouter();
const authCtx = useAuth();
const focus_element:any = authCtx.focusElement;
const redirect:any = authCtx.redirect;

const [nextState, setNextState] = useState(false);

const redirect_logic = useCallback(()=>{
  
  if(redirect!=null && redirect!=""){
    router.push(redirect)    
    authCtx.redirect = null;
    authCtx.setRedirect(null);
  }

},[authCtx,redirect,router])

const focus_element_logic = useCallback(()=>{
  
  if(focus_element!=null && focus_element!="" && focus_element!="terminate" && typeof window!='undefined'){
      const fel = '#'+focus_element.replace('.','_');
      const scrollElement:any = document.querySelector(fel);
      //console.log(scrollElement)
      if(scrollElement!=null){
        scrollElement.scrollIntoView({ behavior: "smooth",block: 'start'})
        
        authCtx.focusElement = null;
        authCtx.setFocusElement(null);
      }
      
    }

    if(focus_element!=null && focus_element!="" && focus_element =="terminate" && typeof window!='undefined'){
      setNextState(true)
      const fel = '#'+focus_element;
      const scrollElement:any = document.querySelector(fel);
      //console.log(scrollElement)
      if(scrollElement!=null){
        scrollElement.scrollIntoView({ behavior: "smooth",block: 'start'})
                
        authCtx.focusElement = null;
        authCtx.setFocusElement(null);
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
      setNextState(false)
      authCtx.setFocusElement(redirect_element.focusElement)
    }
  }
}

const next_url = "6physical_status";


      const GoNext =()=>{
        if(focus_element !== 'terminate'){
          router.push(next_url)
        }
        redirect_logic()
        focus_element_logic()
      }

const { isValid, isSubmitting,values,errors, touched, setFieldValue, setFieldTouched }:any = useFormikContext();
    return(
        <>
        <div className='grid grid-cols-1 gap-9 sm:grid-cols-1'>
          
          <div className='flex flex-col gap-9'>        
          <div className="my-1 grid grid-cols-1 gap-4">
  <div className="flex flex-col">

    <table className='table-auto border-collapse border border-slate-400'>
      <tr className='bg-gray-2 text-left dark:bg-meta-4'>        
        <td className="border border-slate-300 w-2/4 p-1">পরবর্তী প্রশ্নগুলো আপনার বসে বা হেলান দিয়ে কাটানো সময় সম্পর্কিত, যা কর্মক্ষেত্রে বা বাড়িতে কাজ করার সময়, পড়াশোনার সময়, কম্পিউটার ব্যবহারের সময়, রান্নাঘরে হাতের কাজ করার সময়, বন্ধুদের সাথে আড্ডায়, গাড়ী, বাস বা ট্রেনে যাতায়তের সময়, পড়াশোনা, কার্ড খেলা অথবা টেলিভিশন দেখার সময়ে এবং বিশ্রামের সময় বসে বা হেলান দিয়ে কাটানো সময়ের ক্ষেত্রে প্রযোজ্য। তবে এখানে উত্তরদাতার ঘুমিয়ে কাটানো সময় অন্তর্ভূক্ত হবে না।</td>
      </tr>
    </table>
  </div>
</div>



<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
	
	<label className="mb-1 block text-black dark:text-white">
    	৫ . ১ সাধারন একটি দিনে আপনি (ঘুম ব্যতীত) বসে অথবা হেলান  দিয়ে ঐরকমভাবে কত ঘন্টা সময় কাটান?
  	</label>
  	<span id="relax_information_relax"></span>


<div className="grid grid-cols-3">
<div className="flex flex-col">
ঘন্টা                    
<Field 
    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
name="relax_information.relax.hour" placeholder="Hour" type="number" min={0} max={24} />

</div>

<div className="flex flex-col justify-center">  
  <div>
	 <span className="font-medium my-2 mx-12">:</span>
  </div>
</div>

<div className="flex flex-col">
মিনিট
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

          

      <div className="my-1 grid grid-cols-2 gap-4">
            <div className="flex flex-col">                
              {
              nextState && 
              
              <button type="submit" className="w-1/2 justify-center rounded bg-[#f1e56c] p-3 font-medium text-black">
              Submit
              </button>

              }
            </div>
            <div className="flex flex-col">
              <button id="terminate" type='button' className="w-1/2 justify-center rounded bg-[#f1e56c] p-3 font-medium text-black" onClick={GoNext}>
              Next
              </button>
            </div>
        </div>

                
          
        </div>        
        </>

    )
};
export default Relaxinformation;
    