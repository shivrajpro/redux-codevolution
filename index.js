console.log("From index.js")

const redux = require('redux');
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED';

function orderCake() {
    return { type: CAKE_ORDERED, payload: 1 };
}

function restockCake(qty = 1) {
    return {
        type: CAKE_RESTOCKED,
        payload: qty
    }
}

function orderIceCream() {
    return {
        type: ICECREAM_ORDERED,
        payload: 1
    }
}

function restockIceCream(qty = 1) {
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty
    }
}

const initialState = {
    numOfCakes: 10,
    numOfIceCreams: 20
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            }

        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload
            }

        case ICECREAM_ORDERED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1
            }

        case ICECREAM_RESTOCKED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams + action.payload
            }
        default:
            return state;
    }
}

const store = createStore(reducer);
const dispatch = bindActionCreators({ orderCake, restockCake, orderIceCream, restockIceCream }, store.dispatch);
console.log("Initial State", store.getState());

const unsubscribe = store.subscribe(() => console.log("Updated state", store.getState()));

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake());
// store.dispatch(restockCake(2));
dispatch.orderCake();
dispatch.orderCake();
dispatch.orderCake();
dispatch.restockCake();
dispatch.restockCake(2);

dispatch.orderIceCream();
dispatch.orderIceCream();
dispatch.restockIceCream(2);

unsubscribe();