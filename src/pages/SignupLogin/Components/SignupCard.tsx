import React, { Component, ChangeEvent, FormEvent } from "react";
import client from "../../feathers";
import {
  GoogleReCaptcha,
  withGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { Redirect } from "react-router-dom";

interface Props {
  setToken: (token: string) => {};
}
interface State {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  accessToken: string;
  recaptchaToken: string | null;
  hasValidToken: boolean;
  isLoginResponseSuccess: boolean;
}

class SignupCard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      accessToken: "",
      recaptchaToken: "",
      hasValidToken: false,
      isLoginResponseSuccess: true,
    };

    this.handleSignup = this.handleSignup.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setCaptchaToken = this.setCaptchaToken.bind(this);
  }

  async handleSignup(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    console.log("HANDLING SIGNUP");
    const users = client.service("users");
    const { base } = users;
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
            fullname: this.state.fullName,
            email: this.state.email,
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
            accessToken: resultText.accessToken,
            hasValidToken: true,
            isLoginResponseSuccess: true,
          });
          this.props.setToken(resultText.authentication.accessToken);
          console.log(3);
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
    const value = ev.currentTarget.value;
    if (ev.currentTarget.name === "fullname") {
      this.setState({
        fullName: value,
      });
    } else if (ev.currentTarget.name === "email") {
      this.setState({
        email: value,
      });
    } else if (ev.currentTarget.name === "password") {
      this.setState({
        password: value,
      });
    } else if (ev.currentTarget.name === "password-repeat") {
      this.setState({
        confirmPassword: value,
      });
      if (ev.currentTarget.value !== this.state.password) {
        ev.currentTarget.setCustomValidity("passwords do not match");
      } else {
        ev.currentTarget.setCustomValidity("");
      }
    }
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
      <div className="signup-container">
        <GoogleReCaptcha onVerify={this.setCaptchaToken} />

        {/* <div className="form-container"> */}
        <form method="post" onSubmit={this.handleSignup}>
          <h2 className="text-center">
            <strong>Create</strong> an account.
          </h2>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="fullname"
              placeholder="Full Name"
              pattern="^([a-zA-Z]+( )*[a-zA-Z].*)+$"
              required={true}
              value={this.state.fullName}
              onChange={this.handleChange}
            />
          </div>
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
              minLength={8}
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              name="password-repeat"
              placeholder="Password (repeat)"
              required={true}
              minLength={8}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <div className="form-check">
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="checkbox"
                  required={true}
                />
                I agree to the license terms.
              </label>
            </div>
          </div>
          <div className="form-group">
            <button
              className="btn btn-primary btn-block"
              data-toggle="tooltip"
              data-bs-tooltip=""
              type="submit"
              title="I sign you up!"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export const SignupRecaptcha = withGoogleReCaptcha(SignupCard);
