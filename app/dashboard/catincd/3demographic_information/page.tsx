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

const Demographicinformation = ()=>{

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

const next_url = "4food_habits";


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
        <td className="border border-slate-300 w-2/4 p-1">আমি এখন আপনার সম্পর্কে আরো কিছু প্রশ্ন করবো।</td>
      </tr>
    </table>
  </div>
</div>


<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
    <label className="mb-1 block text-black dark:text-white">
      ৩. ১ আপনি কোন ধর্মের অনুসারী?
    </label>
    <span id="demographic_information_religion"></span>
    <SelectComponent defaultValueArray={{"label":"","value":""}}
                                 placeholder="Select Religion"
                                 isSearchable
                                 isClearable                                 
                                  name="demographic_information.religion" options={option_data.demographic_information.religion}
                                  onParentChange={(v:any, name:any) => {
                
                //alert(name);

                
                                
                
                
            
            }} 
                                  
                      />
  
  
  {
    errors.demographic_information
    &&
    errors.demographic_information.religion
    &&
    touched.demographic_information
    &&
    touched.demographic_information.religion && ( 
        <span className="mb-3 font-semibold text-[#B45454]">
            {errors.demographic_information.religion.label}
        </span>   
    )}
  </div>
  <div className="flex flex-col">
    <div className="py-2">
      উত্তরদাতা যে ধর্মের অনুসারী তা নির্বাচন করুন।
    </div>
</div>
</div>


<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
    <label className="mb-1 block text-black dark:text-white">
      ৩ . ২ আপনার বর্তমান বৈবাহিক অবস্থা জানাবেন কি?
    </label>
    <span id="demographic_information_marital_status"></span>
    <SelectComponent defaultValueArray={{"label":"","value":""}}
                                 placeholder="Select Marital status"
                                 isSearchable
                                 isClearable                                 
                                  name="demographic_information.marital_status" options={option_data.demographic_information.marital_status}
                                  onParentChange={(v:any, name:any) => {
                
                //alert(name);

                
                                
                
                
            
            }} 
                                  
                      />
  
  
  {
    errors.demographic_information
    &&
    errors.demographic_information.marital_status
    &&
    touched.demographic_information
    &&
    touched.demographic_information.marital_status && ( 
        <span className="mb-3 font-semibold text-[#B45454]">
            {errors.demographic_information.marital_status.label}
        </span>   
    )}
  </div>
  <div className="flex flex-col">
    <div className="py-2">
      
    </div>
</div>
</div>


<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
    <label className="mb-1 block text-black dark:text-white">
      ৩ . ৩  গত ১২ মাসে আপনার প্রধান পেশা কি ছিল (আপনি কি কাজ করেছেন)?
    </label>
    <span id="demographic_information_occupation"></span>
    <SelectComponent defaultValueArray={{"label":"","value":""}}
                                 placeholder="Select Occupation"
                                 isSearchable
                                 isClearable                                 
                                  name="demographic_information.occupation" options={option_data.demographic_information.occupation}
                                  onParentChange={(v:any, name:any) => {
                
                //alert(name);

                
                                
                
                
            
            }} 
                                  
                      />
  
  
  {
    errors.demographic_information
    &&
    errors.demographic_information.occupation
    &&
    touched.demographic_information
    &&
    touched.demographic_information.occupation && ( 
        <span className="mb-3 font-semibold text-[#B45454]">
            {errors.demographic_information.occupation.label}
        </span>   
    )}
  </div>
  <div className="flex flex-col">
    <div className="py-2">
      যদি তথ্য প্রদানকারী গত ১২ মাসে একাধিক পেশায় নিযুক্ত থাকেন তা হলে <br/>তিনি যে পেশাটিতে বেশি সময় ব্যয় করেছেন এবং প্রধান হিসেবে বিবেচনা করেন তা লিপিবদ্ধ করুন।<br/>সঠিক উত্তরটি নির্বাচন করুন।
    </div>
</div>
</div>


<div>

<span id="demographic_information_current_location"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৩. ৪ আপনি কি বর্তমানে আপনার মূল পরিবার/খানার সাথে থাকেন?
  </label>
  
{ option_data.demographic_information.current_location && option_data.demographic_information.current_location.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="demographic_information.current_location"
            checked={values.demographic_information.current_location.value === v.value}
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
  errors.demographic_information
  &&
  errors.demographic_information.current_location
  &&
  touched.demographic_information
  &&
  touched.demographic_information.current_location && ( 
      <span className="mb-3 font-semibold text-[#B45454]">
          {errors.demographic_information.current_location.label}
      </span>   
  )}
</div>
<div className="flex flex-col">
  <div className="py-2">
  এখানে আলাদা বলতে বেশিরভাগ সময় পরিবার থেকে আলাদা থাকেন বোঝানো হচ্ছে, <br/>অর্থাৎ মেসে, হোস্টেলে, মাদ্রাসায়, ডরমিটরিতে, ব্যারাকে, হোটেলে, পেয়িং গেস্ট/সাবলেট/ মেহমান হিসেবে, বা চাকুরিসূত্রে অন্যত্র থাকেন।
  </div>
</div>
</div>

</div>



<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
	
	<label className="mb-1 block text-black dark:text-white">
    	৩. ৫ (আপনি ও শিশু সহ) আপনার মূল পরিবারে/খানায় বর্তমানে মোট কয়জন বাস করেন?<br/>(একই খানায় ঘুমান এবং এক পাতিলের রান্না খান)
  	</label>
  	<span id="demographic_information_man_women_count"></span>


<div className="grid grid-cols-4">
<div className="flex flex-col">
  পুরুষ
<Field 
    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
name="demographic_information.man_women_count.man" placeholder="পুরুষ" type="number" />

{
    errors.demographic_information
    &&
    errors.demographic_information.man_women_count
    &&
    touched.demographic_information
    &&
    touched.demographic_information.man_women_count && ( 
        <span className="mb-3 font-semibold text-[#B45454]">
            {errors.demographic_information.man_women_count.man}
        </span>   
    )}

</div>

<div className="flex flex-col p-2">
	<span className="font-medium mt-5 mx-10">+</span>
</div>

<div className="flex flex-col">
  মহিলা
<Field 
    className="ml-0 w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
name="demographic_information.man_women_count.women" placeholder="মহিলা" type="number" />

{
    errors.demographic_information
    &&
    errors.demographic_information.man_women_count
    &&
    touched.demographic_information
    &&
    touched.demographic_information.man_women_count && ( 
        <span className="mb-3 font-semibold text-[#B45454]">
            {errors.demographic_information.man_women_count.women}
        </span>   
    )}

</div>


<div className="flex flex-col p-2">
  <span className="font-medium mt-5 mx-10">{values.demographic_information.man_women_count && (values.demographic_information.man_women_count.man + values.demographic_information.man_women_count.women)}</span>
</div>

</div>

</div>


<div className="flex flex-col">
  <div className="py-2">
  (আত্মীয়/অনাত্মীয়, সার্বক্ষণিক গার্হস্থ্য সহায়ক যিনি খানায় থাকেন এবং খান তাকে অন্তর্ভুক্ত করুন। <br/>বেড়াতে এসেছেন এমন আত্মীয়, ছুটা বুয়া- এদের অন্তর্ভুক্ত করা যাবে না।)
  </div>
</div>
</div>


<div className="my-1 grid grid-cols-1 gap-4">
  <div className="flex flex-col">

    <table className='table-auto border-collapse border border-slate-400'>
      <tr className='bg-gray-2 text-left dark:bg-meta-4'>
        <td className="border border-slate-300 w-2/4 p-1">৩.৬ আপনার মূল পরিবারে/খানায় নিচের সামগ্রী গুলো কোনগুলো আছে তা বলবেন কি?</td>
        <td className="border border-slate-300 w-2/4 p-1">পৃথক পৃথক ভাবে জিজ্ঞাসা করুন এবং উত্তর লিপিবদ্ধ করুনঃ</td>
      </tr>
    </table>
  </div>
</div>


<div>

<span id="demographic_information_have_electricity"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৩.৬.১ বিদ্যুৎ
  </label>
  
{ option_data.demographic_information.have_electricity && option_data.demographic_information.have_electricity.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="demographic_information.have_electricity"
            checked={values.demographic_information.have_electricity.value === v.value}
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
  errors.demographic_information
  &&
  errors.demographic_information.have_electricity
  &&
  touched.demographic_information
  &&
  touched.demographic_information.have_electricity && ( 
      <span className="mb-3 font-semibold text-[#B45454]">
          {errors.demographic_information.have_electricity.label}
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

<span id="demographic_information_have_flash_toilet"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৩.৬.২ ফ্লাশ পায়খানা
  </label>
  
{ option_data.demographic_information.have_flash_toilet && option_data.demographic_information.have_flash_toilet.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="demographic_information.have_flash_toilet"
            checked={values.demographic_information.have_flash_toilet.value === v.value}
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
  errors.demographic_information
  &&
  errors.demographic_information.have_flash_toilet
  &&
  touched.demographic_information
  &&
  touched.demographic_information.have_flash_toilet && ( 
      <span className="mb-3 font-semibold text-[#B45454]">
          {errors.demographic_information.have_flash_toilet.label}
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

<span id="demographic_information_have_landline_phone"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৩.৬.৩  ল্যান্ড ফোন
  </label>
  
{ option_data.demographic_information.have_landline_phone && option_data.demographic_information.have_landline_phone.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="demographic_information.have_landline_phone"
            checked={values.demographic_information.have_landline_phone.value === v.value}
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
  errors.demographic_information
  &&
  errors.demographic_information.have_landline_phone
  &&
  touched.demographic_information
  &&
  touched.demographic_information.have_landline_phone && ( 
      <span className="mb-3 font-semibold text-[#B45454]">
          {errors.demographic_information.have_landline_phone.label}
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

<span id="demographic_information_have_mobile_phone"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৩.৬.৪  মোবাইল ফোন
  </label>
  
{ option_data.demographic_information.have_mobile_phone && option_data.demographic_information.have_mobile_phone.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="demographic_information.have_mobile_phone"
            checked={values.demographic_information.have_mobile_phone.value === v.value}
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
  errors.demographic_information
  &&
  errors.demographic_information.have_mobile_phone
  &&
  touched.demographic_information
  &&
  touched.demographic_information.have_mobile_phone && ( 
      <span className="mb-3 font-semibold text-[#B45454]">
          {errors.demographic_information.have_mobile_phone.label}
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

<span id="demographic_information_have_television"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৩.৬.৫  টেলিভিশন
  </label>
  
{ option_data.demographic_information.have_television && option_data.demographic_information.have_television.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="demographic_information.have_television"
            checked={values.demographic_information.have_television.value === v.value}
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
  errors.demographic_information
  &&
  errors.demographic_information.have_television
  &&
  touched.demographic_information
  &&
  touched.demographic_information.have_television && ( 
      <span className="mb-3 font-semibold text-[#B45454]">
          {errors.demographic_information.have_television.label}
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

<span id="demographic_information_have_refrigerator"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৩.৬.৬ রেফ্রিজারেটর
  </label>
  
{ option_data.demographic_information.have_refrigerator && option_data.demographic_information.have_refrigerator.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="demographic_information.have_refrigerator"
            checked={values.demographic_information.have_refrigerator.value === v.value}
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
  errors.demographic_information
  &&
  errors.demographic_information.have_refrigerator
  &&
  touched.demographic_information
  &&
  touched.demographic_information.have_refrigerator && ( 
      <span className="mb-3 font-semibold text-[#B45454]">
          {errors.demographic_information.have_refrigerator.label}
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

<span id="demographic_information_have_washing_machine"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৩.৬.৭ ওয়াশিং মেশিন
  </label>
  
{ option_data.demographic_information.have_washing_machine && option_data.demographic_information.have_washing_machine.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="demographic_information.have_washing_machine"
            checked={values.demographic_information.have_washing_machine.value === v.value}
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
  errors.demographic_information
  &&
  errors.demographic_information.have_washing_machine
  &&
  touched.demographic_information
  &&
  touched.demographic_information.have_washing_machine && ( 
      <span className="mb-3 font-semibold text-[#B45454]">
          {errors.demographic_information.have_washing_machine.label}
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

<span id="demographic_information_have_computer_or_laptop"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৩.৬.৮ কম্পিউটার/ল্যাপটপ
  </label>
  
{ option_data.demographic_information.have_computer_or_laptop && option_data.demographic_information.have_computer_or_laptop.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="demographic_information.have_computer_or_laptop"
            checked={values.demographic_information.have_computer_or_laptop.value === v.value}
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
  errors.demographic_information
  &&
  errors.demographic_information.have_computer_or_laptop
  &&
  touched.demographic_information
  &&
  touched.demographic_information.have_computer_or_laptop && ( 
      <span className="mb-3 font-semibold text-[#B45454]">
          {errors.demographic_information.have_computer_or_laptop.label}
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

<span id="demographic_information_have_bycycle"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৩.৬.৯ বাই সাইকেল
  </label>
  
{ option_data.demographic_information.have_bycycle && option_data.demographic_information.have_bycycle.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="demographic_information.have_bycycle"
            checked={values.demographic_information.have_bycycle.value === v.value}
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
  errors.demographic_information
  &&
  errors.demographic_information.have_bycycle
  &&
  touched.demographic_information
  &&
  touched.demographic_information.have_bycycle && ( 
      <span className="mb-3 font-semibold text-[#B45454]">
          {errors.demographic_information.have_bycycle.label}
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

<span id="demographic_information_have_rickshaw"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৩.৬.১০ রিক্সা
  </label>
  
{ option_data.demographic_information.have_rickshaw && option_data.demographic_information.have_rickshaw.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="demographic_information.have_rickshaw"
            checked={values.demographic_information.have_rickshaw.value === v.value}
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
  errors.demographic_information
  &&
  errors.demographic_information.have_rickshaw
  &&
  touched.demographic_information
  &&
  touched.demographic_information.have_rickshaw && ( 
      <span className="mb-3 font-semibold text-[#B45454]">
          {errors.demographic_information.have_rickshaw.label}
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

<span id="demographic_information_have_private_car"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৩.৬.১১  প্রাইভেট কার
  </label>
  
{ option_data.demographic_information.have_private_car && option_data.demographic_information.have_private_car.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="demographic_information.have_private_car"
            checked={values.demographic_information.have_private_car.value === v.value}
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
  errors.demographic_information
  &&
  errors.demographic_information.have_private_car
  &&
  touched.demographic_information
  &&
  touched.demographic_information.have_private_car && ( 
      <span className="mb-3 font-semibold text-[#B45454]">
          {errors.demographic_information.have_private_car.label}
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

<span id="demographic_information_have_moped_scooter_bike_autorickhshaw"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৩.৬.১২ মপেড/স্কুটার/মোটর সাইকেল/অটোরিক্সা
  </label>
  
{ option_data.demographic_information.have_moped_scooter_bike_autorickhshaw && option_data.demographic_information.have_moped_scooter_bike_autorickhshaw.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="demographic_information.have_moped_scooter_bike_autorickhshaw"
            checked={values.demographic_information.have_moped_scooter_bike_autorickhshaw.value === v.value}
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
  errors.demographic_information
  &&
  errors.demographic_information.have_moped_scooter_bike_autorickhshaw
  &&
  touched.demographic_information
  &&
  touched.demographic_information.have_moped_scooter_bike_autorickhshaw && ( 
      <span className="mb-3 font-semibold text-[#B45454]">
          {errors.demographic_information.have_moped_scooter_bike_autorickhshaw.label}
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
export default Demographicinformation;
    