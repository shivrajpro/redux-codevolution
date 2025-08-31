const redux = require('redux');
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleWare = require('redux-thunk').default;
const createStore = redux.createStore;
const axios = require('axios');

const initialState = {
    loading: false,
    data: [],
    error: ''
}

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED';
const FETCH_USERS_SUCCESSFUL = 'FETCH_USERS_SUCCESSFUL';
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUESTED
    }
}

const fetchUsersSuccessful = users => {
    return {
        type: FETCH_USERS_SUCCESSFUL,
        payload: users
    }
}

const fetchUserFailed = error => {
    return {
        type: FETCH_USERS_FAILED,
        payload: error
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUESTED:
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCESSFUL:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: ''
            }
        case FETCH_USERS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

const fetchUsers = () => {
    return function (dispatch) {
        dispatch(fetchUsersRequest());
        axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
            dispatch(fetchUsersSuccessful(response.data.map((user) => user.id)))
        }).catch((error) => {
            dispatch(fetchUserFailed(error.message));
        })
    }
}
const store = createStore(reducer, applyMiddleware(thunkMiddleWare));
console.log("Initial state:", store.getState())

const unsubscribe = store.subscribe(() => {
    console.log("Updated state:", store.getState())
})

store.dispatch(fetchUsers());