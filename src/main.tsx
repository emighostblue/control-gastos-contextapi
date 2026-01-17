import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BudgetProvider} from "./context/BudgetContext.tsx"
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BudgetProvider>
      <App />
    </BudgetProvider>
  </StrictMode>,
)
