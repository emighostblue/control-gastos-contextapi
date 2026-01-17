import {CircularProgressbar, buildStyles} from "react-circular-progressbar"
import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import "react-circular-progressbar/dist/styles.css";

export default function BudgetTracker() {

    const {dispatch, state, expensedAmount, availableAmount} = useBudget()

    const porcentage = +((expensedAmount/state.budget) * 100).toFixed(2)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                <CircularProgressbar 
                    value={porcentage}
                    styles={buildStyles({
                        pathColor: porcentage === 100 ? "#DC2626" : "#3B82F6" ,
                        trailColor: "#21342143",
                        textSize: 8,
                        textColor: porcentage === 100 ? "#DC2626" : "#3B82F6"
                    })}
                    text={`${porcentage}% Gastado`}
                />

             
            </div>

            <div className="flex flex-col justify-center items-center gap-8">
                <button
                    type="button"
                    className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg hover:cursor-pointer"
                    onClick={() => dispatch({type:"reset-app"})}
                >
                    Resetear App
                </button>


                <AmountDisplay
                    label="Presupuesto"
                    amount={state.budget}
                />
                <AmountDisplay
                    label="Disponible"
                    amount={availableAmount}
                />
                <AmountDisplay
                    label="Gastado"
                    amount={expensedAmount}
                />
            </div>
        </div>
    )
}
