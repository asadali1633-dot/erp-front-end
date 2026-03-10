import React from 'react';
import { Form, Select } from 'antd';
import style from '../Select/Select.css'
import { DownOutlined } from "@ant-design/icons";
import { ConfigProvider } from "antd";


const SelectInput = ({
    showSearch,
    placeholder,
    options,
    className,
    onChange,
    required,
    message,
    name,
    dropdownRender,
    defaultValue,
    classNameColor,
    label,
    disabled,
}) => {
    return (
        <>

            <ConfigProvider
                theme={{
                    components: {
                        Select: {
                            selectorBg: "#00000036",
                            controlHeight: 30,
                            colorTextPlaceholder: "black",
                            // fontSize: "20px",
                            optionSelectedBg: "#00000036", 
                        },
                    },
                }}
            >
                <div className={`selectBox ${className}`}>
                    <Form.Item
                        name={name}
                        label={label}
                        rules={[{ required: required, message: message }]}
                    >
                        <Select
                            style={{ width: "100%" }}
                            showSearch={showSearch}
                            placeholder={placeholder}
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
                    </Form.Item>

                </div>
            </ConfigProvider>
        </>
    )
}

export { SelectInput }