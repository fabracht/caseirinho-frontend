import React, { SyntheticEvent } from "react";
import logo from "../assets/logo-caseirinho.svg";
import yellowButton from "../assets/beige-brick-button.svg";
import greyButton from "../assets/grey-brick-button.svg";
import { MenuChoices, IShoppingCart, IProduct } from "../types";

import { products } from "../products.json";

interface Props {
  posRefs: React.RefObject<HTMLDivElement>[];
  shoppingCart: IShoppingCart;
  products: IProduct[];
  isLoggedIn: boolean;
}
interface State {
  menuChoice: MenuChoices;
  searchQuery: string;
}

export class HeaderStore extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      menuChoice: MenuChoices.marmitas,
      searchQuery: "",
    };
    this.handleMenu = this.handleMenu.bind(this);
    this.shoppingCart = this.shoppingCart.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(ev: React.ChangeEvent<HTMLInputElement>) {
    const query = ev.currentTarget.value;
    let filteredProducts = this.props.products;
    this.setState({
      searchQuery: query,
    });
    const splitQuery = query.split(",");

    if (splitQuery.length > 0) {
      let splitQueryTrim = splitQuery.map((el: string) => el.trim());
      for (let query of splitQueryTrim) {
        filteredProducts = products.filter((el: IProduct) =>
          el.title.toLowerCase().includes(query.toLowerCase())
        );
      }
      // this.setState({
      //   products: filteredProducts,
      // });
    }
  }

  buttonGenerator(): JSX.Element[] {
    let buttons: JSX.Element[] = [];
    for (let section of Object.values(MenuChoices)) {
      buttons.push(
        <li key={section} className="subheader-menu-item">
          <input
            className="subheader-menu-input"
            id={section}
            name="selection"
            onClick={this.handleMenu}
            type="radio"
            defaultChecked={this.state.menuChoice === section}
          />
          <label className="subheader-menu-label" htmlFor={section}>
            {section}
          </label>
          <img
            src={this.state.menuChoice !== section ? yellowButton : greyButton}
            alt=""
            className="background-tiles"
          />
        </li>
      );
    }
    return buttons;
  }

  handleMenu(ev: SyntheticEvent<HTMLInputElement>) {
    const target = ev.currentTarget.id;
    let refIndex = Object.keys(MenuChoices).indexOf(target);

    const targetElement = this.props.posRefs[refIndex].current;
    console.log(targetElement?.offsetTop);
    // let targetElement = document.querySelector(`#${target}`);

    window.scrollTo(0, targetElement!.offsetTop - 20);
    switch (ev.currentTarget.id) {
      case "marmitas":
        this.setState({
          menuChoice: MenuChoices.marmitas,
        });
        break;
      case "bebidas":
        this.setState({
          menuChoice: MenuChoices.bebidas,
        });

        break;
      case "integral":
        this.setState({
          menuChoice: MenuChoices.integral,
        });
        break;
    }
  }

  shoppingCart(ev: React.MouseEvent<HTMLElement>) {
    // this.sectionGenerator(products);
    if (!this.props.isLoggedIn) {
    } else {
    }
  }

  render() {
    return (
      <div className="header">
        <div className="header-container">
          <a href="/">
            <div className="header-logo-container">
              <img src={logo} alt="" className="header-logo" />
            </div>
          </a>
          <div className="subheader">
            <div className="subheader-title">
              <i className="fa fa-window-close"></i>
              <span>Loja aberta até às 18:00</span>
            </div>
            <div className="shopping-cart" onClick={this.shoppingCart}>
              <i className="fa fa-shopping-cart"></i>
            </div>
            <div className="subheader-menu">
              <ul className="subheader-menu-list">{this.buttonGenerator()}</ul>
            </div>
            <div className="subheader-search">
              <i className="fa fa-search"></i>
              <input
                placeholder="EX: FEIJÃO, MACARRÃO"
                type="text"
                id="search"
                name="search"
                onChange={this.handleSearch}
              />
              <label htmlFor="search"></label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
