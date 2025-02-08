import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { Context } from "../context/Maincontext";
import { useNavigate } from "react-router-dom";

export default function QuizQuestion() {
    const { user, list } = useContext(Context);
    const navigate = useNavigate();

    const [selectedOption, setSelectedOption] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    useEffect(() => {
        if (user != null) {
            navigate('/Playground');
        }
    }, [user]);

    const correctOptionId = list[currentQuestionIndex]?.correctOption;
    const handleSubmit = () => {
        if (selectedOption) {
            setIsCorrect(selectedOption === correctOptionId);
            setSubmitted(true);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setSubmitted(false);
            setSelectedOption(null);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < list.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSubmitted(false);
            setSelectedOption(null);
        }
    };

    return (
        <div className="">
            <Header />
            <div className="flex flex-col items-center justify-center min-h-full bg-gray-100 pt-32 pb-16">
                <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
                    {list.length > 0 && (
                        <>
                            <h1 key={list[currentQuestionIndex]._id} className="text-2xl font-semibold mb-4 text-center"> {list[currentQuestionIndex].question}</h1>
                            <div className="space-y-2">
                                {list[currentQuestionIndex].option.map((option, i) => (
                                    <button
                                        key={option}
                                        onClick={() => setSelectedOption(i + 1)}
                                        className={`w-full py-2 px-4 rounded-lg border transition-colors duration-200 text-left ${selectedOption === i + 1
                                            ? "bg-blue-500 text-white border-blue-500"
                                            : "bg-gray-100 border-gray-300 hover:bg-gray-200"
                                            }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                    <button
                        onClick={handlePrevious}
                        className="mt-4 py-2 px-4 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="mx-16 mt-4 py-2 px-4 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
                    >
                        Submit
                    </button>
                    <button
                        onClick={handleNext}
                        className="mt-4 py-2 px-4 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
                    >
                        Next
                    </button>

                    {submitted && (
                        <div
                            className={`mt-4 p-4 rounded-lg text-center text-white ${isCorrect ? "bg-green-500" : "bg-red-500"
                                }`}
                        >
                            {isCorrect ? "Correct! 🎉" : "Incorrect. Try again!"}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
