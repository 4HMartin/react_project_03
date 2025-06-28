import { Activity } from "../types";

export type ActivityActions = {

}

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

}