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
}

export interface ICart {
  product: IProduct;
  quantity: number;
}

export interface IShoppingCart {
  products: ICart[];
}
