import { createStore, applyMiddleware } from "redux";
import rootReducer from "./Hustko/Reducers/RootReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "main-root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware());
const Persistor = persistStore(store);

export { Persistor };
export default store;
