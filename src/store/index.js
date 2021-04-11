import {
    createStore,
    compose,
    combineReducers,
    applyMiddleware
} from 'redux';
import {
    loadingBarReducer
} from 'react-redux-loading-bar'
import thunk from 'redux-thunk';
import {
    composeWithDevTools
} from 'redux-devtools-extension';
import userReducer from './reducers/user';



const rootReducer = combineReducers({
    loadingBar: loadingBarReducer,
    user: userReducer
});

export default createStore(rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk))
);