import { configureStore } from "@reduxjs/toolkit";
import modeReducer from "@/slices/modeSlice";
import { createEpicMiddleware } from "redux-observable";
import { debounceSetModeEpic } from "@/epics/modeEpic";

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
  reducer: {
    mode: modeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(epicMiddleware),
});

epicMiddleware.run(debounceSetModeEpic);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;