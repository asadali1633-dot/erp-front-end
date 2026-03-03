import React, { useState } from 'react'
import style from './form.module.css'
import { Modal } from 'antd';
import { FormInput, FormInputTextArea } from '../../../../Components/Inputs/Inputs';
import { SelectInput } from '../../../../Components/Select/Select';
import { Button } from '../../../../Components/Button/Button';
function TicketForm({
    VendorsForm,
    setVendorsForm
}) {
    const handleOk = () => {
        setVendorsForm(false);
    };
    const handleCancel = () => {
        setVendorsForm(false);
    };
    return (
        <>
            <Modal
                title=""
                closable={{ 'aria-label': 'Custom Close Button' }}
                className={`${style.form_modalWidth} modalBgColor`}
                open={VendorsForm}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <form className={style.form_modalMainBox}>
                    <h5 className='mx-1'>Vendor Form</h5>
                    <div className={style.form_inputBox}>
                        <FormInput
                            className={`mx-1`}
                            type={"text"}
                            name={"Company_Name"}
                            placeholder={"Company Name"}
                            required={true}
                        />
                        <FormInput
                            className={`mx-1`}
                            type={"text"}
                            name={"Date"}
                            placeholder={"Date"}
                            required={true}
                        />
                    </div>
                    <div className={`${style.form_inputBox} mt-1`}>
                        <FormInput
                            className={`mx-1`}
                            type={"text"}
                            name={"Contact_Name"}
                            placeholder={"Contact Name"}
                            required={true}
                        />
                        <FormInput
                            className={`mx-1`}
                            type={"Email"}
                            name={"Email"}
                            placeholder={"Email"}
                            required={true}
                        />
                    </div>
                    <div className={`${style.form_inputBox} mt-1`}>
                        <FormInput
                            className={`mx-1`}
                            type={"text"}
                            name={"Contact"}
                            placeholder={"Contact #"}
                            required={true}
                        />
                        <FormInput
                            className={`mx-1`}
                            type={"text"}
                            name={"Website"}
                            placeholder={"Website"}
                            required={true}
                        />
                    </div>
                    <div className={`${style.form_inputBox} mt-1`}>
                        <FormInput
                            className={`mx-1`}
                            type={"text"}
                            name={"Address"}
                            placeholder={"Address"}
                            required={true}
                        />
                    </div>
                    <div className={`${style.form_inputBox} mt-1`}>
                        <FormInput
                            className={`mx-1`}
                            type={"text"}
                            name={"PIN_Location_Map"}
                            placeholder={"PIN Location Map"}
                            required={true}
                        />
                        <FormInput
                            className={`mx-1`}
                            type={"text"}
                            name={"City"}
                            placeholder={"City"}
                            required={true}
                        />
                    </div>
                    <div className={`${style.form_inputBox} mt-1`}>
                        <FormInput
                            className={`mx-1`}
                            type={"text"}
                            name={"State"}
                            placeholder={"State"}
                            required={true}
                        />
                        <FormInput
                            className={`mx-1`}
                            type={"number"}
                            name={"Zip_Code"}
                            placeholder={"Zip Code"}
                            required={true}
                        />
                    </div>
                    <div className={`${style.form_inputBox} mt-1`}>
                        <FormInput
                            className={`mx-1`}
                            type={"text"}
                            name={"VAT_NTN"}
                            placeholder={"VAT / NTN"}
                            required={true}
                        />
                        <FormInput
                            className={`mx-1`}
                            type={"text"}
                            name={"STRN"}
                            placeholder={"STRN"}
                            required={true}
                        />
                    </div>
                    <div className={style.form_footerFlexBox}>
                        <div className={`${style.form_inputBox} mt-1`}>
                            <FormInputTextArea
                                className={`mx-1`}
                                type={"text"}
                                name={"description"}
                                placeholder={"Provided Services/Productsided Services/Products"}
                                required={true}
                            />
                        </div>
                    </div>
                    <Button title={"Submit"} />
                </form>
            </Modal>
        </>
    )
}

export default TicketForm