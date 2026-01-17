import { useContext } from "react"
import {BudgetContext} from "../context/BudgetContext.tsx"

export const useBudget = () => {
    const context = useContext(BudgetContext)
    
    if(!context){
        throw new Error("Context Must be within BudgetProvider")
    }
    return context
}