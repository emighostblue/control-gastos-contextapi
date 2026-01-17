import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"

export default function ExpenseList() {
    
    const {state} = useBudget()

    const filteredExpenses = state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory) : state.expenses
    const isEmpty = useMemo(() => {
        return filteredExpenses.length <= 0
    }, [state])



    return (
        <div className="mt-10">
            {isEmpty ? (<div className="text-gray-600 text-2xl font-bold"> No Hay Gastos </div>) : (
                <> 
                    <p className="text-gray-600 text-2xl font-bold my-5">Lista de Gastos</p>
                    {filteredExpenses.map(expense => (
                        <ExpenseDetail 
                            key={expense.id}
                            expense={expense}
                        />
                    ))}
                    
                </>
                )}
        </div>
    )
}
