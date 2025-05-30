import React from 'react';
import Line_charts from './Line_Charts';
import Radio_bar_chart from './Radio_bar_chart';


const OverView = () => {
    return (
        <div>
            <div className="bg-white">

                <div className=" px-4 sm:px-6 lg:py-10 lg:px-8">
                    <h1 className='text-3xl font-bold'>Our service statistics</h1>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mt-4">
                        <div className="bg-white overflow-hidden shadow sm:rounded-lg dark:bg-gray-900">
                            <div className="px-4 py-5 sm:p-6">
                                <dl>
                                    <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">Total free
                                        servers</dt>
                                    <dd className="mt-1 text-3xl leading-9 font-semibold text-primary dark:text-indigo-400">1.6M</dd>
                                </dl>
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden shadow sm:rounded-lg dark:bg-gray-900">
                            <div className="px-4 py-5 sm:p-6">
                                <dl>
                                    <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">Servers a
                                        month</dt>
                                    <dd className="mt-1 text-3xl leading-9 font-semibold text-primary dark:text-indigo-400">19.2K
                                    </dd>
                                </dl>
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden shadow sm:rounded-lg dark:bg-gray-900">
                            <div className="px-4 py-5 sm:p-6">
                                <dl>
                                    <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">Servers a
                                        week</dt>
                                    <dd className="mt-1 text-3xl leading-9 font-semibold text-primary dark:text-indigo-400">4.9K</dd>
                                </dl>
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden shadow sm:rounded-lg dark:bg-gray-900">
                            <div className="px-4 py-5 sm:p-6">
                                <dl>
                                    <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">Total users
                                    </dt>
                                    <dd className="mt-1 text-3xl leading-9 font-semibold text-primary dark:text-indigo-400">166.7K
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className='flex justify-between items-center'>
                <div className='w-2/4 flex items-center flex-col justify-center'>
                    <Line_charts></Line_charts>
                </div>
                <div className='w-2/4'>
                    <Radio_bar_chart></Radio_bar_chart>
                </div>
            </div>




        </div>
    );
};

export default OverView;