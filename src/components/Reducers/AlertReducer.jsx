import React from "react";

export const ContextApp = React.createContext();

export const initialStateAlert = {condition: false}
export const reducerAlert = (state, action) => {
    switch (action.type) {
      case 'on':
        return {...state,condition: true};
      case 'off':
        return {...state,condition: false};
      default:
        return state;
    }
}