import React from 'react'
import { Form, DatePicker, Space, ConfigProvider } from 'antd';
import style from '../Date/CustomDate.module.css'
import dayjs from "dayjs";


function CustomDate({
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
    const blockToday = (current) => {
        return current && current.isSame(dayjs(), "day");
    };
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
                        initialValue={allowToday ? dayjs() : null}
                        getValueProps={(value) => ({
                            value: value ? dayjs(value) : null,
                        })}
                        normalize={(value) =>
                            value ? value.format("YYYY-MM-DD") : null
                        }
                    >
                        <DatePicker
                            placeholder={placeholder}
                            disabled={disabled}
                            format="MM-DD-YYYY"
                            className={disabled ? "datepicker-disabled-custom" : ""}
                            disabledDate={
                                allowToday ? disabledDate : (disabledDate || blockToday)
                            }
                        />
                    </Form.Item>
                </div>
            </ConfigProvider>

        </>
    )
}

export default CustomDate