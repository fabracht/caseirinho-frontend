import { combineReducers } from "redux";
import { productsReducer } from "./products";
import { fetchCartReducer } from "./cart";
import { fetchTokenReducer } from "./token";
import { ICartBox, IProduct, IToken } from "../actions";

export interface IStoreState {
  products: IProduct[];
  cart: ICartBox[];
  tk: IToken;
}

export const reducers = combineReducers<IStoreState>({
  products: productsReducer,
  cart: fetchCartReducer,
  tk: fetchTokenReducer,
});
