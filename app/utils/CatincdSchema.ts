import { object, array, string, number, StringSchema } from "yup";
    export default object().shape({
    introduction_permission:object().shape({
interviewer_permission:object().shape({
  value: string().required(),
  label: string().required('Interview Permission is required!')
}),
denied_reason:array().when('interviewer_permission',{
  is: (val:any)=>val && parseInt(val.value) == 3 ,
  then: (schema:any) =>{
           

  			return schema.min(1, "Need at least 1 of Denied Reason Required!!").of( 
        
              object().shape({
                value: string().required("Denied Reason is required"),
                label: string().required("Denied Reason is required")
              })
    
            )

  }
}),

        }),
        eligibility_timeselection:object().shape({
gender:object().shape({
  value: string(),
  label: string()
}).when('$interviewer_permission',{
  is: (val:any)=>val && (parseInt(val.value) < 3 ),
  then: (schema:any) =>{
           return schema.shape({
            value: string().required('Gender is required!'),
            label: string().required('Gender is required!')
      });            
  }
  
}),
age:object().shape({
  value: string(),
  label: string()
}).when('gender',{
  is: (val:any)=>val && parseInt(val.value) > 0,
  then: (schema:any) =>{
           return schema.shape({
            value: string().required('Age is required!'),
            label: string().required('Age is required!')
      });            
  }
}),
city_or_village:object().shape({
  value: string(),
  label: string()
}).when('age',{
  is: (val:any)=>val && (parseInt(val.value) >= 18 && parseInt(val.value) <= 150),
  then: (schema:any) =>{
           return schema.shape({
            value: string().required('City Or Village is required!'),
            label: string().required('City Or Village is required!')
      });            
  }
})
,
district:object().shape({
  value: string(),
  label: string()
}).when('city_or_village',{
  is: (val:any)=>val && parseInt(val.value) <= 3,
  then: (schema:any) =>{
           return schema.shape({
            value: string().required('District is required!'),
            label: string().required('District is required!')
      });            
  }
})
,
education:object().shape({
  value: string(),
  label: string()
}).when('city_or_village',{
  is: (val:any)=>val && parseInt(val.value) <= 3,
  then: (schema:any) =>{
           return schema.shape({
            value: string().required('Education is required!'),
            label: string().required('Education is required!')
      });            
  }
})
,

        }),
        demographic_information:object().shape({
religion:object().shape({
  value: string(),
  label: string()
}).when([ '$interviewer_permission', '$age', '$city_or_village', '$district', '$education' ],{
  is: (i_p:any,age:any, c_o_v:any, d:any, e:any)=>{
        const check = (i_p && (parseInt(i_p.value) < 3 )) && (age && (age.value > 17 && age.value < 101) && (c_o_v.value < 88 ) && (d.value !='') && (e.value < 99) );
        return check
},  then: (schema:any) =>{
           return schema.shape({
            value: string().required('Religion is required!'),
            label: string().required('Religion is required!')
      });            
  }
  
}),

        }),
        food_habits:object().shape({
fruits_consumption:object().shape({
  value: string(),
  label: string()
}).when([ '$interviewer_permission', '$age', '$city_or_village', '$district', '$education' ],{
  is: (i_p:any,age:any, c_o_v:any, d:any, e:any)=>{
        const check = (i_p && (parseInt(i_p.value) < 3 )) && (age && (age.value > 17 && age.value < 101) && (c_o_v.value < 88 ) && (d.value !='') && (e.value < 99) );
        return check
},  then: (schema:any) =>{
           return schema.shape({
            value: string().required('Fruit Consumption is required!'),
            label: string().required('Fruit Consumption is required!')
      });            
  }
  
}),
fruits_consumption_quantity:object().shape({
  value: string(),
  label: string()
}).when('fruits_consumption',{
  is: (val:any)=>val && (parseInt(val.value) > 0 ),
  then: (schema:any) =>{
           return schema.shape({
            value: string().required('Fruit Consumption Quantity is required!'),
            label: string().required('Fruit Consumption Quantity is required!')
      });            
  }
  
}),

        }),
        relax_information:object().shape({
relax:object().shape({
  hour: string(),
  minute: string()
}).when([ '$interviewer_permission', '$age', '$city_or_village', '$district', '$education' ],{
  is: (i_p:any,age:any, c_o_v:any, d:any, e:any)=>{
        const check = (i_p && (parseInt(i_p.value) < 3 )) && (age && (age.value > 17 && age.value < 101) && (c_o_v.value < 88 ) && (d.value !='') && (e.value < 99) );
        return check
},  then: (schema:any) =>{
           return schema.shape({
            hour: string().required('Hour is required!'),
            minute: string().required('Minute is required!')
      });            
  }
  
}),

        }),
        physical_status:object().shape({
blood_pressure_measured:object().shape({
  value: string(),
  label: string()
}).when([ '$interviewer_permission', '$age', '$city_or_village', '$district', '$education' ],{
  is: (i_p:any,age:any, c_o_v:any, d:any, e:any)=>{
        const check = (i_p && (parseInt(i_p.value) < 3 )) && (age && (age.value > 17 && age.value < 101) && (c_o_v.value < 88 ) && (d.value !='') && (e.value < 99) );
        return check
},  then: (schema:any) =>{
           return schema.shape({
            value: string().required('Blood Pressure Measured is required!'),
            label: string().required('Blood Pressure Measured is required!')
      });            
  }
  
}),
blood_pressure_notify:object().shape({
  value: string(),
  label: string()
}).when('blood_pressure_measured',{
  is: (val:any)=>val && (parseInt(val.value) < 2 ),
  then: (schema:any) =>{
           return schema.shape({
            value: string().required('Blood Pressure Notify is required!'),
            label: string().required('Blood Pressure Notify is required!')
      });            
  }
  
}),
blood_sugar_diabetics_notify:object().shape({
  value: string(),
  label: string()
}).when('blood_sugar_diabetics_measured',{
  is: (val:any)=>val && (parseInt(val.value) < 2 ),
  then: (schema:any) =>{
           return schema.shape({
            value: string().required('Blood Sugar Or Diabetics Notify is required!'),
            label: string().required('Blood Sugar Or Diabetics Notify is required!')
      });            
  }
  
}),

        }),
        smoking_related:object().shape({
smoking_habit:object().shape({
  value: string(),
  label: string()
}).when([ '$interviewer_permission', '$age', '$city_or_village', '$district', '$education' ],{
  is: (i_p:any,age:any, c_o_v:any, d:any, e:any)=>{
        const check = (i_p && (parseInt(i_p.value) < 3 )) && (age && (age.value > 17 && age.value < 101) && (c_o_v.value < 88 ) && (d.value !='') && (e.value < 99) );
        return check
},  then: (schema:any) =>{
           return schema.shape({
            value: string().required('Smoking Habit is required!'),
            label: string().required('Smoking Habit is required!')
      });            
  }
  
}),

        }),
        drinking_related:object().shape({
alchohol_usage:object().shape({
  value: string(),
  label: string()
}).when([ '$interviewer_permission', '$age', '$city_or_village', '$district', '$education' ],{
  is: (i_p:any,age:any, c_o_v:any, d:any, e:any)=>{
        const check = (i_p && (parseInt(i_p.value) < 3 )) && (age && (age.value > 17 && age.value < 101) && (c_o_v.value < 88 ) && (d.value !='') && (e.value < 99) );
        return check
},  then: (schema:any) =>{
           return schema.shape({
            value: string().required('Alchohol Usage is required!'),
            label: string().required('Alchohol Usage is required!')
      });            
  }
  
}),

        }),
        
    });
    