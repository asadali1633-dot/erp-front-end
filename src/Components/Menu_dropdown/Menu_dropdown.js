import React from 'react';
import { Menu } from 'antd';
import { CalendarOutlined, FieldTextOutlined } from '@ant-design/icons';

const Menu_dropdown = ({ onSelect }) => {
    const items = [
        {
            key: 'text',
            // icon: <FieldTextOutlined />,
            label: 'Text Input',
        },
        {
            key: 'date',
            // icon: <CalendarOutlined />,
            label: 'Date Input',
        },
    ];

    return (
        <Menu 
            items={items}
            onClick={({ key }) => onSelect && onSelect(key)}
        />
    );
};

export default Menu_dropdown;