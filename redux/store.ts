import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
  useStore as useStoreBase,
} from "react-redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./index";

const makeStore = () => {
  const isServer = typeof window === "undefined";
  if (isServer) {
    //If it's on server side, create a store
    return configureStore({ reducer: rootReducer });
  } else {
    //If it's on client side, create a store which will persist
    const persistConfig = {
      key: "nextjs",
      whitelist: ["auth", "cart"],
      storage, // if needed, use a safer storage
    };
    const persistedReducer = persistReducer(persistConfig, rootReducer); // Create a new reducer with our existing reducer
    const store: any = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
    }); // Creating the store again

    store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature
    return store;
  }
};
const store = makeStore();
// export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
// And utilize `useSelector`
export const useSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected
): TSelected => useSelectorBase<RootState, TSelected>(selector);
// Inferred type: { users: UsersState}
type AppDispatch = typeof store.dispatch;

// Since we use typescript, lets utilize `useDispatch`
export const useDispatch = () => useDispatchBase<AppDispatch>();
export const useStore = () => useStoreBase<AppStore>();

// Export the wrapper & wrap the pages/_app.js with this wrapper only
export const wrapper = createWrapper(makeStore);
