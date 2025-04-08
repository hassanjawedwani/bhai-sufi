// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import userReducer from "../features/user/userSlice.js";
// import { combineReducers, configureStore } from "@reduxjs/toolkit";

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const rootReducer = combineReducers({
//   user: userReducer,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);



// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
//     serializableCheck: false,
//   })
// });

// export const persistor = persistStore(store);

// ! prouduction below uncomment above

import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice.js';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
})