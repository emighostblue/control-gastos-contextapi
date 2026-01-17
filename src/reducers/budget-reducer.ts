import { v4 as uuidv4 } from "uuid"
import type { DraftExpense, Expense, Category } from "../types"

export type BudgetActions =
    { type: "add-budget", payload: { budget: number } } |
    { type: "show-modal" } |
    { type: "close-modal" } |
    { type: "add-expense", payload: { expense: DraftExpense } } |
    { type: "remove-expense", payload: { id: Expense["id"] } } |
    { type: "get-expense-id", payload: { id: Expense["id"] } } |
    { type: "update-expense", payload: { expense: Expense } } |
    { type: "reset-app" } |
    { type: "select-category", payload: {id: Category["id"]} } 

export type BudgetState = {
    budget: number
    modal: boolean
    expenses: Expense[]
    editingId: Expense["id"]
    currentCategory: Category["id"]
}

const budgetLocalStorage = (): number => {
    const budget = localStorage.getItem("budget")
    return budget ? +budget : 0
}
const expensesLocalStorage = (): Expense[] => {
    const expenses = localStorage.getItem("expenses")
    return expenses ? JSON.parse(expenses) : []
}


export const initialState = (): BudgetState => {
    return {
        budget: budgetLocalStorage(),
        modal: false,
        expenses: expensesLocalStorage(),
        editingId: '',
        currentCategory: ''
    }
}

const createExpense = (expense: DraftExpense): Expense => {
    return {
        ...expense,
        id: uuidv4()
    }
}
export const budgetReducer = (
    state: BudgetState = initialState(),
    action: BudgetActions
): BudgetState => {
    switch (action.type) {
        case "add-budget": {
            return {
                ...state,
                budget: action.payload.budget
            }
        }
        case "show-modal": {
            return {
                ...state,
                modal: true
            }
        }
        case "close-modal": {
            return {
                ...state,
                modal: false,
                editingId: ''
            }
        }
        case "add-expense": {
            const expense = createExpense(action.payload.expense);
            return {
                ...state,
                expenses: [...state.expenses, createExpense(expense)]
            }
        }
        case "remove-expense": {
            const updatedExpenses = state.expenses.filter(expense => expense.id !== action.payload.id)
            return {
                ...state,
                expenses: updatedExpenses
            }
        }
        case "get-expense-id": {
            return {
                ...state,
                modal: true,
                editingId: action.payload.id
            }
        }
        case "update-expense": {
            const updatedExpenses = state.expenses.map(expense => {
                if (expense.id === action.payload.expense.id) {
                    return {
                        ...expense,
                        name: action.payload.expense.name,
                        amount: action.payload.expense.amount,
                        category: action.payload.expense.category,
                        date: action.payload.expense.date
                    }
                }
                else {
                    return expense
                }
            })
            return {
                ...state,
                expenses: updatedExpenses
            }
        }
        case "reset-app": {
            return {
                budget: 0,
                modal: false,
                expenses: [],
                editingId: '',
                currentCategory: ''
            }
        }
        case "select-category": {
            return {
                ...state,
                currentCategory: action.payload.id
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}