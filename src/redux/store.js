import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import userReducer from "./user/userReducer";
import commonReducer from "./common/commonReducer";
import rootSaga from "./saga";

export function createReducerManager(initialReducers) {

    // Create an object which maps keys to reducers
    const reducers = { ...initialReducers }

    // Create the initial combinedReducer
    let combinedReducer = combineReducers(reducers)

    // An array which is used to delete state keys when reducers are removed
    let keysToRemove = []

    const rootReducer = (state, action) => {
        if (action.type === 'LOGOUT_SUCCESS') {
            localStorage.clear();
            return state = undefined;
        }
        return combinedReducer(state, action);
    }

    return {
        getReducerMap: () => reducers,

        // The root reducer function exposed by this object
        // This will be passed to the store
        reduce: (state, action) => {
            // If any reducers have been removed, clean up their state first
            if (keysToRemove.length > 0) {
                state = { ...state }
                for (let key of keysToRemove) {
                    delete state[key]
                }
                keysToRemove = []
            }

            // Delegate to the combined reducer
            return rootReducer(state, action)
        },

        // Adds a new reducer with the specified key
        add: (key, reducer) => {
            if (!key || reducers[key]) {
                return
            }

            // Add the reducer to the reducer mapping
            reducers[key] = reducer

            // Generate a new combined reducer
            combinedReducer = combineReducers(reducers)
        },

        // Removes a reducer with the specified key
        remove: key => {
            if (!key || !reducers[key]) {
                return
            }

            // Remove it from the reducer mapping
            delete reducers[key]

            // Add the key to the list of keys to clean up
            keysToRemove.push(key)

            // Generate a new combined reducer
            combinedReducer = combineReducers(reducers)
        }
    }
}

const staticReducers = {
    user: userReducer,
    common: commonReducer
}

export function configureStore(initialState) {
    const reducerManager = createReducerManager(staticReducers)
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [logger, sagaMiddleware];
    // Create a store with the root reducer function being the one exposed by the manager.
    const store = createStore(reducerManager.reduce, initialState, composeWithDevTools(applyMiddleware(...middlewares)));

    // Optional: Put the reducer manager on the store so it is easily accessible
    store.reducerManager = reducerManager

    store.sagaTask = sagaMiddleware.run(rootSaga);

    return store;
}