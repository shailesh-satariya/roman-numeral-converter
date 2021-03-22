import React from "react";

export interface InputProps {
    type: "text" | "number";
    name: string;
    label: string;
    onChange: (value: string) => void;
    error?: string;

    [key: string]: any;
}

/**
 * Input component - renders input
 * @function Input
 *
 * @constructor
 *
 * @param {InputProps} props
 *
 * @return {JSX.Element}
 */
const Input: ({type, name, label, error, onChange, ...rest}: InputProps) => JSX.Element = ({type, name, label, error, onChange, ...rest}: InputProps): JSX.Element => {
    return (
        <div data-test="component-input" className="form-group">
            <label data-test="element-label" htmlFor={name}>{label}</label>
            <input data-test="element-input" type={type} className={"form-control" + (error ? " is-invalid" : "")}
                   id={name}
                   onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value)} {...rest}/>
            {
                error ? <div data-test="element-error-div" className="invalid-feedback">{error}</div> : null
            }
        </div>
    );
};

export default Input;