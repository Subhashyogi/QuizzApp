/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import Header from '../componentes/Header';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../context/MainContext';


const SignUp = () => {
    const {loginUser} = useContext(Context);

    const [msg,setMsg] = useState('');
    const [error,setError] = useState(false);

    const navigate = useNavigate()


     function SignUpHandler(e) {
        setMsg('')
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirm_password = e.target.confirm_password.value;
        if(email != '' && password != '' && confirm_password != '') {
            if(e.target.password.value == e.target.confirm_password.value){
                const auth = getAuth()
                createUserWithEmailAndPassword(auth, email, password)
                .then(
                    (userCredential) =>{
                        const user = userCredential.user;
                        loginUser(user)
                        setMsg('Account is created')
                        navigate('/Play')
                        setError(false);
                    
                    }
                )
                .catch((error) =>{
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setMsg(errorMessage);
                    
                });
                
            }
            else{
                setError(true);
                setMsg('Both password must be some')
            }

        }
        else{
            setError(true);
                setMsg('Fildes can not be empty')
        }
        
    }
    return (
        <>
        <Header/>
            <div className='p-2 mt-20 flex justify-center align-middle'>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create an account
                    </h1>
                    <div className={`text-${error ? 'red' : 'green'}-500 text-center mt-5`}>{msg}</div>
                    <form onSubmit={SignUpHandler} className="space-y-4 md:space-y-6" action="#">
                        {/* <div>
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Your Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required={true}
                            />
                        </div> */}
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
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required={true}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="confirm_password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                confirm password
                            </label>
                            <input
                                type="password"
                                name="confirm_password"
                                id="confirm_password"
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
                            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Save
                        </button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account?{" "}
                            <Link
                                to="/Login"
                                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                            >
                                Login here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}

export default SignUp;
