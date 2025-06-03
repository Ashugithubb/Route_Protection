import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";


const persistConfig = {
  key: "root",
  storage
}

const rootReducers = combineReducers({
  user: userReducer

})

const persistedReducer = persistReducer(persistConfig, rootReducers)

export const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store)