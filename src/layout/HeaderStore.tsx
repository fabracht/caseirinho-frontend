import React, { SyntheticEvent } from "react";
import logo from "../assets/logo-caseirinho.svg";
import yellowButton from "../assets/beige-brick-button.svg";
import greyButton from "../assets/grey-brick-button.svg";
import { MenuChoices, IShoppingCart } from "../types";
import { Store } from "../pages/Store";

interface Props {}
interface State {
  menuChoice: MenuChoices;
  posRefs: React.RefObject<HTMLDivElement>[];
  isLoggedIn: boolean;
  shoppingCart: IShoppingCart;
}

export class Header extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      menuChoice: MenuChoices.marmitas,
      posRefs: [],
      isLoggedIn: false,
      shoppingCart: {
        products: [],
      },
    };
    this.handleMenu = this.handleMenu.bind(this);
    this.shoppingCart = this.shoppingCart.bind(this);
  }
  componentDidMount() {
    let pr: React.RefObject<HTMLDivElement>[] = [];
    Object.keys(MenuChoices).forEach(() => pr.push(React.createRef()));

    this.setState({
      posRefs: pr,
    });
  }
  buttonGenerator(): JSX.Element[] {
    let buttons: JSX.Element[] = [];
    for (let section of Object.values(MenuChoices)) {
      console.log(section);
      console.log(this.state.menuChoice);
      console.log(this.state.menuChoice === section);
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

    const targetElement = this.state.posRefs[refIndex].current;
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
    if (!this.state.isLoggedIn) {
    } else {
    }
  }

  render() {
    return (
      <div className="app-container">
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
                <ul className="subheader-menu-list">
                  {this.buttonGenerator()}
                </ul>
              </div>
              <div className="subheader-search">
                <i className="fa fa-search"></i>
                <input
                  placeholder="EX: FEIJÃO, MACARRÃO"
                  type="text"
                  id="search"
                  name="search"
                />

                <label htmlFor="search"></label>
              </div>
            </div>
          </div>
        </div>

        <div className="store-component">
          <Store posRefs={this.state.posRefs} />
        </div>
      </div>
    );
  }
}
