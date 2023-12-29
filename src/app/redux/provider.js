"use client"
import { store } from "./store";
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

const { Provider } = require("react-redux");
let persistor = persistStore(store)

export function Providers({children}){
    return <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
            {children}
            </PersistGate>
          </Provider>
}