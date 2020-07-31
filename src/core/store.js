import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import { createEpicMiddleware } from "redux-observable";
import { rootEpic } from "./epic";
import { rootReducer } from "./reducer";
import { __DEV__ } from "ultis/functions";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const epicMiddleware = createEpicMiddleware();

const applyMiddlewarePro = applyMiddleware(epicMiddleware);
const applyMiddlewareDev = applyMiddleware(logger, epicMiddleware);

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  __DEV__ ? applyMiddlewareDev : applyMiddlewarePro
);

epicMiddleware.run(rootEpic);

export const persistor = persistStore(store);
