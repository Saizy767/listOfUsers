import React from "react";

export const ContextApp = React.createContext();

export const initialStateDelete = {condition:''}
export const reducerDelete = (state, action) => {
    switch (action.type) {
      case 'setId':
        return {...state,condition: action.id,};
      default:
        return state;
    }
  }