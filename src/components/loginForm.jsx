import React, { Component } from "react";
import authService from "../services/authService";
import Joi from "joi-browser";
import Form from "./common/form";
import { Redirect } from "react-router-dom";

class LoginForm extends Form {
    state = {
        data: {
            username: "",
            password: "",
        },
        errors: {},
    };

    schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password"),
    };

    doSubmit = async () => {
        const { data, errors: stateErrors } = this.state;
        try {
            await authService.login(data.username, data.password);

            const { state } = this.props.location;
            window.location = state ? state.from.pathname : "/";
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const errors = { ...stateErrors };
                errors.username = error.response.data;
                this.setState({ errors });
            }
        }
    };

    render() {
        return authService.getCurrentUser() ? (
            <Redirect to="/" />
        ) : (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Username")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderButton("Login")}
                </form>
            </div>
        );
    }
}

export default LoginForm;
