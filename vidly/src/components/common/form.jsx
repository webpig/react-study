import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';

class Form extends Component {
    state = {
        account: {},
        errors: {}
    }

    validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(this.state.account, this.schema, options);

        if (!error) return null;

        const errors = {};
        for (const item of error.details) {
            errors[item.path[0]] = item.message;
        }

        return errors;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        const errors = this.validate()
        this.setState({ errors: errors || {} });
        if (errors) return;

        this.doSubmit()
    }

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema)

        return error ? error.details[0].message : null;
    }

    handleChange = ({ currentTarget: input }) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const account = { ...this.state.account };
        account[input.name] = input.value;
        this.setState({ account, errors });
    }

    renderButton(label) {
        return (
            <button className="btn btn-primary" disabled={this.validate()}>{label}</button>
        );
    }

    renderInput(name, label, type) {
        const { account, errors } = this.state;
        
        return (
            <Input
                type={type}
                name={name}
                value={account[name]}
                label={label}
                error={errors[name]}
                onChange={this.handleChange}
            />
        );
    }
}
 
export default Form;