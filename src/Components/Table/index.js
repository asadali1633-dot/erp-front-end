import { Spin, Table } from 'antd'
import React from 'react'

function index({
    columns,
    data,
    loading,
    pagination,
    className
}) {
    return (
        <>
            <Table
                className={`antdCustomeTable ${className}`}
                columns={columns}
                dataSource={data}
                pagination={pagination}
                loading={{
                    spinning: loading,
                    indicator: (
                        <Spin
                            size="large"
                            // style={{
                            //     color: "red",
                            //     transform: "scale(1.10)"
                            // }}
                        />
                    ),
                }}
            />
        </>
    )
}

export default index