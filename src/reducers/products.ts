import { IProduct, IFetchProductAction } from '../actions';
import { EActionTypes } from '../actions/types';

export const productsReducer = (state: IProduct[] = [], action: IFetchProductAction) => {
	switch (action.type) {
		case EActionTypes.fetchProducts:
			return action.payload;
		default:
			return state;
	}
};
