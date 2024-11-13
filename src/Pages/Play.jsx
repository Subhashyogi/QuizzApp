/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import Header from '../componentes/Header';
import { Context } from '../context/MainContext';
import { Link, useNavigate } from 'react-router-dom';
import { set } from 'firebase/database';





const Play = () => {
    const {reset, user, ques, current, next, prev, userAnswer, answer, finish, result } = useContext(Context);
    const navigate = useNavigate();

    useEffect(
        () => {
            if (user == null) {
                navigate('/Login');
            }
        },
        [navigate, user]
    )


    return (
        <>
            <Header />
            <h1 className='mt-20 text-center font-bold text-5xl'>Play</h1>
            <div className='mt-3 max-w-[600px] mx-auto bg-white rounded-lg dark:bg-gray-800 dark:border-gray-700 pb-1.5'>
                {
                    result == null
                        ?
                        <>
                            <Cart {...ques[current]} reset = {reset} answer={answer} userAnswer={userAnswer} current={current} />
                            <hr />
                            <div className='flex justify-between m-4'>
                                <button disabled={current == 0 ? true : false} className='p-3 disabled:bg-blue-400 hover:disabled:bg-blue-400 text-white bg-blue-600 hover:bg-blue-700  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 ' onClick={prev}>Prev</button>
                                {
                                    current == ques.length - 1
                                        ? <button className='p-3 text-white bg-blue-600 hover:bg-blue-700  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700'  onDoubleClick={finish}>Finish</button>
                                        
                                        : <button className='p-3 disabled:bg-blue-300 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700' onClick={next}>Next</button>
                                }

                            </div>
                        </>
                        :
                        <div className='p-3'>
                            Total = {result.total}
                            <hr />
                            Marks = {result.marks}
                            <hr />
                            <button onClick={reset}
                            type="submit"
                            className="w-full mt-3 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            <Link
                                to="/Play"
                            >
                                Play again
                            </Link>
                        </button>
                        </div>
            }

            </div>
        </>
    );


}

export default Play;

const Cart = ({ question, options, current, userAnswer, answer }) => {
    const [ans, setAns] = useState(null)
    

    useEffect(
        () => {
            if (answer[current] != undefined) {
                setAns(answer[current])
            }
            else {
                setAns(null);
            }
        },
        [answer, current]
    )
    return (
        <div className='shadow'>
            <div className='p-2'>                                           
                                                                     {/* question */}
                <div className='text-2xl py-2 border-b rounded text-white'>{current + 1}) {question}</div>
                {
                        Array.isArray(options) && options.length > 0 && options.map((op, i) => {
                            return (
                                <div key={i} onClick={() => {
                                    setAns(i + 1);
                                    userAnswer(i + 1);
                                }}
                                    className={`${ans === (i + 1) ? 'bg-slate-400 rounded text-white uppercase dark:text-white font-bold' : ''} text-2xl p-2 cursor-pointer text-white`}>
                                    {i + 1}) {op}
                                </div>
                            );
                        })
                }
                {/* <div className='text-2xl p-2 cursor-pointer hover:bg-slate-500 rounded text-gray-700 uppercase dark:text-gray-400'>A) Option 1</div>
                <div className='text-2xl p-2 cursor-pointer hover:bg-slate-500 rounded text-gray-700 uppercase dark:text-gray-400'>B) Option 2</div>
                <div className='text-2xl p-2 cursor-pointer hover:bg-slate-500 rounded text-gray-700 uppercase dark:text-gray-400'>C) Option 3</div>
                <div className='text-2xl p-2 cursor-pointer hover:bg-slate-500 rounded text-gray-700 uppercase dark:text-gray-400'>D) Option 4</div> */}
            </div>

        </div>
    )
}
