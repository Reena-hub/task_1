import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware  from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../Action';
const persistConfig = {
    key: 'theme-root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancers = composeWithDevTools({
});
export const Store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunkMiddleware))
);
export const persistor = persistStore(Store);
export default Store; 
