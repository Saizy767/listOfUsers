import React from "react";

export const ContextApp = React.createContext();

export const initialStatePage = {condition: 1}
export const reducerPage = (state, action) => {
    switch (action.type) {
      case 'setPage':
        return {...state,condition: action.page,};
      default:
        return state;
    }
}
