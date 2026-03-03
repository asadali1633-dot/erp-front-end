import React, { useEffect, useState } from 'react'
import style from './form.module.css'
import { Form, Modal } from 'antd';
import { FormInput } from '../../../../Components/Inputs/Inputs';
import { SelectInput } from '../../../../Components/Select/Select';
import { ActionButton, Button } from '../../../../Components/Button/Button';
import * as ACTIONS from "../../../../store/action/hardware/index";
import { connect } from "react-redux";
import { message } from 'antd';
import { useSelector } from "react-redux";
import CustomDate from '../../../../Components/Date/CustomDate';
import CreateBrand from './CreateBrand';
import QRCODE from '../../../../Components/QR/BARCODE'
import { Country, State, City } from "country-state-city";


function Laptop_desktop({
    Red_Assets,
    setCode, code,
    pagBody,
    assetsType, setAssetsType,
    EditType,
    getBarCode,
    CreateAssetsFun,
    GetAllBrandsManufacturer,
    GetAllEmpList,
    GetAllHardware,
    EditAssetsData,
    UpdateAssets
}) {
    const [form] = Form.useForm();
    const accessToken = useSelector((state) => state.Red_Auth.accessToken);
    const [singleInput, setSingleInput] = useState(false)
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setloading] = useState(false);
    const barcode = Red_Assets?.barcode?.[0]?.data?.barcode
    const [actionType, setActionType] = useState('');
    const codes = ["PK", "IN", "US", "AS"];
    const users = Red_Assets?.Users?.[0]?.data
    let selectedCities = [];
    codes.forEach((code) => {
        const cities = City.getCitiesOfCountry(code);
        selectedCities = [...selectedCities, ...cities];
    });

    const handleOk = () => {
        setAssetsType(false);
    };
    const handleCancel = () => {
        setAssetsType(false);
        setCode({
            mode: null,
            code: null
        });
    };

    const handleSaveClick = () => {
        setActionType('save');
        form.submit();
    };

    const handleCreateNewClick = () => {
        setActionType('createNew');
        form.submit();
    };

    const handleForm = async (values) => {
        setloading(true);
        const field_values = {
            asset_tag: values?.asset_tag,
            brand: values?.brand,
            model: values?.model,
            serial_no: values?.serial_no,
            acquisition_date: values?.acquisition_date,
            po_number: values?.po_number,
            request_ticket: values?.request_ticket,
            location_city: values?.location_city,
            cpu: values?.cpu,
            generation: values?.generation,
            ram: values?.ram,
            primary_storage: values?.primary_storage,
            secondary_storage: values?.secondary_storage,
            os: values?.os,
            os_license_key: values?.os_license_key,
            mac_address: values?.mac_address,
            graphics_card: values?.graphics_card,
            screen_size: values?.screen_size,
            peripherals: values?.peripherals,
            cost_center: values?.cost_center,
            business_justification: values?.business_justification,
            vendor: values?.vendor,
            purchase_cost: values?.purchase_cost,
            warranty_start: values?.warranty_start,
            warranty_end: values?.warranty_end,
            expected_lifespan: values?.expected_lifespan,
            assigned_to_name: values?.assigned_to_name,
            employee_id: values?.employee_id,
            assigned_date: values?.assigned_date,
            department: values?.department,
            physical_location: values?.physical_location,
            status: values?.status,
            user_software_licenses: values?.user_software_licenses,
            security_software: values?.security_software,
            ownership_type: values?.ownership_type,
            lease_expiry: values?.lease_expiry,
            next_maintenance: values?.next_maintenance,
            disposal_date: values?.disposal_date,
            disposal_method: values?.disposal_method,
            depreciation_value: values?.depreciation_value,
            parent_asset: values?.parent_asset
        };
        const payload = {
            asset_tag: values?.asset_tag,
            asset_type: assetsType,
            assign_to: values?.assigned_to_name,
            field_values: field_values
        };
        if (code?.mode !== "Edit") {
            const isCheck = await CreateAssetsFun(payload, accessToken);
            if (isCheck?.success) {
                messageApi.success({
                    type: 'success',
                    content: isCheck?.message,
                });
                GetAllHardware(pagBody, accessToken);
                if (actionType === 'save') {
                    form.resetFields();
                    setAssetsType(false);
                    setloading(false);
                    setActionType('');
                } else if (actionType === 'createNew') {
                    setloading(false);
                    form.resetFields();
                    if (accessToken) {
                        getBarCode(accessToken);
                    }
                }
            } else {
                messageApi.error({
                    type: 'error',
                    content: isCheck?.message,
                });
                setloading(false);
            }
        } else {
            const isCheck = await UpdateAssets(payload, accessToken, code?.code)
            if (isCheck?.success) {
                messageApi.success({
                    type: 'success',
                    content: isCheck?.message,
                });
                GetAllHardware(pagBody, accessToken);
                setloading(false);
                setTimeout(() => {
                    setAssetsType(false);
                }, 1500);
            } else {
                messageApi.error({
                    type: 'error',
                    content: isCheck?.message,
                });
                setloading(false);
            }
        }

    };

    useEffect(() => {
        if (EditAssetsData && code?.mode === "Edit") {
            const Data = EditAssetsData;
            const values = EditAssetsData?.field_values;
            form.setFieldsValue({
                asset_tag: Data?.asset_tag,
                brand: values?.brand,
                model: values?.model,
                serial_no: values?.serial_no,
                acquisition_date: values?.acquisition_date,
                po_number: values?.po_number,
                request_ticket: values?.request_ticket,
                location_city: values?.location_city,
                cpu: values?.cpu,
                generation: values?.generation,
                ram: values?.ram,
                primary_storage: values?.primary_storage,
                secondary_storage:  values?.secondary_storage,
                os: values?.os,
                os_license_key: values?.os_license_key,
                mac_address: values?.mac_address,
                graphics_card: values?.graphics_card,
                screen_size: values?.screen_size,
                peripherals: values?.peripherals,
                cost_center: values?.cost_center,
                business_justification: values?.business_justification,
                vendor: values?.vendor,
                purchase_cost: values?.purchase_cost,
                warranty_start: values?.warranty_start,
                warranty_end: values?.warranty_end,
                expected_lifespan: values?.expected_lifespan,
                assigned_to_name: values?.assigned_to_name,
                employee_id: values?.employee_id,
                assigned_date: values?.assigned_date,
                department: values?.department,
                physical_location: values?.physical_location,
                status: values?.status,
                user_software_licenses: values?.user_software_licenses,
                security_software: values?.security_software,
                ownership_type: values?.ownership_type,
                lease_expiry: values?.lease_expiry,
                next_maintenance: values?.next_maintenance,
                disposal_date: values?.disposal_date,
                disposal_method: values?.disposal_method,
                depreciation_value: values?.depreciation_value,
                parent_asset: values?.parent_asset
            });
        }
    }, [EditAssetsData, code, form]);

    useEffect(() => {
        if (code?.mode !== "Edit" && accessToken && !barcode) {
            getBarCode(accessToken);
        }
    }, [code?.mode, accessToken, getBarCode]);

    useEffect(() => {
        if (code?.mode !== "Edit" && barcode) {
            form.setFieldsValue({
                asset_tag: barcode
            });
        }
    }, [barcode, code?.mode, form]);


    useEffect(() => {
        if (assetsType) {
            GetAllBrandsManufacturer(accessToken)
        }
    }, [accessToken])

    useEffect(() => {
        GetAllEmpList(accessToken)
    }, [accessToken])


    return (
        <>
            {contextHolder}
            <Modal
                title=""
                closable={{ 'aria-label': 'Custom Close Button' }}
                className='modalBgColor'
                open={assetsType}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                width={"100%"}
                style={{ top: 50 }}
            // width={"100%"}
            // top={"15px"}
            >
                <Form
                    form={form}
                    className={`${style.form_modalMainBox} mt-3`}
                    layout="vertical"
                    onFinish={handleForm}
                >
                    <div className={style.modalHardwareScroll}>
                        <div className={style.QR_box}>
                            <h5 className="mx-1">New Asset Form Hardware</h5>
                            <QRCODE
                                value={
                                    code?.mode === "Edit" ? EditAssetsData?.asset_tag : barcode
                                }
                            />
                        </div>
                        <div className={style.form_inputBox}>
                            <FormInput
                                className="mx-1"
                                label={"Assets Tag/ID Number"}
                                name="asset_tag"
                                type={"number"}
                                placeholder="Assets Tag/ID Number"
                                required={false}
                                readOnly={true}
                                message={"Please Enter a ID Number"}
                            />
                            <SelectInput
                                label={"Brand Manufacturer"}
                                className={"mx-1"}
                                name="brand"
                                placeholder="Brand / Manufacturer"
                                message="Please Select a Brand / Manufacturer"
                                required={true}
                                showSearch={true}
                                dropdownRender={(menu) => (
                                    <>
                                        {menu}
                                        <button onClick={() => { setSingleInput(true) }} className='simpleButtonAction'>Create</button>
                                    </>
                                )}
                                options={Red_Assets?.BrandsManufacturer?.[0]?.brands?.map((item) => ({
                                    value: item.id,
                                    label: item.brand_manufacturer,
                                }))}
                            />
                            <FormInput
                                label={"Model Number"}
                                className="mx-1"
                                name="model"
                                placeholder="Model Number"
                                required={true}
                                message={"Please Enter a Model Number"}
                                type={"number"}
                            />

                            <FormInput
                                label={"Serial Number"}
                                className="mx-1"
                                name="serial_no"
                                placeholder="Serial Number"
                                type={"number"}
                                required={true}
                                message={"Please Enter a Serial Number"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <CustomDate
                                label={"Date of Acquisition"}
                                className={`mx-1`}
                                name={"acquisition_date"}
                                placeholder={"Purchase Date"}
                                message={"Please Enter a Purchase Date"}
                                required={true}
                                allowToday={true}
                            />
                            <FormInput
                                label={"Purchase Order Number"}
                                className="mx-1"
                                name="po_number"
                                placeholder="Purchase Order Number"
                                required={true}
                                message={"Please Enter a Purchase Order Number"}
                                type={"number"}
                            />
                            <FormInput
                                label={"Request Ticket/Reference Number"}
                                className="mx-1"
                                name="request_ticket"
                                placeholder="Request Ticket/Reference Number"
                                required={false}
                                message={"Please Enter a Request Ticket/Reference Number"}
                                type={"number"}
                            />
                            <SelectInput
                                label="Location/City"
                                className="mx-1 inputFlexBox"
                                showSearch={true}
                                name="location_city"
                                placeholder="Location/City"
                                message={"Location/City is required"}
                                required={true}
                                classNameColor={`${style.inputDefaultBg}`}
                                options={selectedCities?.map((item) => ({
                                    value: `${item.name}`,
                                    label: item.name,
                                }))}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Hardware Specifications</h5>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"CPU | Processor"}
                                placeholder="CPU | Processor"
                                name="cpu"
                                required={true}
                                message={"Please Select a CPU | Processor"}
                                options={[
                                    // Intel Core Series
                                    { value: "Intel-Core-i3", label: "Intel Core i3" },
                                    { value: "Intel-Core-i5", label: "Intel Core i5" },
                                    { value: "Intel-Core-i7", label: "Intel Core i7" },
                                    { value: "Intel-Core-i9", label: "Intel Core i9" },
                                    { value: "Intel-Core-Ultra-5", label: "Intel Core Ultra 5" },
                                    { value: "Intel-Core-Ultra-7", label: "Intel Core Ultra 7" },
                                    { value: "Intel-Core-Ultra-9", label: "Intel Core Ultra 9" },

                                    // Intel Xeon Series
                                    { value: "Intel-Xeon-E", label: "Intel Xeon E" },
                                    { value: "Intel-Xeon-W", label: "Intel Xeon W" },
                                    { value: "Intel-Xeon-Scalable", label: "Intel Xeon Scalable" },
                                    { value: "Intel-Xeon- Platinum", label: "Intel Xeon Platinum" },
                                    { value: "Intel-Xeon-Gold", label: "Intel Xeon Gold" },
                                    { value: "Intel-Xeon-Silver", label: "Intel Xeon Silver" },
                                    { value: "Intel-Xeon-Bronze", label: "Intel Xeon Bronze" },

                                    // Intel Pentium/Celeron
                                    { value: "Intel-Pentium", label: "Intel Pentium" },
                                    { value: "Intel-Celeron", label: "Intel Celeron" },
                                    { value: "Intel-Atom", label: "Intel Atom" },

                                    // AMD Ryzen Series
                                    { value: "AMD-Ryzen-3", label: "AMD Ryzen 3" },
                                    { value: "AMD-Ryzen-5", label: "AMD Ryzen 5" },
                                    { value: "AMD-Ryzen-7", label: "AMD Ryzen 7" },
                                    { value: "AMD-Ryzen-9", label: "AMD Ryzen 9" },
                                    { value: "AMD-Ryzen-Threadripper", label: "AMD Ryzen Threadripper" },
                                    { value: "AMD-Ryzen-Pro", label: "AMD Ryzen Pro" },

                                    // AMD EPYC Series
                                    { value: "AMD-EPYC-7001", label: "AMD EPYC 7001 Series (Naples)" },
                                    { value: "AMD-EPYC-7002", label: "AMD EPYC 7002 Series (Rome)" },
                                    { value: "AMD-EPYC-7003", label: "AMD EPYC 7003 Series (Milan)" },
                                    { value: "AMD-EPYC-9004", label: "AMD EPYC 9004 Series (Genoa)" },

                                    // AMD Other
                                    { value: "AMD-Athlon", label: "AMD Athlon" },
                                    { value: "AMD-FX", label: "AMD FX" },
                                    { value: "AMD-A-Series", label: "AMD A-Series" },

                                    // Apple Silicon
                                    { value: "Apple-M1", label: "Apple M1" },
                                    { value: "Apple-M1-Pro", label: "Apple M1 Pro" },
                                    { value: "Apple-M1-Max", label: "Apple M1 Max" },
                                    { value: "Apple-M1-Ultra", label: "Apple M1 Ultra" },
                                    { value: "Apple-M2", label: "Apple M2" },
                                    { value: "Apple-M2-Pro", label: "Apple M2 Pro" },
                                    { value: "Apple-M2-Max", label: "Apple M2 Max" },
                                    { value: "Apple-M2-Ultra", label: "Apple M2 Ultra" },
                                    { value: "Apple-M3", label: "Apple M3" },
                                    { value: "Apple-M3-Pro", label: "Apple M3 Pro" },
                                    { value: "Apple-M3-Max", label: "Apple M3 Max" },
                                    { value: "Apple-M4", label: "Apple M4" },

                                    // ARM-Based
                                    { value: "ARM-Cortex-A", label: "ARM Cortex-A Series" },
                                    { value: "ARM-Cortex-X", label: "ARM Cortex-X Series" },
                                    { value: "Qualcomm-Snapdragon", label: "Qualcomm Snapdragon" },
                                    { value: "Mediatek-Dimensity", label: "MediaTek Dimensity" },
                                    { value: "Samsung-Exynos", label: "Samsung Exynos" },

                                    // Workstation/Server Other
                                    { value: "IBM-Power", label: "IBM Power" },
                                    { value: "Oracle-SPARC", label: "Oracle SPARC" },

                                    // Specific Models (Common examples)
                                    { value: "Intel-i5-12400", label: "Intel Core i5-12400" },
                                    { value: "Intel-i7-12700K", label: "Intel Core i7-12700K" },
                                    { value: "Intel-i9-13900K", label: "Intel Core i9-13900K" },
                                    { value: "AMD-Ryzen-5-5600X", label: "AMD Ryzen 5 5600X" },
                                    { value: "AMD-Ryzen-7-5800X", label: "AMD Ryzen 7 5800X" },
                                    { value: "AMD-Ryzen-9-7950X", label: "AMD Ryzen 9 7950X" },
                                    { value: "Apple-M2-Max", label: "Apple M2 Max (12-core)" },
                                    { value: "Apple-M3-Pro", label: "Apple M3 Pro (11/12-core)" },

                                    // Other
                                    { value: "other", label: "Other / Custom CPU" }
                                ]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Generation"}
                                placeholder="Generation"
                                name="generation"
                                required={true}
                                message={"Please Select a Generation"}
                                options={[
                                    // Intel Core Series - Laptop Generations
                                    { value: "Intel-Core-i3-1st-Gen", label: "Intel Core i3 1st Gen (Arrandale)" },
                                    { value: "Intel-Core-i5-1st-Gen", label: "Intel Core i5 1st Gen (Arrandale)" },
                                    { value: "Intel-Core-i7-1st-Gen", label: "Intel Core i7 1st Gen (Arrandale)" },

                                    { value: "Intel-Core-i3-2nd-Gen", label: "Intel Core i3 2nd Gen (Sandy Bridge)" },
                                    { value: "Intel-Core-i5-2nd-Gen", label: "Intel Core i5 2nd Gen (Sandy Bridge)" },
                                    { value: "Intel-Core-i7-2nd-Gen", label: "Intel Core i7 2nd Gen (Sandy Bridge)" },

                                    { value: "Intel-Core-i3-3rd-Gen", label: "Intel Core i3 3rd Gen (Ivy Bridge)" },
                                    { value: "Intel-Core-i5-3rd-Gen", label: "Intel Core i5 3rd Gen (Ivy Bridge)" },
                                    { value: "Intel-Core-i7-3rd-Gen", label: "Intel Core i7 3rd Gen (Ivy Bridge)" },

                                    { value: "Intel-Core-i3-4th-Gen", label: "Intel Core i3 4th Gen (Haswell)" },
                                    { value: "Intel-Core-i5-4th-Gen", label: "Intel Core i5 4th Gen (Haswell)" },
                                    { value: "Intel-Core-i7-4th-Gen", label: "Intel Core i7 4th Gen (Haswell)" },

                                    { value: "Intel-Core-i3-5th-Gen", label: "Intel Core i3 5th Gen (Broadwell)" },
                                    { value: "Intel-Core-i5-5th-Gen", label: "Intel Core i5 5th Gen (Broadwell)" },
                                    { value: "Intel-Core-i7-5th-Gen", label: "Intel Core i7 5th Gen (Broadwell)" },

                                    { value: "Intel-Core-i3-6th-Gen", label: "Intel Core i3 6th Gen (Skylake)" },
                                    { value: "Intel-Core-i5-6th-Gen", label: "Intel Core i5 6th Gen (Skylake)" },
                                    { value: "Intel-Core-i7-6th-Gen", label: "Intel Core i7 6th Gen (Skylake)" },

                                    { value: "Intel-Core-i3-7th-Gen", label: "Intel Core i3 7th Gen (Kaby Lake)" },
                                    { value: "Intel-Core-i5-7th-Gen", label: "Intel Core i5 7th Gen (Kaby Lake)" },
                                    { value: "Intel-Core-i7-7th-Gen", label: "Intel Core i7 7th Gen (Kaby Lake)" },

                                    { value: "Intel-Core-i3-8th-Gen", label: "Intel Core i3 8th Gen (Kaby Lake R)" },
                                    { value: "Intel-Core-i5-8th-Gen", label: "Intel Core i5 8th Gen (Kaby Lake R)" },
                                    { value: "Intel-Core-i7-8th-Gen", label: "Intel Core i7 8th Gen (Kaby Lake R)" },

                                    { value: "Intel-Core-i3-9th-Gen", label: "Intel Core i3 9th Gen (Coffee Lake)" },
                                    { value: "Intel-Core-i5-9th-Gen", label: "Intel Core i5 9th Gen (Coffee Lake)" },
                                    { value: "Intel-Core-i7-9th-Gen", label: "Intel Core i7 9th Gen (Coffee Lake)" },
                                    { value: "Intel-Core-i9-9th-Gen", label: "Intel Core i9 9th Gen (Coffee Lake)" },

                                    { value: "Intel-Core-i3-10th-Gen", label: "Intel Core i3 10th Gen (Ice Lake/Comet Lake)" },
                                    { value: "Intel-Core-i5-10th-Gen", label: "Intel Core i5 10th Gen (Ice Lake/Comet Lake)" },
                                    { value: "Intel-Core-i7-10th-Gen", label: "Intel Core i7 10th Gen (Ice Lake/Comet Lake)" },
                                    { value: "Intel-Core-i9-10th-Gen", label: "Intel Core i9 10th Gen (Ice Lake/Comet Lake)" },

                                    { value: "Intel-Core-i3-11th-Gen", label: "Intel Core i3 11th Gen (Tiger Lake)" },
                                    { value: "Intel-Core-i5-11th-Gen", label: "Intel Core i5 11th Gen (Tiger Lake)" },
                                    { value: "Intel-Core-i7-11th-Gen", label: "Intel Core i7 11th Gen (Tiger Lake)" },
                                    { value: "Intel-Core-i9-11th-Gen", label: "Intel Core i9 11th Gen (Tiger Lake)" },

                                    { value: "Intel-Core-i3-12th-Gen", label: "Intel Core i3 12th Gen (Alder Lake)" },
                                    { value: "Intel-Core-i5-12th-Gen", label: "Intel Core i5 12th Gen (Alder Lake)" },
                                    { value: "Intel-Core-i7-12th-Gen", label: "Intel Core i7 12th Gen (Alder Lake)" },
                                    { value: "Intel-Core-i9-12th-Gen", label: "Intel Core i9 12th Gen (Alder Lake)" },

                                    { value: "Intel-Core-i3-13th-Gen", label: "Intel Core i3 13th Gen (Raptor Lake)" },
                                    { value: "Intel-Core-i5-13th-Gen", label: "Intel Core i5 13th Gen (Raptor Lake)" },
                                    { value: "Intel-Core-i7-13th-Gen", label: "Intel Core i7 13th Gen (Raptor Lake)" },
                                    { value: "Intel-Core-i9-13th-Gen", label: "Intel Core i9 13th Gen (Raptor Lake)" },

                                    { value: "Intel-Core-i3-14th-Gen", label: "Intel Core i3 14th Gen (Raptor Lake Refresh)" },
                                    { value: "Intel-Core-i5-14th-Gen", label: "Intel Core i5 14th Gen (Raptor Lake Refresh)" },
                                    { value: "Intel-Core-i7-14th-Gen", label: "Intel Core i7 14th Gen (Raptor Lake Refresh)" },
                                    { value: "Intel-Core-i9-14th-Gen", label: "Intel Core i9 14th Gen (Raptor Lake Refresh)" },

                                    // Intel Core Ultra Series (Meteor Lake)
                                    { value: "Intel-Core-Ultra-5-125H", label: "Intel Core Ultra 5 125H (Meteor Lake)" },
                                    { value: "Intel-Core-Ultra-7-155H", label: "Intel Core Ultra 7 155H (Meteor Lake)" },
                                    { value: "Intel-Core-Ultra-9-185H", label: "Intel Core Ultra 9 185H (Meteor Lake)" },

                                    // Intel Pentium/Celeron - Laptop
                                    { value: "Intel-Pentium-N5000", label: "Intel Pentium Silver N5000 (Gemini Lake)" },
                                    { value: "Intel-Pentium-N6000", label: "Intel Pentium Silver N6000 (Jasper Lake)" },
                                    { value: "Intel-Celeron-N4020", label: "Intel Celeron N4020 (Gemini Lake)" },
                                    { value: "Intel-Celeron-N4500", label: "Intel Celeron N4500 (Jasper Lake)" },
                                    { value: "Intel-Atom-x5", label: "Intel Atom x5 Series" },
                                    { value: "Intel-Atom-x7", label: "Intel Atom x7 Series" },

                                    // AMD Ryzen Series - Laptop
                                    { value: "AMD-Ryzen-3-2xxxU", label: "AMD Ryzen 3 2xxxU (Zen/Zen+)" },
                                    { value: "AMD-Ryzen-5-2xxxU", label: "AMD Ryzen 5 2xxxU (Zen/Zen+)" },
                                    { value: "AMD-Ryzen-7-2xxxU", label: "AMD Ryzen 7 2xxxU (Zen/Zen+)" },

                                    { value: "AMD-Ryzen-3-3xxxU", label: "AMD Ryzen 3 3xxxU (Zen 2)" },
                                    { value: "AMD-Ryzen-5-3xxxU", label: "AMD Ryzen 5 3xxxU (Zen 2)" },
                                    { value: "AMD-Ryzen-7-3xxxU", label: "AMD Ryzen 7 3xxxU (Zen 2)" },

                                    { value: "AMD-Ryzen-3-4xxxU", label: "AMD Ryzen 3 4xxxU (Zen 2)" },
                                    { value: "AMD-Ryzen-5-4xxxU", label: "AMD Ryzen 5 4xxxU (Zen 2)" },
                                    { value: "AMD-Ryzen-7-4xxxU", label: "AMD Ryzen 7 4xxxU (Zen 2)" },
                                    { value: "AMD-Ryzen-9-4xxxU", label: "AMD Ryzen 9 4xxxU (Zen 2)" },

                                    { value: "AMD-Ryzen-3-5xxxU", label: "AMD Ryzen 3 5xxxU (Zen 3)" },
                                    { value: "AMD-Ryzen-5-5xxxU", label: "AMD Ryzen 5 5xxxU (Zen 3)" },
                                    { value: "AMD-Ryzen-7-5xxxU", label: "AMD Ryzen 7 5xxxU (Zen 3)" },
                                    { value: "AMD-Ryzen-9-5xxxU", label: "AMD Ryzen 9 5xxxU (Zen 3)" },

                                    { value: "AMD-Ryzen-3-6xxxU", label: "AMD Ryzen 3 6xxxU (Zen 3+)" },
                                    { value: "AMD-Ryzen-5-6xxxU", label: "AMD Ryzen 5 6xxxU (Zen 3+)" },
                                    { value: "AMD-Ryzen-7-6xxxU", label: "AMD Ryzen 7 6xxxU (Zen 3+)" },
                                    { value: "AMD-Ryzen-9-6xxxU", label: "AMD Ryzen 9 6xxxU (Zen 3+)" },

                                    { value: "AMD-Ryzen-3-7xxxU", label: "AMD Ryzen 3 7xxxU (Zen 4)" },
                                    { value: "AMD-Ryzen-5-7xxxU", label: "AMD Ryzen 5 7xxxU (Zen 4)" },
                                    { value: "AMD-Ryzen-7-7xxxU", label: "AMD Ryzen 7 7xxxU (Zen 4)" },
                                    { value: "AMD-Ryzen-9-7xxxU", label: "AMD Ryzen 9 7xxxU (Zen 4)" },

                                    { value: "AMD-Ryzen-3-8xxxU", label: "AMD Ryzen 3 8xxxU (Zen 5)" },
                                    { value: "AMD-Ryzen-5-8xxxU", label: "AMD Ryzen 5 8xxxU (Zen 5)" },
                                    { value: "AMD-Ryzen-7-8xxxU", label: "AMD Ryzen 7 8xxxU (Zen 5)" },
                                    { value: "AMD-Ryzen-9-8xxxU", label: "AMD Ryzen 9 8xxxU (Zen 5)" },

                                    // AMD Ryzen Pro Series - Laptop
                                    { value: "AMD-Ryzen-5-Pro-6xxxU", label: "AMD Ryzen 5 Pro 6xxxU" },
                                    { value: "AMD-Ryzen-7-Pro-6xxxU", label: "AMD Ryzen 7 Pro 6xxxU" },
                                    { value: "AMD-Ryzen-5-Pro-7xxxU", label: "AMD Ryzen 5 Pro 7xxxU" },
                                    { value: "AMD-Ryzen-7-Pro-7xxxU", label: "AMD Ryzen 7 Pro 7xxxU" },

                                    // Apple Silicon - MacBook
                                    { value: "Apple-M1", label: "Apple M1 (2020)" },
                                    { value: "Apple-M1-Pro", label: "Apple M1 Pro (2021)" },
                                    { value: "Apple-M1-Max", label: "Apple M1 Max (2021)" },
                                    { value: "Apple-M2", label: "Apple M2 (2022)" },
                                    { value: "Apple-M2-Pro", label: "Apple M2 Pro (2023)" },
                                    { value: "Apple-M2-Max", label: "Apple M2 Max (2023)" },
                                    { value: "Apple-M3", label: "Apple M3 (2023)" },
                                    { value: "Apple-M3-Pro", label: "Apple M3 Pro (2023)" },
                                    { value: "Apple-M3-Max", label: "Apple M3 Max (2023)" },
                                    { value: "Apple-M4", label: "Apple M4 (2024)" },

                                    // ARM-Based - Laptop
                                    { value: "Qualcomm-Snapdragon-7c", label: "Qualcomm Snapdragon 7c" },
                                    { value: "Qualcomm-Snapdragon-8c", label: "Qualcomm Snapdragon 8c" },
                                    { value: "Qualcomm-Snapdragon-8cx", label: "Qualcomm Snapdragon 8cx" },
                                    { value: "Qualcomm-Snapdragon-X-Elite", label: "Qualcomm Snapdragon X Elite" },
                                    { value: "Qualcomm-Snapdragon-X-Plus", label: "Qualcomm Snapdragon X Plus" },
                                    { value: "Mediatek-Kompanio-500", label: "MediaTek Kompanio 500" },
                                    { value: "Mediatek-Kompanio-1300T", label: "MediaTek Kompanio 1300T" },

                                    // Other
                                    { value: "other", label: "Other / Custom CPU" }
                                ]}
                            />
                            <SelectInput
                                className="mx-1"
                                label={"RAM | Memory"}
                                placeholder="RAM | Memory"
                                name="ram"
                                required={true}
                                message={"Please Select a RAM | Memory"}
                                options={[
                                    // RAM Size
                                    { value: "2GB", label: "2 GB" },
                                    { value: "4GB", label: "4 GB" },
                                    { value: "8GB", label: "8 GB" },
                                    { value: "12GB", label: "12 GB" },
                                    { value: "16GB", label: "16 GB" },
                                    { value: "24GB", label: "24 GB" },
                                    { value: "32GB", label: "32 GB" },
                                    { value: "48GB", label: "48 GB" },
                                    { value: "64GB", label: "64 GB" },
                                    { value: "96GB", label: "96 GB" },
                                    { value: "128GB", label: "128 GB" },
                                    { value: "192GB", label: "192 GB" },
                                    { value: "256GB", label: "256 GB" },
                                    { value: "512GB", label: "512 GB" },
                                    { value: "1TB", label: "1 TB" },
                                    { value: "2TB", label: "2 TB" },

                                    // RAM Type
                                    { value: "DDR3-4GB", label: "DDR3 4GB" },
                                    { value: "DDR3-8GB", label: "DDR3 8GB" },
                                    { value: "DDR3-16GB", label: "DDR3 16GB" },
                                    { value: "DDR4-4GB", label: "DDR4 4GB" },
                                    { value: "DDR4-8GB", label: "DDR4 8GB" },
                                    { value: "DDR4-16GB", label: "DDR4 16GB" },
                                    { value: "DDR4-32GB", label: "DDR4 32GB" },
                                    { value: "DDR4-64GB", label: "DDR4 64GB" },
                                    { value: "DDR5-8GB", label: "DDR5 8GB" },
                                    { value: "DDR5-16GB", label: "DDR5 16GB" },
                                    { value: "DDR5-32GB", label: "DDR5 32GB" },
                                    { value: "DDR5-48GB", label: "DDR5 48GB" },
                                    { value: "DDR5-64GB", label: "DDR5 64GB" },
                                    { value: "DDR5-96GB", label: "DDR5 96GB" },
                                    { value: "DDR5-128GB", label: "DDR5 128GB" },

                                    // LPDDR (Mobile/Laptop)
                                    { value: "LPDDR3-4GB", label: "LPDDR3 4GB" },
                                    { value: "LPDDR3-8GB", label: "LPDDR3 8GB" },
                                    { value: "LPDDR4-4GB", label: "LPDDR4 4GB" },
                                    { value: "LPDDR4-8GB", label: "LPDDR4 8GB" },
                                    { value: "LPDDR4-16GB", label: "LPDDR4 16GB" },
                                    { value: "LPDDR5-8GB", label: "LPDDR5 8GB" },
                                    { value: "LPDDR5-16GB", label: "LPDDR5 16GB" },
                                    { value: "LPDDR5-24GB", label: "LPDDR5 24GB" },
                                    { value: "LPDDR5-32GB", label: "LPDDR5 32GB" },
                                    { value: "LPDDR5X-8GB", label: "LPDDR5X 8GB" },
                                    { value: "LPDDR5X-16GB", label: "LPDDR5X 16GB" },
                                    { value: "LPDDR5X-24GB", label: "LPDDR5X 24GB" },

                                    // Server RAM
                                    { value: "ECC-DDR4-8GB", label: "ECC DDR4 8GB" },
                                    { value: "ECC-DDR4-16GB", label: "ECC DDR4 16GB" },
                                    { value: "ECC-DDR4-32GB", label: "ECC DDR4 32GB" },
                                    { value: "ECC-DDR4-64GB", label: "ECC DDR4 64GB" },
                                    { value: "ECC-DDR5-16GB", label: "ECC DDR5 16GB" },
                                    { value: "ECC-DDR5-32GB", label: "ECC DDR5 32GB" },
                                    { value: "ECC-DDR5-64GB", label: "ECC DDR5 64GB" },
                                    { value: "REG-DDR4-16GB", label: "REG ECC DDR4 16GB" },
                                    { value: "REG-DDR4-32GB", label: "REG ECC DDR4 32GB" },
                                    { value: "REG-DDR4-64GB", label: "REG ECC DDR4 64GB" },
                                    { value: "REG-DDR5-32GB", label: "REG ECC DDR5 32GB" },
                                    { value: "REG-DDR5-64GB", label: "REG ECC DDR5 64GB" },
                                    { value: "REG-DDR5-128GB", label: "REG ECC DDR5 128GB" },

                                    { value: "other", label: "Other / Custom RAM" }
                                ]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Primary Storage (HDD | SSD)"}
                                placeholder="Primary Storage (HDD | SSD)"
                                name="primary_storage"
                                required={true}
                                message={"Primary Storage (HDD | SSD)"}
                                options={[
                                    // HDD Sizes
                                    { value: "HDD-120GB", label: "HDD 120GB" },
                                    { value: "HDD-160GB", label: "HDD 160GB" },
                                    { value: "HDD-250GB", label: "HDD 250GB" },
                                    { value: "HDD-320GB", label: "HDD 320GB" },
                                    { value: "HDD-500GB", label: "HDD 500GB" },
                                    { value: "HDD-750GB", label: "HDD 750GB" },
                                    { value: "HDD-1TB", label: "HDD 1TB" },
                                    { value: "HDD-2TB", label: "HDD 2TB" },
                                    { value: "HDD-3TB", label: "HDD 3TB" },
                                    { value: "HDD-4TB", label: "HDD 4TB" },
                                    { value: "HDD-6TB", label: "HDD 6TB" },
                                    { value: "HDD-8TB", label: "HDD 8TB" },
                                    { value: "HDD-10TB", label: "HDD 10TB" },
                                    { value: "HDD-12TB", label: "HDD 12TB" },
                                    { value: "HDD-14TB", label: "HDD 14TB" },
                                    { value: "HDD-16TB", label: "HDD 16TB" },
                                    { value: "HDD-18TB", label: "HDD 18TB" },
                                    { value: "HDD-20TB", label: "HDD 20TB" },

                                    // SSD SATA
                                    { value: "SSD-SATA-120GB", label: "SSD SATA 120GB" },
                                    { value: "SSD-SATA-240GB", label: "SSD SATA 240GB" },
                                    { value: "SSD-SATA-256GB", label: "SSD SATA 256GB" },
                                    { value: "SSD-SATA-480GB", label: "SSD SATA 480GB" },
                                    { value: "SSD-SATA-500GB", label: "SSD SATA 500GB" },
                                    { value: "SSD-SATA-512GB", label: "SSD SATA 512GB" },
                                    { value: "SSD-SATA-960GB", label: "SSD SATA 960GB" },
                                    { value: "SSD-SATA-1TB", label: "SSD SATA 1TB" },
                                    { value: "SSD-SATA-2TB", label: "SSD SATA 2TB" },
                                    { value: "SSD-SATA-4TB", label: "SSD SATA 4TB" },

                                    // SSD NVMe
                                    { value: "SSD-NVMe-128GB", label: "SSD NVMe 128GB" },
                                    { value: "SSD-NVMe-256GB", label: "SSD NVMe 256GB" },
                                    { value: "SSD-NVMe-512GB", label: "SSD NVMe 512GB" },
                                    { value: "SSD-NVMe-1TB", label: "SSD NVMe 1TB" },
                                    { value: "SSD-NVMe-2TB", label: "SSD NVMe 2TB" },
                                    { value: "SSD-NVMe-4TB", label: "SSD NVMe 4TB" },
                                    { value: "SSD-NVMe-8TB", label: "SSD NVMe 8TB" },

                                    // SSD M.2 (Form factor specific)
                                    { value: "SSD-M2-2280-256GB", label: "M.2 2280 256GB" },
                                    { value: "SSD-M2-2280-512GB", label: "M.2 2280 512GB" },
                                    { value: "SSD-M2-2280-1TB", label: "M.2 2280 1TB" },
                                    { value: "SSD-M2-2280-2TB", label: "M.2 2280 2TB" },
                                    { value: "SSD-M2-2242-256GB", label: "M.2 2242 256GB" },
                                    { value: "SSD-M2-2242-512GB", label: "M.2 2242 512GB" },

                                    // Enterprise SSD
                                    { value: "Enterprise-SSD-800GB", label: "Enterprise SSD 800GB" },
                                    { value: "Enterprise-SSD-960GB", label: "Enterprise SSD 960GB" },
                                    { value: "Enterprise-SSD-1.6TB", label: "Enterprise SSD 1.6TB" },
                                    { value: "Enterprise-SSD-1.92TB", label: "Enterprise SSD 1.92TB" },
                                    { value: "Enterprise-SSD-3.2TB", label: "Enterprise SSD 3.2TB" },
                                    { value: "Enterprise-SSD-3.84TB", label: "Enterprise SSD 3.84TB" },
                                    { value: "Enterprise-SSD-7.68TB", label: "Enterprise SSD 7.68TB" },
                                    { value: "Enterprise-SSD-15.36TB", label: "Enterprise SSD 15.36TB" },

                                    // Hybrid (SSHD)
                                    { value: "SSHD-500GB", label: "SSHD 500GB" },
                                    { value: "SSHD-1TB", label: "SSHD 1TB" },
                                    { value: "SSHD-2TB", label: "SSHD 2TB" },

                                    // Dual Drive Configurations
                                    { value: "Dual-256GB-SSD-1TB-HDD", label: "256GB SSD + 1TB HDD" },
                                    { value: "Dual-512GB-SSD-1TB-HDD", label: "512GB SSD + 1TB HDD" },
                                    { value: "Dual-256GB-SSD-2TB-HDD", label: "256GB SSD + 2TB HDD" },
                                    { value: "Dual-512GB-SSD-2TB-HDD", label: "512GB SSD + 2TB HDD" },
                                    { value: "Dual-1TB-SSD-2TB-HDD", label: "1TB SSD + 2TB HDD" },
                                    { value: "Dual-2TB-SSD-2TB-HDD", label: "2TB SSD + 2TB HDD" },

                                    { value: "other", label: "Other / Custom Storage" }
                                ]}
                            />
                        </div>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Secondary Storage (HDD | SSD)"}
                                placeholder="Secondary Storage (HDD | SSD)"
                                name="secondary_storage"
                                required={false}
                                message={"Secondary Storage (HDD | SSD)"}
                                options={[
                                    // HDD Sizes
                                    { value: "HDD-120GB", label: "HDD 120GB" },
                                    { value: "HDD-160GB", label: "HDD 160GB" },
                                    { value: "HDD-250GB", label: "HDD 250GB" },
                                    { value: "HDD-320GB", label: "HDD 320GB" },
                                    { value: "HDD-500GB", label: "HDD 500GB" },
                                    { value: "HDD-750GB", label: "HDD 750GB" },
                                    { value: "HDD-1TB", label: "HDD 1TB" },
                                    { value: "HDD-2TB", label: "HDD 2TB" },
                                    { value: "HDD-3TB", label: "HDD 3TB" },
                                    { value: "HDD-4TB", label: "HDD 4TB" },
                                    { value: "HDD-6TB", label: "HDD 6TB" },
                                    { value: "HDD-8TB", label: "HDD 8TB" },
                                    { value: "HDD-10TB", label: "HDD 10TB" },
                                    { value: "HDD-12TB", label: "HDD 12TB" },
                                    { value: "HDD-14TB", label: "HDD 14TB" },
                                    { value: "HDD-16TB", label: "HDD 16TB" },
                                    { value: "HDD-18TB", label: "HDD 18TB" },
                                    { value: "HDD-20TB", label: "HDD 20TB" },

                                    // SSD SATA
                                    { value: "SSD-SATA-120GB", label: "SSD SATA 120GB" },
                                    { value: "SSD-SATA-240GB", label: "SSD SATA 240GB" },
                                    { value: "SSD-SATA-256GB", label: "SSD SATA 256GB" },
                                    { value: "SSD-SATA-480GB", label: "SSD SATA 480GB" },
                                    { value: "SSD-SATA-500GB", label: "SSD SATA 500GB" },
                                    { value: "SSD-SATA-512GB", label: "SSD SATA 512GB" },
                                    { value: "SSD-SATA-960GB", label: "SSD SATA 960GB" },
                                    { value: "SSD-SATA-1TB", label: "SSD SATA 1TB" },
                                    { value: "SSD-SATA-2TB", label: "SSD SATA 2TB" },
                                    { value: "SSD-SATA-4TB", label: "SSD SATA 4TB" },

                                    // SSD NVMe
                                    { value: "SSD-NVMe-128GB", label: "SSD NVMe 128GB" },
                                    { value: "SSD-NVMe-256GB", label: "SSD NVMe 256GB" },
                                    { value: "SSD-NVMe-512GB", label: "SSD NVMe 512GB" },
                                    { value: "SSD-NVMe-1TB", label: "SSD NVMe 1TB" },
                                    { value: "SSD-NVMe-2TB", label: "SSD NVMe 2TB" },
                                    { value: "SSD-NVMe-4TB", label: "SSD NVMe 4TB" },
                                    { value: "SSD-NVMe-8TB", label: "SSD NVMe 8TB" },

                                    // SSD M.2 (Form factor specific)
                                    { value: "SSD-M2-2280-256GB", label: "M.2 2280 256GB" },
                                    { value: "SSD-M2-2280-512GB", label: "M.2 2280 512GB" },
                                    { value: "SSD-M2-2280-1TB", label: "M.2 2280 1TB" },
                                    { value: "SSD-M2-2280-2TB", label: "M.2 2280 2TB" },
                                    { value: "SSD-M2-2242-256GB", label: "M.2 2242 256GB" },
                                    { value: "SSD-M2-2242-512GB", label: "M.2 2242 512GB" },

                                    // Enterprise SSD
                                    { value: "Enterprise-SSD-800GB", label: "Enterprise SSD 800GB" },
                                    { value: "Enterprise-SSD-960GB", label: "Enterprise SSD 960GB" },
                                    { value: "Enterprise-SSD-1.6TB", label: "Enterprise SSD 1.6TB" },
                                    { value: "Enterprise-SSD-1.92TB", label: "Enterprise SSD 1.92TB" },
                                    { value: "Enterprise-SSD-3.2TB", label: "Enterprise SSD 3.2TB" },
                                    { value: "Enterprise-SSD-3.84TB", label: "Enterprise SSD 3.84TB" },
                                    { value: "Enterprise-SSD-7.68TB", label: "Enterprise SSD 7.68TB" },
                                    { value: "Enterprise-SSD-15.36TB", label: "Enterprise SSD 15.36TB" },

                                    // Hybrid (SSHD)
                                    { value: "SSHD-500GB", label: "SSHD 500GB" },
                                    { value: "SSHD-1TB", label: "SSHD 1TB" },
                                    { value: "SSHD-2TB", label: "SSHD 2TB" },

                                    // Dual Drive Configurations
                                    { value: "Dual-256GB-SSD-1TB-HDD", label: "256GB SSD + 1TB HDD" },
                                    { value: "Dual-512GB-SSD-1TB-HDD", label: "512GB SSD + 1TB HDD" },
                                    { value: "Dual-256GB-SSD-2TB-HDD", label: "256GB SSD + 2TB HDD" },
                                    { value: "Dual-512GB-SSD-2TB-HDD", label: "512GB SSD + 2TB HDD" },
                                    { value: "Dual-1TB-SSD-2TB-HDD", label: "1TB SSD + 2TB HDD" },
                                    { value: "Dual-2TB-SSD-2TB-HDD", label: "2TB SSD + 2TB HDD" },

                                    { value: "other", label: "Other / Custom Storage" }
                                ]}
                            />
                             <SelectInput
                                className="mx-1"
                                label={"Operating System"}
                                placeholder="Operating System"
                                name="os"
                                required={true}
                                message={"Please Select a Operating System"}
                                options={[
                                    // Windows
                                    { value: "Windows-11-Pro", label: "Windows 11 Pro" },
                                    { value: "Windows-11-Home", label: "Windows 11 Home" },
                                    { value: "Windows-11-Enterprise", label: "Windows 11 Enterprise" },
                                    { value: "Windows-11-Education", label: "Windows 11 Education" },
                                    { value: "Windows-11-IoT", label: "Windows 11 IoT" },
                                    { value: "Windows-10-Pro", label: "Windows 10 Pro" },
                                    { value: "Windows-10-Home", label: "Windows 10 Home" },
                                    { value: "Windows-10-Enterprise", label: "Windows 10 Enterprise" },
                                    { value: "Windows-10-Education", label: "Windows 10 Education" },
                                    { value: "Windows-10-IoT", label: "Windows 10 IoT" },
                                    { value: "Windows-8.1", label: "Windows 8.1" },
                                    { value: "Windows-8", label: "Windows 8" },
                                    { value: "Windows-7", label: "Windows 7" },
                                    { value: "Windows-Vista", label: "Windows Vista" },
                                    { value: "Windows-XP", label: "Windows XP" },

                                    // Windows Server
                                    { value: "Windows-Server-2025", label: "Windows Server 2025" },
                                    { value: "Windows-Server-2022", label: "Windows Server 2022" },
                                    { value: "Windows-Server-2019", label: "Windows Server 2019" },
                                    { value: "Windows-Server-2016", label: "Windows Server 2016" },
                                    { value: "Windows-Server-2012", label: "Windows Server 2012" },
                                    { value: "Windows-Server-2008", label: "Windows Server 2008" },
                                    { value: "Windows-Server-Essentials", label: "Windows Server Essentials" },
                                    { value: "Windows-Hyper-V-Server", label: "Windows Hyper-V Server" },

                                    // macOS
                                    { value: "macOS-15-Sequoia", label: "macOS 15 Sequoia" },
                                    { value: "macOS-14-Sonoma", label: "macOS 14 Sonoma" },
                                    { value: "macOS-13-Ventura", label: "macOS 13 Ventura" },
                                    { value: "macOS-12-Monterey", label: "macOS 12 Monterey" },
                                    { value: "macOS-11-Big-Sur", label: "macOS 11 Big Sur" },
                                    { value: "macOS-10.15-Catalina", label: "macOS 10.15 Catalina" },
                                    { value: "macOS-10.14-Mojave", label: "macOS 10.14 Mojave" },
                                    { value: "macOS-10.13-High-Sierra", label: "macOS 10.13 High Sierra" },

                                    // Linux Distributions
                                    { value: "Ubuntu-24.04", label: "Ubuntu 24.04 LTS" },
                                    { value: "Ubuntu-22.04", label: "Ubuntu 22.04 LTS" },
                                    { value: "Ubuntu-20.04", label: "Ubuntu 20.04 LTS" },
                                    { value: "Ubuntu-18.04", label: "Ubuntu 18.04 LTS" },
                                    { value: "Ubuntu-Server", label: "Ubuntu Server" },
                                    { value: "Debian-12", label: "Debian 12 (Bookworm)" },
                                    { value: "Debian-11", label: "Debian 11 (Bullseye)" },
                                    { value: "Debian-10", label: "Debian 10 (Buster)" },
                                    { value: "Red-Hat-Enterprise-9", label: "Red Hat Enterprise Linux 9" },
                                    { value: "Red-Hat-Enterprise-8", label: "Red Hat Enterprise Linux 8" },
                                    { value: "Red-Hat-Enterprise-7", label: "Red Hat Enterprise Linux 7" },
                                    { value: "CentOS-9", label: "CentOS 9" },
                                    { value: "CentOS-8", label: "CentOS 8" },
                                    { value: "CentOS-7", label: "CentOS 7" },
                                    { value: "Fedora-40", label: "Fedora 40" },
                                    { value: "Fedora-39", label: "Fedora 39" },
                                    { value: "Fedora-38", label: "Fedora 38" },
                                    { value: "SUSE-Linux-Enterprise-15", label: "SUSE Linux Enterprise 15" },
                                    { value: "OpenSUSE-Tumbleweed", label: "openSUSE Tumbleweed" },
                                    { value: "OpenSUSE-Leap-15", label: "openSUSE Leap 15" },
                                    { value: "Arch-Linux", label: "Arch Linux" },
                                    { value: "Manjaro", label: "Manjaro" },
                                    { value: "Linux-Mint-21", label: "Linux Mint 21" },
                                    { value: "Linux-Mint-20", label: "Linux Mint 20" },
                                    { value: "Kali-Linux", label: "Kali Linux" },
                                    { value: "Rocky-Linux-9", label: "Rocky Linux 9" },
                                    { value: "Rocky-Linux-8", label: "Rocky Linux 8" },
                                    { value: "AlmaLinux-9", label: "AlmaLinux 9" },
                                    { value: "AlmaLinux-8", label: "AlmaLinux 8" },
                                    { value: "Oracle-Linux", label: "Oracle Linux" },
                                    { value: "Amazon-Linux-2023", label: "Amazon Linux 2023" },
                                    { value: "Amazon-Linux-2", label: "Amazon Linux 2" },

                                    // Chrome OS
                                    { value: "Chrome-OS", label: "Chrome OS" },
                                    { value: "Chrome-OS-Flex", label: "Chrome OS Flex" },

                                    // Unix / BSD
                                    { value: "FreeBSD-14", label: "FreeBSD 14" },
                                    { value: "FreeBSD-13", label: "FreeBSD 13" },
                                    { value: "OpenBSD", label: "OpenBSD" },
                                    { value: "NetBSD", label: "NetBSD" },
                                    { value: "Solaris-11", label: "Oracle Solaris 11" },
                                    { value: "AIX", label: "IBM AIX" },
                                    { value: "HP-UX", label: "HP-UX" },

                                    // Mobile/Tablet OS
                                    { value: "Android-14", label: "Android 14" },
                                    { value: "Android-13", label: "Android 13" },
                                    { value: "Android-12", label: "Android 12" },
                                    { value: "Android-11", label: "Android 11" },
                                    { value: "Android-10", label: "Android 10" },
                                    { value: "iOS-17", label: "iOS 17" },
                                    { value: "iOS-16", label: "iOS 16" },
                                    { value: "iOS-15", label: "iOS 15" },
                                    { value: "iPadOS-17", label: "iPadOS 17" },
                                    { value: "iPadOS-16", label: "iPadOS 16" },

                                    // Virtualization/Container
                                    { value: "VMware-ESXi-8", label: "VMware ESXi 8" },
                                    { value: "VMware-ESXi-7", label: "VMware ESXi 7" },
                                    { value: "Proxmox-VE", label: "Proxmox Virtual Environment" },
                                    { value: "XCP-ng", label: "XCP-ng" },
                                    { value: "Citrix-Hypervisor", label: "Citrix Hypervisor" },
                                    { value: "Nutanix-AHV", label: "Nutanix AHV" },

                                    // No OS / Other
                                    { value: "No-OS", label: "No Operating System / Bare Metal" },
                                    { value: "DOS", label: "DOS" },
                                    { value: "Other-OS", label: "Other Operating System" }
                                ]}
                            />
                            <FormInput
                                label={"OS License Key (if stored)"}
                                className="mx-1"
                                name="os_license_key"
                                placeholder="OS License Key (if stored)"
                                required={true}
                                message={"Please Enter a OS License Key"}
                            />
                             <FormInput
                                label={"Network (MAC Address(es)"}
                                className="mx-1"
                                name="mac_address"
                                placeholder="Network (MAC Address(es)"
                                required={true}
                                message={"Network (MAC Address(es)"}
                            />
                            
                           
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                label={"Graphics Card"}
                                className="mx-1"
                                name="graphics_card"
                                placeholder="Graphics Card"
                                required={false}
                                message={"Please Enter a Graphics Card"}
                            />
                             <SelectInput
                                className="mx-1"
                                label={"Screen Size"}
                                placeholder="Screen Size"
                                name="screen_size"
                                required={true}
                                message={"Please Select a Screen Size"}
                                options={[
                                    // Laptop Screens
                                    { value: "11.6-inch", label: "11.6 inch" },
                                    { value: "12.0-inch", label: "12.0 inch" },
                                    { value: "12.5-inch", label: "12.5 inch" },
                                    { value: "13.0-inch", label: "13.0 inch" },
                                    { value: "13.3-inch", label: "13.3 inch" },
                                    { value: "13.4-inch", label: "13.4 inch" },
                                    { value: "13.5-inch", label: "13.5 inch" },
                                    { value: "13.6-inch", label: "13.6 inch" },
                                    { value: "14.0-inch", label: "14.0 inch" },
                                    { value: "14.5-inch", label: "14.5 inch" },
                                    { value: "15.0-inch", label: "15.0 inch" },
                                    { value: "15.6-inch", label: "15.6 inch" },
                                    { value: "16.0-inch", label: "16.0 inch" },
                                    { value: "16.1-inch", label: "16.1 inch" },
                                    { value: "16.2-inch", label: "16.2 inch" },
                                    { value: "17.0-inch", label: "17.0 inch" },
                                    { value: "17.3-inch", label: "17.3 inch" },
                                    { value: "18.0-inch", label: "18.0 inch" },

                                    // Desktop Monitors
                                    { value: "19-inch", label: "19 inch Monitor" },
                                    { value: "20-inch", label: "20 inch Monitor" },
                                    { value: "21.5-inch", label: "21.5 inch Monitor" },
                                    { value: "22-inch", label: "22 inch Monitor" },
                                    { value: "23-inch", label: "23 inch Monitor" },
                                    { value: "23.8-inch", label: "23.8 inch Monitor" },
                                    { value: "24-inch", label: "24 inch Monitor" },
                                    { value: "24.5-inch", label: "24.5 inch Monitor" },
                                    { value: "25-inch", label: "25 inch Monitor" },
                                    { value: "27-inch", label: "27 inch Monitor" },
                                    { value: "28-inch", label: "28 inch Monitor" },
                                    { value: "29-inch", label: "29 inch Ultrawide" },
                                    { value: "30-inch", label: "30 inch Monitor" },
                                    { value: "31.5-inch", label: "31.5 inch Monitor" },
                                    { value: "32-inch", label: "32 inch Monitor" },
                                    { value: "34-inch", label: "34 inch Ultrawide" },
                                    { value: "35-inch", label: "35 inch Ultrawide" },
                                    { value: "38-inch", label: "38 inch Ultrawide" },
                                    { value: "40-inch", label: "40 inch Monitor" },
                                    { value: "43-inch", label: "43 inch Monitor" },
                                    { value: "49-inch", label: "49 inch Super Ultrawide" },

                                    // Tablet Screens
                                    { value: "7.9-inch", label: "7.9 inch Tablet" },
                                    { value: "8.0-inch", label: "8.0 inch Tablet" },
                                    { value: "8.3-inch", label: "8.3 inch Tablet" },
                                    { value: "8.4-inch", label: "8.4 inch Tablet" },
                                    { value: "8.7-inch", label: "8.7 inch Tablet" },
                                    { value: "9.7-inch", label: "9.7 inch Tablet" },
                                    { value: "10.1-inch", label: "10.1 inch Tablet" },
                                    { value: "10.2-inch", label: "10.2 inch Tablet" },
                                    { value: "10.4-inch", label: "10.4 inch Tablet" },
                                    { value: "10.5-inch", label: "10.5 inch Tablet" },
                                    { value: "10.9-inch", label: "10.9 inch Tablet" },
                                    { value: "11.0-inch", label: "11.0 inch Tablet" },
                                    { value: "12.4-inch", label: "12.4 inch Tablet" },
                                    { value: "12.9-inch", label: "12.9 inch Tablet" },
                                    { value: "13.0-inch", label: "13.0 inch Tablet" },
                                    { value: "14.6-inch", label: "14.6 inch Tablet" },

                                    // All-in-One PCs
                                    { value: "21.5-inch-AIO", label: "21.5 inch All-in-One" },
                                    { value: "22-inch-AIO", label: "22 inch All-in-One" },
                                    { value: "23.8-inch-AIO", label: "23.8 inch All-in-One" },
                                    { value: "24-inch-AIO", label: "24 inch All-in-One" },
                                    { value: "27-inch-AIO", label: "27 inch All-in-One" },
                                    { value: "32-inch-AIO", label: "32 inch All-in-One" },
                                    { value: "34-inch-AIO", label: "34 inch All-in-One" },

                                    // Smartphone Screens
                                    { value: "4.7-inch", label: "4.7 inch Phone" },
                                    { value: "5.4-inch", label: "5.4 inch Phone" },
                                    { value: "5.8-inch", label: "5.8 inch Phone" },
                                    { value: "6.1-inch", label: "6.1 inch Phone" },
                                    { value: "6.3-inch", label: "6.3 inch Phone" },
                                    { value: "6.4-inch", label: "6.4 inch Phone" },
                                    { value: "6.5-inch", label: "6.5 inch Phone" },
                                    { value: "6.7-inch", label: "6.7 inch Phone" },
                                    { value: "6.8-inch", label: "6.8 inch Phone" },
                                    { value: "6.9-inch", label: "6.9 inch Phone" },
                                    { value: "7.0-inch", label: "7.0 inch Phone" },
                                    { value: "7.6-inch", label: "7.6 inch Foldable" },
                                    { value: "8.0-inch", label: "8.0 inch Foldable" },

                                    { value: "other", label: "Other / Custom Size" }
                                ]}
                            />
                            <SelectInput
                                className="mx-1"
                                label={"Peripherals Included"}
                                placeholder="Peripherals Included"
                                name="peripherals"
                                required={true}
                                message={"Please Select a Peripherals Included"}
                                options={[
                                    // Basic Configurations
                                    { value: "None", label: "None - Device Only" },
                                    { value: "Power-Cable-Only", label: "Power Cable Only" },
                                    { value: "Power-Adapter-Only", label: "Power Adapter Only" },

                                    // Mouse Options
                                    { value: "Wired-Mouse", label: "Wired Mouse" },
                                    { value: "Wireless-Mouse", label: "Wireless Mouse" },
                                    { value: "Gaming-Mouse", label: "Gaming Mouse" },
                                    { value: "Trackball-Mouse", label: "Trackball Mouse" },

                                    // Keyboard Options
                                    { value: "Wired-Keyboard", label: "Wired Keyboard" },
                                    { value: "Wireless-Keyboard", label: "Wireless Keyboard" },
                                    { value: "Ergonomic-Keyboard", label: "Ergonomic Keyboard" },
                                    { value: "Gaming-Keyboard", label: "Gaming Keyboard" },
                                    { value: "Mechanical-Keyboard", label: "Mechanical Keyboard" },
                                    { value: "Bluetooth-Keyboard", label: "Bluetooth Keyboard" },

                                    // Mouse + Keyboard Combos
                                    { value: "Wired-Combo", label: "Wired Keyboard + Mouse Combo" },
                                    { value: "Wireless-Combo", label: "Wireless Keyboard + Mouse Combo" },
                                    { value: "Gaming-Combo", label: "Gaming Keyboard + Mouse Combo" },
                                    { value: "Ergonomic-Combo", label: "Ergonomic Keyboard + Mouse" },

                                    // Display Peripherals
                                    { value: "HDMI-Cable", label: "HDMI Cable" },
                                    { value: "DisplayPort-Cable", label: "DisplayPort Cable" },
                                    { value: "VGA-Cable", label: "VGA Cable" },
                                    { value: "DVI-Cable", label: "DVI Cable" },
                                    { value: "USB-C-to-HDMI", label: "USB-C to HDMI Adapter" },
                                    { value: "Monitor-Stand", label: "Monitor Stand / Riser" },
                                    { value: "VESA-Mount", label: "VESA Mount Kit" },

                                    // Audio Peripherals
                                    { value: "Headphones", label: "Headphones" },
                                    { value: "Headset", label: "Headset with Microphone" },
                                    { value: "Gaming-Headset", label: "Gaming Headset" },
                                    { value: "Earbuds", label: "Earbuds" },
                                    { value: "Webcam", label: "Webcam" },
                                    { value: "Microphone", label: "Microphone" },
                                    { value: "Speakers", label: "Speakers" },
                                    { value: "Soundbar", label: "Soundbar" },

                                    // Docking & Connectivity
                                    { value: "USB-Hub", label: "USB Hub" },
                                    { value: "USB-C-Dock", label: "USB-C Docking Station" },
                                    { value: "Thunderbolt-Dock", label: "Thunderbolt Dock" },
                                    { value: "Ethernet-Adapter", label: "Ethernet Adapter" },
                                    { value: "KVM-Switch", label: "KVM Switch" },
                                    { value: "Card-Reader", label: "Card Reader" },

                                    // Storage Peripherals
                                    { value: "External-HDD", label: "External Hard Drive" },
                                    { value: "External-SSD", label: "External SSD" },
                                    { value: "USB-Flash-Drive", label: "USB Flash Drive" },
                                    { value: "NAS-Device", label: "NAS Device" },

                                    // Laptop Accessories
                                    { value: "Laptop-Stand", label: "Laptop Stand" },
                                    { value: "Laptop-Cooling-Pad", label: "Laptop Cooling Pad" },
                                    { value: "Laptop-Sleeve", label: "Laptop Sleeve" },
                                    { value: "Laptop-Bag", label: "Laptop Bag / Backpack" },
                                    { value: "Screen-Protector", label: "Screen Protector" },
                                    { value: "Privacy-Filter", label: "Privacy Screen Filter" },
                                    { value: "Webcam-Cover", label: "Webcam Cover / Shutter" },

                                    // Printer/Scanner
                                    { value: "Printer", label: "Printer" },
                                    { value: "Scanner", label: "Scanner" },
                                    { value: "All-in-One-Printer", label: "All-in-One Printer" },
                                    { value: "Label-Printer", label: "Label Printer" },

                                    // Power & Cables
                                    { value: "Power-Strip", label: "Power Strip / Surge Protector" },
                                    { value: "UPS", label: "UPS / Battery Backup" },
                                    { value: "Extra-Power-Adapter", label: "Extra Power Adapter" },
                                    { value: "Extension-Cable", label: "Extension Cable" },
                                    { value: "Batteries", label: "Batteries (AA/AAA)" },

                                    // Complete Workstation Setups
                                    { value: "Basic-Workstation", label: "Basic Workstation (Keyboard + Mouse)" },
                                    { value: "Standard-Workstation", label: "Standard Workstation (Keyboard + Mouse + Speakers)" },
                                    { value: "Premium-Workstation", label: "Premium Workstation (KB + Mouse + Headset + Webcam)" },
                                    { value: "Home-Office-Setup", label: "Home Office Setup (KB + Mouse + Headset + Webcam + Speakers)" },
                                    { value: "Developer-Setup", label: "Developer Setup (KB + Mouse + External Monitor + Dock)" },
                                    { value: "Designer-Setup", label: "Designer Setup (KB + Mouse + Drawing Tablet + Monitor)" },
                                    { value: "Gaming-Setup", label: "Gaming Setup (Gaming KB + Mouse + Headset)" },
                                    { value: "Call-Center-Setup", label: "Call Center Setup (Headset + KB + Mouse)" },

                                    { value: "other", label: "Other / Custom Peripherals" }
                                ]}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Financial & Procurement</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                label={"Cost Center/Department"}
                                className="mx-1"
                                name="cost_center"
                                placeholder="Cost Center/Department"
                                required={true}
                                message={"Cost Center/Department"}
                            />
                            <FormInput
                                label={"Business Justification/Purpose"}
                                className="mx-1"
                                name="business_justification"
                                placeholder="Business Justification/Purpose"
                                required={true}
                                message={"Please Enter a Business Justification/Purpose"}
                            />
                            <FormInput
                                label={"Vendor/Supplier Name"}
                                className="mx-1"
                                name="vendor"
                                placeholder="Vendor/Supplier Name"
                                required={true}
                                message={"Please Enter a Vendor/Supplier Name"}
                            />
                            <FormInput
                                label={"Purchase Cost"}
                                className="mx-1"
                                name="purchase_cost"
                                placeholder="Purchase Cost"
                                required={true}
                                message={"Please Enter a Purchase Cost"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <CustomDate
                                label={"Warranty Start Date"}
                                className={`mx-1`}
                                name={"warranty_start"}
                                placeholder={"Warranty Start Date"}
                                message={"Please Enter a Warranty Start Date"}
                                required={true}
                                allowToday={true}
                            />
                            <CustomDate
                                label={"Warranty End Date"}
                                className={`mx-1`}
                                name={"warranty_end"}
                                placeholder={"Warranty End Date"}
                                message={"Please Enter a Warranty End Date"}
                                required={true}
                                allowToday={true}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Expected Lifespan"}
                                placeholder="Expected Lifespan"
                                name="expected_lifespan"
                                required={true}
                                message={"Expected Lifespan"}
                                options={[
                                    { value: "1-Year", label: "1-Year" },
                                    { value: "2-Year", label: "2-Year" },
                                    { value: "3-Year", label: "3-Year" },
                                    { value: "4-Year", label: "4-Year" },
                                    { value: "5-Year", label: "5-Year" },
                                    { value: "6-Year", label: "6-Year" },
                                    { value: "7-Year", label: "7-Year" },
                                    { value: "8-Year", label: "8-Year" },
                                    { value: "9-Year", label: "9-Year" },
                                    { value: "10-Year", label: "10-Year" },
                                    { value: "11-Year", label: "11-Year" },
                                    { value: "12-Year", label: "12-Year" },
                                    { value: "13-Year", label: "13-Year" },
                                    { value: "14-Year", label: "14-Year" },
                                    { value: "15-Year", label: "15-Year" },
                                    { value: "16-Year", label: "16-Year" },
                                    { value: "17-Year", label: "17-Year" },
                                    { value: "18-Year", label: "18-Year" },
                                    { value: "19-Year", label: "19-Year" },
                                    { value: "20-Year", label: "20-Year" },
                                    { value: "21-Year", label: "21-Year" },
                                    { value: "22-Year", label: "22-Year" },
                                    { value: "23-Year", label: "23-Year" },
                                    { value: "24-Year", label: "24-Year" },
                                    { value: "25-Year", label: "25-Year" }
                                ]}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Assignment & Location</h5>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Assigned To (User's Name)"}
                                placeholder="Assigned To (User's Name)"
                                name="assigned_to_name"
                                required={false}
                                message={"Please Select a assigned to"}
                                options={users?.map((item) => ({
                                    value: item.id,
                                    label: `${item.name || ''} - ${item.email || ''}`
                                }))}
                            />
                            {/* <FormInput
                                label={"User's Employee ID/Username"}
                                className="mx-1"
                                name="employee_id"
                                placeholder="User's Employee ID/Username"
                                required={true}
                                message={"User's Employee ID/Username is required"}
                            /> */}
                            <CustomDate
                                label={"Assigned Date"}
                                className={`mx-1`}
                                name={"assigned_date"}
                                placeholder={"Assigned Date"}
                                message={"Please Enter a Assigned Date"}
                                required={true}
                                allowToday={true}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <SelectInput
                                className="mx-1"
                                label={"Department/Cost Center"}
                                placeholder="Department/Cost Center"
                                name="department"
                                required={false}
                                message={"Please Select a Department/Cost Center"}
                                options={[]}
                            />
                            <SelectInput
                                className="mx-1"
                                label={"Physical Location"}
                                placeholder="Physical Location"
                                name="physical_location"
                                required={false}
                                message={"Please Select a Physical Location"}
                                options={[]}
                            />
                            <SelectInput
                                className="mx-1"
                                label={"Status"}
                                placeholder="Status"
                                name="status"
                                required={false}
                                message={"Please Select a Status"}
                                options={[]}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Software & Compliance</h5>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                label={"Primary User Software Licenses"}
                                className="mx-1"
                                name="user_software_licenses"
                                placeholder="Primary User Software Licenses"
                                required={true}
                                message={"Primary User Software Licenses is required"}
                            />
                            <FormInput
                                label={"Security Software Installed"}
                                className="mx-1"
                                name="security_software"
                                placeholder="Security Software Installed"
                                required={true}
                                message={"Security Software Installed is required"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Lifecycle & Management</h5>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Owned vs. Leased"}
                                placeholder="Owned vs. Leased"
                                name="ownership_type"
                                required={false}
                                message={"Please Select a Owned vs. Leased"}
                                options={[]}
                            />
                            <CustomDate
                                label={"Lease Expiry Date (if applicable)"}
                                className={`mx-1`}
                                name={"lease_expiry"}
                                placeholder={"Lease Expiry Date (if applicable)"}
                                message={"Please Enter a Lease Expiry Date"}
                                required={false}
                                allowToday={true}
                            />
                            <CustomDate
                                label={"Next Scheduled Maintenance Date"}
                                className={`mx-1`}
                                name={"next_maintenance"}
                                placeholder={"Next Scheduled Maintenance Date"}
                                message={"Please Enter a Maintenance Date"}
                                required={false}
                                allowToday={true}
                            />
                            <CustomDate
                                label={"Decommission/Disposal Date (Future)"}
                                className={`mx-1`}
                                name={"disposal_date"}
                                placeholder={"Decommission/Disposal Date (Future)"}
                                message={"Please Enter a Date (Future)"}
                                required={false}
                                allowToday={true}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <SelectInput
                                className="mx-1"
                                label={"Disposal Method"}
                                placeholder="Disposal Method"
                                name="disposal_method"
                                required={false}
                                message={"Please Select a Disposal Method "}
                                options={[]}
                            />
                            <FormInput
                                label={"Depreciation Value"}
                                className="mx-1"
                                name="depreciation_value"
                                placeholder="Depreciation Value"
                                required={false}
                                message={"User's Employee Depreciation Value"}
                            />
                            <SelectInput
                                className="mx-1"
                                label={"Parent Asset"}
                                placeholder="Parent Asset"
                                name="parent_asset"
                                required={false}
                                message={"Please Select a Parent Asset"}
                                options={[]}
                            />

                        </div>
                    </div>
                    <div className={style.hard_modalBtns}>
                        <ActionButton
                            onClick={handleSaveClick}
                            type="submit"
                            className={"mx-1 mt-2 w-auto"}
                            title={"Save"}
                            loading={loading}
                        />
                        <ActionButton
                            onClick={handleCreateNewClick}
                            type="submit"
                            className={"mx-1 mt-2 w-auto"}
                            title={"Create & New"}
                            loading={loading}
                        />
                    </div>
                </Form>
            </Modal>
            <CreateBrand {...{ singleInput, setSingleInput }} />
        </>
    )
}



function mapStateToProps({ Red_Assets }) {
    return { Red_Assets };
}
export default connect(mapStateToProps, ACTIONS)(Laptop_desktop);