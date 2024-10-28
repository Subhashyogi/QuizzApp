/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import Header from '../componentes/Header';
import { Context } from '../context/MainContext';
import { getDatabase, ref, set } from "firebase/database";
import { v4 } from 'uuid';


const Create = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctOption, setCorrectOption] = useState('');
    

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const db = getDatabase();
        const uId = v4();
        // Handle form submission logic here
        const data = { question, options, correctOption,createAt: new Date().getTime() }
        
    
        set(
            ref(db, 'Questions/' + uId),
            data
        )       

         e.target.reset()
        
    };

        
    return (
        <>
        <Header/>

        <div className="max-w-[1000px] mt-20 mx-auto p-6 bg-white rounded-lg dark:bg-gray-800 dark:border-gray-700 shadow-md space-y-4 md:space-y-6">
            <h2 className="text-3xl text-white text-center font-bold mb-4">Create a Question</h2>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="question">
                        Question
                    </label>
                    <input
                        type="text"
                        id="question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                {options.map((option, index) => (
                    <div key={index} className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor={`option${index}`}>
                            Option {index + 1}
                        </label>
                        <input
                            type="text"
                            id={`option${index}`}
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        />
                    </div>
                ))}
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="correctOption">
                        Correct Option (1-4)
                    </label>
                    <input
                        type="number"
                        id="correctOption"
                        min="1"
                        max="4"
                        value={correctOption}
                        onChange={(e) => setCorrectOption(parseInt(e.target.value))}
                        className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className=" text-white translate-x-1 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Submit
                </button>
            </form>
        </div>
        </>
    );
}

export default Create;

