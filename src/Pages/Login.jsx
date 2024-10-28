/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react';
import Header from '../componentes/Header';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import MainContext, { Context } from '../context/MainContext';






const Login = () => {
    const {loginUser, user} = useContext(Context);
    const navigate = useNavigate();

    useEffect(
        () => {
            if(user != null) {
                navigate('/Play');
            }
        },[]
    )

    const loginHandler = (e) =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.current_password.value;

        const auth = getAuth()
                signInWithEmailAndPassword(auth, email, password)
                .then(
                    (userCredential) =>{
                        const user = userCredential.user;
                        loginUser(user);
                        
                        navigate('/Play')
                        
                    }
                )
                .catch((error) =>{
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    
                    
                });
    }
    return (
        <>
        <Header/>
            <div className='p-2 flex mt-20 justify-center align-middle'>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Login account
                    </h1>
                    <form onSubmit={loginHandler} className="space-y-4 md:space-y-6" action="#">
                        
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Your Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required={true}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="current_password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Your password
                            </label>
                            <input
                                type="password"
                                name="current_password"
                                id="current_password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required={true}
                            />
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="terms"
                                    aria-describedby="terms"
                                    type="checkbox"
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                                    required={true}
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label
                                    htmlFor="terms"
                                    className="font-light text-gray-500 dark:text-gray-300"
                                >
                                    I accept the{" "}
                                    <Link
                                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                        to="/TC"
                                    >
                                        Terms and Conditions
                                    </Link>
                                </label>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full text-white translate-x-1 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Login
                        </button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don't have an account?{" "}
                            <Link
                                to="/SignUp"
                                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                            >
                                SignUp to
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}

export default Login;
