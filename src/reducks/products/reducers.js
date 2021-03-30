import { getAction } from "connected-react-router";
import React from "react";
import initialState from "../store/initialState";
import * as Actions from "./actions";

//list: ...action.payloadではなく、list: [...action.payload]のように、新しい配列として定義することで、配列の格納先にあるメモリというものが切り替わり、 state が変更されたことを Component 側で検知できるようになる
export const ProductsReducer = (state = initialState.products, action) => {
  switch (action.type) {
    case Actions.DELETE_PRODUCT:
      return {
        ...state,
        list: [...action.payload]
      }
    case Actions.FETCH_PRODUCTS:
      return {
        ...state,
        list: [...action.payload]
      };
    default:
      return state
  }
}
