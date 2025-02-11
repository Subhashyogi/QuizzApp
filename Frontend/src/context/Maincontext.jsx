import React, { createContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';

const Context = createContext()
const Maincontext = (props) => {

    const [list, setList] = useState([]);
    const [user, setUser] = useState(null);

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;







    const loginUser = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user)

    }

    const fecthQuestionHandler = () => {

        axios.get('http://localhost:5000/Question')
            .then(
                (success) => {
                    // console.log(success.data.Questions);
                    if (success.data.status === 1) {

                        // console.log('yaaa here!');
                        // fecthQuestionHandler()
                        setList(success.data.Questions);

                    }
                    else {
                        // console.log('there is a problem');
                    }
                }
            )
            .catch((error) => {
                openToast("Error fetching questions", "error");

            })
        const lsUser = localStorage.getItem('user');
        if (lsUser != null) {
            setUser(JSON.parse(lsUser));
        }
    }




    useEffect(
        () => {
            fecthQuestionHandler()

        }, []
    )

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    }

    const openToast = (msg, flag) => {
        toast(msg, {
            type: flag,
            autoClose: 1000, // 1 second (default 5000ms)
            pauseOnHover: false,
        })
    }

    return (
        <Context.Provider value={{ openToast, list, user, fecthQuestionHandler, logout, setUser, loginUser, API_BASE_URL }}>
            <ToastContainer />
            {props.children}
        </Context.Provider>
    );
}
export { Context }
export default Maincontext;
