import React, { Component, FormEvent } from "react";
import { IProduct } from "../types";
import { addons } from "../products-addon.json";

interface Props extends Partial<IProduct> {}

interface State extends IProduct {}

export class ProductCard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      _id: "",
      title: "",
      description: "",
      price: 0,
      type: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    console.log(ev.currentTarget);
  }

  render() {
    return (
      <div className="product-card-container">
        <form action="product-card-form" onSubmit={this.onSubmit}>
          <div key="{id}" className="product-card">
            <div className="product-card-header">
              <div className="product-card-description">
                <div className="product-card-image">
                  <img src="https://via.placeholder.com/350x150" alt="" />
                </div>
                <h2 className="product-card-name">title</h2>
                <p className="product-card-description">description</p>
                <h2 className="product-card-price">'{"price.toFixed(2)"}'</h2>
              </div>
            </div>

            <div className="product-card-choices">
              <div className="product-card-choices-inclusive">
                <div className="inclusive-container">
                  <div className="inclusive-header">
                    <div className="inclusive-title">
                      <h2>Escolha sua mistura</h2>
                      <p>Escolha 1 opção</p>
                    </div>
                    <div className="inclusive-total">0/2</div>
                    <div className="inclusive-status">Obrigatório</div>
                  </div>
                  <div className="inclusive-cards">
                    {addons
                      .filter((ad: IProduct) => ad.type === "misturas")
                      .map((ad: IProduct) => {
                        return (
                          <div
                            key={ad._id}
                            id={ad._id}
                            className="inclusive-card"
                          >
                            <h2 className="inclusive-card-title">{ad.title}</h2>
                            <div className="inclusive-card-button">
                              <i className="fa fa-minus"></i>
                              <input type="number" defaultValue={1} />
                              <i className="fa fa-plus"></i>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className="product-card-choices-exclusive">
                <div className="exclusive-header">
                  <div className="exclusive-title">
                    <h2>Escolha sua mistura</h2>
                    <p>Escolha 1 opção</p>
                  </div>
                  <div className="exclusive-status">Obrigatório</div>
                </div>
                <ul className="exclusive-cards">
                  {addons
                    .filter((ad: IProduct) => ad.type === "complemento")
                    .map((ad: IProduct) => {
                      return (
                        <li key={ad._id} id={ad._id} className="exclusive-card">
                          <label htmlFor="" className="exclusive-card-title">
                            <h2>{ad.title}</h2>
                            <p>{ad.description}</p>
                          </label>

                          <div className="exclusive-card-input">
                            <input
                              type="radio"
                              className="exclusive-card-button"
                              name="exclusive-selection"
                              value="polenta"
                              defaultChecked={false}
                            />
                            <label className="subheader-menu-label"></label>
                          </div>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
            <div className="product-card-comments">
              <h2>Comentário</h2>
              <textarea
                id="product-card-textarea"
                name="product-card-comments"
                placeholder="Ex: tirar cebola, maionese à parte etc."
              />
            </div>
            <div className="product-card-footer">
              <div className="product-card-footer-qty">
                <i className="fa fa-minus"></i>
                <input type="number" defaultValue={1} />
                <i className="fa fa-plus"></i>
              </div>
              <button type="submit" className="product-card-footer-button">
                Adicionar PreçoTotal
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
