import React, { useContext, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { Context } from "../context/Maincontext";
// const OPENAI_API_KEY = process.env.REACT_APP_API_KEY;

export default function QuizCreateForm() {
    const { openToast, fecthQuestionHandler } = useContext(Context);

    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["", "", "", ""]);
    const [correctOption, setCorrectOption] = useState(0);


    const resetInputs = (e) => {
        setQuestion('');
        setOptions(["", "", "", ""]);
        setCorrectOption(0);
    }

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const SubmitHandler = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/Question/create', {question, options, correctOption})
            .then(
                (success) => {
                    if (success.data.status === 1) {
                        fecthQuestionHandler();
                        openToast(success.data.msg, 'success')
                        resetInputs();
                    }
                    else {
                        openToast(success.data.msg, 'error');
                    }
                }
            ).catch(
                (error) => {
                    console.log(error);
                }
            );
    };

    return (
        <>
            <Header/>
            <form method="POST" onSubmit={SubmitHandler}>
                <div className="flex flex-col items-center justify-center mt-4  ">
                    <div className="bg-white  dark:bg-gray-800 dark:border-gray-700 p-6 rounded-2xl shadow-lg w-full max-w-md ">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Create a Quiz</h1>

                        {/* Question Input */}
                        <label className="block mb-2 font-medium dark:text-white">Question:</label>
                        <input
                            type="text"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                            placeholder="Enter your question here"
                            required={true}
                        />

                        {/* Options Input */}
                        {options.map((option, index) => (
                            <div key={index} className="mb-2">
                                <label className="block mb-1 font-medium dark:text-white">Option {index + 1}:</label>
                                <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    placeholder={`Enter option ${index + 1}`}
                                    required={true}
                                />
                            </div>
                        ))}

                        {/* Correct Option Selector */}
                        <label className="block mt-4 mb-2 font-medium dark:text-white">Correct Option (1-4):</label>
                        <input
                            type="number"
                            value={correctOption}
                            onChange={(e) => setCorrectOption(Number(e.target.value))}
                            min="1"
                            max="4"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                            required={true}
                        />

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full text-white bg-blue-600 hover:bg-blue-700 active:scale-95 focus:outline-none font-medium rounded-lg text-sm px-4 mt-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 transition"
                        >
                            Submit Quiz
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}