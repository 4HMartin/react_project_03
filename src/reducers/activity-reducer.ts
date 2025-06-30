import { Activity } from "../types";

/**
 * Actions are the functions that handle all the logic to modify your state.
 * - type: Describes what is happening in this action.
 * - payload: Is the information that modifies your state.
 */
export type ActivityActions =
    { type: 'save-activity', payload: { newActivity : Activity } } |    // Create or Update an activity
    { type: 'set-activeId', payload: { id : Activity['id'] } } |        // Identify which element is active to edit
    { type: 'delete-activity', payload: { id : Activity['id'] } }       // Delete an activity

export type ActivityState = {
    activities : Activity[],
    activeId: Activity['id']
}

/** The initial state with which the reducer is created */
export const initialState: ActivityState = {
    activities: [],
    activeId: ''
}

export const activityReducer = (
        state: ActivityState = initialState,
        action: ActivityActions
    ) => {

    if(action.type === 'save-activity'){
        // This code handle all the logic to update the state
        // console.log("Form data: ", action.payload.newActivity);

        let updatedActivities : Activity[] = []
        if(state.activeId){ // If an activeId exists, we are editing an activity, otherwise we are creating a new one
            updatedActivities = state.activities.map( activity => activity.id === state.activeId ? action.payload.newActivity : activity )
        } else {
            updatedActivities = [...state.activities, action.payload.newActivity]
        }
        
        return {
            // copy of the previous state
            ...state,
            activities: updatedActivities,
            activeId: '' // reset the active id once the activity is created/updated
        }
    }

    if(action.type === 'set-activeId'){
        return {
            ...state,
            activeId: action.payload.id
        }
    }

    if(action.type === 'delete-activity') {
        return {
            ...state,
            activities: state.activities.filter( activity => activity.id !== action.payload.id )
        }
    }

    return state
}