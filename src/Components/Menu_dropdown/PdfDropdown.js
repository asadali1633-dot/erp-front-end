import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, ConfigProvider } from 'antd';

const PdfDropdown = ({ items, onSelect }) => (
    <ConfigProvider
        theme={{
            components: {
                Dropdown: {
                },
            },
            token: {
                colorPrimary: '#1890ff',            
            },
        }}
    >
        <Dropdown trigger={['click']}
            menu={{
                items: items.map(item => ({
                    key: item.key,
                    label: item.label,
                    icon: item.icon,
                    onClick: () => onSelect(item.label, item.type),
                })),
            }}
            
        >
            <a onClick={e => e.preventDefault()} style={{ color: '#6a6a6ace' }}>
                <Space className="custom-invoice" >
                    Select Invoice Format
                    <DownOutlined />
                </Space>
            </a>
        </Dropdown>
    </ConfigProvider>
);

export default PdfDropdown;