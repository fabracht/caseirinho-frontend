import React, { Component, SyntheticEvent } from "react";
import { IProduct, IShoppingCart, MenuChoices } from "../types";

import { MainButton } from "../components/MainButton";
import { StoreBody } from "../layout/StoreBody";
import { HeaderStore } from "../layout/HeaderStore";
import { products } from "../products.json";

interface Props {}
interface State {
  menuChoice: MenuChoices;
  posRefs: React.RefObject<HTMLDivElement>[];
  isLoggedIn: boolean;
  shoppingCart: IShoppingCart;
  products: IProduct[];
}

export class Store extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      menuChoice: MenuChoices.marmitas,
      posRefs: [],
      isLoggedIn: false,
      shoppingCart: {
        products: [],
      },
      products: [],
    };
  }

  componentDidMount() {
    let pr: React.RefObject<HTMLDivElement>[] = [];
    Object.keys(MenuChoices).forEach(() => pr.push(React.createRef()));

    this.setState({
      posRefs: pr,
      products: products,
    });
  }

  render() {
    return (
      <div className="app-container">
        <HeaderStore
          posRefs={this.state.posRefs}
          shoppingCart={this.state.shoppingCart}
          products={this.state.products}
          isLoggedIn={this.state.isLoggedIn}
        />
        <StoreBody
          menuChoice={this.state.menuChoice}
          isLoggedIn={this.state.isLoggedIn}
          shoppingCart={this.state.shoppingCart}
          posRefs={this.state.posRefs}
          products={this.state.products}
        />
        <MainButton />
      </div>
    );
  }
}
