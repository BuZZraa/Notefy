import { combineReducers, configureStore} from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
import storage from "redux-persist/lib/storage";
import usersSlice from "./usersSlice";
import notesSlice from "./notesSlice";
import forgotPasswordSlice from "./forgotPasswordSlice";

const rootReducer = combineReducers({
    user: usersSlice.reducer,
    note: notesSlice.reducer,
    forgotPassword: forgotPasswordSlice.reducer,
  });
  
  const persistConfig = {
    key: "root",
    storage,
  };
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
  });

  const persistor = persistStore(store);

export {persistor}
export default store;