import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import { Context } from '../context/Maincontext';
import { MdDeleteForever } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import axios from 'axios';


const Listing = () => {
    const { list, openToast, fecthQuestionHandler, API_BASE_URL } = useContext(Context);
    const [toggle, setToggle] = useState(false);
    const [editedOptions, setEditedOptions] = useState([]);
    const [editedQuestion, setEditedQuestion] = useState("");
    const [editedAnswer, setEditedAnswer] = useState("");
    const [id, setId] = useState("");

    const handleEditClick = (data) => {
        console.log(data);
        setToggle(true);
        setEditedQuestion(data.question);
        setEditedAnswer(data.option[data.correctOption - 1]);

    };

    const handleSave = async (editedQuestion, editedAnswer, editedOptions, id) => {
        setToggle(false);
        console.log(id);
        console.log(editedQuestion);
        console.log(editedAnswer);
        console.log(editedOptions);

        // axios.put('http://localhost:5000/Question/update/' + data._id)
        axios.put(`${API_BASE_URL}Question/update/${id}`, {

            question: editedQuestion,
            correctAnswer: editedAnswer,
            option: editedOptions

        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(
                (success) => {
                    if (success.data.status === 1) {
                        fecthQuestionHandler();
                        openToast(success.data.msg, 'success')

                    }
                    else {
                        openToast(success.data.msg, 'error');
                    }
                }
            ).catch(
                (error) => {
                    openToast(error.message, 'error');
                }
            );

    }




    const deleteData = (id) => {

        axios.delete(`${API_BASE_URL}Question/delete/` + id)
            .then(
                (success) => {
                    if (success.data.status === 1) {
                        fecthQuestionHandler();
                        openToast(success.data.msg, 'success')
                    }
                    else {
                        openToast(success.data.msg, 'error');
                    }
                }
            ).catch(
                (error) => {
                    openToast('error.message', 'error');
                }
            );
    }

    return (
        <>

            <div className={`${toggle == true ? 'flex' : 'hidden'} justify-center items-center w-full h-full fixed top-0 left-0 cursor-pointer bg-[rgba(0,0,0,0.4)] backdrop-blur-sm z-[60]`}>
                <div className='w-2/4 mx-auto rounded-md dark:bg-gray-800 shadow h-1/2'>
                    <div className='text-3xl text-white font-bold p-4 flex justify-between items-center '>
                        Update Question & Answer
                        <TiDelete onClick={() => setToggle(false)} className='cursor-pointer' />
                    </div>
                    <form className="max-w-sm mx-auto">
                        <div className="mb-5">
                            <label
                                htmlFor="question"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Question
                            </label>
                            <input
                                value={editedQuestion}
                                onChange={(e) => setEditedQuestion(e.target.value)}
                                type="text"
                                id="question"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Question"
                                required={true}
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="option"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Correct Option
                            </label>
                            <input
                                value={editedAnswer}
                                onChange={
                                    (e) => {
                                        setEditedAnswer(e.target.value)
                                        {
                                            list.map(
                                                (list, index) => {
                                                    if (list._id === id) {
                                                        const updatedOptions = [...list.option];
                                                        // console.log(updatedOptions);
                                                        updatedOptions[list.correctOption - 1] = e.target.value;  // Update specific option
                                                        setEditedOptions(updatedOptions);
                                                    }

                                                }
                                            )
                                        }
                                    }
                                }
                                type="text"
                                id="option"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder='Option'
                                required={true}
                            />
                        </div>

                        <button

                            onClick={
                                () => {

                                    handleSave(editedQuestion, editedAnswer, editedOptions, id)

                                }
                            }

                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
            <Header />
            <div className='w-full mt-4 flex align-middle justify-center'>
                <div className="w-4/5 relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Sr
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Product name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Correct Answer
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    {/* <span className="sr-only">Action</span> */}
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                list.map(
                                    (list, i) => {
                                        return (
                                            <tr key={list._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 ">
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    {i + 1}
                                                </th>
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    {list.question}
                                                </th>
                                                <td className="px-6 py-4">{list.option[list.correctOption - 1]}</td>
                                                <td className="px-6 py-4 flex justify-between">
                                                    <a

                                                        onClick={
                                                            () => {
                                                                handleEditClick(list)
                                                                setId(list._id);
                                                            }
                                                        }
                                                        href="#"
                                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                    >
                                                        Edit
                                                    </a>
                                                    <a
                                                        href="#"
                                                        className=" font-medium text-2xl text-red-600 dark:text-red-500 "
                                                    >
                                                        <MdDeleteForever onClick={() => deleteData(list._id)} />
                                                    </a>
                                                </td>
                                            </tr>
                                        )
                                    }
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    );
}

export default Listing;
