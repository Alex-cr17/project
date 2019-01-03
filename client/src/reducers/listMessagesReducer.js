import { GET_LIST_MESSAGES } from '../actions/types';

const initialState = {
};

export default function(state = initialState, action ) {
    switch(action.type) {
        case GET_LIST_MESSAGES:
            return {
                ...state,
              listMessages:  action.payload
            } 
        default: 
            return state;
    }
}