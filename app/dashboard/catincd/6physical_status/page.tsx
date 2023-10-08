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

const Physicalstatus = ()=>{

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

const next_url = "7smoking_related";


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
        <td className="border border-slate-300 w-2/4 p-1">আপনাকে ধন্যবাদ। এখন আপনার শারিরীক অবস্থা, চিকিৎসা এবং এর ঔষধ খাওয়া সম্পর্কে প্রশ্ন করবো।</td>
      </tr>
    </table>
  </div>
</div>

<div className="my-1 grid grid-cols-1 gap-4">
  <div className="flex flex-col">

    <table className='table-auto border-collapse border border-slate-400'>
      <tr className='bg-gray-2 text-left dark:bg-meta-4'>
        <td className="border border-slate-300 w-2/4 p-1">৬.১ রক্তচাপ</td>
        <td className="border border-slate-300 w-2/4 p-1"></td>
      </tr>
    </table>
  </div>
</div>


<div>

<span id="physical_status_blood_pressure_measured"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৬  . ১.১  কখনো ডাক্তার বা স্বাস্থ্যকর্মী আপনার রক্তচাপ বা ব্লাড প্রেশার মেপেছেন?
  </label>
  
{ option_data.physical_status.blood_pressure_measured && option_data.physical_status.blood_pressure_measured.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="physical_status.blood_pressure_measured"
            checked={values.physical_status.blood_pressure_measured.value === v.value}
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
   ৬  . ১.২  আপনাকে কখনো কি কোন ডাক্তার বা স্বাস্থ্যকর্মী জানিয়েছেন যে, আপনার উচ্চ রক্তচাপ বা হাই ব্লাড প্রেশার আছে?
  </label>
  
{ option_data.physical_status.blood_pressure_notify && option_data.physical_status.blood_pressure_notify.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="physical_status.blood_pressure_notify"
            checked={values.physical_status.blood_pressure_notify.value === v.value}
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


<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
    <label className="mb-1 block text-black dark:text-white">
      ৬  . ১.৩  গত দুই সপ্তাহে,আপনি কি কখনো উচ্চ রক্তচাপ বা হাই ব্লাড  প্রেশারের জন্য ডাক্তার বা  স্বাস্থ্যকর্মীর দেয়া কোন ঔষধ খেয়েছেন  <br/>কিংবা খাবারের ব্যাপারে কোন উপদেশ মেনে চলছেন?  (একের অধিক উত্তর হতে পারে)
    </label>
    <span id="physical_status_blood_pressure_medicare"></span>
    
    <SelectNonCreatableComponent defaultValueArray={[]}
                                 placeholder="Select Blood Pressure Medicare"
                                 isSearchable
                                 isClearable                                 
                                 isMulti
                                  name="physical_status.blood_pressure_medicare" options={option_data.physical_status.blood_pressure_medicare}

                                  onParentChange={(v:any, name:any) => {
                
                //alert(name);

                
                                
                
                
            
            }} 
                                  
                      />
  
  
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

<div className="my-1 grid grid-cols-1 gap-4">
  <div className="flex flex-col">

    <table className='table-auto border-collapse border border-slate-400'>
      <tr className='bg-gray-2 text-left dark:bg-meta-4'>
        <td className="border border-slate-300 w-2/4 p-1">৬.২ ডায়াবেটিস</td>
        <td className="border border-slate-300 w-2/4 p-1"></td>
      </tr>
    </table>
  </div>
</div>


<div>

<span id="physical_status_blood_sugar_diabetics_measured"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৬.২.১ কখনো ডাক্তার বা স্বাস্থ্যকর্মী আপনার রক্তের সুগার/ডায়াবেটিস মেপেছেন?
  </label>
  
{ option_data.physical_status.blood_sugar_diabetics_measured && option_data.physical_status.blood_sugar_diabetics_measured.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="physical_status.blood_sugar_diabetics_measured"
            checked={values.physical_status.blood_sugar_diabetics_measured.value === v.value}
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
  errors.physical_status
  &&
  errors.physical_status.blood_sugar_diabetics_measured
  &&
  touched.physical_status
  &&
  touched.physical_status.blood_sugar_diabetics_measured && ( 
      <span className="mb-3 font-semibold text-[#B45454]">
          {errors.physical_status.blood_sugar_diabetics_measured.label}
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

<span id="physical_status_blood_sugar_diabetics_notify"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৬.২.২ আপনাকে ডাক্তার অথবা কোন স্বাস্থ্যকর্মী কি জানিয়েছেন যে, আপনার রক্তে সুগার বেশী আছে অথবা আপনার ডায়াবেটিস আছে?
  </label>
  
{ option_data.physical_status.blood_sugar_diabetics_notify && option_data.physical_status.blood_sugar_diabetics_notify.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="physical_status.blood_sugar_diabetics_notify"
            checked={values.physical_status.blood_sugar_diabetics_notify.value === v.value}
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
  errors.physical_status
  &&
  errors.physical_status.blood_sugar_diabetics_notify
  &&
  touched.physical_status
  &&
  touched.physical_status.blood_sugar_diabetics_notify && ( 
      <span className="mb-3 font-semibold text-[#B45454]">
          {errors.physical_status.blood_sugar_diabetics_notify.label}
      </span>   
  )}
</div>
<div className="flex flex-col">
  <div className="py-2">
  
  </div>
</div>
</div>

</div>


<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
    <label className="mb-1 block text-black dark:text-white">
      ৬.২.৩ গত দুই সপ্তাহে,আপনি কি ডায়াবেটিসের জন্য ডাক্তার বা স্বাস্থ্যকর্মীর দেয়া কোন ঔষধ গ্রহণ করেছেন (এলোপ্যাথিক ট্যাবলেট/ইনসুলিন) অথবা কোন উপদেশ মেনে চলেছেন? (একের অধিক উত্তর হতে পারে)
    </label>
    <span id="physical_status_diabetic_medicine_taken"></span>
    
    <SelectNonCreatableComponent defaultValueArray={[]}
                                 placeholder="Select Diabetics Medicine Taken"
                                 isSearchable
                                 isClearable                                 
                                 isMulti
                                  name="physical_status.diabetic_medicine_taken" options={option_data.physical_status.diabetic_medicine_taken}

                                  onParentChange={(v:any, name:any) => {
                
                //alert(name);

                
                                
                
                
            
            }} 
                                  
                      />
  
  
  {
    errors.physical_status
    &&
    errors.physical_status.diabetic_medicine_taken
    &&
    touched.physical_status
    &&
    touched.physical_status.diabetic_medicine_taken && ( 
        <span className="mb-3 font-semibold text-[#B45454]">
            {errors.physical_status.diabetic_medicine_taken}
        </span>   
    )}
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
export default Physicalstatus;
    