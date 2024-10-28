/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React from 'react';
import Header from '../componentes/Header';
import { Link } from 'react-router-dom';



const TC = () => {
    return (
        <>
            <Header />
            <div className='mt-20'>
                <h1 className='text-4xl font-bold text-center'>BRO WHAT ARE YOU DOING! JUST GO TO LOGIN OR SIGNUP.</h1>
                <h1 className='text-2xl text-center'>Go and watch One Piece(ONE PIECE IS REAL)</h1>
                <div className='flex justify-center m-4'>
                    <button
                        type="submit"
                        className="m-2 text-white translate-x-1 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        <Link
                            to="/Login"
                            
                        >
                            Login
                        </Link>
                    </button>
                    <button
                        type="submit"
                        className="m-2 text-white translate-x-1 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        <Link
                            to="/SignUp"
                            
                        >
                            SignUp
                        </Link>
                    </button>
                </div>
            </div>
        </>
    );
}

export default TC;
