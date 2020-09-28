import React, { createContext, useReducer } from "react";
import { produce } from "immer";
import { SET_USER, SET_TOKEN } from "./actions";

const InitialState = {
  user: {},
  token: "",
};

const globalReducer = produce((draft, { type, payload }) => {
  switch (type) {
    case SET_USER:
      draft.user = payload;
      break;
    case SET_TOKEN:
      draft.token = payload;
      break;
    default:
      break;
  }
});

export const globalContext = createContext(InitialState);

const GlobalContextProvider = (props) => {
  const [globalState, globalDispatch] = useReducer(globalReducer, InitialState);

  return (
    <globalContext.Provider value={{ globalState, globalDispatch }}>
      {props.children}
    </globalContext.Provider>
  );
};

export default GlobalContextProvider;
