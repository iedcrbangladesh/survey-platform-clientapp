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

const Foodhabits = ()=>{

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

const next_url = "5relax_information";


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
        <td className="border border-slate-300 w-2/4 p-1">পরবর্তী প্রশ্নগুলোতে, আপনি যেসব ফল, শাক-সবজি খান এবং আপনার লবণ (বা নুন) খাওয়ার অভ্যাস সম্পর্কে প্রশ্ন করবো। উত্তর দেয়ার সময় যে কোন একটি সাধারণ সপ্তাহের কথা চিন্তা করবেন (সাধারণ সপ্তাহ বলতে ধর্মীয় বা অন্য কোন বিশেষ উপলক্ষ ব্যতীত একটি স্বাভাবিক সপ্তাহ বুঝায়)। কোনো প্রশ্ন বুঝতে বা আবার শুনতে চাইলে জিজ্ঞেস করবেন।</td>
      </tr>
    </table>
  </div>
</div>

<div className="my-1 grid grid-cols-1 gap-4">
  <div className="flex flex-col">

    <table className='table-auto border-collapse border border-slate-400'>
      <tr className='bg-gray-2 text-left dark:bg-meta-4'>
        <td className="border border-slate-300 w-2/4 p-1">৪.১ ফল, শাক—সবজিঃ</td>
        <td className="border border-slate-300 w-2/4 p-1"></td>
      </tr>
    </table>
  </div>
</div>


<div>
<span id="food_habits_fruits_consumption"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
    <label className="mb-1 block text-black dark:text-white">
      ৪. ১.১ সপ্তাহের কত দিন আপনি ফল (যেমন, কলা, পেয়ারা, আম, কমলা, আপেল বা কয়েকটি কাঁঠালের কোয়া, <br/>খেজুর, কুল—বড়ই বা লিচু, অথবা এক কাপ কাটা ফল) খান?<br/>অনুগ্রহ করে দিনের সংখ্যাটি বলুন।
    </label>
    
    <SelectNonCreatableComponent defaultValueArray={{ "label":"","value":"" }}
                                 placeholder="Select Fruit Consumption"
                                 isSearchable
                                 isClearable                                 
                                  name="food_habits.fruits_consumption" options={option_data.food_habits.fruits_consumption}

                                  onParentChange={(v:any, name:any) => {
                
                //alert(name);

                
                
 redirect_or_focus_location(v,name,"age_dropdown"); 
                
                
                
            
            }} 
                                  
                      />
  
  
  {
    errors.food_habits
    &&
    errors.food_habits.fruits_consumption
    &&
    touched.food_habits
    &&
    touched.food_habits.fruits_consumption && ( 
        <span className="mb-3 font-semibold text-[#B45454]">
            {errors.food_habits.fruits_consumption.label}
        </span>   
    )}
  </div>
  <div className="flex flex-col">
    <div className="py-2">
      প্রয়োজন হলে উদাহরণ দিন। যেমন - সাধারণ এক সপ্তাহে আপনি যদি চার দিন ফল খেয়ে থাকেন তাহলে, ৪ বলুন।<br/>যদি কোনো দিন না খেয়ে থাকে, অর্থাৎ  ০ দিন হয়, তাহলে প্রশ্ন ৪.১.৩ এ যান।
    </div>
</div>
</div>
</div>

{parseInt(values.food_habits.fruits_consumption.value) >  0  && (
<div>
<span id="food_habits_fruits_consumption_quantity"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
    <label className="mb-1 block text-black dark:text-white">
      ৪. ১.২ আপনি কি পরিমান ফল খান এখন আমি সে সম্পর্কে কিছু প্রশ্ন করবো। মনে করুন, এক পরিবেশন ফল মানে হল, একটি কলা, পেয়ারা, আম, কমলা, আপেল বা কয়েকটি কাঁঠালের কোয়া, খেজুর, কুল—বড়ই বা লিচু, অথবা এক কাপ কাটা ফল।<br/>আপনি যে দিনগুলোতে ফল খান, এমন একটি দিনে এধরনের কত পরিবেশন ফল খান?<br/>অনুগ্রহ করে পরিবেশনের সংখ্যাটি বলুন।
    </label>
    
    <SelectNonCreatableComponent defaultValueArray={{ "label":"","value":"" }}
                                 placeholder="Select Fruit Consumption Quantity"
                                 isSearchable
                                 isClearable                                 
                                  name="food_habits.fruits_consumption_quantity" options={option_data.food_habits.fruits_consumption_quantity}

                                  onParentChange={(v:any, name:any) => {
                
                //alert(name);

                
                                
                
                
            
            }} 
                                  
                      />
  
  
  {
    errors.food_habits
    &&
    errors.food_habits.fruits_consumption_quantity
    &&
    touched.food_habits
    &&
    touched.food_habits.fruits_consumption_quantity && ( 
        <span className="mb-3 font-semibold text-[#B45454]">
            {errors.food_habits.fruits_consumption_quantity.label}
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

<div>
<span id="food_habits_vegatables_consumption"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
    <label className="mb-1 block text-black dark:text-white">
      ৪. ১.৩ একটি সাধারণ সপ্তাহে আপনি কত দিন শাক-সব্জি খান?<br/>অনুগ্রহ করে দিনের সংখ্যাটি বলুন।
    </label>
    
    <SelectNonCreatableComponent defaultValueArray={{ "label":"","value":"" }}
                                 placeholder="Select Vegatables Consumption"
                                 isSearchable
                                 isClearable                                 
                                  name="food_habits.vegatables_consumption" options={option_data.food_habits.vegatables_consumption}

                                  onParentChange={(v:any, name:any) => {
                
                //alert(name);

                
                
 redirect_or_focus_location(v,name,"age_dropdown"); 
                
                
                
            
            }} 
                                  
                      />
  
  
  {
    errors.food_habits
    &&
    errors.food_habits.vegatables_consumption
    &&
    touched.food_habits
    &&
    touched.food_habits.vegatables_consumption && ( 
        <span className="mb-3 font-semibold text-[#B45454]">
            {errors.food_habits.vegatables_consumption.label}
        </span>   
    )}
  </div>
  <div className="flex flex-col">
    <div className="py-2">
      যদি কোনো দিন না খেয়ে থাকে, অর্থাৎ ০ দিন হয়, <br/>তাহলে প্রশ্ন ৪.২ - এ যান।
    </div>
</div>
</div>
</div>

{parseInt(values.food_habits.vegatables_consumption.value) >  0  && (
<div>
<span id="food_habits_vegatables_consumption_amount"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
    <label className="mb-1 block text-black dark:text-white">
      ৪. ১.৪ শাক-সবজির এক পরিবেশন মানে হল <br/>প্রায় এক কাপ সবুজ শাক-সবজি, সালাদ অথবা আধা কাপ রান্না করা শাক-সবজি।<br/>আপনি যে দিনগুলোতে শাক-সবজি খান, <br/>এমন একদিনে এধরনের কত পরিবেশন শাক-সবজি খান? অনুগ্রহ করে পরিবেশনের সংখ্যাটি বলুন।
    </label>
    
    <SelectNonCreatableComponent defaultValueArray={{ "label":"","value":"" }}
                                 placeholder="Select Vegatables Consumption Amount"
                                 isSearchable
                                 isClearable                                 
                                  name="food_habits.vegatables_consumption_amount" options={option_data.food_habits.vegatables_consumption_amount}

                                  onParentChange={(v:any, name:any) => {
                
                //alert(name);

                
                                
                
                
            
            }} 
                                  
                      />
  
  
  {
    errors.food_habits
    &&
    errors.food_habits.vegatables_consumption_amount
    &&
    touched.food_habits
    &&
    touched.food_habits.vegatables_consumption_amount && ( 
        <span className="mb-3 font-semibold text-[#B45454]">
            {errors.food_habits.vegatables_consumption_amount.label}
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
        <td className="border border-slate-300 w-2/4 p-1">৪.২ খাদ্যে লবণঃ</td>
        <td className="border border-slate-300 w-2/4 p-1">পরবর্তী প্রশ্নগুলোর মাধ্যমে আমরা আপনার খাদ্যে লবণের ব্যবহার সম্পর্কে জানব। খাদ্য লবণ হচ্ছেঃ সাধারণ লবণ, সামুদ্রিক লবণ, আয়োডিন যুক্ত লবণ, বিট লবণ, টেস্টিং সল্ট, লবণযুক্ত খাবার, যেমনঃ সস (সয়া সস, ফিস সস, টমাটো সস), চিপস, সল্টেড বিস্কিট ইত্যাদি। উত্তর দেয়ার সময় এধরনের সকল লবনের উৎস বা লবণযুক্ত খাবার সম্পর্কে চিন্তা করুন।</td>
      </tr>
    </table>
  </div>
</div>


<div>

<span id="food_habits_salt_consumption"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৪. ২.১ আপনার ঘরে রান্না করার সময় কতবার এধরনের লবণ, সস, আঁচার, বা চাটনি ব্যবহার করা হয়?
  </label>
  
{ option_data.food_habits.salt_consumption && option_data.food_habits.salt_consumption.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="food_habits.salt_consumption"
            checked={values.food_habits.salt_consumption.value === v.value}
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
  errors.food_habits
  &&
  errors.food_habits.salt_consumption
  &&
  touched.food_habits
  &&
  touched.food_habits.salt_consumption && ( 
      <span className="mb-3 font-semibold text-[#B45454]">
          {errors.food_habits.salt_consumption.label}
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

<span id="food_habits_salt_consumption_extra"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৪. ২.২ আপনি কি খাবার খাওয়ার সময় পাতে বাড়তি (আলগা বা কাঁচা) লবন খান?
  </label>
  
{ option_data.food_habits.salt_consumption_extra && option_data.food_habits.salt_consumption_extra.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="food_habits.salt_consumption_extra"
            checked={values.food_habits.salt_consumption_extra.value === v.value}
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
  errors.food_habits
  &&
  errors.food_habits.salt_consumption_extra
  &&
  touched.food_habits
  &&
  touched.food_habits.salt_consumption_extra && ( 
      <span className="mb-3 font-semibold text-[#B45454]">
          {errors.food_habits.salt_consumption_extra.label}
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

<span id="food_habits_salt_consumption_mixed"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৪. ২.৩ আপনি কি খাবার খাওয়ার সময় লবন যুক্ত সস, আঁচার, চাটনি ইত্যাদি খান?
  </label>
  
{ option_data.food_habits.salt_consumption_mixed && option_data.food_habits.salt_consumption_mixed.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="food_habits.salt_consumption_mixed"
            checked={values.food_habits.salt_consumption_mixed.value === v.value}
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
  errors.food_habits
  &&
  errors.food_habits.salt_consumption_mixed
  &&
  touched.food_habits
  &&
  touched.food_habits.salt_consumption_mixed && ( 
      <span className="mb-3 font-semibold text-[#B45454]">
          {errors.food_habits.salt_consumption_mixed.label}
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

<span id="food_habits_salt_consumption_frequency"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৪. ২.৪ আপনি সাধারনত, কত ঘন ঘন প্যাকেটের লবণযুক্ত খাবার যেমন, পনির, বিস্কুট, চিপস, অথবা প্রক্রিয়াজাত মাছ/মাংস খান?
  </label>
  
{ option_data.food_habits.salt_consumption_frequency && option_data.food_habits.salt_consumption_frequency.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="food_habits.salt_consumption_frequency"
            checked={values.food_habits.salt_consumption_frequency.value === v.value}
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
  errors.food_habits
  &&
  errors.food_habits.salt_consumption_frequency
  &&
  touched.food_habits
  &&
  touched.food_habits.salt_consumption_frequency && ( 
      <span className="mb-3 font-semibold text-[#B45454]">
          {errors.food_habits.salt_consumption_frequency.label}
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
export default Foodhabits;
    