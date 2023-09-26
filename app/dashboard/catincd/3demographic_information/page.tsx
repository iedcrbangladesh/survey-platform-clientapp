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

const Demographicinformation = ()=>{

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
      ৩. ১ আপনি কোন র্ধমরে অনুসারী?
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
      উত্তরদাতা যে র্ধমরে অনুসারী তা নির্বাচন করুন।
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
      ৩ . ৩  গত ১২ মাসে আপনার প্রধান পেশা কি ছলি (আপনি কি কাজ করেছেন)?
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
      যদি তথ্য প্রদাণকারী গত ১২ মাসে একাধকি পেশায় নিযুক্ত থাকেন তা হলে তিনি যে পেশাটিতে বেশি সময় ব্যায় করছেনে এবং প্রধাণ হিসেবে বিবেচনা করেন তা লিপিবদ্ধ করুন।<br/>সঠিক উত্তরটি নির্বাচন করুন।<br/>এই প্রশ্নরে মূল উদ্দশ্যে হচ্ছে তথ্য প্রদাণকারীর পেশা ও অন্য প্রশ্নের উত্তরের সাথে সম্পর্ক দেখা। যেমনঃ তার  পশোর সাথে অসংক্রামক রোগরে ঝুঁকরি সম্পৃক্ততা।
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
    	৩. ৫ শিশু সহ আপনার মূল পরিবারে/খানায় বর্তমানে মোট কয়জন বাস করেন?<br/>(একই খানায় ঘুমান এবং এক পাতিলের রান্না খান)
  	</label>
  	<span id="demographic_information_man_women_count"></span>


<div className="grid grid-cols-4">
<div className="flex flex-col">
  পুরুষ
<Field 
    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
name="demographic_information.man_women_count.man" placeholder="পুরুষ" type="number" min={0} max={100} />

</div>

<div className="flex flex-col">
	<span className="font-medium my-2">+</span>
</div>

<div className="flex flex-col">
  মহিলা
<Field 
    className="ml-0 w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
name="demographic_information.man_women_count.women" placeholder="মহিলা" type="number" min={0} max={100} />

</div>


<div className="flex flex-col">
  <span className="font-medium my-2">{values.demographic_information.man_women_count && values.demographic_information.man_women_count.man && values.demographic_information.man_women_count.women && (values.demographic_information.man_women_count.man+values.demographic_information.man_women_count.women)}</span>
</div>

</div>

</div>


<div className="flex flex-col">
  <div className="py-2">
  (আত্মীয়/অনাত্মীয়, সার্বক্ষণিক গার্হস্থ্য সহায়ক যিনি খানায় থাকেন এবং খান তাকে অন্তর্ভুক্ত করুন। <br/>বেড়াতে এসেছেন এমন আত্মীয়, ছুটা বুয়া- এদের অন্তর্ভুক্ত করা যাবে না।)
  </div>
</div>
</div>



<div>

<span id="demographic_information_family_type"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ৩.৬ এই মূল পরিবার/খানার ধরণ কি?
  </label>
  
{ option_data.demographic_information.family_type && option_data.demographic_information.family_type.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="demographic_information.family_type"
            checked={values.demographic_information.family_type.value === v.value}
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
  errors.demographic_information.family_type
  &&
  touched.demographic_information
  &&
  touched.demographic_information.family_type && ( 
      <span className="mb-3 font-semibold text-[#B45454]">
          {errors.demographic_information.family_type.label}
      </span>   
  )}
</div>
<div className="flex flex-col">
  <div className="py-2">
  নির্দেশনাঃ<br/>একক পরিবারঃ যে পরিবারে শুধু স্বামী-স্ত্রী অথবা স্বামী-স্ত্রী ও তাদরে সন্তান বাস করে (এক প্রজন্মরে বসবাস)।<br/>যৌথ পরিবারঃ যে পরিবারে স্বামী-স্ত্রী, তাদরে সন্তান সহ, পিতা মাতা ও ভাই বোন সহ একাধিক প্রজন্মরে সদস্য বসবাস করে।
  </div>
</div>
</div>

</div>


          </div>
          
        </div>        
        </>

    )
};
export default Demographicinformation;
    