import React, { useState } from "react";
import style from '../Inputs/input.module.css'
import { ConfigProvider, Form, Input } from 'antd';
import { MdEdit } from "react-icons/md";



const FormInput = ({
    type,
    name,
    placeholder,
    required,
    className,
    onFocus,
    onMouseLeave,
    onMouseEnter,
    message,
    readOnly,
    label,
    showEdit,
    disabled,
    title,
    eye,
    className2,
    classNameColor,
    onEditClick,
    onChange
}) => {
    return (
        <>
            <div className={`${style.inputBox}`}>
                {showEdit && (
                    <MdEdit className={`${style.Edit}`} onClick={onEditClick ? onEditClick : null} />
                )}
                <Form.Item
                    className={`${style.form} ${className}`}
                    name={name}
                    label={label}
                    rules={[{ required: required, message: message }]}
                >

                    <input
                        className={`
                        ${style.input}  
                        ${readOnly == true ? style.gray : ""}
                        ${disabled == true ? style.trans : classNameColor}
                        `}

                        onChange={onChange}
                        type={type}
                        style={type === "file" ? { padding: "5px 10px" } : undefined}
                        name={name}
                        placeholder={placeholder}
                        onFocus={onFocus}
                        onMouseLeave={onMouseLeave}
                        onMouseEnter={onMouseEnter}
                        readOnly={readOnly}
                        disabled={disabled}
                        title={disabled ? title : ""}
                    />
                </Form.Item>
            </div>

        </>
    )
};

const FormPasswordInput = ({
    name,
    placeholder,
    required,
    className,
    message,
    label,
    classNameColor,
    title,
    eye,
}) => {
    return (
        <>


            <ConfigProvider
                theme={{
                    components: {
                        Input: {
                            colorBgContainer: "#2f2f2f",
                            controlHeight: 30,
                            colorBorder: "#2f2f2f",
                            colorIcon: "white",
                            borderRadius: "0",
                            borderColor: "#2f2f2f",
                        },
                    },
                }}
            >
                <div className={` ${style.inputBox} passwordBox`}>
                    <Form.Item
                        className={`${style.form} ${className} ${style.passwordInput}`}
                        name={name}
                        label={label}
                        rules={[{ required: required, message: message }]}
                    >
                        <Input.Password placeholder={placeholder} />

                    </Form.Item>
                </div>
            </ConfigProvider>

        </>
    )
};

const SuffixEmail = ({
    type,
    name,
    placeholder,
    required,
    className,
    message,
    label,
    domain,
    classNameColor
}) => {

    const handleKeyDown = (e) => {
        if (e.key === '@') {
            e.preventDefault();
        }
    };

        const handleInput = (e) => {
        let value = e.target.value;
        if (value.includes('@')) {
            value = value.replace(/@/g, '');
            e.target.value = value;
            
            // React synthetic event trigger
            const event = new Event('input', { bubbles: true });
            e.target.dispatchEvent(event);
        }
    };
    return (
        <>
            <div className={`${style.inputBox}`}>
                <ConfigProvider
                    theme={{
                        components: {
                            Input: {
                                colorBgContainer: "#2f2f2f",
                                borderRadius: "0",
                                colorFillAlter: "#e6f7ff",
                                colorBorder: "#2f2f2f",
                            },
                        },
                    }}
                >
                    <Form.Item
                        className={`${style.form} ${className}`}
                        name={name}
                        label={label}
                        rules={[{ required: required, message: message }]}
                    >
                        <Input
                            placeholder={placeholder}
                            className={style.bgEmailSuffixColor}
                            addonAfter={domain}
                            onKeyDown={handleKeyDown}
                            onInput={handleInput}
                        />
                    </Form.Item>
                </ConfigProvider>
            </div>

        </>
    )
};

const FormInputTextArea = ({
    type,
    name,
    placeholder,
    required = false,
    className,
    Datetype,
    onFocus,
    message,
    label,
    showEdit,
    readOnly,
    onEditClick,
    viewScreen
}) => {
    return (
        <>
            <div className={`${style.inputBox}`}>
                {showEdit && (
                    <MdEdit className={`${style.Edit}`} onClick={onEditClick ? onEditClick : null} />
                )}
                <Form.Item
                    className={`${style.form} ${className}`}
                    name={name}
                    label={label}
                    rules={[{ required: required, message: message }]}
                >
                    <textarea
                        className={`${style.inputTextArea} ${className}
                            ${readOnly == true ? style.gray : ""}
                            ${viewScreen == true ? style.textAreaHeightViewScreen : ""}
                        `}
                        name={name}
                        readOnly={readOnly}
                        placeholder={placeholder}
                        onFocus={onFocus}
                    >
                    </textarea>
                </Form.Item>
            </div>
        </>
    )
};


export {
    FormInput,
    FormInputTextArea,
    FormPasswordInput,
    SuffixEmail
};




// import React from 'react';
// import { InfoCircleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
// import { Input, Tooltip } from 'antd';

// const App: React.FC = () => (
//   <>
//     <Input
//       placeholder="Enter your username"
//       prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
//       suffix={
//         <Tooltip title="Extra information">
//           <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
//         </Tooltip>
//       }
//     />
//     <br />
//     <br />
//     <Input prefix="￥" suffix="RMB" />
//     <br />
//     <br />
//     <Input prefix="￥" suffix="RMB" disabled />
//     <br />
//     <br />
//     <Input.Password
//       suffix={<LockOutlined />} // `suffix` available since `5.27.0`
//       placeholder="input password support suffix"
//     />
//   </>
// );

// export default App;