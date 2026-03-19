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
import UploadFile from '../../../../Components/File/UploadFile';
import Year from '../../../../Components/Date/Year';
import dayjs from "dayjs";


function Bikecycle({
    Red_Assets,
    setCode, code,
    pagBody,
    assetsType, setAssetsType,
    getBarCode,
    CreateAssetsFun,
    GetAllBrandsManufacturer,
    GetAllEmpList,
    GetAllHardware,
    UpdateAssets,
    EditAssetsData
}) {
    const [form] = Form.useForm();
    const users = Red_Assets?.Users?.[0]?.data
    const [singleInput, setSingleInput] = useState(false)
    const accessToken = useSelector((state) => state.Red_Auth.accessToken);
    const barcode = Red_Assets?.barcode?.[0]?.data?.barcode
    const [actionType, setActionType] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setloading] = useState(false);
    const codes = ["PK", "IN", "US", "AS"];
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
            manufacturer_brand: values?.manufacturer_brand,
            model_name: values?.model_name,
            model_year: values?.model_year,
            frame_serial_number: values?.frame_serial_number,
            frame_size: values?.frame_size,
            wheel_size: values?.wheel_size,
            tire_type: values?.tire_type,
            brake_type: values?.brake_type,
            gearing_system: values?.gearing_system,
            number_of_gears: values?.number_of_gears,
            shifters: values?.shifters,
            weight: values?.weight,
            motor_type: values?.motor_type,
            motor_power: values?.motor_power,
            battery_capacity: values?.battery_capacity,
            battery_serial_number: values?.battery_serial_number,
            charger_serial_number: values?.charger_serial_number,
            estimated_range: values?.estimated_range,
            assist_levels: values?.assist_levels,
            display_model: values?.display_model,
            battery_key_number: values?.battery_key_number,
            po_number: values?.po_number,
            vendor_dealer: values?.vendor_dealer,
            purchase_date: values?.purchase_date,
            purchase_cost: values?.purchase_cost,
            delivery_assembly_cost: values?.delivery_assembly_cost,
            cost_center: values?.cost_center,
            warranty_expiry: values?.warranty_expiry,
            insurance_policy_number: values?.insurance_policy_number,
            insurance_expiry: values?.insurance_expiry,
            assigned_to: values?.assigned_to,
            assignment_date: values?.assignment_date,
            expected_return_date: values?.expected_return_date,
            primary_purpose: values?.primary_purpose,
            home_location: values?.home_location,
            lock_combination: values?.lock_combination,
            gps_tracker_id: values?.gps_tracker_id,
            previous_assignees: values?.previous_assignees,
            safety_equipment: values?.safety_equipment,
            helmet_location: values?.helmet_location,
            safety_notes: values?.safety_notes,
            current_condition: values?.current_condition,
            last_service_date: values?.last_service_date,
            last_service_type: values?.last_service_type,
            last_service_odometer: values?.last_service_odometer,
            next_service_due: values?.next_service_due,
            service_interval: values?.service_interval,
            preferred_shop: values?.preferred_shop,
            service_history_log: values?.service_history_log,
            chain_lube_schedule: values?.chain_lube_schedule,
            brake_pad_replacement_date: values?.brake_pad_replacement_date,
            battery_health_check_date: values?.battery_health_check_date,
            accident_history: values?.accident_history,
            current_damage: values?.current_damage,
            theft_report: values?.theft_report,
            stolen_status: values?.stolen_status,
            vandalism_report: values?.vandalism_report,
            bicycle_status: values?.bicycle_status,
            replacement_date: values?.replacement_date,
            retirement_reason: values?.retirement_reason,
            disposal_date: values?.disposal_date,
            disposal_method: values?.disposal_method,
            donation_recipient: values?.donation_recipient,
            resale_value: values?.resale_value,
            disposal_certificate: values?.disposal_certificate,
            owners_manual_location: values?.owners_manual_location,
            assembly_instructions: values?.assembly_instructions,
            proof_of_purchase: values?.proof_of_purchase,
            local_registration: values?.local_registration,
            safety_certification: values?.safety_certification,
            bike_registration_id: values?.bike_registration_id,
            photographs: values?.photographs,
            record_created_by: values?.record_created_by,
            record_created_date: values?.record_created_date,
            last_updated_by: values?.last_updated_by,
            last_updated_date: values?.last_updated_date,
            last_inventory_check: values?.last_inventory_check,
            notes: values?.notes,
            attachments: values?.attachments
        };
        const payload = {
            asset_tag: values?.asset_tag,
            asset_type: assetsType,
            assign_to: values?.assigned_to,
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
                    setTimeout(() => {
                        setAssetsType(false);
                        setloading(false);
                        setActionType('');
                    }, 1000);
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
                manufacturer_brand: values?.manufacturer_brand,
                model_name: values?.model_name,
                model_year: values?.model_year ? dayjs(values.model_year) : null,
                frame_serial_number: values?.frame_serial_number,
                frame_size: values?.frame_size,
                wheel_size: values?.wheel_size,
                tire_type: values?.tire_type,
                brake_type: values?.brake_type,
                gearing_system: values?.gearing_system,
                number_of_gears: values?.number_of_gears,
                shifters: values?.shifters,
                weight: values?.weight,
                motor_type: values?.motor_type,
                motor_power: values?.motor_power,
                battery_capacity: values?.battery_capacity,
                battery_serial_number: values?.battery_serial_number,
                charger_serial_number: values?.charger_serial_number,
                estimated_range: values?.estimated_range,
                assist_levels: values?.assist_levels,
                display_model: values?.display_model,
                battery_key_number: values?.battery_key_number,
                po_number: values?.po_number,
                vendor_dealer: values?.vendor_dealer,
                purchase_date: values?.purchase_date,
                purchase_cost: values?.purchase_cost,
                delivery_assembly_cost: values?.delivery_assembly_cost,
                cost_center: values?.cost_center,
                warranty_expiry: values?.warranty_expiry,
                insurance_policy_number: values?.insurance_policy_number,
                insurance_expiry: values?.insurance_expiry,
                assigned_to: values?.assigned_to,
                assignment_date: values?.assignment_date,
                expected_return_date: values?.expected_return_date,
                primary_purpose: values?.primary_purpose,
                home_location: values?.home_location,
                lock_combination: values?.lock_combination,
                gps_tracker_id: values?.gps_tracker_id,
                previous_assignees: values?.previous_assignees,
                safety_equipment: values?.safety_equipment,
                helmet_location: values?.helmet_location,
                safety_notes: values?.safety_notes,
                current_condition: values?.current_condition,
                last_service_date: values?.last_service_date,
                last_service_type: values?.last_service_type,
                last_service_odometer: values?.last_service_odometer,
                next_service_due: values?.next_service_due,
                service_interval: values?.service_interval,
                preferred_shop: values?.preferred_shop,
                service_history_log: values?.service_history_log,
                chain_lube_schedule: values?.chain_lube_schedule,
                brake_pad_replacement_date: values?.brake_pad_replacement_date,
                battery_health_check_date: values?.battery_health_check_date,
                accident_history: values?.accident_history,
                current_damage: values?.current_damage,
                theft_report: values?.theft_report,
                stolen_status: values?.stolen_status,
                vandalism_report: values?.vandalism_report,
                bicycle_status: values?.bicycle_status,
                replacement_date: values?.replacement_date,
                retirement_reason: values?.retirement_reason,
                disposal_date: values?.disposal_date,
                disposal_method: values?.disposal_method,
                donation_recipient: values?.donation_recipient,
                resale_value: values?.resale_value,
                disposal_certificate: values?.disposal_certificate,
                owners_manual_location: values?.owners_manual_location,
                assembly_instructions: values?.assembly_instructions,
                proof_of_purchase: values?.proof_of_purchase,
                local_registration: values?.local_registration,
                safety_certification: values?.safety_certification,
                bike_registration_id: values?.bike_registration_id,
                photographs: values?.photographs,
                record_created_by: values?.record_created_by,
                record_created_date: values?.record_created_date,
                last_updated_by: values?.last_updated_by,
                last_updated_date: values?.last_updated_date,
                last_inventory_check: values?.last_inventory_check,
                notes: values?.notes,
                attachments: values?.attachments
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
            >
                <Form
                    form={form}
                    className={`${style.form_modalMainBox} mt-3`}
                    layout="vertical"
                    onFinish={handleForm}
                >
                    <div className={style.modalHardwareScroll}>
                        <div className={style.QR_box}>
                            <h5 className="mx-1">Bicycle Asset Form</h5>
                            <QRCODE
                                value={
                                    code?.mode === "Edit" ? EditAssetsData?.asset_tag : barcode
                                }
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Identification & Classification</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                className="mx-1"
                                label={"Assets Tag/ID"}
                                name="asset_tag"
                                type={"text"}
                                placeholder="Assets Tag/ID"
                                required={true}
                                message={"Please Enter a ID"}
                            />

                            <FormInput
                                label={"Manufacturer/Brand"}
                                className="mx-1"
                                name="manufacturer_brand"
                                placeholder="e.g., Trek, Giant, Specialized, Cannondale, Hero, Atlas"
                                required={true}
                                message={"Manufacturer/Brand"}
                            />

                            <FormInput
                                label={"Model Name/Number"}
                                className="mx-1"
                                name="model_name"
                                placeholder="e.g., Domane SL 5, Escape 3, Mountain RX 200"
                                required={true}
                                message={"Model Name/Number"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <Year
                                label={"Model Year"}
                                className={`mx-1`}
                                name="model_year"
                                placeholder={"Model Year"}
                                message={"Model Year"}
                                required={true}
                            />

                            <FormInput
                                label={"Frame Serial Number"}
                                className="mx-1"
                                name="frame_serial_number"
                                placeholder="e.g., WTU12345678, GSN987654321"
                                required={true}
                                message={"Frame Serial Number (Unique, usually under bottom bracket)"}
                            />

                            <FormInput
                                label={"Frame Size"}
                                className="mx-1"
                                name="frame_size"
                                placeholder="e.g., 54cm, 17in, Medium"
                                required={true}
                                message={"Frame Size (cm or inches)"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Technical Specifications</h5>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Wheel Size"}
                                placeholder="Select Wheel Size"
                                name="wheel_size"
                                required={true}
                                message={"Please Select Wheel Size"}
                                options={[
                                    { value: "26-inch", label: "26 inch" },
                                    { value: "27.5-inch", label: "27.5 inch" },
                                    { value: "29-inch", label: "29 inch" },
                                    { value: "700c", label: "700c (Road)" },
                                    { value: "650b", label: "650b" },
                                    { value: "20-inch", label: "20 inch" },
                                    { value: "24-inch", label: "24 inch" },
                                    { value: "16-inch", label: "16 inch" },
                                    { value: "12-inch", label: "12 inch" },
                                    { value: "other", label: "Other Size" }
                                ]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Tire Type"}
                                placeholder="Select Tire Type"
                                name="tire_type"
                                required={true}
                                message={"Please Select Tire Type"}
                                options={[
                                    { value: "Road", label: "Road - Slick" },
                                    { value: "Knobby", label: "Knobby / Off-road" },
                                    { value: "Hybrid", label: "Hybrid / Commuter" },
                                    { value: "Puncture-resistant", label: "Puncture-resistant" },
                                    { value: "Fat", label: "Fat Tire" },
                                    { value: "Touring", label: "Touring" },
                                    { value: "Cyclocross", label: "Cyclocross" },
                                    { value: "Tubeless", label: "Tubeless Ready" }
                                ]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Brake Type"}
                                placeholder="Select Brake Type"
                                name="brake_type"
                                required={true}
                                message={"Please Select Brake Type"}
                                options={[
                                    { value: "V-brake", label: "Rim: V-brake" },
                                    { value: "Caliper", label: "Rim: Caliper" },
                                    { value: "Disc-Mechanical", label: "Disc: Mechanical" },
                                    { value: "Disc-Hydraulic", label: "Disc: Hydraulic" },
                                    { value: "Coaster", label: "Coaster / Hub brake" },
                                    { value: "Cantilever", label: "Cantilever" },
                                    { value: "Drum", label: "Drum brake" },
                                    { value: "Regenerative", label: "Regenerative (E-bike)" }
                                ]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Gearing System"}
                                placeholder="Select Gearing System"
                                name="gearing_system"
                                required={true}
                                message={"Please Select Gearing System"}
                                options={[
                                    { value: "Derailleur", label: "Derailleur" },
                                    { value: "Hub-gear", label: "Internal Hub Gear" },
                                    { value: "Single-speed", label: "Single-speed / Fixed gear" },
                                    { value: "Belt-drive", label: "Belt Drive" },
                                    { value: "Continuous", label: "Continuously Variable (CVT)" },
                                    { value: "Electronic", label: "Electronic Shifting" }
                                ]}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                label={"Number of Gears"}
                                className="mx-1"
                                name="number_of_gears"
                                placeholder="e.g., 1, 3, 7, 8, 11, 21, 24"
                                type="number"
                                min="1"
                                max="30"
                                required={true}
                                message={"Number of Gears"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Shifters"}
                                placeholder="Select Shifter Type"
                                name="shifters"
                                required={true}
                                message={"Please Select Shifter Type"}
                                options={[
                                    { value: "Grip-shift", label: "Grip Shift / Twist" },
                                    { value: "Trigger", label: "Trigger / Thumb" },
                                    { value: "Integrated", label: "Integrated Brake/Shift" },
                                    { value: "Downtube", label: "Downtube" },
                                    { value: "Bar-end", label: "Bar-end" },
                                    { value: "Electronic", label: "Electronic / Di2" },
                                    { value: "Single-speed", label: "No Shifters (Single-speed)" }
                                ]}
                            />

                            <FormInput
                                label={"Weight"}
                                className="mx-1"
                                name="weight"
                                placeholder="e.g., 12.5 kg, 27.5 lbs"
                                required={true}
                                message={"Weight (kg/lbs)"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Electric Bike Specific (if applicable)</h5>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Motor Type"}
                                placeholder="Select Motor Type"
                                name="motor_type"
                                required={true}
                                message={"Please Select Motor Type"}
                                options={[
                                    { value: "Hub-Front", label: "Hub Motor - Front Wheel" },
                                    { value: "Hub-Rear", label: "Hub Motor - Rear Wheel" },
                                    { value: "Mid-Drive", label: "Mid-Drive / Crank Drive" },
                                    { value: "Friction", label: "Friction Drive" },
                                    { value: "Geared-Hub", label: "Geared Hub Motor" },
                                    { value: "Direct-Drive", label: "Direct Drive Hub" }
                                ]}
                            />

                            <FormInput
                                label={"Motor Power"}
                                className="mx-1"
                                name="motor_power"
                                placeholder="e.g., 250W, 500W, 750W, 1000W"
                                required={true}
                                message={"Motor Power (Watts)"}
                            />

                            <FormInput
                                label={"Battery Capacity"}
                                className="mx-1"
                                name="battery_capacity"
                                placeholder="e.g., 360Wh, 500Wh, 14.5Ah"
                                required={true}
                                message={"Battery Capacity (Wh)"}
                            />

                            <FormInput
                                label={"Battery Model/Serial Number"}
                                className="mx-1"
                                name="battery_serial_number"
                                placeholder="e.g., BT-F06.2, SN: BATT12345678"
                                required={true}
                                message={"Battery Model/Serial Number"}
                            />

                            <FormInput
                                label={"Charger Model/Serial Number"}
                                className="mx-1"
                                name="charger_serial_number"
                                placeholder="e.g., CHG-42V-2A, SN: CHR98765432"
                                required={true}
                                message={"Charger Model/Serial Number"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                label={"Estimated Range"}
                                className="mx-1"
                                name="estimated_range"
                                placeholder="e.g., 50km, 35 miles per charge"
                                required={true}
                                message={"Estimated Range (km/miles per charge)"}
                            />

                            <FormInput
                                label={"Assist Levels"}
                                className="mx-1"
                                name="assist_levels"
                                placeholder="e.g., 5 modes, Eco/Trail/Turbo"
                                required={true}
                                message={"Assist Levels (Number of modes)"}
                            />

                            <FormInput
                                label={"Display/Controller Model"}
                                className="mx-1"
                                name="display_model"
                                placeholder="e.g., DPC-18, King-Meter SW-LCD"
                                required={true}
                                message={"Display/Controller Model"}
                            />

                            <FormInput
                                label={"Battery Removal Key Number"}
                                className="mx-1"
                                name="battery_key_number"
                                placeholder="e.g., KEY-AB-12345"
                                required={false}
                                message={"Battery Removal Key Number"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Procurement & Financial</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                label={"Purchase Order Number"}
                                className="mx-1"
                                name="po_number"
                                placeholder="e.g., PO-CYCLE-2024-001, PUR-987654"
                                required={true}
                                message={"Purchase Order Number"}
                            />

                            <FormInput
                                label={"Vendor/Dealer"}
                                className="mx-1"
                                name="vendor_dealer"
                                placeholder="e.g., Trek Bicycle Store, Hero Cycles, Amazon"
                                required={true}
                                message={"Vendor/Dealer"}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Purchase Date"}
                                name="purchase_date"
                                required={true}
                                message={"Purchase Date"}
                            />

                            <FormInput
                                label={"Purchase Cost"}
                                className="mx-1"
                                name="purchase_cost"
                                placeholder="e.g., $1,200.00, ₹45,000"
                                required={true}
                                message={"Purchase Cost"}
                            />

                            <FormInput
                                label={"Delivery/Assembly Cost"}
                                className="mx-1"
                                name="delivery_assembly_cost"
                                placeholder="e.g., $50.00 delivery, $75.00 assembly"
                                required={false}
                                message={"Delivery/Assembly Cost"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                label={"Cost Center/Department"}
                                className="mx-1"
                                name="cost_center"
                                placeholder="e.g., Facilities, Employee Wellness, Logistics"
                                required={true}
                                message={"Cost Center/Department"}
                            />

                            <FormInput
                                label={"Warranty Expiry Date"}
                                className="mx-1"
                                name="warranty_expiry"
                                placeholder="e.g., Frame: 2028-12-31, Components: 2026-12-31, Battery: 2027-06-30"
                                multiline={true}
                                rows={2}
                                required={true}
                                message={"Warranty Expiry Date (Frame, components, battery)"}
                            />

                            <FormInput
                                label={"Insurance Policy Number"}
                                className="mx-1"
                                name="insurance_policy_number"
                                placeholder="e.g., CYC-INS-12345678"
                                required={false}
                                message={"Insurance Policy Number (If insured)"}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Insurance Expiry Date"}
                                name="insurance_expiry"
                                required={false}
                                message={"Insurance Expiry Date"}
                                allowToday={true}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Assignment & Usage</h5>
                        <div className={`${style.form_inputBox}`}>
                            <SelectInput
                                className="mx-1"
                                label={"assigned To"}
                                placeholder="assigned To"
                                name="assigned_to"
                                required={true}
                                message={"Assigned To"}
                                options={users?.map((item) => ({
                                    value: item.id,
                                    label: `${item.name || ''} - ${item.email || ''}`
                                }))}
                            />
                            <CustomDate
                                className="mx-1"
                                label={"Assignment Date"}
                                name="assignment_date"
                                required={true}
                                message={"Assignment Date"}
                                allowToday={true}
                            />
                            <CustomDate
                                className="mx-1"
                                label={"Expected Return Date"}
                                name="expected_return_date"
                                required={false}
                                message={"Expected Return Date (For temporary assignments)"}
                                allowToday={true}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Primary Purpose"}
                                placeholder="Select Primary Purpose"
                                name="primary_purpose"
                                required={true}
                                message={"Please Select Primary Purpose"}
                                options={[
                                    { value: "Commuting", label: "Commuting to/from work" },
                                    { value: "On-campus-transit", label: "On-campus transit" },
                                    { value: "Deliveries", label: "Deliveries / Courier" },
                                    { value: "Maintenance-rounds", label: "Maintenance rounds" },
                                    { value: "Recreation", label: "Recreation / Personal use" },
                                    { value: "Training", label: "Training / Skill development" },
                                    { value: "Security-patrol", label: "Security patrol" },
                                    { value: "Fleet-demo", label: "Fleet demonstration" },
                                    { value: "Pool-vehicle", label: "Pool vehicle" },
                                    { value: "other", label: "Other purpose" }
                                ]}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                label={"Home Location/Storage Area"}
                                className="mx-1"
                                name="home_location"
                                placeholder="e.g., Rack #A-12, Locker 45, Basement parking Bay 3"
                                required={true}
                                message={"Home Location/Storage Area"}
                            />

                            <FormInput
                                label={"Lock Combination/Key ID"}
                                className="mx-1"
                                name="lock_combination"
                                placeholder="e.g., Combo: 1234, Key #K789, Cable lock code: 5678"
                                required={true}
                                message={"Lock Combination/Key ID"}
                            />

                            <FormInput
                                label={"GPS Tracker ID"}
                                className="mx-1"
                                name="gps_tracker_id"
                                placeholder="e.g., INV-GPS-12345, AirTag: ABC-DEF"
                                required={false}
                                message={"GPS Tracker ID (If installed)"}
                            />

                            <FormInput
                                label={"Previous Assignee(s)"}
                                className="mx-1"
                                name="previous_assignees"
                                placeholder="e.g., 2023-2024: Mike Chen, 2022-2023: Lisa Wong"
                                multiline={true}
                                rows={3}
                                required={false}
                                message={"Previous Assignee(s) (History)"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Maintenance & Service</h5>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Current Condition"}
                                placeholder="Select Current Condition"
                                name="current_condition"
                                required={true}
                                message={"Please Select Current Condition"}
                                options={[
                                    { value: "New", label: "New - Never ridden" },
                                    { value: "Excellent", label: "Excellent - Like new" },
                                    { value: "Good", label: "Good - Minor wear" },
                                    { value: "Fair", label: "Fair - Visible wear" },
                                    { value: "Poor", label: "Poor - Heavy wear" },
                                    { value: "Needs-Repair", label: "Needs Repair" },
                                    { value: "Under-Repair", label: "Under Repair" }
                                ]}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Last Service Date"}
                                name="last_service_date"
                                required={true}
                                message={"Last Service Date"}
                                allowToday={true}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Last Service Type"}
                                placeholder="Select Last Service Type"
                                name="last_service_type"
                                required={true}
                                message={"Please Select Last Service Type"}
                                options={[
                                    { value: "Full-tune-up", label: "Full tune-up" },
                                    { value: "Brake-adjustment", label: "Brake adjustment" },
                                    { value: "Tire-replacement", label: "Tire replacement" },
                                    { value: "Chain-replacement", label: "Chain replacement" },
                                    { value: "Gear-adjustment", label: "Gear/Shifter adjustment" },
                                    { value: "Wheel-truing", label: "Wheel truing" },
                                    { value: "Battery-service", label: "Battery service (E-bike)" },
                                    { value: "Motor-service", label: "Motor service (E-bike)" },
                                    { value: "General-maintenance", label: "General maintenance" },
                                    { value: "Safety-check", label: "Safety check" },
                                    { value: "other", label: "Other service" }
                                ]}
                            />

                            <FormInput
                                label={"Last Service Odometer"}
                                className="mx-1"
                                name="last_service_odometer"
                                placeholder="e.g., 450 km, 280 miles"
                                required={false}
                                message={"Last Service Odometer (If equipped with cycle computer)"}
                            />

                            <FormInput
                                label={"Next Service Due Date/Mileage"}
                                className="mx-1"
                                name="next_service_due"
                                placeholder="e.g., 2025-03-15 or 800 km"
                                required={true}
                                message={"Next Service Due Date (Or mileage/km)"}
                            />

                            <FormInput
                                label={"Service Interval"}
                                className="mx-1"
                                name="service_interval"
                                placeholder="e.g., 6 months, every 500 km, quarterly"
                                required={true}
                                message={"Service Interval"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                label={"Preferred Service Shop/Mechanic"}
                                className="mx-1"
                                name="preferred_shop"
                                placeholder="e.g., City Cycles, Mike's Bike Repair, John (Mechanic)"
                                required={false}
                                message={"Preferred Service Shop/Mechanic"}
                            />

                            <FormInput
                                label={"Service History Log"}
                                className="mx-1"
                                name="service_history_log"
                                placeholder="e.g., 2024-01-15: Full tune-up ($85), 2024-04-20: Brake pads ($35), 2024-07-10: Chain replacement ($45)"
                                multiline={true}
                                rows={4}
                                required={false}
                                message={"Service History Log (Dates, work done, cost)"}
                            />

                            <FormInput
                                label={"Chain Lubrication Schedule"}
                                className="mx-1"
                                name="chain_lube_schedule"
                                placeholder="e.g., Every 2 weeks, per 150 km, after wet rides"
                                required={true}
                                message={"Chain Lubrication Schedule"}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Brake Pad Replacement Date"}
                                name="brake_pad_replacement_date"
                                required={true}
                                message={"Brake Pad Replacement Date"}
                                allowToday={true}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Battery Health Check Date"}
                                name="battery_health_check_date"
                                required={false}
                                message={"Battery Health Check Date (For e-bikes)"}
                                allowToday={true}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Incidents & Damage</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                label={"Accident/Incident History"}
                                className="mx-1"
                                name="accident_history"
                                placeholder="e.g., 2024-02-15: Fell while turning, scratched derailleur ($65 repair), 2024-07-20: Collision with pole, replaced front wheel ($120)"
                                multiline={true}
                                rows={4}
                                required={false}
                                message={"Accident/Incident History (Date, description, repairs)"}
                            />

                            <FormInput
                                label={"Current Damage/Scratches"}
                                className="mx-1"
                                name="current_damage"
                                placeholder="e.g., Scratch on top tube (3in), Paint chip on fork, Dented rear rack, Photo: damage_cycle_001.jpg"
                                multiline={true}
                                rows={3}
                                required={false}
                                message={"Current Damage/Scratches (Documentation)"}
                            />

                            <FormInput
                                label={"Theft Report Reference"}
                                className="mx-1"
                                name="theft_report"
                                placeholder="e.g., Police case #CR-2024-56789, Date: 2024-08-10, Officer: Martinez"
                                multiline={true}
                                rows={2}
                                required={false}
                                message={"Theft Report Reference (Police case number, date)"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <SelectInput
                                className="mx-1"
                                label={"Stolen/Recovered Status"}
                                placeholder="Select Stolen Status"
                                name="stolen_status"
                                required={false}
                                message={"Please Select Stolen/Recovered Status"}
                                options={[
                                    { value: "Not-Stolen", label: "Not Stolen" },
                                    { value: "Stolen-Reported", label: "Stolen - Reported" },
                                    { value: "Stolen-Under-Investigation", label: "Stolen - Under Investigation" },
                                    { value: "Recovered-Intact", label: "Recovered - Intact" },
                                    { value: "Recovered-Damaged", label: "Recovered - Damaged" },
                                    { value: "Recovered-Parts-Missing", label: "Recovered - Parts Missing" },
                                    { value: "Never-Recovered", label: "Never Recovered" }
                                ]}
                            />

                            <FormInput
                                label={"Vandalism Report"}
                                className="mx-1"
                                name="vandalism_report"
                                placeholder="e.g., 2024-05-22: Slashed tires, bent spokes, Security footage reviewed, Report #SEC-2024-123"
                                multiline={true}
                                rows={3}
                                required={false}
                                message={"Vandalism Report"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Lifecycle & Disposition</h5>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Status"}
                                placeholder="Select Cycle Status"
                                name="bicycle_status"
                                required={true}
                                message={"Please Select Status"}
                                options={[
                                    { value: "Active", label: "Active - In use" },
                                    { value: "In-Repair", label: "In Repair / Maintenance" },
                                    { value: "In-Storage", label: "In Storage" },
                                    { value: "Retired", label: "Retired" },
                                    { value: "Stolen", label: "Stolen" },
                                    { value: "Disposed", label: "Disposed" },
                                    { value: "Under-Assessment", label: "Under Assessment" },
                                    { value: "Pending-Disposal", label: "Pending Disposal" }
                                ]}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Expected Replacement Date"}
                                name="replacement_date"
                                required={false}
                                message={"Expected Replacement Date"}
                                allowToday={true}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Retirement Reason"}
                                placeholder="Select Retirement Reason"
                                name="retirement_reason"
                                required={false}
                                message={"Please Select Retirement Reason"}
                                options={[
                                    { value: "Worn-out", label: "Worn out / End of life" },
                                    { value: "Damaged", label: "Damaged - Beyond repair" },
                                    { value: "Upgrade", label: "Upgrade to newer model" },
                                    { value: "Surplus", label: "Surplus / Excess inventory" },
                                    { value: "Stolen", label: "Stolen - Not recovered" },
                                    { value: "Parts-donor", label: "Parts donor" },
                                    { value: "Fleet-reduction", label: "Fleet reduction" },
                                    { value: "Not-retired", label: "Not retired" }
                                ]}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Disposal Date"}
                                name="disposal_date"
                                required={false}
                                message={"Disposal Date"}
                                allowToday={true}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <SelectInput
                                className="mx-1"
                                label={"Disposal Method"}
                                placeholder="Select Disposal Method"
                                name="disposal_method"
                                required={false}
                                message={"Please Select Disposal Method"}
                                options={[
                                    { value: "Donated", label: "Donated" },
                                    { value: "Sold", label: "Sold" },
                                    { value: "Recycled", label: "Recycled / Scrap" },
                                    { value: "Trade-in", label: "Trade-in" },
                                    { value: "Parts-harvested", label: "Parts harvested" },
                                    { value: "Auction", label: "Auction" },
                                    { value: "Employee-sale", label: "Employee sale" },
                                    { value: "Not-disposed", label: "Not disposed" }
                                ]}
                            />

                            <FormInput
                                label={"Donation Recipient / Buyer"}
                                className="mx-1"
                                name="donation_recipient"
                                placeholder="e.g., Local Bike Co-op, Goodwill, John Smith, Bike Shop"
                                required={false}
                                message={"Donation Recipient / Buyer"}
                            />

                            <FormInput
                                label={"Resale Value Received"}
                                className="mx-1"
                                name="resale_value"
                                placeholder="e.g., $150.00, ₹8,000"
                                required={false}
                                message={"Resale Value Received"}
                            />

                            <FormInput
                                label={"Disposal Certificate"}
                                className="mx-1"
                                name="disposal_certificate"
                                placeholder="e.g., Recycling cert #RC-2024-789, Scrap receipt #SCR-456"
                                required={false}
                                message={"Disposal Certificate (If recycled)"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Documentation & Compliance</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                label={"Owner's Manual Location"}
                                className="mx-1"
                                name="owners_manual_location"
                                placeholder="e.g., Glove compartment, Shared Drive > Bikes"
                                required={true}
                                message={"Owner's Manual Location (Physical or digital link)"}
                            />

                            <FormInput
                                label={"Assembly Instructions Reference"}
                                className="mx-1"
                                name="assembly_instructions"
                                placeholder="e.g., Assembly video: youtu.be/abc123, QR code on frame, Manual page 12-18"
                                required={false}
                                message={"Assembly Instructions Reference"}
                            />

                            <FormInput
                                label={"Proof of Purchase"}
                                className="mx-1"
                                name="proof_of_purchase"
                                placeholder="e.g., Receipt in document safe, PDF attached: receipt_cycle_001.pdf, PO #12345"
                                required={true}
                                message={"Proof of Purchase (Attached)"}
                            />

                            <FormInput
                                label={"Registration with Local Authority"}
                                className="mx-1"
                                name="local_registration"
                                placeholder="e.g., Yes - Reg #BIKE-2024-12345, No - Not registered"
                                required={true}
                                message={"Registration with Local Authority (Yes/No, Registration Number)"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                label={"Safety Certification"}
                                className="mx-1"
                                name="safety_certification"
                                placeholder="e.g., EN 15194 (E-bike), ISO 4210, CPSC compliant"
                                required={false}
                                message={"Safety Certification (EN 15194 for e-bikes, etc.)"}
                            />

                            <FormInput
                                label={"Bike Registration Database ID"}
                                className="mx-1"
                                name="bike_registration_id"
                                placeholder="e.g., BikeIndex: 987654, 529 Garage: ABC-DEF-123, Project 529: 456789"
                                required={false}
                                message={"Bike Registration Database ID (e.g., BikeIndex, 529 Garage)"}
                            />

                            <FormInput
                                label={"Photographs"}
                                className="mx-1"
                                name="photographs"
                                placeholder="e.g., left_view.jpg, right_view.jpg"
                                multiline={true}
                                rows={3}
                                required={true}
                                message={"Photographs (Left, right, front, serial number, damage)"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Administrative</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                label={"Record Created By"}
                                className="mx-1"
                                name="record_created_by"
                                placeholder="Auto-populated with current user"
                                readOnly={true}
                                required={false}
                                message={"Record Created By"}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Record Created Date"}
                                name="record_created_date"
                                readOnly={true}
                                required={false}
                                message={"Record Created Date"}
                                allowToday={true}
                            />

                            <FormInput
                                label={"Last Updated By"}
                                className="mx-1"
                                name="last_updated_by"
                                placeholder="Auto-populated with current user"
                                readOnly={true}
                                required={false}
                                message={"Last Updated By"}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Last Updated Date"}
                                name="last_updated_date"
                                readOnly={true}
                                required={false}
                                message={"Last Updated Date"}
                                allowToday={true}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <CustomDate
                                className="mx-1"
                                label={"Last Physical Inventory Check Date"}
                                name="last_inventory_check"
                                required={true}
                                message={"Last Physical Inventory Check Date"}
                                allowToday={true}
                            />

                            <FormInput
                                label={"Notes/Comments"}
                                className="mx-1"
                                name="notes"
                                placeholder="e.g., Custom gearing setup, Racer feedback: comfortable saddle, Needs softer grips"
                                multiline={true}
                                rows={4}
                                required={false}
                                message={"Notes/Comments (Special configurations, rider feedback)"}
                            />

                            <UploadFile
                                className="mx-1 inputFlexBox"
                                label={"Attachments"}
                                name="attachments"
                                title={"Attachments"}
                                required={true}
                                multiple={false}
                                accept="image/jpeg,image/png"
                                classNameColor={`${style.inputDefaultBg}`}
                                message={"Attachments (Invoices, warranty cards, service receipts, photos)"}
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
export default connect(mapStateToProps, ACTIONS)(Bikecycle);