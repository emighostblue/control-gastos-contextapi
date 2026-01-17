import { createContext, useReducer, useMemo, type ReactNode } from "react"
import type { BudgetActions, BudgetState } from "../reducers/budget-reducer.ts"
import { budgetReducer, initialState } from "../reducers/budget-reducer.ts"

type BudgetContextProps = {
    state: BudgetState
    dispatch: React.ActionDispatch<[action: BudgetActions]>
    expensedAmount: number
    availableAmount: number
}
type BudgetProviderProps = {
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>(null!)

export const BudgetProvider = ({ children }: BudgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, undefined, initialState)

    const expensedAmount = useMemo(() => {
        return state.expenses.reduce((total, expense) => {
            total = expense.amount + total
            return total
        }, 0)
    }, [state.expenses])

    const availableAmount = useMemo(() => {
        return state.budget - expensedAmount
    }, [state.expenses])

    return (
        <BudgetContext.Provider
            value={{ state, dispatch, expensedAmount, availableAmount }}
        >
            {children}
        </BudgetContext.Provider>
    )
}