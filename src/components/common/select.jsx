import React, { Component } from "react";

const Select = ({ id, label, error, options, ...rest }) => {
    return (
        <div className="form-group">
            <label htmlFor={id}>{label}</label>
            <select {...rest} id={id} className="form-control">
                <option value="" />
                {options.map((option) => (
                    <option key={option._id} value={option._id}>
                        {option.name}
                    </option>
                ))}
            </select>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

export default Select;
