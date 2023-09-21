"use client";
//Library
import Link from "next/link";
import RadioComponent from "@/app/components/RadioComponent";
import CheckComponent from "@/app/components/CheckComponent";
import SelectComponent from '@/app/components/SelectComponent';
import {Field, FieldArray ,useFormikContext} from 'formik';
//Data
import option_data from "@/app/json/data.json";
//Logical On Off
import { disable_logic } from "@/app/api/logic-checker";


const Cati= ()=>{
const { isValid, isSubmitting,values,errors, touched, setFieldValue, setFieldTouched }:any = useFormikContext();
    return(
        <>
        <div className='grid grid-cols-1 gap-9 sm:grid-cols-2'>
          
          <div className='flex flex-col gap-9'>        
          <div className="my-1">
  <label className="mb-1 block text-black dark:text-white">
    what is your name?
  </label>
<Field 
    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
name="name_of_person" placeholder="what is your name?" type="text" />
{
errors.name_of_person
&&
touched.name_of_person && ( 
    <span className="mb-3 font-semibold text-[#B45454]">
        {errors.name_of_person}
    </span>   
)}

</div>
<div className="my-1">
  <label className="mb-1 block text-black dark:text-white">
    gender
  </label>
{ option_data.gender && option_data.gender.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}            
            component={RadioComponent}
            name="gender"
            checked={values.gender === v.value}
            onChange={(e:any) => {
                const {checked, name} = e.target; 
                disable_logic(name,v.value, setFieldValue,["not"]);
               
                if (checked) {
                  setFieldValue(
                      name,
                      v.value
                  );
                }else{
                    setFieldValue(
                        name,
                        null
                    );

                }
            
            }}
          />

  </div>
))
}
{
  errors.gender
  &&
  touched.gender && ( 
      <span className="mb-3 font-semibold text-[#B45454]">
          {errors.gender}
      </span>   
  )}
</div>
{values.gender && values.gender == 1 &&
<div className="my-1">
  <label className="mb-1 block text-black dark:text-white">
    How Old are you
  </label>
<Field 
    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
name="age" placeholder="How Old are you" type="number" />
{
errors.age
&&
touched.age && ( 
    <span className="mb-3 font-semibold text-[#B45454]">
        {errors.age}
    </span>   
)}

</div>
}
<div className="my-1">
    <label className="mb-1 block text-black dark:text-white">
      your food choices
    </label>

    <SelectComponent defaultValueArray={[]}
                                 placeholder="Select food_choices"
                                 isSearchable
                                 isClearable
                                 isMulti
                                  name="food_choices" options={option_data.food_choices} 
                                  
                      />
  
  
  {
    errors.food_choices
    &&
    touched.food_choices && ( 
        <span className="mb-3 font-semibold text-[#B45454]">
            {errors.food_choices}
        </span>   
    )}
  </div>
  {(values.age>=18 && values.age<=35) &&

<div className="my-1">
  <label className="mb-1 block text-black dark:text-white">
    how do you know us?
  </label>
{ option_data.found && option_data.found.map((v,i)=>(
  <div key={i}>

    <Field
            label={v.label}
            component={CheckComponent}
            name="found"
            checked={values.found.includes(v.value)}            
            onChange={(e:any) => {
              const {checked, name} = e.target;  
                  
                  if (checked) {
  
                      setFieldValue(
                          name,
                          [...values.found, v.value]
                      );
                  }else{
  
                      setFieldValue(
                          name,
                          values.found.filter((val:any) => val !== v.value)
                      );
  
                  }
              }}
          />

  </div>
))
}

{
  errors.found
  &&
  touched.found && ( 
      <span className="mb-3 font-semibold text-[#B45454]">
          {errors.found}
      </span>   
  )}
</div>
}
{(values.age>=18 && values.age<=35) &&

<div className="my-1">
    <label className="mb-1 block text-black dark:text-white">
      how do you fell?
    </label>

    <SelectComponent defaultValueArray={{value:'',label:''}}
                                 placeholder="Select fellings"
                                 isSearchable
                                 isClearable                                 
                                  name="fellings" options={option_data.fellings} 
                                  
                      />
  
  
  {
    errors.fellings
    &&
    touched.fellings && ( 
        <span className="mb-3 font-semibold text-[#B45454]">
            {errors.fellings.label}
        </span>   
    )}
  </div>
}
<div className="my-1">
    <button type="submit" className='flex w-full justify-center rounded bg-primary p-3 font-medium text-gray'>
        Save
      </button>
  </div>

<code>
    <pre>Option Values: {JSON.stringify(values, null, 2)}</pre>
    <pre>Errors: {JSON.stringify(errors, null, 2)}</pre>
<pre>Touched: {JSON.stringify(touched, null, 2)}</pre>
</code>

          </div>
          <div className='flex flex-col gap-9'>
          </div>
        </div>        
        </>

    )
};
export default Cati;
    