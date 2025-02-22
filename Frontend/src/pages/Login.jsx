import React, { useContext } from 'react';
import Header from '../components/Header';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Context } from '../context/Maincontext';
import axios from 'axios';


const Login = () => {
    const { user, setUser, loginUser, API_BASE_URL  } = useContext(Context);

    const navigate = useNavigate()

    const loginHandler = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        axios.get(`${API_BASE_URL}User`)
        .then(
            (success) => {
                const userData = success.data.Users;
                userData.filter(
                    (user) => {
                        if(user.email === email && user.password === password) {
                            navigate('/Playground')
                            loginUser(user);
                            console.log(user);
                            
                        }
                        else {
                            // navigate('/SignUp')
                        }
                    }
                )
            }
        )
        
    }

    return (
        <>
            <Header/>
                <div className="flex flex-col items-center justify-center px-4 mx-auto ">
                    <Link
                        to="/"
                        className="flex items-center  text-2xl font-semibold  text-gray-900 dark:text-black"
                    >
                        <img
                            className="w-20 h-20 rounded-full mr-2"
                            src="Logo.svg"
                            alt="logo"
                        />
                        Quizzs
                    </Link>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={loginHandler}>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                        required=""
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        {/* <div className="flex items-center h-5">
                                            <input
                                                id="remember"
                                                aria-describedby="remember"
                                                type="checkbox"
                                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                                required=""
                                            />
                                        </div> */}
                                        {/* <div className="ml-3 text-sm">
                                            <label
                                                htmlFor="remember"
                                                className="text-gray-500 dark:text-gray-300"
                                            >
                                                Remember me
                                            </label>
                                        </div> */}
                                    </div>
                                    <Link
                                        to="#"
                                        className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Sign in
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet?{" "}
                                    <Link
                                        to="/SignUp"
                                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                    >
                                        Sign up
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
