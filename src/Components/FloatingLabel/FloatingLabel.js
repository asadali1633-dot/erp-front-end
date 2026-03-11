import React, { useState, cloneElement } from "react";
import style from "./FloatingLabel.module.css";

const FloatingLabel = ({ children, label, ...rest }) => {
    const [focus, setFocus] = useState(false);
    const value = rest.value;

    const labelClass = focus || (value && value.length !== 0) 
        ? `${style.label} ${style.label_float}` 
        : style.label;

    const handleFocus = (e) => {
        setFocus(true);
        rest.onFocus?.(e);
    };
    
    const handleBlur = (e) => {
        setFocus(false);
        rest.onBlur?.(e);
    };

    const inputWithProps = cloneElement(children, {
        ...rest,
        onFocus: handleFocus,
        onBlur: handleBlur,
    });

    return (
        <div className={style.float_label}>
            {inputWithProps}
            <label className={labelClass}>{label}</label>
        </div>
    );
};

export default FloatingLabel;