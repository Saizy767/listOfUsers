import React from "react";

export const ContextApp = React.createContext();

export const initialStateEnd = {condition: ''}
export const reducerEnd = (state, action) => {
    switch (action.type) {
      case 'setEnd':
        return {...state,condition: action.end,};
      default:
        return state;
    }
}
