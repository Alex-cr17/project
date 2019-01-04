import { GET_LIST_MESSAGES } from '../actions/types';

const initialState = {
    data: []
};

export default function(state = initialState, action ) {
    switch(action.type) {
        case GET_LIST_MESSAGES:
        return {
            ...state,
            data: [...state.data, action.payload]
          };
        default: 
            return state;
    }
}