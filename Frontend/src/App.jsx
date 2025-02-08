import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Listing from './pages/Listing'
import QuizCreateForm from './pages/QuizCreateForm'
import QuizQuestion from './pages/QuizQuestion'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import TC from './pages/T&C'




function App() {
  const router = createBrowserRouter([
    { path:'/',
      element: <Listing/>
    },
    {
      path:'/CreateQuizQuestion',
      element: <QuizCreateForm />
    },
    {
      path: '/Login',
      element: <Login />
    },
    {
      path: '/SignUp',
      element: <SignUp />
    },
    {
      path: '/Terms&Conditions',
      element: <TC />
    },
    {
      path: '/Playground',
      element: <QuizQuestion />
    }

  ])
  return (
    <RouterProvider router={router}/>
  )
}

export default App
