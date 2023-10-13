"use client";
import DefaultLayout from "@/app/layout/DefaultLayout";
import Link from "next/link";
import axios from 'axios';
import useAuth from '@/app/hooks/useAuth';
import { useRouter, usePathname } from "next/navigation";
import ContactStatusComponent from '@/app/components/form/ContactStatusComponent';
import {useEffect, useState} from 'react';
import ScheduleListComponent from "@/app/components/form/ScheduleListComponent";

const url = process.env.number_api_url;
const api_url = process.env.api_url;
const current_question_url:any = process.env.current_question_url;

export default function CallInterface() {

    const router = useRouter();
    const pathname = usePathname();
    const authCtx = useAuth();
    const userid =authCtx.userId;
    const contactId = authCtx.activeContactId;

    const [numberLoading, setNumberLoading] = useState(false);
    const [interviewStart, setInterviewStart] = useState(false);
    
    useEffect(()=>{
        console.log('contact'+typeof contactId)
        if(contactId!=null){
            router.push(current_question_url)
        }
    },[contactId,router])
    

    const fetchMobileNumber =async(values:any)=>{
        //console.log(values);
        setNumberLoading(true);
        await axios.post(`${url}getmobilenumber`, 
            {
            userid:authCtx.userId        
            }, 
            {    
            headers: {
                'Content-Type': 'application/json'
            }
            }
            ) .then(function (response) {
                //if(response.data.mobile_no!=null){
                authCtx.activeMobileNumber = response.data.mobile_no;
                authCtx.selectedMobile(response.data.mobile_no);
                //}
                //authCtx.activeMobileNumber()
                setNumberLoading(false);            
            })

    }

    const startInerviewHandle = async()=>{

        setInterviewStart(true);

        await axios.post(`${api_url}save-question`, 
    {
    userid:authCtx.userId,
    //data:null,
    contactnumber:authCtx.activeMobileNumber,
    done:0
    }, 
    {    
      headers: {
        'Content-Type': 'application/json'
      }
    }
    ) .then(function (response) {

      if(response.data.contact_question_id){
        //localStorage.removeItem('data');
        setInterviewStart(false);
        authCtx.activeContactId = response.data.contact_question_id;
        authCtx.selectedContactId(response.data.contact_question_id);

        router.push(current_question_url)
      }
      

    })

    }


    return(
        <>
        <DefaultLayout>
        <div className="grid grid-cols-1">
        {authCtx.activeMobileNumber ==null &&
        <span onClick={fetchMobileNumber} className='w-1/2 cursor-pointer inline-flex border-y border-stroke py-1 px-2 font-medium text-black hover:border-primary hover:bg-primary hover:text-white dark:border-strokedark dark:text-white dark:hover:border-primary sm:py-3 sm:px-6'>
         Request Number   
        </span>}
        {numberLoading && <span className="w-1/2 bg-white p-1 text-black">Please wait number requested and loading...</span>}
        {authCtx.activeMobileNumber && 
        <div className="w-full">
        <h5 className="font-bold">{authCtx.activeMobileNumber}</h5>
            
            {contactId== null && 
            <div className="grid grid-cols-2">
            <div className="w-full">
                <ContactStatusComponent/>
            </div>
            {interviewStart && <span className="w-1/2 bg-white p-1 text-black">Please wait, we will take you to interview section...</span>} 
            <div className="w-2/3 mt-10 ml-5">
                <button onClick={startInerviewHandle} className="flex w-full justify-center rounded bg-[#f1e56c] p-3 font-medium text-black">
                       Start Interview 
                </button>
            </div>
            </div>
            }
                
                
                    
                </div>
            
        
        }
        </div>
        <div className="grid grid-cols-1 mt-5">
            {authCtx.activeMobileNumber == null && <ScheduleListComponent/>}
        </div>
        </DefaultLayout>
        </>

    )
}