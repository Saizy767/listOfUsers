import React from "react";

export const ContextApp = React.createContext();

export const initialStateResult = {condition: []}
export const reducerResult = (state, action) => {
    switch (action.type) {
      case 'setResult':
        return {...state,condition: action.array,};
      default:
        return state;
    }
  }
