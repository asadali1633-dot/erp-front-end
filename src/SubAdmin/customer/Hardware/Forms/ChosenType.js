import React, { useState } from 'react'
import { Form, Modal, Spin } from 'antd'
import style from './form.module.css'
import { SelectInput } from '../../../../Components/Select/Select'
import { Button } from '../../../../Components/Button/Button';
import Laptop_desktop from './Laptop_desktop';
import Loader from '../../../../Components/Loader/Loader';
import ServerForm from './ServerForm';
import NetworkDevice from './NetworkDevice'
import CarForm from './Car'
import FurnitureOfficeAssets from './FurnitureOfficeAssets';
import Bikecycle from './Bikecycle';
import Tablet_Phone from './Tablet_Phone';
import BasicItems from './BasicItems';


function ChosenType({
    choseType,
    setChoseType,
    setCode, 
    code, 
    pagBody,
    EditType
}) {

    const [loading, setLoading] = useState(false);
    const [assetsType,setAssetsType] = useState(null)
    const otherItems = ["Keyboard", "Mouse", "Monitor"];
    const lap_desk = ["Laptop", "Desktop"];
    const server = ["Server"];
    const Network = ["Network_Device"];
    const Car = ["Car"];
    const Furniture = ["Furniture"]
    const motorBike = ["Bicycle"]
    const tablet_phone = ["Tablet","Phone"]

    const handleOk = () => {
        setChoseType(false);
    };
    const handleCancel = () => {
        setChoseType(false);
    };

    const handleType = (values) => {
        setLoading(true);
        setTimeout(() => {
            setAssetsType(values.asset_type);
            setLoading(false);
        }, 1000);
    }



    return (
        <>
            <div>
                <Modal
                    title=""
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    className='modalBgColor'
                    open={choseType}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Form
                        className={`${style.form_modalMainBox} mt-3`}
                        layout="vertical"
                        onFinish={handleType}
                    >
                        <div>
                            <h5 className={`${style.heading} mx-1`}> Please Select Assets Type</h5>
                            <div className={style.form_inputBox}>
                                <SelectInput
                                    className="mx-1"
                                    label={"Asset Type"}
                                    placeholder="Asset Type"
                                    name="asset_type"
                                    required={true}
                                    message={"Please Select a Asset Type"}
                                    options={[
                                        { value: "Laptop", label: "Laptop"},
                                        { value: "Desktop", label: "Desktop"},
                                        // { value: "Monitor", label: "Monitor"},
                                        // { value: "Keyboard", label: "Keyboard"},
                                        // { value: "Mouse", label: "Mouse"},
                                        { value: "Phone", label: "Phone"},
                                        { value: "Tablet", label: "Tablet"},
                                        { value: "Server", label: "Server"},
                                        { value: "Car", label: "Car" },
                                        { value: "Bicycle", label: "Bicycle"},
                                        { value: "Network_Device", label: "Network Device"},
                                        { value: "Furniture", label: "Furniture & Office Assets"},
                                        // { value: "Others", label: "Others"}
                                    ]}
                                />
                            </div>
                            <div className={style.hard_modalBtns}>
                                <Button 
                                    type="submit" 
                                    className={"mx-1 mt-2"} 
                                    title={"Next"} 
                                />
                            </div>
                        </div>

                    </Form>
                </Modal>
            </div>


            {loading && <Loader />}
            {!loading && lap_desk.includes(assetsType) && (
                <Laptop_desktop {...{setCode, code, pagBody,assetsType,setAssetsType}}/>
            )}
            {!loading && server.includes(assetsType) && (
                <ServerForm {...{setCode, code, pagBody,assetsType,setAssetsType}}/>
            )}
            {!loading && Network.includes(assetsType) && (
                <NetworkDevice {...{setCode, code, pagBody,assetsType,setAssetsType}}/>
            )}
            {!loading && Car.includes(assetsType) && (
                <CarForm {...{setCode, code, pagBody,assetsType,setAssetsType}}/>
            )}
            {!loading && Furniture.includes(assetsType) && (
                <FurnitureOfficeAssets {...{setCode, code, pagBody,assetsType,setAssetsType}}/>
            )}
            {!loading && motorBike.includes(assetsType) && (
                <Bikecycle {...{setCode, code, pagBody,assetsType,setAssetsType}}/>
            )}
            {!loading && tablet_phone.includes(assetsType) && (
                <Tablet_Phone {...{setCode, code, pagBody,assetsType,setAssetsType}}/>
            )}
            {!loading && otherItems.includes(assetsType) && (
                <BasicItems {...{setCode, code, pagBody,assetsType,setAssetsType}}/>
            )}
        </>
    )
}

export default ChosenType