import React, { useState } from "react";
import style from '../Inputs/input.module.css'
import { ConfigProvider, Form, Input } from 'antd';
import { MdEdit } from "react-icons/md";
import FloatingLabel from "../FloatingLabel/FloatingLabel";
const { TextArea } = Input;



const FormInput = ({
    name,
    required,
    className,
    message,
    label,
    classNameColor,
    readOnly,
    disabled,
    type
}) => {

    return (
        <>
            <div className={style.inputBox}>
                <Form.Item
                    className={`${style.form} ${className}`}
                    name={name}
                    rules={[{ required, message }]}
                >
                    <FloatingLabel label={label} name={name}>
                        <Input 
                            className={`${style.input} ${classNameColor}`} 
                            readOnly={readOnly} 
                            disabled={disabled} 
                            type={type}
                        />
                    </FloatingLabel>
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
                            colorBgContainer: "white",
                            controlHeight: 30,
                            colorBorder: "#dadada",
                            colorIcon: "white",
                            borderRadius: "5px",
                            borderColor: "#dadada",
                        },
                    },
                }}
            >
                <div className={` ${style.inputBox} passwordBox`}>
                    <Form.Item
                        className={`${style.form} ${className} ${style.passwordInput}`}
                        name={name}
                        rules={[{ required: required, message: message }]}
                    >
                       

                        <FloatingLabel label={label} name={name}>
                            <Input.Password placeholder={placeholder} />
                        </FloatingLabel>
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
    required,
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
                <Form.Item
                    className={`${style.form} ${className}`}
                    name={name}
                    rules={[{ required: required, message: message }]}
                >
                    <FloatingLabel label={label} name={name}>
                         <TextArea  autoSize={{ minRows: 8, maxRows: 6 }} style={{marginBottom: "10px"}}/>
                    </FloatingLabel>
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