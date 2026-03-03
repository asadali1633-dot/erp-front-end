import React, { useState } from 'react'
import style from './form.module.css'
import { Modal, Table } from 'antd';
import { FormInput, FormInputTextArea } from '../../../../Components/Inputs/Inputs';
import { SelectInput } from '../../../../Components/Select/Select';
import { Button } from '../../../../Components/Button/Button';
import { LuArrowDownUp } from "react-icons/lu";
import { HiDotsVertical } from "react-icons/hi";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';




function PurchaseOrderForm({
    PurchaseOrdersForm,
    setPurchaseOrdersForm
}) {
    const handleOk = () => {
        setPurchaseOrdersForm(false);
    };
    const handleCancel = () => {
        setPurchaseOrdersForm(false);
    };

    const columns = [
        {
            title: "SKU/ Model",
            dataIndex: "SKU_Model",
            render: () => (
                <div>
                    <FormInput
                        className=""
                        type="text"
                        placeholder="Type here"
                        required
                    />
                    <FormInput
                        className="mt-1"
                        type="text"
                        placeholder="Type here"
                        required
                    />
                </div>
            ),
        },
        {
            title: "Description",
            dataIndex: "Description",
            render: () => (
                <div>
                    <FormInput
                        className=""
                        type="text"
                        placeholder="Type here"
                        required
                    />
                    <FormInput
                        className="mt-1"
                        type="text"
                        placeholder="Type here"
                        required
                    />
                </div>
            ),
        },
        {
            title: "Unit Cost",
            dataIndex: "Unit Cost",
            render: () => (
                <div>
                    <FormInput
                        className=""
                        type="text"
                        placeholder="Type here"
                        required
                    />
                    <FormInput
                        className="mt-1"
                        type="text"
                        placeholder="Type here"
                        required
                    />
                </div>
            ),
        },
        {
            title: "Quantity",
            dataIndex: "Quantity",
            render: () => (
                <div>
                    <FormInput
                        className=""
                        type="text"
                        placeholder="Type here"
                        required
                    />
                    <FormInput
                        className="mt-1"
                        type="text"
                        placeholder="Type here"
                        required
                    />
                </div>
            ),
        },
        {
            title: "Tax",
            dataIndex: "Tax",
            render: () => (
                <div>
                    <FormInput
                        className=""
                        type="text"
                        placeholder="Type here"
                        required
                    />
                    <FormInput
                        className="mt-1"
                        type="text"
                        placeholder="Type here"
                        required
                    />
                </div>
            ),
        },
        {
            title: "Total",
            dataIndex: "Total",
            render: () => (
                <div>
                    <FormInput
                        className=""
                        type="text"
                        placeholder="Type here"
                        required
                    />
                    <FormInput
                        className="mt-1"
                        type="text"
                        placeholder="Type here"
                        required
                    />
                </div>
            ),
        },
        {
            title: (
                <LuArrowDownUp style={{ fontSize: "22px", cursor: "pointer" }} />
            ),
            dataIndex: "yah",
            render: () => (
                <div className={`${style.form_dotsIcons}`}>
                    <HiDotsVertical />
                    <HiDotsVertical />
                </div>
            ),
        },
    ];

    // 👇 sirf ek dummy row do
    const data = [
        { key: "1" }
    ];
    return (
        <>
            <Modal
                title=""
                closable={{ 'aria-label': 'Custom Close Button' }}
                className={`${style.form_modalWidth} modalBgColor`}
                open={PurchaseOrdersForm}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <form className={style.form_modalMainBox}>
                    <h5 className='mx-1'>Purchase order form</h5>
                    <div className={style.form_inputBox}>
                        <FormInput
                            className={`mx-1`}
                            type={"text"}
                            name={"PO_Number"}
                            placeholder={"PO Number"}
                            required={true}
                        />
                        <FormInput
                            className={`mx-1`}
                            type={"text"}
                            name={"Discount"}
                            placeholder={"Discount"}
                            required={true}
                        />
                        <SelectInput
                            className={`mx-1`}
                            // showSearch={true}
                            // value={Data?.country}
                            // onChange={(value) => handleSelectChange("country", value)}
                            placeholder={"Status"}
                        // options={countries?.map(
                        //     (item) => ({
                        //         value: `${item.isoCode}-${item.name}`,
                        //         label: item.name,
                        //     })
                        // )}
                        />
                    </div>
                    <div className={`${style.form_inputBox} mt-1`}>
                        <FormInput
                            className={`mx-1`}
                            type={"text"}
                            name={"PO_Date"}
                            placeholder={"PO Date"}
                            required={true}
                        />
                        <FormInput
                            className={`mx-1`}
                            type={"text"}
                            name={"Due_Date"}
                            placeholder={"Due Date"}
                            required={true}
                        />
                        <FormInput
                            className={`mx-1`}
                            type={"text"}
                            name={"Partial_Advance"}
                            placeholder={"Partial / Advance"}
                            required={true}
                        />
                    </div>
                    <div>
                        <Table
                            columns={columns}
                            dataSource={data}
                            pagination={false}
                        />
                    </div>
                    <div className={style.form_tabsBox}>
                        <Tabs id='customerinfo_tabsBox'>
                            <TabList className={style.form_TabList}>
                                <Tab>Terms</Tab>
                                <Tab>Footer</Tab>
                                <Tab>Public Note</Tab>
                                <Tab>Private Note</Tab>
                                <Tab>Attachments</Tab>
                            </TabList>
                            <TabPanel>
                                <div className={style.form_TabPanel}>
                                    <h6>Terms & Condition </h6>
                                    <p>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                    </p>
                                </div>
                            </TabPanel>
                        </Tabs>
                    </div>
                    <div className={style.form_footerBox}>
                        <div>
                            <input type="checkbox" id="save" />
                            <label htmlFor="save">Save as to this vendor</label>
                        </div>
                        <Button title={"Create Purchase order"} />
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default PurchaseOrderForm