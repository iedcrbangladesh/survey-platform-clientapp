import { object, array, string, number, StringSchema } from "yup";
    export default object().shape({
    introduction_permission:object().shape({
interviewer_permission:object().shape({
  value: string().required(),
  label: string().required('Interview Permission is required!')
}),
denied_reason:object().shape({
  value: string(),
  label: string()
}).when('interviewer_permission',{
  is: (val:any)=>val && parseInt(val.value) == 3 ,
  then: (schema:any) =>{
           return schema.shape({
            value: string().required('Denied Reason is required!'),
            label: string().required('Denied Reason is required!')
      });            
  }
}),

        }),
        eligibility_timeselection:object().shape({
gender:object().shape({
  value: string().required(),
  label: string().required('Gender is required!')
}),
age:object().shape({
  value: string().required(),
  label: string().required('Age is required!')
}),
city_or_village:object().shape({
  value: string().required(),
  label: string().required('City Or Village is required!')
}),
district:object().shape({
  value: string().required(),
  label: string().required('District is required!')
}),
education:object().shape({
  value: string().required(),
  label: string().required('Education is required!')
}),

        }),
        demographic_information:object().shape({

        }),
        food_habits:object().shape({

        }),
        relax_information:object().shape({

        }),
        physical_status:object().shape({

        }),
        smoking_related:object().shape({

        }),
        drinking_related:object().shape({

        }),
        
    });
    