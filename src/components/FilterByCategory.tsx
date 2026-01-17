import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";

export default function FilterByCategory() {
    const {dispatch} = useBudget()

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch({type:"select-category", payload:{id: e.target.value}})
    }
  return (
    <div className='bg-white shadow-lg rounded-lg p-10'>
        <form action="">
            <div className='flex flex-col md:flex-row md:items-center gap-5'>
                <label htmlFor="category">Filtrar Gastos</label>
                <select 
                    id="category"
                    className="bg-slate-300 p-3 flex-1 rounded"
                    onChange={(e) => handleChange(e)}
                >
                    <option value={""}>-- Todas las Categorías --</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>
        </form>
    </div>
  )
}
