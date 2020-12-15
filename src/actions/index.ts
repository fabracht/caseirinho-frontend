import { Dispatch } from "redux";

import client from "../feathers";

import { EActionTypes } from "./types";

export interface IToken {
  accessToken: string;
}

export interface IFetchTokenAction {
  type: EActionTypes.fetchToken;
  payload: IToken;
}

export interface ISetTokenAction {
  type: EActionTypes.setToken;
  payload: IToken;
}

export enum MenuChoices {
  marmitas = "marmitas",
  bebidas = "bebidas",
  integral = "integral",
}

export interface IProduct {
  _id: string;
  title: string;
  description?: string;
  price: number;
  type: string;
  photoUrl?: string;
  comment?: string[];
}

export interface ICartBox {
  product: IProduct;
  quantity: number;
}

export interface IFetchProductAction {
  type: EActionTypes.fetchProducts;
  payload: IProduct[];
}

export interface IFetchCartAction {
  type: EActionTypes.fetchCart;
  payload: ICartBox[];
}

export interface IEmptyCartAction {
  type: EActionTypes.emptyCart;
  payload: ICartBox[];
}

export interface IAddToCartAction {
  type: EActionTypes.addToCart;
  payload: ICartBox[];
}

export const fetchProducts = () => {
  return async (dispatch: Dispatch) => {
    const products = client.service("products");
    try {
      let result = await products.find<IProduct[]>();
      dispatch<IFetchProductAction>({
        type: EActionTypes.fetchProducts,
        payload: result.data,
      });
    } catch (err) {
      dispatch<IFetchProductAction>({
        type: EActionTypes.fetchProducts,
        payload: [],
      });
    }
  };
};

export const fetchCart = () => {
  const products = client.service("products");
  const cart = localStorage.getItem("mendocCart")?.split(",");
  return async (dispatch: Dispatch) => {
    let tempResult: ICartBox[] = [];
    if (cart) {
      const idList: string[] = cart.map((el: string) => {
        return el.split("-")[0];
      });
      const quantList: number[] = cart.map((el: string) => {
        return Number(el.split("-")[1]);
      });
      try {
        let result = await products.find<IProduct[]>();
        for (let i = 0; i < idList.length; ++i) {
          let found = result.data.find((el: IProduct) => el._id === idList[i]);
          if (found) {
            tempResult.push({
              product: found,
              quantity: quantList[i],
            });
          }
        }
        dispatch<IFetchCartAction>({
          type: EActionTypes.fetchCart,
          payload: tempResult,
        });
      } catch (err) {
        dispatch<IFetchProductAction>({
          type: EActionTypes.fetchProducts,
          payload: [],
        });
      }
    }
  };
};

export const emptyCart = () => {
  localStorage.clear();

  return async (dispatch: Dispatch) => {
    dispatch<IEmptyCartAction>({
      type: EActionTypes.emptyCart,
      payload: [],
    });
  };
};

export const fetchToken = () => {
  const tkGet: string | null = localStorage.getItem("tk");
  const tk: IToken = { accessToken: tkGet ? tkGet : "" };

  return async (dispatch: Dispatch) => {
    dispatch<IFetchTokenAction>({
      type: EActionTypes.fetchToken,
      payload: tk,
    });
  };
};

export const setToken = (token: string) => {
  localStorage.setItem("tk", token);
  const tk: IToken = { accessToken: token };
  return async (dispatch: Dispatch) => {
    dispatch<IFetchTokenAction>({
      type: EActionTypes.fetchToken,
      payload: tk,
    });
  };
};
