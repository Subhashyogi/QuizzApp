import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Maincontext from './context/Maincontext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Maincontext>
    <App />
    </Maincontext>
  </StrictMode>
);
