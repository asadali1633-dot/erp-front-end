import React from 'react';
import { Form, DatePicker, ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import style from '../Date/CustomDate.module.css';
import FloatingLabel from '../FloatingLabel/FloatingLabel';

function MultipleDates({
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
    const blockToday = (current) => current && current.isSame(dayjs(), 'day');

    return (
        <ConfigProvider
            theme={{
                components: {
                    DatePicker: {
                        colorBgContainer: 'transparent',
                    },
                },
            }}
        >
            <div className={`${style.CustomDate} CustomDate`}>
                <Form.Item
                    className={className}
                    name={name}
                    rules={[{ required: required, message: message }]}
                    getValueProps={(value) => {
                        if (!value) return { value: [] };
                        if (Array.isArray(value)) {
                            return {
                                value: value.map((v) => (v ? dayjs(v) : null)).filter(Boolean),
                            };
                        }
                        return { value: value ? [dayjs(value)] : [] };
                    }}
                    normalize={(value) => {
                        if (!value || !Array.isArray(value)) return [];
                        return value.map((date) => (date ? date.format('YYYY-MM-DD') : null)).filter(Boolean);
                    }}
                >
                    <FloatingLabel label={label} name={name}>
                        <DatePicker
                            multiple
                            placeholder={placeholder || 'Select dates'}
                            disabled={disabled}
                            format="MM-DD-YYYY"
                            disabledDate={allowToday ? disabledDate : disabledDate || blockToday}
                            style={{ width: '100%' }}
                        />
                    </FloatingLabel>
                </Form.Item>
            </div>
        </ConfigProvider>
    );
}

export default MultipleDates;