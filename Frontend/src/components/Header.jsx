import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import QuizQuestion from '../pages/QuizQuestion';
import { Context } from '../context/Maincontext';



const Header = () => {
    const { user, logout} = useContext(Context);
    
    return (
        <>
        <div className='w-full h-16 shadow-lg flex justify-around font-mono bg-white sticky top-0 z-50'>
            <div className='cursor-pointer'>
                <Link to='/'>
                        <img src="Logo.svg" alt="Quizzs." className='h-16' />
                </Link>
            </div>
                <div className='flex gap-8 cursor-pointer p-5 list-none'>
                    <li>
                        <Link to='/'>Listing</Link>
                    </li>
                    <li>
                        <Link to='/CreateQuizQuestion'>Create</Link>
                    </li>
                    {
                        user === null
                            ? <li>
                                <Link to='/Login'>Login</Link>
                            </li>
                        :
                        <>
                            <li>
                                <Link to='/Playground'>Play</Link>
                            </li>
                            <li>
                                <Link to='/' onClick={logout}>Logout</Link>
                            </li>
                        </>
                        
                    }
            </div>
        </div>
        </>
    );
};

export default Header;
