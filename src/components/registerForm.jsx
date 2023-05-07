import React, { Component } from "react";
import * as userService from "../services/userService";
import authService from "../services/authService";
import Form from "./common/form";
import Joi from "joi-browser";

class RegisterForm extends Form {
    state = {
        data: {
            username: "",
            password: "",
            name: "",
        },
        errors: {},
    };

    schema = {
        username: Joi.string().email().label("Username").required(),
        password: Joi.string().label("Password").required().min(5),
        name: Joi.string().label("Name").required(),
    };

    doSubmit = async () => {
        const { data, errors: stateErrors } = this.state;
        try {
            const response = await userService.registerUser(data);
            authService.loginWithJsonWebToken(response.headers["x-auth-token"]);
            window.location = "/";
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const errors = { ...stateErrors };
                errors.username = error.response.data;
                this.setState({ errors });
            }
        }
    };

    render() {
        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Username")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderInput("name", "Name")}
                    {this.renderButton("Register")}
                </form>
            </div>
        );
    }
}

export default RegisterForm;
