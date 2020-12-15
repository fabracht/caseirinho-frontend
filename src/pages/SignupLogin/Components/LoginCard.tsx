import React, { Component, FormEvent, ChangeEvent } from "react";
import LoginButton from "./LoginButton";
import client from "../../feathers";
import { Redirect } from "react-router-dom";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import { withGoogleReCaptcha } from "react-google-recaptcha-v3";

interface Props {
  setToken: (token: string) => {};
}

interface State {
  email: string;
  password: string;
  accessToken: string;
  recaptchaToken: string | null;
  hasValidToken: boolean;
  isLoginResponseSuccess: boolean;
}

class LoginCard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      accessToken: "",
      recaptchaToken: "",
      hasValidToken: false,
      isLoginResponseSuccess: true,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setCaptchaToken = this.setCaptchaToken.bind(this);
  }

  async componentDidMount() {}

  async handleLogin(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const authenticate = client.service("auth/local");
    const inputs = ev.currentTarget.querySelectorAll("input");
    const emailField = inputs[0];
    // const passwordField = inputs[1];
    const { base } = authenticate;
    const form = ev.currentTarget;
    if (form.checkValidity()) {
      try {
        const result = await fetch(base, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailField.value,
            password: this.state.password,
            recaptchaToken: this.state.recaptchaToken,
          }),
        });
        const resultText = await result.json();
        console.log(resultText.message);
        if (
          resultText.authentication &&
          resultText.authentication.accessToken !== undefined
        ) {
          this.setState({
            email: "",
            password: "",
            accessToken: resultText.authentication.accessToken,
            hasValidToken: true,
            isLoginResponseSuccess: true,
          });
          this.props.setToken(resultText.authentication.accessToken);
        } else if (resultText.success === false) {
          this.setState({
            isLoginResponseSuccess: false,
          });
        }
      } catch (err) {
        console.log(err);
      }
    } else {
    }
  }

  handleChange(ev: ChangeEvent<HTMLInputElement>) {
    if (ev.currentTarget.name === "email") {
      this.setState({
        email: ev.currentTarget.value,
      });
    } else if (ev.currentTarget.name === "password") {
      this.setState({
        password: ev.currentTarget.value,
      });
    }
  }

  createWarning(): React.ReactElement {
    return (
      <div className="form-group">
        <p className="fail-login">Email and password don't match</p>
      </div>
    );
  }

  setCaptchaToken(token: string | null) {
    this.setState({
      recaptchaToken: token,
    });
  }

  render() {
    if (this.state.hasValidToken) {
      return <Redirect to="/loja" />;
    }
    return (
      <div className="login-container">
        <GoogleReCaptcha onVerify={this.setCaptchaToken} />
        <form className="flex-grow-1" onSubmit={this.handleLogin}>
          <h2 className="text-center">
            <strong>Login</strong> form.
          </h2>
          <div className="form-group">
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="Email"
              required={true}
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Password"
              required={true}
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          {this.state.isLoginResponseSuccess || this.createWarning()}
          <div className="form-group">
            <button
              className="btn btn-primary btn-block"
              data-toggle="tooltip"
              data-bs-tooltip=""
              type="submit"
              title="I log you in"
            >
              Log In
            </button>
            <LoginButton />
          </div>
          <a className="forgot" href="/">
            Forgot your email or password?
          </a>
        </form>
      </div>
    );
  }
}

export const LoginRecaptcha = withGoogleReCaptcha(LoginCard);
