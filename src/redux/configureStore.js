import {createStore, applyMiddleware} from 'redux';
import reducer from './reducers/rootReducer';
import thunk from 'redux-thunk';

const configureStore = () => {
  return createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
  )
}

export default configureStore;