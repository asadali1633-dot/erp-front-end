import React from 'react'
import { Form, DatePicker, Space, ConfigProvider } from 'antd';
import style from '../Date/CustomDate.module.css'
import dayjs from "dayjs";
import FloatingLabel from '../FloatingLabel/FloatingLabel';


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
                            colorBgContainer: "transparent",
                        },
                    },
                }}
            >
                <div className={`${style.CustomDate} CustomDate`}>
                    <Form.Item
                        className={className}
                        name={name}
                        rules={[{ required: required, message: message }]}
                        initialValue={allowToday ? dayjs() : null}
                        getValueProps={(value) => ({
                            value: value ? dayjs(value) : null,
                        })}
                        normalize={(value) =>
                            value ? value.format("YYYY-MM-DD") : null
                        }
                    >
                        <FloatingLabel label={label} name={name}>
                            <DatePicker
                                placeholder={false}
                                disabled={disabled}
                                format="MM-DD-YYYY"
                                // className={disabled ? "datepicker-disabled-custom" : ""}
                                disabledDate={
                                    allowToday ? disabledDate : (disabledDate || blockToday)
                                }
                            />
                        </FloatingLabel>
                    </Form.Item>
                </div>
            </ConfigProvider>

        </>
    )
}

export default CustomDate