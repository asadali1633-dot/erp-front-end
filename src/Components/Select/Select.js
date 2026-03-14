import React from 'react';
import { Form, Select } from 'antd';
import style from '../Select/Select.css'
import { DownOutlined } from "@ant-design/icons";
import { ConfigProvider } from "antd";
import FloatingLabel from '../FloatingLabel/FloatingLabel';


const SelectInput = ({
    showSearch,
    options,
    className,
    onChange,
    required,
    message,
    name,
    dropdownRender,
    defaultValue,
    label,
    disabled,
}) => {
    return (
        <>

            <ConfigProvider
                theme={{
                    token: {
                        colorBgContainerDisabled: 'trasparent',
                    },
                    components: {
                        Select: {
                            selectorBg: "white",
                            controlHeight: 30,
                            colorTextPlaceholder: "black",
                            optionSelectedBg: "",
                        },
                    },
                }}
            >
                <div className={`selectBox ${className}`}>
                    <Form.Item
                        name={name}
                        rules={[{ required: required, message: message }]}
                    >
                        <FloatingLabel label={label} name={name}>
                            <Select
                                style={{ width: "100%" }}
                                showSearch={showSearch}
                                placeholder={false}
                                optionFilterProp="label"
                                onChange={onChange}
                                disabled={disabled}
                                className={
                                    disabled ? "" : "selectedTextColorOnInput"
                                }
                                options={options}
                                defaultValue={defaultValue}
                                dropdownRender={dropdownRender}
                                suffixIcon={disabled ? null : <DownOutlined />}
                            />
                        </FloatingLabel>
                    </Form.Item>

                </div>
            </ConfigProvider>
        </>
    )
}

export { SelectInput }