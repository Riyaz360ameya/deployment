// "use client"
// import React from 'react'
// import { Provider } from 'react-redux'
// import { store } from './redux/store'
// import persistStore from 'redux-persist/es/persistStore'
// let persister = persistStore(store)
// const Providers = ({ children }) => {
//     return (
//         <Provider store={store} persister={persister}>
//             {children}
//         </Provider>
//     )
// }

// export default Providers



"use client"
import React from 'react'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store'
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'
const Providers = ({ children }) => {

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}

export default Providers