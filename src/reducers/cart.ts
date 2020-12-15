import { ICartBox, IFetchCartAction, IEmptyCartAction } from "../actions";
import { EActionTypes } from "../actions/types";

export const fetchCartReducer = (
  state: ICartBox[] = [],
  action: IFetchCartAction | IEmptyCartAction
) => {
  switch (action.type) {
    case EActionTypes.fetchCart:
      return action.payload;
    case EActionTypes.emptyCart:
      return action.payload;
    default:
      return state;
  }
};
