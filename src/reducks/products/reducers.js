import { getAction } from "connected-react-router";
import React from "react";
import initialState from "../store/initialState";

export const ProductsReducer = (state = initialState.products, action) => {
  switch (action.type) {
    default:
      return state
  }
}
