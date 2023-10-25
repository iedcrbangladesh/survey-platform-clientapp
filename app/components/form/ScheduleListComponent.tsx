const url = process.env.api_url;
import axios from 'axios';
import {useState, useEffect, useCallback} from 'react';
import useAuth from '@/app/hooks/useAuth';
import { useRouter, usePathname } from "next/navigation";

const ScheduleListComponent = ()=>{

    const authCtx = useAuth();
    const router = useRouter();
    const mobileNumber = authCtx.activeMobileNumber;

    const [data, setData] = useState([]);

    const fetchSchedules = useCallback(async () => {
        if(mobileNumber == null){

        }
        const response = await axios.get(`${url}list-contact-schedule-time`);

		    setData(response.data.data);
		
	},[mobileNumber]);

    useEffect(() => {
		fetchSchedules(); // fetch page 1 of users
		
	}, [fetchSchedules]);

    const PickHandler=async(d:any)=>{

        await axios.post(`${url}pick-schedule`, 
        {
            userid:authCtx.userId,    
            contactnumber:d.contact_number,
            questionid:d.question_id,
            scheduleid:d._id
        }, 
        {    
        headers: {
            'Content-Type': 'application/json'
        }
        }
        ) .then(function (response) {

        if(response.data.contact_question_id!=null 
            && response.data.user_contact_id !=null
            && response.data.contact_schedule_status > 0 
            ){
            //localStorage.removeItem('data');
            //authCtx.activeContactId = response.data.contact_question_id;
            //authCtx.selectedContactId(response.data.contact_question_id);
            authCtx.activeMobileNumber = d.contact_number;
            authCtx.selectedMobile(d.contact_number);
        }else{
            authCtx.activeMobileNumber = null;
            authCtx.selectedMobile(null);
        }
        router.push('/dashboard/callinterface')

        })

    }

    return(

        <div>
            <table className='table-auto border-collapse border border-slate-400'>
                <tr className='p-2'>
                    <th className="border border-slate-300 p-2">Contact Number</th>
                    <th className="border border-slate-300 p-2">Schedule Time</th>
                    <th className="border border-slate-300 p-2">Scheduled By</th>
                    <th>Actions</th>
                </tr>
                {data.map((d:any,i:number)=>{
                    return(
                        <tr key={i}>
                            <td className="border border-slate-300 p-2">{d.contact_number}</td>
                            <td className="border border-slate-300 p-2">{d.schedule_time}</td>
                            <td className="border border-slate-300 p-2">{d.operator.name} ( {d.operator.username} )</td>
                            <td><button className={`inline-flex items-center justify-center ${d?.snowball> 0 ?'bg-[#FF9933]':'bg-primary'}  py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 w-full`} onClick={PickHandler.bind(null,d)}>{ d?.snowball > 0 ?'SnowBall Pick':'Pick'}</button></td>
                        </tr>
                    )
                })

                }

            </table>
        </div>
    )

}

export default ScheduleListComponent;