import React from 'react';
import { FcTimeline } from "react-icons/fc";
import { FcConferenceCall } from "react-icons/fc";
import { FcDocument } from "react-icons/fc";
import { FcComboChart } from "react-icons/fc";
import CustomLineChart from './LineCharts';
import CustomBarChart from './CustomBarChart';
import TeamMembers from './TeamMembers';
import ToDoList from './MeetingSlat';
import ProgressTrack from './ProgressTrack';
import PageVisits from './PageVisits';
import SocialTraffic from './SocialTraffic';
 

const Admin_Panel = () => {
    return (
        <div>
            {/* card section  */}

            <div className="grid lg:grid-cols-4 gap-5 md:grid-cols-2 sm:grid-cols-1">

                <div className='bg-primary rounded-lg p-6 flex justify-between items-center'>
                    <div>
                        <p className='text-xl font-bold text-white'>Total Traffic</p>
                        <h4 className='text-4xl font-bold text-white'>34,500</h4>
                        <p className='text-white'> <span className='text-black'>3.45% </span> science last Month</p>
                    </div>
                    <div>
                        <FcTimeline className='bg-white text-6xl p-3 rounded-full' />
                    </div>
                </div>


                <div className='bg-primary rounded-lg p-6 flex justify-between items-center'>
                    <div>
                        <p className='text-xl font-bold text-white'>Total User</p>
                        <h4 className='text-4xl font-bold text-white'>4,500</h4>
                        <p className='text-white'> <span className='text-black'>3.45% </span> science last Month</p>
                    </div>
                    <div>
                        <FcConferenceCall className='bg-white text-6xl p-3 rounded-full' />
                    </div>
                </div>




                <div className='bg-primary rounded-lg p-6 flex justify-between items-center'>
                    <div>
                        <p className='text-xl font-bold text-white'>Total Student</p>
                        <h4 className='text-4xl font-bold text-white'>2,570</h4>
                        <p className='text-white'> <span className='text-black'>3.45% </span> science last Month</p>
                    </div>
                    <div>
                        <FcDocument className='bg-white text-6xl p-3 rounded-full' />
                    </div>
                </div>

                <div className='bg-primary rounded-lg p-6 flex justify-between items-center'>
                    <div>
                        <p className='text-xl font-bold text-white'>Performance</p>
                        <h4 className='text-4xl font-bold text-white'>67%</h4>
                        <p className='text-white'> <span className='text-black'>3.45% </span> science last Month</p>
                    </div>
                    <div>
                        <FcComboChart className='bg-white text-6xl p-3 rounded-full' />
                    </div>
                </div>



            </div>


            {/* line charts  */}


            <div className="flex flex-col lg:flex-row my-7 justify-between items-center">
                <div className="w-full lg:w-4/6 md:m-4 lg:mr-4 sm:m-4">
                    
                    <CustomLineChart></CustomLineChart>
                </div>
                <div className="w-full lg:w-2/6">
                    
                    <CustomBarChart></CustomBarChart>
                </div>
            </div>

            {/* table  card  */}

            <div className='grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4'>
                  <TeamMembers></TeamMembers>
                  <ToDoList></ToDoList>
                  <ProgressTrack></ProgressTrack>
            </div>

            <div className="grid grid-cols-8 gap-4 my-6">
                <div className="lg:col-span-5 col-span-8">
                    
                    
                    <PageVisits></PageVisits>
                     
                </div>
                <div className="lg:col-span-3 col-span-8">
                     
                     <SocialTraffic></SocialTraffic>
                </div>
            </div>

           
           <div>
             
           </div>


        </div>
    );
};

export default Admin_Panel;