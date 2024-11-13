/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/MainContext';

 


const Header = () => {
    const {user, logOut} = useContext(Context);
    return (
        <div className='z-50 sticky top-0 w-m-[1200px] flex justify-between rounded-sm bg-white shadow p-2'>
            <span className='font-bold text-xl'>Quizz</span>
            <ul className='flex gap-3 pr-5 font-mono cursor-pointer'>
            <li>
                <Link to='/'>Listing</Link>
                </li>
                <li>
                <Link to='/Create'>Create</Link>
                </li>
                {
                    user == null
                    ? <li>
                    <Link to='/Login'>Login</Link>
                    </li>
                    : <>
                        <li>
                        <Link to='/Play'>Play</Link>
                        </li>
                        <li onClick={logOut}>
                        <Link>Logout</Link>
                        </li>
                    </>
                }
                
            </ul>
        </div>
    );
}

export default Header;
