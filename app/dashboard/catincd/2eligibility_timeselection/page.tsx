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

import district_data from "@/app/json/district.json";
import citycorporation_data from "@/app/json/citycorporation.json";
import municipality_data from "@/app/json/municipality.json";
import upazilla_data from "@/app/json/upazilla.json";

//Logical On Off
import { disable_logic, skip_logic } from "@/app/api/logic-checker";

const Eligibilitytimeselection = ()=>{

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

const next_url = "3demographic_information";


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
        <td className="border border-slate-300 w-2/4 p-1">উত্তরদাতা জরিপে অংশগ্রহণে এখনই সম্মত হলে, অথবা অন্যসময়ে সম্মত হলে, যোগ্য কিনা জানতে যোগ্যতা যাঁচাইমূলক পরবর্তী প্রশ্নগুলো করুনঃ<br/>আপনি এই জরিপটিতে অংশগ্রহণ করতে পারবেন কিনা তা জানার জন্য এখন আমি কিছু প্রশ্ন করব।</td>
      </tr>
    </table>
  </div>
</div>


<div>

<span id="eligibility_timeselection_gender"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ২.১ আপনি পুরুষ না মহিলা?
  </label>
  
{ option_data.eligibility_timeselection.gender && option_data.eligibility_timeselection.gender.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="eligibility_timeselection.gender"
            checked={values.eligibility_timeselection.gender.value === v.value}
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
  errors.eligibility_timeselection
  &&
  errors.eligibility_timeselection.gender
  &&
  touched.eligibility_timeselection
  &&
  touched.eligibility_timeselection.gender && ( 
      <span className="mb-3 font-semibold text-[#B45454]">
          {errors.eligibility_timeselection.gender.label}
      </span>   
  )}
</div>
<div className="flex flex-col">
  <div className="py-2">
  প্রয়োজনে প্রাসঙ্গিক প্রশ্ন করতে হলে করুন তবে সরাসরি প্রশ্ন নয়।
  </div>
</div>
</div>

</div>

{values.eligibility_timeselection.gender.value > 0 && (
<div>
<span id="eligibility_timeselection_age"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
    <label className="mb-1 block text-black dark:text-white">
      ২.২ আপনার বয়স কত? পূর্ণ বছরে .............(সংখ্যা লিখুন)
    </label>
    
    <SelectNonCreatableComponent defaultValueArray={{ "label":"","value":"" }}
                                 placeholder="Select Age"
                                 isSearchable
                                 isClearable                                 
                                  name="eligibility_timeselection.age" options={option_data.eligibility_timeselection.age}

                                  onParentChange={(v:any, name:any) => {
                
                //alert(name);

                disable_logic(name,v.value, setFieldValue,["range","is" ]);
                
 redirect_or_focus_location(v,name,"age_dropdown"); 
                
                
                
            
            }} 
                                  
                      />
  
  
  {
    errors.eligibility_timeselection
    &&
    errors.eligibility_timeselection.age
    &&
    touched.eligibility_timeselection
    &&
    touched.eligibility_timeselection.age && ( 
        <span className="mb-3 font-semibold text-[#B45454]">
            {errors.eligibility_timeselection.age.label}
        </span>   
    )}
  </div>
  <div className="flex flex-col">
    <div className="py-2">
      - বয়স ১৮ বছরের নিচে হলে, বলুন য়ে আমরা এই জরিপে ১৮ বছরের উপরের মানুষের সাথে কথা বলতে চাচ্ছি; তাই ধন্যবাদ জানিয়ে শেষ করুন।<br/>- জানি না বা অস্বীকৃিতর ক্ষেত্রেও ধন্যবাদ জানিয়ে শেষ করুন।<br/>- যদি বয়স ১৮ বছরের কম বলে তাহলে প্রশ্নটি আবার করে উত্তর যাঁচাই করুন।<br/>- বয়স পূর্ণ বছরে লিখতে হবে, যেমন বয়স যদি ২৫ বছর ১১ মাস হয় তবে ২৫ বছর ধরতে হবে।<br/>- প্রয়োজনে প্রাসঙ্গিক প্রশ্ন করতে হলে করুন।
    </div>
</div>
</div>
</div>
)}
{( values.eligibility_timeselection.age.value >=18  && values.eligibility_timeselection.age.value <= 150 ) && (
<div>

<span id="eligibility_timeselection_city_or_village"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ২.৩ আপনি শহরে না গ্রামে বাস করেন?
  </label>
  
{ option_data.eligibility_timeselection.city_or_village && option_data.eligibility_timeselection.city_or_village.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="eligibility_timeselection.city_or_village"
            checked={values.eligibility_timeselection.city_or_village.value === v.value}
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
  errors.eligibility_timeselection
  &&
  errors.eligibility_timeselection.city_or_village
  &&
  touched.eligibility_timeselection
  &&
  touched.eligibility_timeselection.city_or_village && ( 
      <span className="mb-3 font-semibold text-[#B45454]">
          {errors.eligibility_timeselection.city_or_village.label}
      </span>   
  )}
</div>
<div className="flex flex-col">
  <div className="py-2">
  শহর বলতে বুঝানো হচ্ছে বিভাগ, জেলা বা উপজেলাা সদরের এলাকা (অর্থাৎ, সিটি করপোরেশন, পৌরসভা এবং ক্যান্টনমেন্ট এলাকা)।<br/>গ্রাম এলাকা হচ্ছে উপজেলাা সদরের বাইরের ইউনিয়ন সমূহের এলাকা।<br/>জানি না বা অস্বীকৃিতর ক্ষেত্রে ধন্যবাদ জানিয়ে শেষ করুন।
  </div>
</div>
</div>

</div>
)}
{(  ( values.eligibility_timeselection.age.value >=18  &&  values.eligibility_timeselection.age.value<=150  )  && 
(  values.eligibility_timeselection.city_or_village  &&  values.eligibility_timeselection.city_or_village.value < 88) 
) && (
<div>
<span id="eligibility_timeselection_district"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
    <label className="mb-1 block text-black dark:text-white">
      ২.৪.১ দয়া করে যে  জেলায় থাকেন তার নামটি বলুন।
    </label>
    
    <SelectNonCreatableComponent defaultValueArray={{"label":"","value":"","parent":""}}
                                 placeholder="Select District"
                                 isSearchable
                                 isClearable                                 
                                  name="eligibility_timeselection.district" options={district_data}

                                  onParentChange={(v:any, name:any) => {
                
                //alert(name);

                
                                
                
                
            
            }} 
                                  
                      />
  
  
  {
    errors.eligibility_timeselection
    &&
    errors.eligibility_timeselection.district
    &&
    touched.eligibility_timeselection
    &&
    touched.eligibility_timeselection.district && ( 
        <span className="mb-3 font-semibold text-[#B45454]">
            {errors.eligibility_timeselection.district.label}
        </span>   
    )}
  </div>
  <div className="flex flex-col">
    <div className="py-2">
      জেলার নাম জানার চেষ্টা করুন এবং ড্রপ-ডাউন তথ্যে ক্লিক করুন।
    </div>
</div>
</div>
</div>
)}
{(values.eligibility_timeselection.city_or_village && parseInt(values.eligibility_timeselection.city_or_village.value) < 2)  && (values.eligibility_timeselection.district && 
parseInt(values.eligibility_timeselection.district.value) > 0)  && (
<div>
<span id="eligibility_timeselection_city_corporation"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
    <label className="mb-1 block text-black dark:text-white">
      ২.৪.১.১ দয়া করে শহর এলাকার যে  সিটিকর্পোরেশন থাকেন তার নামটি বলুন।
    </label>
    
    <SelectNonCreatableComponent defaultValueArray={{"label":"","value":"","parent":""}}
                                 placeholder="Select City Corporation"
                                 isSearchable
                                 isClearable                                 
                                  name="eligibility_timeselection.city_corporation" options={citycorporation_data.filter(a=>a.parent == values.eligibility_timeselection.district.value)}

                                  onParentChange={(v:any, name:any) => {
                
                //alert(name);

                
                                
                
                
            
            }} 
                                  
                      />
  
  
  {
    errors.eligibility_timeselection
    &&
    errors.eligibility_timeselection.city_corporation
    &&
    touched.eligibility_timeselection
    &&
    touched.eligibility_timeselection.city_corporation && ( 
        <span className="mb-3 font-semibold text-[#B45454]">
            {errors.eligibility_timeselection.city_corporation.label}
        </span>   
    )}
  </div>
  <div className="flex flex-col">
    <div className="py-2">
      সিটিকর্পোরেশন নাম জানার চেষ্টা করুন এবং ড্রপ-ডাউন তথ্যে ক্লিক করুন।
    </div>
</div>
</div>
</div>
)}
{(values.eligibility_timeselection.city_or_village && values.eligibility_timeselection.city_or_village.value < 2)  && (values.eligibility_timeselection.district && 
parseInt(values.eligibility_timeselection.district.value) > 0) &&  (
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
    <label className="mb-1 block text-black dark:text-white">
      ২.৪.১.২ দয়া করে শহর এলাকার যে  পৌরসভা থাকেন তার নামটি বলুন।
    </label>
    <span id="eligibility_timeselection_municipal"></span>
    <SelectComponent defaultValueArray={{"label":"","value":"","parent":""}}
                                 placeholder="Select Municipal"
                                 isSearchable
                                 isClearable                                 
                                  name="eligibility_timeselection.municipal" options={municipality_data.filter(a=>a.parent == values.eligibility_timeselection.district.value)}
                                  onParentChange={(v:any, name:any) => {
                
                //alert(name);

                
                                
                
                
            
            }} 
                                  
                      />
  
  
  {
    errors.eligibility_timeselection
    &&
    errors.eligibility_timeselection.municipal
    &&
    touched.eligibility_timeselection
    &&
    touched.eligibility_timeselection.municipal && ( 
        <span className="mb-3 font-semibold text-[#B45454]">
            {errors.eligibility_timeselection.municipal.label}
        </span>   
    )}
  </div>
  <div className="flex flex-col">
    <div className="py-2">
      পৌরসভা নাম জানার চেষ্টা করুন এবং ড্রপ-ডাউন তথ্যে ক্লিক করুন।
    </div>
</div>
</div>
)}
{(values.eligibility_timeselection.city_or_village && (values.eligibility_timeselection.city_or_village.value > 1 && values.eligibility_timeselection.city_or_village.value < 88 )) && (values.eligibility_timeselection.district && 
parseInt(values.eligibility_timeselection.district.value) > 0) && (
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
    <label className="mb-1 block text-black dark:text-white">
      ২.৪.১.৩ দয়া করে গ্রাম এলাকার যে উপজেলা থাকেন তার নামটি বলুন।
    </label>
    <span id="eligibility_timeselection_upazilla"></span>
    <SelectComponent defaultValueArray={{"label":"","value":"","parent":""}}
                                 placeholder="Select Upazilla"
                                 isSearchable
                                 isClearable                                 
                                  name="eligibility_timeselection.upazilla" options={upazilla_data.filter(a=>a.parent == values.eligibility_timeselection.district.value)}
                                  onParentChange={(v:any, name:any) => {
                
                //alert(name);

                
                                
                
                
            
            }} 
                                  
                      />
  
  
  {
    errors.eligibility_timeselection
    &&
    errors.eligibility_timeselection.upazilla
    &&
    touched.eligibility_timeselection
    &&
    touched.eligibility_timeselection.upazilla && ( 
        <span className="mb-3 font-semibold text-[#B45454]">
            {errors.eligibility_timeselection.upazilla.label}
        </span>   
    )}
  </div>
  <div className="flex flex-col">
    <div className="py-2">
      উপজেলা নাম জানার চেষ্টা করুন এবং ড্রপ-ডাউন তথ্যে ক্লিক করুন।
    </div>
</div>
</div>
)}
{( ( values.eligibility_timeselection.age.value >=18 && values.eligibility_timeselection.age.value<=150  ) && (values.eligibility_timeselection.city_or_village && values.eligibility_timeselection.city_or_village.value < 88) ) && (
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
    <label className="mb-1 block text-black dark:text-white">
      ২. ৫ আপনি সর্বোচ্চ কতদূর পর্যন্ত পড়াশুনা করেছেন?
    </label>
    <span id="eligibility_timeselection_education"></span>
    <SelectComponent defaultValueArray={{"label":"","value":""}}
                                 placeholder="Select Education"
                                 isSearchable
                                 isClearable                                 
                                  name="eligibility_timeselection.education" options={option_data.eligibility_timeselection.education}
                                  onParentChange={(v:any, name:any) => {
                
                //alert(name);

                
                                
                
                
            
            }} 
                                  
                      />
  
  
  {
    errors.eligibility_timeselection
    &&
    errors.eligibility_timeselection.education
    &&
    touched.eligibility_timeselection
    &&
    touched.eligibility_timeselection.education && ( 
        <span className="mb-3 font-semibold text-[#B45454]">
            {errors.eligibility_timeselection.education.label}
        </span>   
    )}
  </div>
  <div className="flex flex-col">
    <div className="py-2">
      <table className='table-auto border-collapse border border-slate-400'><br/><tr className='bg-gray-2 text-left dark:bg-meta-4'><br/><th colSpan={3}>সাধারণ শিক্ষা, ইংরেজী মাধ্যম ও মাদ্রাসা শিক্ষার সমমান নিচে দেয়া হলোঃ<br/></th><br/></tr><br/><tr><td className="border border-slate-300">প্রাথমিক</td><td className="border border-slate-300">এবতেদায়ী</td><td className="border border-slate-300">৫ বছর</td></tr><br/><tr><td className="border border-slate-300">মাধ্যমিক / ও লেভেল</td><td className="border border-slate-300">দাখিল</td><td className="border border-slate-300">১০ বছর</td></tr><br/><tr><td className="border border-slate-300">উচ্চ মাধ্যমিক / এ লেভেল</td><td className="border border-slate-300">আলিম</td><td className="border border-slate-300">১২  বছর</td></tr><br/><tr><td className="border border-slate-300">স্নাতক</td><td className="border border-slate-300">ফাজিল</td><td className="border border-slate-300">১৬  বছর</td></tr><br/><tr><td className="border border-slate-300">স্নাতকোত্তর</td><td className="border border-slate-300">কামিল</td><td className="border border-slate-300">১৮  বছর</td></tr><br/><tr><td className="border border-slate-300">প্রাথমিক</td><td className="border border-slate-300">এবতেদায়ী</td><td className="border border-slate-300">৫ বছর</td></tr><br/></table><br/>যদি উত্তরদাতা প্রাথমিক শিক্ষার কিছু বছর পড়াশোনা করে থাকনে তাহলে  2 প্রাথমিক/ সমতুল্য শিক্ষা শেষ করেননি  নির্বাচন করুন।<br/>আর যদি প্রাথমিকের পরে মাধ্যমিক র্পযায়ে ক্লাস করেছেন কিন্তু মাধ্যমিক পর্যায় অতিক্রম করতে পারেননি, তাহলে 3 প্রাথমিক/ সমতুল্য শিক্ষা শেষ করেছেন নির্বাচন করুন।<br/>প্রয়োজনে প্রাসঙ্গিক প্রশ্ন করতে হলে করুন।<br/>99 অস্বীকৃিতর ক্ষেত্রে ধন্যবাদ জানিয়ে শেষ করুন।
    </div>
</div>
</div>
)}
{(values.eligibility_timeselection.city_or_village && values.eligibility_timeselection.city_or_village.value < 88)  && (
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
    ২ . ৬ দয়া করে আপনার নামটি বলুন।
  </label>
  <span id="eligibility_timeselection_name_of_person"></span>
<Field 

onChange={(e:any)=>{
  const {value, name} = e.target;  
  if(value.length > 2){
    setFieldValue("eligibility_timeselection.name_of_person.reason",{"value":"","label":""})
  }
  setFieldValue(
    name,
    value
  );

}}

    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
name="eligibility_timeselection.name_of_person.text" placeholder="Name " type="[type]" />
  

{values.eligibility_timeselection.name_of_person.text.length < 2 && <>
{ option_data.eligibility_timeselection.name_of_person && option_data.eligibility_timeselection.name_of_person.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="eligibility_timeselection.name_of_person.reason"
            checked={values.eligibility_timeselection.name_of_person.reason.value === v.value}
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

</>}

{
errors.eligibility_timeselection
&&
errors.eligibility_timeselection.name_of_person
&&
touched.eligibility_timeselection
&&
touched.eligibility_timeselection.name_of_person && ( 
    <span className="mb-3 font-semibold text-[#B45454]">
        {errors.eligibility_timeselection.name_of_person}
    </span>   
)}

</div>
<div className="flex flex-col">
  <div className="py-2">
  (লাইনটি কেটে গেলে, বা পরে আবার আপনার সাথেই ফোনে কথা বলতে হলে আপনার নামটি জানা প্রয়োজন।)<br/>কয়েকবার চেষ্টার পরও অস্বীকৃিত জানালে, পরবর্তী প্রশ্নে যান।
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
export default Eligibilitytimeselection;
    