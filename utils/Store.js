import Cookies from "js-cookie";
import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {}

function reducer(state, action){
  switch (action.type){
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>
}