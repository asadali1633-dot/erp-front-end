import React, { useEffect, useRef, useState } from 'react'
import style from './form.module.css'
import { Form, Modal, Table } from 'antd';
import { FcApproval } from "react-icons/fc";
import { IoCloseCircleSharp } from "react-icons/io5";



function Histrory({
    historyModal, sethistoryModal
}) {
    const handleOk = () => {
        sethistoryModal(false);
    };
    const handleCancel = () => {
        sethistoryModal(false);
    };


    const columns = [
        {
            title: "Requester",
            dataIndex: "Requester",
        },
        {
            title: "Date",
            dataIndex: "Date"
        },
        {
            title: "Outcome",
            dataIndex: "Outcome",
        },
    ];

    const data = [
        {
            key: "1",
            Requester: <div className='userTableNamingBox'><span>HW</span></div>,
            Date: "26/10/25",
            Outcome: <div className='userTableIcons'><FcApproval/> Approved</div>,
        },
        {
            key: "2",
            Requester: <div className='userTableNamingBox'><span>HW</span></div>,
            Date: "26/10/25",
            Outcome:<div className='userTableIcons rejectedIcon'><IoCloseCircleSharp/> Rejected</div>,
        },
    ]; 
    return (
        <>
            <Modal
                title=""
                closable={{ 'aria-label': 'Custom Close Button' }}
                className={`${style.form_modalWidth} modalBgColor`}
                open={historyModal}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                width={"100%"}
            >

                <Form className={`${style.form_modalMainBox} mt-3`}>
                    <div className={style.modalHardwareScroll}>
                        <div className={style.QR_box}>
                            <h5 className="mx-1">Approval History</h5>
                        </div>

                        <Table
                            className='antdCustomeTable mt-3 userTable'
                            columns={columns}
                            dataSource={data}
                            pagination={false}
                        />
                    </div>
                </Form>
            </Modal>


        </>
    )
}

export default Histrory