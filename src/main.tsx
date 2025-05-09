import { createRoot } from 'react-dom/client'
import './index.css'
import 'react-datepicker/dist/react-datepicker.css';
import App from './App.js'
import { HashRouter } from 'react-router-dom'
import { FormProvider } from './context/FormContext.tsx'

createRoot(document.getElementById('root')!).render(
    <FormProvider>
    <HashRouter>
    <App/>
    </HashRouter>
    </FormProvider>
)
