import React from "react";

export const ContextApp = React.createContext();

export const initialStateStart = {condition: ''}
export const reducerStart = (state, action) => {
    switch (action.type) {
      case 'setStart':
        return {...state,condition: action.start,};
      default:
        return state;
    }
}
