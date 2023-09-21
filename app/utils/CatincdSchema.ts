import { object, array, string, number, StringSchema } from "yup";
    export default object().shape({
    introduction_permission:object().shape({
interviewer_permission:object().shape({
  value: string().required(),
  label: string().required('Interview Permission is required!')
}),
denied_reason:object().shape({
  value: string().required(),
  label: string().required('Denied Reason is required!')
}),

    }),
    eligibility_timeselection:object().shape({
gender:object().shape({
  value: string().required(),
  label: string().required('Gender is required!')
}),

    }),
    
    });
    