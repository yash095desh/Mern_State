import {combineReducers, configureStore} from '@reduxjs/toolkit'
import UserReducer from './user/UserSlice'
import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'
import persistStore from 'redux-persist/es/persistStore'

const rootReducer = combineReducers({user: UserReducer})

const persistConfig = {
    key : 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const  store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:false,
        })
    
})
export const persistor = persistStore(store)