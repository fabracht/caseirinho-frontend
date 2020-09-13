import React, { Component } from "react";
import { IProduct, IShoppingCart, MenuChoices } from "../types";
import { products } from "../products.json";

interface Props {
  menuChoice?: MenuChoices;
  isLoggedIn?: boolean;
  shoppingCart?: IShoppingCart;
  posRefs: React.RefObject<HTMLDivElement>[];
}
interface State {}

export class Store extends Component<Props, State> {
  sectionGenerator(products: IProduct[], section?: MenuChoices): JSX.Element {
    let elements: JSX.Element[] = products
      .filter((el: IProduct) => el.type === section)
      .map((product: IProduct) => {
        return this.cardGenerator(
          product._id,
          product.title,
          product.description || "",
          product.price,
          product.type,
          "https://via.placeholder.com/150"
        );
      });
    return (
      <div className="products-category">
        <h1 className="products-category-title">{section?.valueOf()}</h1>
        {elements}
      </div>
    );
  }

  cardGenerator(
    id: string,
    title: string,
    desc: string,
    price: number,
    type: string,
    photoUrl: string
  ): JSX.Element {
    return (
      <div key={id} className="product-card">
        <div className="product-card-description">
          <h2 className="product-card-name">{title}</h2>
          <p className="product-card-description">{desc}</p>
          <h2 className="product-card-price">{price.toFixed(2)}</h2>
        </div>
        <div className="product-card-image">
          <img src={photoUrl} alt="" />
        </div>
      </div>
    );
  }

  render() {
    let prods: JSX.Element[] = [];
    for (let section of Object.values(MenuChoices)) {
      let refIndex = Object.keys(MenuChoices).indexOf(section);
      prods.push(
        <div key={section} className="products">
          <div
            ref={this.props.posRefs[refIndex] || null}
            id={section}
            className="products-category"
          >
            {this.sectionGenerator(products, MenuChoices[section])}
          </div>
        </div>
      );
    }

    return <div className="products-container">{prods}</div>;
  }
}
