import React, { createContext, useEffect, useState } from 'react';
import { getDatabase, onValue, ref, set } from "firebase/database";
import { stringify } from 'postcss';

const Context = createContext();
const MainContext = (props) => {
    const db = getDatabase();
    const [ques,setQues] = useState([]);
    const [user, setUser] = useState(null);
    const [current, setCurrent] = useState(0);
    const [answer, setAnswer] = useState({});
    const [result, setResult] = useState(null);

    const reset = () => {
        setCurrent(0);
        setAnswer({});
        setResult(null)
    }

    useEffect(
        () => {
            const starCountRef = ref(db, 'Users');
            onValue(starCountRef, (snapshot) => {
                 const userData = snapshot.val();
                 if(userData == null) return;

                 const arr = Object.keys(userData).map(
                    (k) => {
                        return {
                            id: k,
                            ...userData[k]
                        }
                    }
                 )
                 setData(arr);
                })

            const lsuser = localStorage.getItem('user');
            if(lsuser != null){
                setUser(JSON.parse(lsuser));
            }

            const current = localStorage.getItem('current');
            if(current != null){
                setCurrent(parseInt(current));
            }

            const lsAnswer = localStorage.getItem('answer');
            if(lsAnswer != null){   
                setAnswer(JSON.parse(lsAnswer))
            }
        },[])
    useEffect(
        () => {
            if(current != 0) localStorage.setItem("current", current);
        },
        [current]
    )
    function getDataFromTimestamp (Timestamp) {
        if(Timestamp == undefined){
            return 'N/A'
        }
        else{
            const d = new Date(Timestamp);
            return d.toLocaleDateString();
        }
    }

    const loginUser = (user) => {
        localStorage.setItem('user', JSON.stringify(user))
        setUser(user)
        
    };

    const logOut = () => {
        setUser(null);
        localStorage.removeItem('user');
    }

    const next = () => {
        setCurrent(current + 1);

    }

    const prev = () => {
        setCurrent(current - 1);
        if(current == 1 ) localStorage.setItem("current", current);
    }

    const finish = () =>{
        let marks = 0;
        for(let i = 0; i < ques.length; i++) {
            if(ques[i].correctOption == answer[i]) {
                marks ++;
            }
        }
        const res = {
            total: ques.length,
            marks,
        }
        setResult(res)
    }
    const userAnswer = (ans) => {
        //console.log(current, ans);
        const tempAns = {...answer}
        tempAns[current] = ans;
        setAnswer(tempAns)
        
    }

    useEffect(
        () => {
            if( Object.keys(answer).length != 0) {
                localStorage.setItem("answers", JSON.stringify(answer));
            }
        },
        [answer]
    )

    

    

    return (
        <Context.Provider value={{reset, result, finish, answer, userAnswer, prev, next, getDataFromTimestamp, ques, setQues, loginUser, user, logOut, current, setCurrent}}>
            {props.children}
        </Context.Provider>
    );
}

export default MainContext;
export {Context};
