import React from 'react'
import { Form, DatePicker, Space, ConfigProvider } from 'antd';
import style from '../Date/CustomDate.module.css'
import dayjs from "dayjs";


function Year({
    name,
    required,
    message,
    className,
    label,
    placeholder,
    disabledDate,
    disabled,
    allowToday,
}) {
    return (
        <>


            <ConfigProvider
                theme={{
                    components: {
                        DatePicker: {
                            colorBgContainer: "#2f2f2f",
                        },
                    },
                }}
            >
                <div className={`${style.CustomDate} CustomDate`}>
                    <Form.Item
                        className={className}
                        name={name}
                        label={label}
                        rules={[{ required: required, message: message }]}
                    >
                        <DatePicker
                            placeholder={placeholder} picker="year"
                        />
                    </Form.Item>
                </div>
            </ConfigProvider>

        </>
    )
}

export default Year