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

const Introductionpermission = ()=>{

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

<span id="introduction_permission_interviewer_permission"></span>
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
  <label className="mb-1 block text-black dark:text-white">
   ১ . ১ আপনি কি কথা বলার জন্য সময় দিবেন ?  <br/>আমি কি প্রশ্ন শুরু করব ?
  </label>
  
{ option_data.introduction_permission.interviewer_permission && option_data.introduction_permission.interviewer_permission.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="introduction_permission.interviewer_permission"
            checked={values.introduction_permission.interviewer_permission.value === v.value}
            onClick={(e:any) => {
                const {checked, name} = e.target;
                disable_logic(name,v.value, setFieldValue,["not" ]);
                
 redirect_or_focus_location(v,name,"is"); 
                
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
  errors.introduction_permission
  &&
  errors.introduction_permission.interviewer_permission
  &&
  touched.introduction_permission
  &&
  touched.introduction_permission.interviewer_permission && ( 
      <span className="mb-3 font-semibold text-[#B45454]">
          {errors.introduction_permission.interviewer_permission.label}
      </span>   
  )}
</div>
<div className="flex flex-col">
  <div className="py-2">
  ১। হ্যাঁ. এখনই” সম্মত হলে, ২.১-এ যান এবং যোগ্য হলে, ৩.১ থেকে প্রশ্ন শুরু করুন।<br/>২। হ্যাঁ, অন্য সময়ে” সম্মত হলে, ২.১-এ যোগ্যতা যাঁচাই সাপেক্ষে সময় নির্ধারণ করুন; এবং নির্ধারিত সময়/দিনে ৩.১ থেকে প্রশ্ন শুরু করুন।<br/>৩। সম্মত না হলে, ১.২-এর উত্তর নিন এবং তারপর সমাপনী বক্তব্য বলুন ও সাক্ষাৎকারটি শেষ করুন।
  </div>
</div>
</div>

</div>

{values.introduction_permission.interviewer_permission.value == 3 && (
<div className="my-1 grid grid-cols-2 gap-4">
  <div className="flex flex-col">
    <label className="mb-1 block text-black dark:text-white">
      ১.২ অসম্মতির কারণ
    </label>
    <span id="introduction_permission_denied_reason"></span>
    <SelectComponent defaultValueArray={{"label":"","value":""}}
                                 placeholder="Select Denied Reason"
                                 isSearchable
                                 isClearable                                 
                                  name="introduction_permission.denied_reason" options={option_data.introduction_permission.denied_reason}
                                  onParentChange={(v:any, name:any) => {
                
                //alert(name);

                
                
 redirect_or_focus_location(v,name,"is"); 
                
                
                
            
            }} 
                                  
                      />
  
  
  {
    errors.introduction_permission
    &&
    errors.introduction_permission.denied_reason
    &&
    touched.introduction_permission
    &&
    touched.introduction_permission.denied_reason && ( 
        <span className="mb-3 font-semibold text-[#B45454]">
            {errors.introduction_permission.denied_reason.label}
        </span>   
    )}
  </div>
  <div className="flex flex-col">
    <div className="py-2">
      কোন প্রশ্ন করার প্রয়োজন নেই;<br/> তিনি নিজ থেকেই কোন কারণ উল্লেখ করলে, লিপিবদ্ধ করুন।
    </div>
</div>
</div>
)}

          </div>
          
        </div>        
        </>

    )
};
export default Introductionpermission;
    