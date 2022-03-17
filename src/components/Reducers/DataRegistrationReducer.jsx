import React from "react";

export const ContextApp = React.createContext();

export const initialStateReg = {condition: false}
export const reducerReg = (state, action) => {
    switch (action.type) {
      case 'on':
        return {...state,condition: true};
      case 'off':
        return {...state,condition: false};
      default:
        return state;
    }
  }