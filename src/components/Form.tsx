import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid'
import { categories } from "../data/categories"
import { Activity } from "../types"
import { ActivityActions, ActivityState } from "../reducers/activity-reducer"

type FormProps = {
    dispatch: Dispatch<ActivityActions>,
    state: ActivityState
}

const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0
}

export default function Form({dispatch, state}: FormProps) {

    const [activity, setActivity] = useState<Activity>(initialState);

    /** To identify when the state has an activeId setted */
    useEffect(() => {
        if(state.activeId){
            // console.log(state.activeId)
            const selectedActivity = state.activities.filter( stateActivity => stateActivity.id === state.activeId )[0]
            setActivity(selectedActivity)
        }
    }, [state.activeId])

    /** Basic method to write in the state the user input */
    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        // Identify the fields that will be converted to a number.
        const isNumberField = ['category','calories'].includes(e.target.id);
        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }

    const isValidActivity = () => {
        const { name, calories } = activity
        return name.trim() !== '' && calories > 0
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch({type: 'save-activity', payload: {newActivity: activity}})

        setActivity({
            ...initialState,
            id: uuidv4()
        })
    }

    return (
        <form 
            className="space-y-5 bg-white shadow p-10 rounded-lg"
            onSubmit={handleSubmit}    
        >
            {/* SELECT */}
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">Category:</label>
                <select
                    id="category"
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    value={activity.category}
                    onChange={handleChange}
                >
                    {categories.map(category => (
                        <option
                        key={category.id}
                        value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            {/* ACTIVITY */}
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className="font-bold">Activity:</label>
                <input
                    id="name"
                    type="text"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Ex. Food, Orange juice, Salad, Exercice, Weights, Cycling"
                    value={activity.name}
                    onChange={handleChange}
                />
            </div>
            {/* CALORIES */}
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold">Calories:</label>
                <input
                    id="calories"
                    type="number"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Calories. Ex. 300 or 500"
                    value={activity.calories}
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                className="disabled:opacity-10 bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer"
                value={activity.category === 1 ? 'Save food' : 'Save exercice'}
                disabled={!isValidActivity()}
            />
        </form>
    )
}