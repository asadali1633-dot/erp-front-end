import React, { useEffect, useState } from 'react'
import style from './form.module.css'
import { Form, message, Modal } from 'antd';
import { FormInput, FormInputTextArea } from '../../../../Components/Inputs/Inputs';
import { SelectInput } from '../../../../Components/Select/Select';
import { Button } from '../../../../Components/Button/Button';
import * as ACTIONS from "../../../../store/action/Tickets/index";
import { connect } from "react-redux"
import { useSelector } from "react-redux";
import { RadioButton } from '../../../../Components/RadioButton';



function TicketForm({
    TicketsForm,
    setTicketForm,
    Red_Tickets,
    OverviewCall,
    createTicket
}) {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setloading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const accessToken = useSelector((state) => state.Red_Auth.accessToken);
    const [Priority, setPriority] = useState([
        { key: "High", label: "High" },
        { key: "Low", label: "Low" },
        { key: "Normal", label: "Normal" },
    ]);

    const handleOk = () => {
        setTicketForm(false);
    };
    const handleCancel = () => {
        setTicketForm(false);
    };

    const setValues = () => {
        const Data = Red_Tickets?.basicInfo?.[0];
        if (Data) {
            form.setFieldsValue({
                ...Data,
                contact_name: Data?.admin?.name,
                account_name: Data?.admin?.name,
                email: Data?.admin?.email,
                phone: Data?.company?.phone,
                ticket_owner: Data?.admin?.id,
            });
        }
    }

    const handleSubmit = async (values) => {
        setloading(true);
        const isCheck = await createTicket(values, accessToken);
        if (isCheck?.success) {
            console.log("isCheck",isCheck)
            messageApi.success(isCheck?.message);
            form.resetFields();
            // setTimeout(() => {
            //     GetAllSoftware(pagBody, accessToken);
            //     setSoftwareForm(false);
            // }, 2000);
        } else {
            messageApi.error(isCheck?.message);
        }
        setloading(false);
    };

    console.log("Red_Tickets",Red_Tickets)

    useEffect(() => {
        if (accessToken) {
            OverviewCall(accessToken);
            setValues()
        }
    }, [accessToken]);
    return (
        <>
            {contextHolder}
            <Modal
                title=""
                closable={{ 'aria-label': 'Custom Close Button' }}
                className={`${style.form_modalWidth} modalBgColor`}
                open={TicketsForm}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    form={form}
                    className={style.form_modalMainBox}
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    <h5 className='mx-1'>Ticket Information</h5>
                    <div className={style.form_inputBox}>
                        <FormInput
                            className={`mx-1`}
                            type={"text"}
                            name={"contact_name"}
                            placeholder={"Contact Name"}
                            required={true}
                        />
                        <FormInput
                            className={`mx-1`}
                            type={"text"}
                            name={"account_name"}
                            placeholder={"Account Name"}
                            required={true}
                        />
                        <FormInput
                            className={`mx-1`}
                            type={"text"}
                            name={"email"}
                            placeholder={"Email"}
                            required={true}
                        />
                        <FormInput
                            className={`mx-1`}
                            type={"text"}
                            name={"phone"}
                            placeholder={"Phone / Mobile"}
                            required={true}
                        />
                    </div>
                    <h5 className={`${style.form_checkBoxHeading} mx-1`}>Priority</h5>
                    <RadioButton
                        name="priority"
                        label=""
                        required={true}
                        message="Please select a priority!"
                        className={`${style.form_LocationcheckBox} form_checkBox`}
                        options={Priority.map((l) => ({ label: l.label, value: l.key }))}
                    />
                    <div className={`${style.form_inputBox} mt-1`}>
                        <FormInput
                            className={`mx-1`}
                            type={"text"}
                            name={"subject"}
                            placeholder={"Subject"}
                            required={true}
                        />
                    </div>
                    <div className={`${style.form_inputBox} mt-1`}>
                        <FormInputTextArea
                            className={`mx-1`}
                            type={"text"}
                            name={"description"}
                            placeholder={"Description"}
                            required={true}
                        />
                    </div>
                    <div className={style.form_footerFlexBox}>
                        <div className={`${style.form_inputBox} mt-1`}>
                            <SelectInput
                                className={`mx-1`}
                                name={"status"}
                                placeholder={"status"}
                                options={[
                                    { label: "Open", value: "open" },
                                ]}
                            />
                            <SelectInput
                                className={`mx-1`}
                                name={"ticket_owner"}
                                placeholder={"Ticket owner"}
                                options={[
                                    { label: Red_Tickets?.basicInfo?.[0]?.admin?.first_name, value: Red_Tickets?.basicInfo?.[0]?.admin?.id },
                                ]}
                            />
                        </div>
                        <Button title={"Submit"} />
                    </div>
                </Form>
            </Modal>
        </>
    )
}

function mapStateToProps({ Red_Tickets }) {
    return { Red_Tickets };
}
export default connect(mapStateToProps, ACTIONS)(TicketForm);