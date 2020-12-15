import React, { Component } from "react";
import { LoginRecaptcha } from "./Components/LoginCard";
import { SignupRecaptcha } from "./Components/SignupCard";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { connect } from "react-redux";

import { IToken, setToken } from "../actions";

import { IStoreState } from "../reducers";

interface PropTypes {
  tk: IToken;
  fetchToken: () => {};
  setToken: (token: string) => {};
}

class SignupLogin extends Component<PropTypes> {
  constructor(props: PropTypes) {
    super(props);

    this.state = {
      tk: this.props.tk,
    };
  }
  render() {
    return (
      <GoogleReCaptchaProvider reCaptchaKey="6LcfFLoZAAAAAPYY794Nuvo-v-WDqjHnRNLk27RJ">
        <div className="login-signup">
          <SignupRecaptcha setToken={this.props.setToken} />
          <LoginRecaptcha setToken={this.props.setToken} />
        </div>
      </GoogleReCaptchaProvider>
    );
  }
}
const mapStateToProps = (state: IStoreState): { tk: IToken } => {
  return {
    tk: state.tk,
  };
};

export const App = connect(mapStateToProps, {
  setToken,
})(SignupLogin);
