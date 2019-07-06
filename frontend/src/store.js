import {createStore} from 'redux'

const store = createStore((state = [], action) => {
    switch (action.type) {
        case 'ADD_PAYMENT': {
            return [
                ...state,
                action.payload
            ]
        }
        case 'CLEAR': {
            return [];
        }
        default: break;
    }
    return state;
});

export default store
