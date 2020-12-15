import { IToken, IFetchTokenAction, ISetTokenAction } from "../actions";
import { EActionTypes } from "../actions/types";

export const fetchTokenReducer = (
  state: IToken = { accessToken: "" },
  action: IFetchTokenAction | ISetTokenAction
) => {
  switch (action.type) {
    case EActionTypes.fetchToken:
      return action.payload;
    case EActionTypes.setToken:
      return action.payload;
    default:
      return state;
  }
};
