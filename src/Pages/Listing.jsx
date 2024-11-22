/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { Outlet, Router } from 'react-router-dom';
import Header from '../componentes/Header';
import { getDatabase, ref, onValue } from "firebase/database";
import Create from './Create';
import { Context } from '../context/MainContext';





const Listing = () => {
    const { ques, setQues, getDataFromTimestamp } = useContext(Context);

    


    useEffect(
        () => {
            const db = getDatabase();
            const starCountRef = ref(db, 'Questions');
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                //console.log(data);
                const keys = Object.keys(data);
                let arr = [];
                for (let k of keys) {
                    arr.push(
                        {
                            ...data[k],
                            id: k
                        }
                    )
                }

              //  console.log(arr);

                setQues(arr);
            });
        }, [setQues]);

    return (
        <>
            <Header />
            <div className='max-w-[1200px] mx-auto mt-20'>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Question
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Option A
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Option B
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Option C
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Option D
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Created Time
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ques.map(
                                    (item, index) => {
                                        return (
                                            <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    {item.question}
                                                </th>

                                                {
                                                    item.options.map(
                                                        (op, i) => {
                                                            return (
                                                                <td key={i} className={`${item.correctOption == i + 1 ? 'font-bold text-white' : ''} px-6 py-4`}>{op}</td>
                                                            )
                                                        }
                                                    )
                                                }
                                                <td className="px-6 py-4">{getDataFromTimestamp(item.createAt)}</td>
                                            </tr>
                                        )
                                    }
                                )
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    );
}

export default Listing;
