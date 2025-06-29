import { Activity } from "../types";

/**
 * Actions are the functions that handle all the logic to modify your state.
 * - type: Describes what is happening in this action.
 * - payload: Is the information that modifies your state.
 */
export type ActivityActions = 
    { type: 'save-activity', payload: { newActivity : Activity } }

type ActivityState = {
    activities : Activity[]
}

/** The initial state with which the reducer is created */
export const initialState: ActivityState = {
    activities: []
}

export const activityReducer = (
        state: ActivityState = initialState,
        action: ActivityActions
    ) => {

    if(action.type === 'save-activity'){
        // This code handle all the logic to update the state
        console.log("Form data: ", action.payload.newActivity);

        // required to return the updated state
        return {
            // copy of the previous state
            ...state,
            activities: [...state.activities, action.payload.newActivity]
        }
    }

    return state
}