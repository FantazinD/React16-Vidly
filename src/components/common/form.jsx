import React, { Component } from "react";
import Input from "./input";
import Select from "./select";
import Joi from "joi-browser";

class Form extends Component {
    state = {
        data: {},
        errors: {},
    };

    validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(this.state.data, this.schema, options);

        if (!error) return null;

        const errors = {};
        error.details.forEach((item) => {
            errors[item.path[0]] = item.message;
        });

        return errors;
    };

    validateProperty = ({ id, value }) => {
        const obj = { [id]: value };
        const schema = { [id]: this.schema[id] };
        const { error } = Joi.validate(obj, schema);

        return error ? error.details[0].message : null;
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;

        this.doSubmit();
    };

    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.id] = errorMessage;
        else delete errors[input.id];

        const data = { ...this.state.data };
        data[input.id] = input.value;

        this.setState({ data, errors });
    };

    renderButton(label) {
        return (
            <button className="btn btn-primary" disabled={this.validate()}>
                {label}
            </button>
        );
    }

    renderInput(id, label, type = "text") {
        const { data, errors } = this.state;

        return (
            <Input type={type} value={data[id]} id={id} label={label} error={errors[id]} onChange={this.handleChange} />
        );
    }

    renderSelect(id, label, options) {
        const { data, errors } = this.state;
        return (
            <Select
                id={id}
                value={data[id]}
                label={label}
                options={options}
                error={errors[id]}
                onChange={this.handleChange}
            />
        );
    }
}

export default Form;
