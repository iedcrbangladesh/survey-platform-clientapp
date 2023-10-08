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

const Drinkingrelated = ()=>{

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

const next_url = "9finish";


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
        <td className="border border-slate-300 w-2/4 p-1">পরবর্তী প্রশ্নগুলো হচ্ছে মদ (যেমন, বিয়ার, ওয়াইন, স্পিরিট, হুইস্কি, ভদকা, জিন, রাম, তারি, চোলাই, চুয়ানি, কেরু, বাংলা বা দেশী মদ ইত্যাদি) খাওয়া সম্পর্কে। <br/>কোন প্রশ্ন আবার শুনতে চাইলে পূনরায় জানতে চাইতে পারেন এবং কোন প্রশ্নের উত্তর দিতে না চাইলে জানাতে পারেন। আরো জনাচ্ছি, আপনার তথ্য অন্য কারো কাছে প্রকাশ করা হবে না।পরবর্তী প্রশ্নগুলো হচ্ছে মদ (যেমন, বিয়ার, ওয়াইন, স্পিরিট, হুইস্কি, ভদকা, জিন, রাম, তারি, চোলাই, চুয়ানি, কেরু, বাংলা বা দেশী মদ ইত্যাদি) খাওয়া সম্পর্কে। <br/>কোন প্রশ্ন আবার শুনতে চাইলে পূনরায় জানতে চাইতে পারেন এবং কোন প্রশ্নের উত্তর দিতে না চাইলে জানাতে পারেন। আরো জনাচ্ছি, আপনার তথ্য অন্য কারো কাছে প্রকাশ করা হবে না।</td>
      </tr>
    </table>
  </div>
</div>


<div>

<span id="drinking_related_alchohol_usage"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৮ . ১ আপনি কি গত ১২ মাসে কোন ধরণের মদ পান করেছেন?
  </label>
  
{ option_data.drinking_related.alchohol_usage && option_data.drinking_related.alchohol_usage.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="drinking_related.alchohol_usage"
            checked={values.drinking_related.alchohol_usage.value === v.value}
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
  উত্তর না হলে বা অস্বীকৃতি জানালে সমাপনি বক্তব্য দিন।
  </div>
</div>
</div>

</div>

{values.drinking_related.alchohol_usage.value == 1 && (
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
)}
{( values.drinking_related.alchohol_usage.value == 1 && values.drinking_related.alchohol_usage_frequency.value < 99) && (
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
)}

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
export default Drinkingrelated;
    