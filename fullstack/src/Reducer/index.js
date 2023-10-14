import { ActionTypes } from "../Constant/ActionTypes";

const initialState = {
    detail : {},
};


export function home(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.HOME:
            return {
                ...state,
                detail:{
                    ...state.userDetails,
                    ...action.payload
                }
            };
        
        default:
            return state
    }
}
