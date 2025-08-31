const redux = require('redux');
const createStore = redux.createStore;
const produce = require('immer').produce;

const initialState = {
    name: "Shivraj",
    address: {
        street: "keshavnagar",
        city: "pune",
        state: "mh"
    }
}

const STREET_UPDATED = "STREET_UPDATED";

function updateStreet(street) {
    return {
        type: STREET_UPDATED,
        payload: street
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case STREET_UPDATED:
            // return {
            //     ...state,
            //     address: {
            //         ...state.address,
            //         street: action.payload
            //     }
            // }
            return produce(state, (draftState) => {
                draftState.address.street = action.payload
            })
        default:
            return state;
    }
}

const store = createStore(reducer);
console.log("inital state", store.getState());

const unsubscribe = store.subscribe(() => console.log("updated state", store.getState()));

store.dispatch(updateStreet("kharadi"));
unsubscribe();
