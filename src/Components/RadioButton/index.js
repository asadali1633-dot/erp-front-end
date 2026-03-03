import React from "react";
import { Form, Radio } from "antd";

const RadioButton = ({
    name,
    options = [],
    required,
    message,
    className,
    label = "",
}) => {
    return (
        <Form.Item
            className={className}
            name={name}
            label={label}
            rules={[{ required: required, message: message }]} 
        >
            <Radio.Group className={className}>
                {options.map((item) => (
                    <Radio key={item.value || item.key} value={item.value || item.key}>
                        {item.label}
                    </Radio>
                ))}
            </Radio.Group>
        </Form.Item>
    );
};

export { RadioButton };
