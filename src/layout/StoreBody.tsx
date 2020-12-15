import React, { Component, SyntheticEvent } from "react";
import { IProduct, IShoppingCart, MenuChoices } from "../types";
import { ProductCard } from "../components/ProductCard";

interface Props {
  menuChoice: MenuChoices;
  isLoggedIn: boolean;
  shoppingCart?: IShoppingCart;
  posRefs: React.RefObject<HTMLDivElement>[];
  products: IProduct[];
}
interface State {
  selectedProduct: boolean;
  productId: string | undefined;
}

export class StoreBody extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedProduct: false,
      productId: undefined,
    };

    this.cardToggler = this.cardToggler.bind(this);
    this.cardGenerator = this.cardGenerator.bind(this);
  }
  sectionGenerator(products: IProduct[], section?: MenuChoices): JSX.Element {
    let elements: JSX.Element[] = products
      .filter((el: IProduct) => el.type === section)
      .map((product: IProduct) => {
        return this.minicardGenerator(
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

  cardToggler(ev: SyntheticEvent<HTMLDivElement>) {
    const element = ev.currentTarget;
    this.setState({
      selectedProduct: true,
      productId: element.id,
    });
  }

  cardGenerator() {
    const product = this.props.products.filter(
      (el: IProduct) => el._id === this.state.productId
    );
    return <ProductCard {...product[0]} />;
  }

  minicardGenerator(
    id: string,
    title: string,
    desc: string,
    price: number,
    type: string,
    photoUrl: string
  ): JSX.Element {
    return (
      <div
        key={id}
        id={id}
        className="product-minicard"
        onClick={this.cardToggler}
      >
        <div className="product-minicard-description">
          <h2 className="product-minicard-name">{title}</h2>
          <p className="product-minicard-description">{desc}</p>
          <h2 className="product-minicard-price">{price.toFixed(2)}</h2>
        </div>
        <div className="product-minicard-image">
          <img src={photoUrl} alt="" />
        </div>
      </div>
    );
  }

  render() {
    let card: React.ReactElement | undefined;
    if (this.state.selectedProduct) {
      card = this.cardGenerator();
    } else {
      card = undefined;
    }
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
            {this.sectionGenerator(this.props.products, MenuChoices[section])}
          </div>
        </div>
      );
    }

    return (
      <div className="store-component">
        {card}
        <div className="products-container">{prods}</div>
      </div>
    );
  }
}
