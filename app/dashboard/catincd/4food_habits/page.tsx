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

const Foodhabits = ()=>{

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
<span id="food_habits_fruits_consumption"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
    <label className="mb-1 block text-black dark:text-white">
      ৪. ১১ প্রয়োজন হলে উদাহরণ দিন। যেমন - সাধারণ এক সপ্তাহে আপনি যদি চার দিন ফল খেয়ে থাকেন তাহলে, ৪ বলুন।<br/>যদি কোনো দিন না খেয়ে থাকে, অর্থাৎ  ০ দিন হয়, তাহলে প্রশ্ন ৪.১৩ এ যান।
    </label>
    
    <SelectNonCreatableComponent defaultValueArray={{ "label":"","value":"" }}
                                 placeholder="Select Fruit Consumption"
                                 isSearchable
                                 isClearable                                 
                                  name="food_habits.fruits_consumption" options={option_data.food_habits.fruits_consumption}

                                  onParentChange={(v:any, name:any) => {
                
                //alert(name);

                
                
 redirect_or_focus_location(v,name,"is"); 
                
                
                
            
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
      প্রয়োজন হলে উদাহরণ দিন। যেমন - সাধারণ এক সপ্তাহে আপনি যদি চার দিন ফল খেয়ে থাকেন তাহলে, ৪ বলুন।<br/>যদি কোনো দিন না খেয়ে থাকে, অর্থাৎ  ০ দিন হয়, তাহলে প্রশ্ন ৪.১৩ এ যান।
    </div>
</div>
</div>
</div>


<div>
<span id="food_habits_fruits_consumption_quantity"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
    <label className="mb-1 block text-black dark:text-white">
      ৪. ১২ আপনি কি পরিমান ফল খান এখন আমি সে সম্পর্কে কিছু প্রশ্ন করবো। <br/>মনে করুন, এক পরিবেশন ফল মানে হল, একটি কলা, পেয়ারা, আম, কমলা, আপেল বা কয়েকটি কাঁঠালের কোয়া, কুল-বড়ই বা লিচু, অথবা এক কাপ কাটা ফল।<br/>আপনি যে দিনগুলোতে ফল খান, এমন একটি দিনে এধরনের কত পরিবেশন ফল খান?<br/>অনুগ্রহ করে পরিবেশনের সংখ্যাটি বলুন।
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

{(  parseInt(values.food_habits.fruits_consumption.value) == 0   || values.food_habits.fruits_consumption_quantity.value > 0 ) && (
<div>
<span id="food_habits_vegatables_consumption"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
    <label className="mb-1 block text-black dark:text-white">
      ৪. ১৩ একটি সাধারণ সপ্তাহে আপনি কত দিন শাক-সব্জি খান?<br/>অনুগ্রহ করে দিনের সংখ্যাটি বলুন।
    </label>
    
    <SelectNonCreatableComponent defaultValueArray={{ "label":"","value":"" }}
                                 placeholder="Select Vegatables Consumption"
                                 isSearchable
                                 isClearable                                 
                                  name="food_habits.vegatables_consumption" options={option_data.food_habits.vegatables_consumption}

                                  onParentChange={(v:any, name:any) => {
                
                //alert(name);

                
                                
                
                
            
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
      যদি কোনো দিন না খেয়ে থাকে, অর্থাৎ ০ দিন হয়, <br/>তাহলে প্রশ্ন ৪.২১ - এ যান।
    </div>
</div>
</div>
</div>
)}

<div>
<span id="food_habits_vegatables_consumption_amount"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
    <label className="mb-1 block text-black dark:text-white">
      ৪. ১৪ শাক-সব্জির এক পরিবেশন মানে হল প্রায় এক কাপ সবুজ শাক-সব্জি , সালাদ অথবা আধা কাপ রান্না করা শাক-সব্জি ।<br/>আপনি যে দিনগুলোতে শাক-সব্জি খান, এমন একদিনে এধরনের কত পরিবেশন শাক-সব্জি খান? অনুগ্রহ করে পরিবেশনের সংখ্যাটি বলুন।
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

{(  parseInt(values.food_habits.vegatables_consumption.value) == 0   || values.food_habits.vegatables_consumption_amount.value > 0 ) && (
<div>

<span id="food_habits_salt_consumption"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৪. ২১ আপনার ঘরে রান্না করার সময় কতবার এধরনের লবণ, সস, আঁচার, বা চাটনি ব্যবহার করা হয়?
  </label>
  
{ option_data.food_habits.salt_consumption && option_data.food_habits.salt_consumption.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="food_habits.salt_consumption"
            checked={values.food_habits.salt_consumption.value === v.value}
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
)}

<div>

<span id="food_habits_salt_consumption_extra"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৪. ২২ আপনি কি খাবার খাওয়ার সময় পাতে বাড়তি (আলগা বা কাঁচা) লবন খান?
  </label>
  
{ option_data.food_habits.salt_consumption_extra && option_data.food_habits.salt_consumption_extra.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="food_habits.salt_consumption_extra"
            checked={values.food_habits.salt_consumption_extra.value === v.value}
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
   ৪. ২৩ আপনি কি খাবার খাওয়ার সময় লবন যুক্ত সস, আঁচার, চাটনি ইত্যাদি খান?
  </label>
  
{ option_data.food_habits.salt_consumption_mixed && option_data.food_habits.salt_consumption_mixed.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="food_habits.salt_consumption_mixed"
            checked={values.food_habits.salt_consumption_mixed.value === v.value}
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
   ৪. ২৪ আপনি সাধারনত, কত ঘনঘন প্যাকেটের লবণযুক্ত খাবার যেমন, পনির, বিস্কুট, চিপ্স, অথবা প্রক্রিয়াজাত মাছ/মাংস খান?
  </label>
  
{ option_data.food_habits.salt_consumption_frequency && option_data.food_habits.salt_consumption_frequency.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="food_habits.salt_consumption_frequency"
            checked={values.food_habits.salt_consumption_frequency.value === v.value}
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
          
        </div>        
        </>

    )
};
export default Foodhabits;
    