import { useState } from 'react'
import { createBrowserRouter, RouterProvider, useNavigate} from 'react-router-dom'
import Listing from './Pages/Listing'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import Play from './Pages/Play'
import Create from './Pages/Create'
import TC from './Pages/T&C'


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4CDRwIBZ4YaRqAkscIlaPmk1KKi-wdzQ",
  authDomain: "quizapp-92f60.firebaseapp.com",
  projectId: "quizapp-92f60",
  storageBucket: "quizapp-92f60.appspot.com",
  messagingSenderId: "139451912821",
  appId: "1:139451912821:web:dbd26d734ac46aca7b5e3c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);




function App() {
  const routes = createBrowserRouter([
    {
      path: '',
      element:<Listing/> 
    },
    {
      path: '/Login',
      element:<Login/>,
      
    },
    {
      path: '/SignUp',
      element:<SignUp/>
    },
    {
      path: '/Play',
      element:<Play/>
    },
    {
      path: '/Create',
      element:<Create/>
    },
    {
      path: '/TC',
      element:<TC/>
    }

  ])

  return (
   <RouterProvider router = {routes}/>
  )
}

export default App

