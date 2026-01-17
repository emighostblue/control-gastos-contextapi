import { useState, useEffect } from "react"
import {categories} from "../data/categories.ts"
import type {DraftExpense} from "../types/index.ts"
import DatePicker from "react-date-picker"
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import ErrorMesage from "./ErrorMesage.tsx";
import { useBudget } from "../hooks/useBudget.ts";


export default function ExpenseForm() {

    const {dispatch, state, availableAmount} = useBudget()

    const [expense, setExpense] = useState<DraftExpense>({
        name: "",
        amount: 0,
        category: "",
        date: new Date()
    })

    const [prevAmount, setPrevAmount] = useState(0)

    useEffect(() => {
        if(state.editingId){
            const currentExpense = state.expenses.filter(expense => expense.id === state.editingId)[0]
            setExpense(currentExpense)
            setPrevAmount(currentExpense.amount)
        }
    }, [state.editingId])

    

    const [error, setError] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        if(e.target.id === "amount"){
            //number
            setExpense({
                ...expense,
                amount: Number(e.target.value)
            }
            )
        }
        else{
            //string
            setExpense(
                {
                    ...expense,
                    [e.target.id]: e.target.value
                }
            )
        }
    }

    const handleSubmit = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        e.preventDefault()
        
        //Object.values convierte de objeto a arreglo
        if(Object.values(expense).includes('')){
            setError('Todos los campos son obligatorios.')
        }
        else if((expense.amount - prevAmount) > availableAmount){
            setError('Este gasto se sale del presupuesto.')
        }
   
        else { 

            if(state.editingId){
                dispatch({type:"update-expense", payload:{expense: {...expense, id: state.editingId}}})
            }
            
            else {
                dispatch({type:"add-expense", payload:{expense}})

            }

            //Reiniciar el state
            setExpense({
                name: "",
                amount: 0,
                category: "",
                date: new Date()
            })
            setPrevAmount(0)
            
            dispatch({type:"close-modal"})
            
        }
    }


    return (
        <form className="space-y-5">
            <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
                {state.editingId ? "Editar Gasto" : "Nuevo Gasto"}
            </legend>

            {
                error && <ErrorMesage> {error} </ErrorMesage>
            }
            <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xl">Nombre del Gasto:</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Agrega el nombre del gasto"
                    className="bg-slate-300 p-2"
                    name="name"
                    value={expense.name}
                    onChange={ handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">Cantidad del Gasto:</label>
                <input
                    id="amount"
                    type="number"
                    placeholder="Agrega el nombre del gasto"
                    className="bg-slate-300 p-2"
                    name="amount"
                    value={expense.amount}
                    onChange={handleChange}
                />
            </div>
            
            <div className="flex flex-col gap-2">
                <label htmlFor="category" className="text-xl">Categoría:</label>
                <select
                    id="category"
                    className="bg-slate-300 p-2"
                    name="category"
                    value={expense.category}
                    onChange={handleChange}
                >
                    <option value="">-- Seleccione --</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name} </option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="date" className="text-xl">Fecha:</label>
                <DatePicker
                    id="date" 
                    onChange={(e) => setExpense({...expense, date: e})} 
                    value={expense.date} 
                    className={"bg-slate-100 p-2 border-0"}
                />
            </div>
                

            <input 
                type="submit"
                className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
                value={state.editingId ? "Guardar cambios" : "Registrar Gasto"}
                onClick={handleSubmit}
                />
        </form>
    )
}
