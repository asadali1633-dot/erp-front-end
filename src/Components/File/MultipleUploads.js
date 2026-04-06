import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Form, Upload } from 'antd';
import { FaFileCirclePlus } from "react-icons/fa6";

import style from './UploadFile.module.css'
import FloatingLabel from '../FloatingLabel/FloatingLabel';


const MultipleUploads = ({
    className,
    title,
    name,
    label,
    required,
    message,
    multiple,
    accept
}) => {

    const handleChange = info => { };
    const props = {
        onChange: handleChange,
        multiple: multiple,
    };
    return (
        <>
            <ConfigProvider
                theme={{
                    components: {
                        Button: {
                            colorBgContainer: "transparent",
                            display: "block",
                            fontSize: 11,
                            borderRadius: "5px",
                            colorBorder: "#dadada",
                        },
                    },
                }}
            >
                <div className={`${style.mainBox} ${className}`}>
                    <Form.Item
                        name={name}
                        rules={[{ required: required, message: message }]}
                        getValueFromEvent={(e) => e?.fileList || []}
                        valuePropName="fileList"
                    >
                        <FloatingLabel label={false} name={name}>
                            <Upload style={{ width: "100%" }}
                                {...props}
                                showUploadList={false}
                                accept={accept}
                                className={style.uploadRoot}
                            >
                                <Button className={style.button}
                                    icon={<FaFileCirclePlus />}
                                >{label}</Button>
                            </Upload>
                        </FloatingLabel>

                    </Form.Item>

                </div>
            </ConfigProvider>
        </>
    );
};
export default MultipleUploads;