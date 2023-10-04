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

const Introductionpermission = ()=>{

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

const next_url = "2eligibility_timeselection";


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
        <td className="border border-slate-300 w-2/4 p-1">হ্যালো,<br/>আসসালামুয়ালাইকুম,<br/>আমি বাংলাদেশ সরকারের স্বাস্থ্য মন্ত্রণালয়ের অধীনে একটি প্রতিষ্ঠান আইইডিসিআর থেকে বলছি। আমরা মোবাইল ফোনের মাধ্যমে অসংক্রামক রোগের ঝুঁকি সম্পর্কে জানতে একটি জরিপ করছি। এই জরিপের প্রশ্নোত্তরগুলো শেষ করতে প্রায় ২০ মিনিটের মতো সময় লাগবে। এই কলটি ধরলে আপনার কোনো টাকা কাটা যাবে না। এই জরিপে অংশগ্রহণ সম্পূর্ণ আপনার ইচ্ছাধীন; আাপনার অস্বস্তি হলে কোন প্রশ্নের উত্তর নাও দিতে পারেন, আর ভাল না লাগলে যে কোন সময় কথা বলা বন্ধ করে দিতে পারেন। আপনার এবং অন্যদের দেয়া তথ্য থেকে নাম ও অন্যান্য পরিচিতি সরিয়ে আপনাদের দেয়া তথ্যের গোপনীয়তা রক্ষা করা হবে। এই জরিপে অংশগ্রহণে আপনার ব্যক্তিগত কোন লাভ বা ক্ষতি নেই, তবে, আপনাদের সকলের দেয়া তথ্যাদি আমাদের দেশের মানুষের স্বাস্থ্য সম্পর্কে বিশদভাবে বুঝতে এবং স্বাস্থ্য ব্যবস্থার উন্নয়ণে সাহায্য করবে।  আমি অনুরোধ করব আপনি আমাদের সাথে থাকবেন এবং পুরো জরিপটি শেষ করবেন।</td>
      </tr>
    </table>
  </div>
</div>


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
            onChange={(e:any) => {}}
            onClick={(e:any) => {
                const {checked, name} = e.target;
                disable_logic(name,v.value, setFieldValue,["is","is" ]);
                
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
    
    <SelectNonCreatableComponent defaultValueArray={[]}
                                 placeholder="Select Denied Reason"
                                 isSearchable
                                 isClearable                                 
                                 isMulti
                                  name="introduction_permission.denied_reason" options={option_data.introduction_permission.denied_reason}

                                  onParentChange={(v:any, name:any) => {
                
                //alert(name);

                
                
 redirect_or_focus_location(v,name,"multiselect"); 
                
                
                
            
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
            {errors.introduction_permission.denied_reason}
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
export default Introductionpermission;
    