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


function Car({
    Red_Assets,
    setCode, code,
    pagBody,
    assetsType, setAssetsType,
    getBarCode,
    CreateAssetsFun,
    GetAllBrandsManufacturer,
    GetAllEmpList,
    UpdateAssets,
    GetAllHardware,
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
        setCode({
            mode: null,
            code: null
        })
    };
    const handleCancel = () => {
        setAssetsType(false);
        setCode({
            mode: null,
            code: null
        })
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
            vehicle_type: values?.vehicle_type,
            make_manufacturer: values?.make_manufacturer,
            model: values?.model,
            year: values?.year,
            color: values?.color,
            vin: values?.vin,
            license_plate: values?.license_plate,
            registration_state: values?.registration_state,
            registration_certificate: values?.registration_certificate,
            engine_number: values?.engine_number,
            engine_type: values?.engine_type,
            engine_size: values?.engine_size,
            transmission_type: values?.transmission_type,
            fuel_type: values?.fuel_type,
            fuel_capacity: values?.fuel_capacity,
            odometer_reading: values?.odometer_reading,
            odometer_unit: values?.odometer_unit,
            seating_capacity: values?.seating_capacity,
            cargo_capacity: values?.cargo_capacity,
            gvwr: values?.gvwr,
            vehicle_class: values?.vehicle_class,
            assigned_driver: values?.assigned_driver,
            employee_id_department: values?.employee_id_department,
            assignment_date: values?.assignment_date,
            primary_use: values?.primary_use,
            home_location: values?.home_location,
            authorized_drivers: values?.authorized_drivers,
            usage_restrictions: values?.usage_restrictions,
            tracking_device_id: values?.tracking_device_id,
            po_number: values?.po_number,
            purchased_from: values?.purchased_from,
            purchase_date: values?.purchase_date,
            purchase_price: values?.purchase_price,
            current_market_value: values?.current_market_value,
            lease_rental: values?.lease_rental,
            lease_company: values?.lease_company,
            lease_start_date: values?.lease_start_date,
            lease_end_date: values?.lease_end_date,
            monthly_lease_payment: values?.monthly_lease_payment,
            mileage_allowance: values?.mileage_allowance,
            depreciation_schedule: values?.depreciation_schedule,
            cost_center: values?.cost_center,
            residual_value: values?.residual_value,
            insurance_company: values?.insurance_company,
            policy_number: values?.policy_number,
            insurance_coverage: values?.insurance_coverage,
            insurance_expiry: values?.insurance_expiry,
            premium_amount: values?.premium_amount,
            deductible_amount: values?.deductible_amount,
            insurance_card_location: values?.insurance_card_location,
            registration_expiry: values?.registration_expiry,
            annual_registration_fee: values?.annual_registration_fee,
            emission_test: values?.emission_test,
            safety_inspection: values?.safety_inspection,
            service_center: values?.service_center,
            warranty_type: values?.warranty_type,
            warranty_expiry: values?.warranty_expiry,
            warranty_coverage: values?.warranty_coverage,
            maintenance_interval: values?.maintenance_interval,
            last_service_date: values?.last_service_date,
            last_service_type: values?.last_service_type,
            last_service_odometer: values?.last_service_odometer,
            next_service_due: values?.next_service_due,
            tire_info: values?.tire_info,
            battery_info: values?.battery_info,
            brake_pads: values?.brake_pads,
            fuel_card: values?.fuel_card,
            fuel_efficiency: values?.fuel_efficiency,
            fuel_budget: values?.fuel_budget,
            last_fueling_date: values?.last_fueling_date,
            ev_charger_type: values?.ev_charger_type,
            charger_card_id: values?.charger_card_id,
            m_gtag: values?.m_gtag,
            parking_permit: values?.parking_permit,
            parking_cost: values?.parking_cost,
            safety_equipment: values?.safety_equipment,
            spare_key_location: values?.spare_key_location,
            anti_theft_device: values?.anti_theft_device,
            dash_cam: values?.dash_cam,
            emergency_contact: values?.emergency_contact,
            damage_history: values?.damage_history,
            traffic_violations: values?.traffic_violations,
            theft_reports: values?.theft_reports,
            accident_history: values?.accident_history,
            insurance_claim_history: values?.insurance_claim_history,
            vehicle_status: values?.vehicle_status,
            replacement_date: values?.replacement_date,
            replacement_mileage: values?.replacement_mileage,
            retirement_reason: values?.retirement_reason,
            sold_date: values?.sold_date,
            sold_price: values?.sold_price,
            buyer_info: values?.buyer_info,
            disposal_method: values?.disposal_method,
            owners_manual_location: values?.owners_manual_location,
            service_manual_location: values?.service_manual_location,
            maintenance_log_location: values?.maintenance_log_location,
            vehicle_photos: values?.vehicle_photos,
            compliance_stickers: values?.compliance_stickers,
            dot_requirements: values?.dot_requirements,
            cdl_requirements: values?.cdl_requirements,
            record_created_by: values?.record_created_by,
            record_created_date: values?.record_created_date,
            last_updated_by: values?.last_updated_by,
            last_updated_date: values?.last_updated_date,
            next_review_date: values?.next_review_date,
            notes: values?.notes,
            attachments: values?.attachments
        };
        const payload = {
            asset_tag: values?.asset_tag,
            asset_type: assetsType,
            assign_to: values?.assigned_to,
            field_values: field_values
        };
        if(code?.mode !== "Edit"){
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
                }
                 else if (actionType === 'createNew') {
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
        }else{
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
            const formValues = {
            asset_tag: Data?.asset_tag,
            vehicle_type: values?.vehicle_type,
            make_manufacturer: values?.make_manufacturer,
            model: values?.model,
            year: values?.year ? dayjs(values.year) : null,
            color: values?.color,
            vin: values?.vin,
            license_plate: values?.license_plate,
            registration_state: values?.registration_state,
            registration_certificate: values?.registration_certificate,
            engine_number: values?.engine_number,
            engine_type: values?.engine_type,
            engine_size: values?.engine_size,
            transmission_type: values?.transmission_type,
            fuel_type: values?.fuel_type,
            fuel_capacity: values?.fuel_capacity,
            odometer_reading: values?.odometer_reading,
            odometer_unit: values?.odometer_unit,
            seating_capacity: values?.seating_capacity,
            cargo_capacity: values?.cargo_capacity,
            gvwr: values?.gvwr,
            vehicle_class: values?.vehicle_class,
            assigned_driver: values?.assigned_driver,
            employee_id_department: values?.employee_id_department,
            assignment_date: values?.assignment_date,
            primary_use: values?.primary_use,
            home_location: values?.home_location,
            authorized_drivers: values?.authorized_drivers,
            usage_restrictions: values?.usage_restrictions,
            tracking_device_id: values?.tracking_device_id,
            po_number: values?.po_number,
            purchased_from: values?.purchased_from,
            purchase_date: values?.purchase_date ? dayjs(values.purchase_date) : null,
            purchase_price: values?.purchase_price,
            current_market_value: values?.current_market_value,
            lease_rental: values?.lease_rental,
            lease_company: values?.lease_company,
            lease_start_date: values?.lease_start_date ? dayjs(values.lease_start_date) : null,
            lease_end_date: values?.lease_end_date ? dayjs(values.lease_end_date) : null,
            monthly_lease_payment: values?.monthly_lease_payment,
            mileage_allowance: values?.mileage_allowance,
            depreciation_schedule: values?.depreciation_schedule,
            cost_center: values?.cost_center,
            residual_value: values?.residual_value,
            insurance_company: values?.insurance_company,
            policy_number: values?.policy_number,
            insurance_coverage: values?.insurance_coverage,
            insurance_expiry: values?.insurance_expiry ? dayjs(values.insurance_expiry) : null,
            premium_amount: values?.premium_amount,
            deductible_amount: values?.deductible_amount,
            insurance_card_location: values?.insurance_card_location,
            registration_expiry: values?.registration_expiry ? dayjs(values.registration_expiry) : null,
            annual_registration_fee: values?.annual_registration_fee,
            emission_test: values?.emission_test,
            safety_inspection: values?.safety_inspection,
            service_center: values?.service_center,
            warranty_type: values?.warranty_type,
            warranty_expiry: values?.warranty_expiry,
            warranty_coverage: values?.warranty_coverage,
            maintenance_interval: values?.maintenance_interval,
            last_service_date: values?.last_service_date ? dayjs(values.last_service_date) : null,
            last_service_type: values?.last_service_type,
            last_service_odometer: values?.last_service_odometer,
            next_service_due: values?.next_service_due,
            tire_info: values?.tire_info,
            battery_info: values?.battery_info,
            brake_pads: values?.brake_pads,
            fuel_card: values?.fuel_card,
            fuel_efficiency: values?.fuel_efficiency,
            fuel_budget: values?.fuel_budget,
            last_fueling_date: values?.last_fueling_date ? dayjs(values.last_fueling_date) : null,
            ev_charger_type: values?.ev_charger_type,
            charger_card_id: values?.charger_card_id,
            m_gtag: values?.m_gtag,
            parking_permit: values?.parking_permit,
            parking_cost: values?.parking_cost,
            safety_equipment: values?.safety_equipment,
            spare_key_location: values?.spare_key_location,
            anti_theft_device: values?.anti_theft_device,
            dash_cam: values?.dash_cam,
            emergency_contact: values?.emergency_contact,
            damage_history: values?.damage_history,
            traffic_violations: values?.traffic_violations,
            theft_reports: values?.theft_reports,
            accident_history: values?.accident_history,
            insurance_claim_history: values?.insurance_claim_history,
            vehicle_status: values?.vehicle_status,
            replacement_date: values?.replacement_date ? dayjs(values.replacement_date) : null,
            replacement_mileage: values?.replacement_mileage,
            retirement_reason: values?.retirement_reason,
            sold_date: values?.sold_date ? dayjs(values.sold_date) : null,
            sold_price: values?.sold_price,
            buyer_info: values?.buyer_info,
            disposal_method: values?.disposal_method,
            owners_manual_location: values?.owners_manual_location,
            service_manual_location: values?.service_manual_location,
            maintenance_log_location: values?.maintenance_log_location,
            vehicle_photos: values?.vehicle_photos,
            compliance_stickers: values?.compliance_stickers,
            dot_requirements: values?.dot_requirements,
            cdl_requirements: values?.cdl_requirements,
            record_created_by: values?.record_created_by,
            record_created_date: values?.record_created_date ? dayjs(values.record_created_date) : null,
            last_updated_by: values?.last_updated_by,
            last_updated_date: values?.last_updated_date ? dayjs(values.last_updated_date) : null,
            next_review_date: values?.next_review_date ? dayjs(values.next_review_date) : null,
            notes: values?.notes,
            attachments: values?.attachments
        };
        
        form.setFieldsValue(formValues);
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
                            <h5 className="mx-1">Car Asset Form</h5>
                            <QRCODE
                                value={
                                    code?.mode === "Edit" ? EditAssetsData?.asset_tag : barcode
                                }
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Vehicle Identification</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                className="mx-1"
                                label={"Assets Tag/ID"}
                                name="asset_tag"
                                type={"text"}
                                placeholder="Assets Tag/ID"
                                required={false}
                                readOnly={true}
                                message={"Please Enter a ID"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Vehicle Type"}
                                placeholder="Select Vehicle Type"
                                name="vehicle_type"
                                required={true}
                                message={"Please Select Vehicle Type"}
                                options={[
                                    { value: "Sedan", label: "Sedan" },
                                    { value: "SUV", label: "SUV" },
                                    { value: "Truck", label: "Truck" },
                                    { value: "Van", label: "Van" },
                                    { value: "Pickup-Truck", label: "Pickup Truck" },
                                    { value: "Forklift", label: "Forklift" },
                                    { value: "Golf-Cart", label: "Golf Cart" },
                                    { value: "Motorcycle", label: "Motorcycle" },
                                    { value: "Bus", label: "Bus" },
                                    { value: "Trailer", label: "Trailer" },
                                    { value: "Heavy-Equipment", label: "Heavy Equipment" },
                                    { value: "Special-Equipment", label: "Special Equipment" },
                                    { value: "other", label: "Other" }
                                ]}
                            />

                            <FormInput
                                label={"Make/Manufacturer"}
                                className="mx-1"
                                name="make_manufacturer"
                                placeholder="e.g., Toyota, Ford, Honda, Caterpillar"
                                required={true}
                                message={"Make/Manufacturer"}
                            />

                            <FormInput
                                label={"Model"}
                                className="mx-1"
                                name="model"
                                placeholder="e.g., Camry, F-150, Civic, XG100"
                                required={true}
                                message={"Model"}
                            />

                            <Year
                                label={"Year"}
                                className={`mx-1`}
                                name="year"
                                message={"Year"}
                                required={true}
                            />

                            <FormInput
                                label={"Color"}
                                className="mx-1"
                                name="color"
                                placeholder="e.g., Red, Blue, White, Black"
                                required={true}
                                message={"Color"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                label={"Vehicle Identification Number (VIN)"}
                                className="mx-1"
                                name="vin"
                                placeholder="e.g., 1HGCM82633A123456"
                                required={true}
                                message={"Vehicle Identification Number (VIN)"}
                            />

                            <FormInput
                                label={"License Plate Number"}
                                className="mx-1"
                                name="license_plate"
                                placeholder="e.g., ABC1234, XYZ-789"
                                required={true}
                                message={"License Plate Number"}
                            />

                            <FormInput
                                label={"Registration State/Province"}
                                className="mx-1"
                                name="registration_state"
                                placeholder="e.g., CA, Texas, Ontario"
                                required={true}
                                message={"Registration State/Province"}
                            />

                            <FormInput
                                label={"Registration Certificate Number"}
                                className="mx-1"
                                name="registration_certificate"
                                placeholder="e.g., RC-123456789"
                                required={true}
                                message={"Registration Certificate Number"}
                            />

                            <FormInput
                                label={"Engine Number"}
                                className="mx-1"
                                name="engine_number"
                                placeholder="e.g., ENG123456789, M1234567"
                                required={true}
                                message={"Engine Number (For motorcycles/older vehicles)"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Vehicle Specifications</h5>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Engine Type"}
                                placeholder="Select Engine Type"
                                name="engine_type"
                                required={false}
                                message={"Please Select Engine Type"}
                                options={[
                                    { value: "Gasoline", label: "Gasoline" },
                                    { value: "Diesel", label: "Diesel" },
                                    { value: "Electric", label: "Electric" },
                                    { value: "Hybrid", label: "Hybrid" },
                                    { value: "Plug-in-Hybrid", label: "Plug-in Hybrid" },
                                    { value: "CNG", label: "Compressed Natural Gas (CNG)" },
                                    { value: "LPG", label: "Liquefied Petroleum Gas (LPG)" },
                                    { value: "Hydrogen", label: "Hydrogen Fuel Cell" },
                                    { value: "other", label: "Other" }
                                ]}
                            />

                            <FormInput
                                label={"Engine Size/Displacement"}
                                className="mx-1"
                                name="engine_size"
                                placeholder="e.g., 2.0L, 3000cc, 150kW"
                                required={false}
                                message={"Engine Size/Displacement"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Transmission Type"}
                                placeholder="Select Transmission Type"
                                name="transmission_type"
                                required={false}
                                message={"Please Select Transmission Type"}
                                options={[
                                    { value: "Automatic", label: "Automatic" },
                                    { value: "Manual", label: "Manual" },
                                    { value: "CVT", label: "Continuously Variable (CVT)" },
                                    { value: "Semi-Automatic", label: "Semi-Automatic" },
                                    { value: "Dual-Clutch", label: "Dual Clutch" },
                                    { value: "Direct-Drive", label: "Direct Drive (Electric)" }
                                ]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Fuel Type"}
                                placeholder="Select Fuel Type"
                                name="fuel_type"
                                required={false}
                                message={"Please Select Fuel Type"}
                                options={[
                                    { value: "Regular", label: "Regular Unleaded" },
                                    { value: "Premium", label: "Premium Unleaded" },
                                    { value: "Diesel", label: "Diesel" },
                                    { value: "Electric", label: "Electric" },
                                    { value: "CNG", label: "Compressed Natural Gas" },
                                    { value: "LPG", label: "Liquefied Petroleum Gas" },
                                    { value: "Hybrid", label: "Hybrid (Gasoline+Electric)" },
                                    { value: "other", label: "Other" }
                                ]}
                            />

                            <FormInput
                                label={"Fuel Tank/Battery Capacity"}
                                className="mx-1"
                                name="fuel_capacity"
                                placeholder="e.g., 60L, 18 gallons, 75kWh battery"
                                required={false}
                                message={"Fuel Tank/Battery Capacity"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                label={"Odometer Reading (Current)"}
                                className="mx-1"
                                name="odometer_reading"
                                placeholder="e.g., 45000"
                                type="number"
                                min="0"
                                required={false}
                                message={"Odometer Reading (Current)"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Odometer Unit"}
                                placeholder="Select Odometer Unit"
                                name="odometer_unit"
                                required={false}
                                message={"Please Select Odometer Unit"}
                                options={[
                                    { value: "Miles", label: "Miles" },
                                    { value: "Kilometers", label: "Kilometers" },
                                    { value: "Hours", label: "Hours (for equipment)" }
                                ]}
                            />

                            <FormInput
                                label={"Seating Capacity"}
                                className="mx-1"
                                name="seating_capacity"
                                placeholder="e.g., 5, 7, 15"
                                type="number"
                                min="1"
                                required={false}
                                message={"Seating Capacity"}
                            />

                            <FormInput
                                label={"Cargo Capacity"}
                                className="mx-1"
                                name="cargo_capacity"
                                placeholder="e.g., 500L, 15 cu ft, 1000 kg"
                                required={false}
                                message={"Cargo Capacity"}
                            />

                            <FormInput
                                label={"Gross Vehicle Weight Rating"}
                                className="mx-1"
                                name="gvwr"
                                placeholder="e.g., 2500 kg, 5500 lbs"
                                required={false}
                                message={"Gross Vehicle Weight Rating"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Vehicle Class"}
                                placeholder="Select Vehicle Class"
                                name="vehicle_class"
                                required={false}
                                message={"Please Select Vehicle Class"}
                                options={[
                                    { value: "Compact", label: "Compact" },
                                    { value: "Midsize", label: "Midsize" },
                                    { value: "Full-size", label: "Full-size" },
                                    { value: "SUV", label: "SUV" },
                                    { value: "Minivan", label: "Minivan" },
                                    { value: "Pickup", label: "Pickup Truck" },
                                    { value: "Heavy-Duty", label: "Heavy Duty" },
                                    { value: "Commercial", label: "Commercial" },
                                    { value: "Luxury", label: "Luxury" },
                                    { value: "Sports", label: "Sports" },
                                    { value: "Off-road", label: "Off-road" }
                                ]}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Assignment & Usage</h5>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Assigned Driver/Rider"}
                                placeholder="assigned_driver"
                                name="assigned_to"
                                required={false}
                                message={"Assigned Driver/Rider"}
                                options={users?.map((item) => ({
                                    value: item.id,
                                        label: `${item.name || ''} - ${item.email || ''}` 
                                }))}
                            />

                            <FormInput
                                label={"Employee ID/Department"}
                                className="mx-1"
                                name="employee_id_department"
                                placeholder="e.g., EMP12345, Sales Department"
                                required={false}
                                message={"Employee ID/Department"}
                            />

                            <CustomDate
                                label={"Assignment Date"}
                                className={`mx-1`}
                                name="assignment_date"
                                placeholder={"Assignment Date"}
                                message={"Assignment Date"}
                                required={false}
                                allowToday={true}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Primary Use"}
                                placeholder="Select Primary Use"
                                name="primary_use"
                                required={false}
                                message={"Please Select Primary Use"}
                                options={[
                                    { value: "Business-Travel", label: "Business Travel" },
                                    { value: "Sales-Route", label: "Sales Route" },
                                    { value: "Delivery", label: "Delivery" },
                                    { value: "Executive-Transport", label: "Executive Transport" },
                                    { value: "Pool-Vehicle", label: "Pool Vehicle" },
                                    { value: "Maintenance", label: "Maintenance" },
                                    { value: "Security-Patrol", label: "Security Patrol" },
                                    { value: "Shuttle-Service", label: "Shuttle Service" },
                                    { value: "Construction-Site", label: "Construction Site" },
                                    { value: "Warehouse-Operations", label: "Warehouse Operations" },
                                    { value: "Emergency-Response", label: "Emergency Response" },
                                    { value: "Rental", label: "Rental/Lease" },
                                    { value: "other", label: "Other" }
                                ]}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                label={"Home Location/Parking Spot"}
                                className="mx-1"
                                name="home_location"
                                placeholder="e.g., HQ Parking Garage, Spot B-12, 123 Main St"
                                required={false}
                                message={"Home Location/Parking Spot"}
                            />

                            <FormInput
                                label={"Authorized Drivers List"}
                                className="mx-1"
                                name="authorized_drivers"
                                placeholder="e.g., John Smith, Lisa Wong, Robert Chen"
                                multiline={true}
                                rows={3}
                                required={false}
                                message={"Authorized Drivers List (Multiple employees if applicable)"}
                            />

                            <FormInput
                                label={"Usage Restrictions"}
                                className="mx-1"
                                name="usage_restrictions"
                                placeholder="e.g., Business hours only, Local area only, No personal use"
                                multiline={true}
                                rows={3}
                                required={false}
                                message={"Usage Restrictions"}
                            />

                            <FormInput
                                label={"Tracking Device ID"}
                                className="mx-1"
                                name="tracking_device_id"
                                placeholder="e.g., GPS-123456, Fleet-Track-789"
                                required={false}
                                message={"Tracking Device ID (If GPS tracked)"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Financial & Procurement</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                label={"Purchase Order Number"}
                                className="mx-1"
                                name="po_number"
                                placeholder="e.g., PO-VEH-2024-001, PUR-789123"
                                required={false}
                                message={"Purchase Order Number"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Purchased From"}
                                placeholder="Select Purchase Source"
                                name="purchased_from"
                                required={false}
                                message={"Please Select Purchase Source"}
                                options={[
                                    { value: "Dealership", label: "Dealership" },
                                    { value: "Auction", label: "Auction" },
                                    { value: "Private-Sale", label: "Private Sale" },
                                    { value: "Fleet-Vendor", label: "Fleet Vendor" },
                                    { value: "Government-Surplus", label: "Government Surplus" },
                                    { value: "Online-Marketplace", label: "Online Marketplace" },
                                    { value: "Manufacturer-Direct", label: "Manufacturer Direct" },
                                    { value: "Lease-Company", label: "Lease Company" },
                                    { value: "other", label: "Other" }
                                ]}
                            />

                            <CustomDate
                                label={"Purchase Date"}
                                className={`mx-1`}
                                name="purchase_date"
                                placeholder={"Purchase Date"}
                                message={"Purchase Date"}
                                required={false}
                                allowToday={true}
                            />

                            <FormInput
                                label={"Purchase Price"}
                                className="mx-1"
                                name="purchase_price"
                                placeholder="e.g., $25,000.00"
                                required={false}
                                message={"Purchase Price"}
                            />

                            <FormInput
                                label={"Current Market Value"}
                                className="mx-1"
                                name="current_market_value"
                                placeholder="e.g., $18,500.00"
                                required={false}
                                message={"Current Market Value"}
                            />
                        </div>
                        <div className={`${style.form_inputBox}`}>
                            <SelectInput
                                className="mx-1"
                                label={"Lease/Rental"}
                                placeholder="Select Lease Status"
                                name="lease_rental"
                                required={false}
                                message={"Please Select Lease Status"}
                                options={[
                                    { value: "Yes", label: "Yes" },
                                    { value: "No", label: "No" },
                                    { value: "Rental", label: "Rental" },
                                    { value: "Finance", label: "Financed" }
                                ]}
                            />

                            <FormInput
                                label={"Lease Company"}
                                className="mx-1"
                                name="lease_company"
                                placeholder="e.g., Enterprise Fleet, Wheels Inc, LeasePlan"
                                required={false}
                                message={"Lease Company (If applicable)"}
                            />

                            <CustomDate
                                label={"Lease Start Date"}
                                className={`mx-1`}
                                name="lease_start_date"
                                placeholder="e.g., 2024-01-15 to 2027-01-14"
                                message={"Lease Start Date"}
                                required={false}
                                allowToday={true}
                            />

                            <CustomDate
                                label={"Lease End Date"}
                                className={`mx-1`}
                                name="lease_end_date"
                                placeholder="e.g., 2024-01-15 to 2027-01-14"
                                message={"Lease End Date"}
                                required={false}
                                allowToday={true}
                            />

                            <FormInput
                                label={"Monthly Lease Payment"}
                                className="mx-1"
                                name="monthly_lease_payment"
                                placeholder="e.g., $450.00 per month"
                                required={false}
                                message={"Monthly Lease Payment"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                label={"Mileage Allowance"}
                                className="mx-1"
                                name="mileage_allowance"
                                placeholder="e.g., 12,000 miles/year, Unlimited"
                                required={false}
                                message={"Mileage Allowance (If leased)"}
                            />

                            <FormInput
                                label={"Depreciation Schedule"}
                                className="mx-1"
                                name="depreciation_schedule"
                                placeholder="e.g., 20% per year, 5-year straight line"
                                required={false}
                                message={"Depreciation Schedule"}
                            />

                            <FormInput
                                label={"Cost Center/Department Budget"}
                                className="mx-1"
                                name="cost_center"
                                placeholder="e.g., Sales-Fleet-Budget, OPS-Vehicle-001"
                                required={false}
                                message={"Cost Center/Department Budget"}
                            />

                            <FormInput
                                label={"Residual Value"}
                                className="mx-1"
                                name="residual_value"
                                placeholder="e.g., $12,000.00, 40% of purchase price"
                                required={false}
                                message={"Residual Value (Expected at end of lease)"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Registration & Insurance</h5>
                        <div className={`${style.form_inputBox}`}>
                            <FormInput
                                label={"Insurance Company"}
                                className="mx-1"
                                name="insurance_company"
                                placeholder="e.g., State Farm, Allstate, Geico, Progressive"
                                required={false}
                                message={"Insurance Company"}
                            />

                            <FormInput
                                label={"Policy Number"}
                                className="mx-1"
                                name="policy_number"
                                placeholder="e.g., POL123456789, SF-7890-1234"
                                required={false}
                                message={"Policy Number"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Insurance Type/Coverage"}
                                placeholder="Select Insurance Coverage"
                                name="insurance_coverage"
                                required={false}
                                message={"Please Select Insurance Coverage"}
                                options={[
                                    { value: "Comprehensive", label: "Comprehensive" },
                                    { value: "Third-Party", label: "Third Party Liability" },
                                    { value: "Collision", label: "Collision" },
                                    { value: "Liability", label: "Liability Only" },
                                    { value: "Full-Coverage", label: "Full Coverage" },
                                    { value: "Commercial-Auto", label: "Commercial Auto" },
                                    { value: "Fleet-Insurance", label: "Fleet Insurance" },
                                    { value: "Cargo-Insurance", label: "Cargo Insurance" },
                                    { value: "Uninsured-Motorist", label: "Uninsured Motorist" },
                                    { value: "Personal-Injury", label: "Personal Injury Protection" },
                                    { value: "No-Insurance", label: "No Insurance" }
                                ]}
                            />

                            <CustomDate
                                label={"Insurance Expiry Date"}
                                className={`mx-1`}
                                name="insurance_expiry"
                                placeholder={"Insurance Expiry Date"}
                                message={"Insurance Expiry Date"}
                                required={false}
                                allowToday={true}
                            />

                            <FormInput
                                label={"Premium Amount"}
                                className="mx-1"
                                name="premium_amount"
                                placeholder="e.g., $1,200.00 annually, $100/month"
                                required={false}
                                message={"Premium Amount"}
                            />

                            <FormInput
                                label={"Deductible Amount"}
                                className="mx-1"
                                name="deductible_amount"
                                placeholder="e.g., $500, $1,000"
                                required={false}
                                message={"Deductible Amount"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                label={"Insurance Card Location"}
                                className="mx-1"
                                name="insurance_card_location"
                                placeholder="e.g., Glove compartment, Digital copy, Office file"
                                required={false}
                                message={"Insurance Card Location"}
                            />

                            <CustomDate
                                label={"Registration Expiry Date"}
                                className={`mx-1`}
                                name="registration_expiry"
                                placeholder={"Registration Expiry Date"}
                                message={"Registration Expiry Date"}
                                required={false}
                                allowToday={true}
                            />

                            <FormInput
                                label={"Annual Registration Fee"}
                                className="mx-1"
                                name="annual_registration_fee"
                                placeholder="e.g., $150.00, $75/year"
                                required={false}
                                message={"Annual Registration Fee"}
                            />

                            <FormInput
                                label={"Emission Test/Certificate"}
                                className="mx-1"
                                name="emission_test"
                                placeholder="Expiry: YYYY-MM-DD, Certificate: SMG-12345"
                                required={false}
                                message={"Emission Test/Certificate (Expiry date)"}
                            />

                            <FormInput
                                label={"Safety Inspection Certificate"}
                                className="mx-1"
                                name="safety_inspection"
                                placeholder="Expiry: YYYY-MM-DD, Certificate: SIC-67890"
                                required={false}
                                message={"Safety Inspection Certificate (Expiry date)"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Maintenance & Service</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                label={"Preferred Service Center/Dealer"}
                                className="mx-1"
                                name="service_center"
                                placeholder="e.g., Toyota Service Center, Jiffy Lube #123"
                                required={false}
                                message={"Preferred Service Center/Dealer"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Warranty Type"}
                                placeholder="Select Warranty Type"
                                name="warranty_type"
                                required={false}
                                message={"Please Select Warranty Type"}
                                options={[
                                    { value: "Manufacturer", label: "Manufacturer Warranty" },
                                    { value: "Extended", label: "Extended Warranty" },
                                    { value: "Certified-Pre-Owned", label: "Certified Pre-Owned" },
                                    { value: "Powertrain", label: "Powertrain Warranty" },
                                    { value: "Bumper-to-Bumper", label: "Bumper-to-Bumper" },
                                    { value: "No-Warranty", label: "No Warranty" }
                                ]}
                            />

                            <FormInput
                                label={"Warranty Expiry Date/Mileage"}
                                className="mx-1"
                                name="warranty_expiry"
                                placeholder="e.g., 2026-12-31 or 60,000 miles"
                                required={false}
                                message={"Warranty Expiry Date/Mileage"}
                            />

                            <FormInput
                                label={"Warranty Coverage Details"}
                                className="mx-1"
                                name="warranty_coverage"
                                placeholder="e.g., Covers engine, transmission, electronics"
                                multiline={true}
                                rows={3}
                                required={false}
                                message={"Warranty Coverage Details"}
                            />

                            <FormInput
                                label={"Maintenance Schedule Interval"}
                                className="mx-1"
                                name="maintenance_interval"
                                placeholder="e.g., Every 5,000 miles or 6 months"
                                required={false}
                                message={"Maintenance Schedule Interval"}
                            />

                            <CustomDate
                                label={"Last Service Date"}
                                className={`mx-1`}
                                name="last_service_date"
                                placeholder={"Last Service Date"}
                                message={"Last Service Date"}
                                required={false}
                                allowToday={true}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <SelectInput
                                className="mx-1"
                                label={"Last Service Type"}
                                placeholder="Select Service Type"
                                name="last_service_type"
                                required={false}
                                message={"Please Select Last Service Type"}
                                options={[
                                    { value: "Oil-Change", label: "Oil Change" },
                                    { value: "Tire-Rotation", label: "Tire Rotation" },
                                    { value: "Brake-Service", label: "Brake Service" },
                                    { value: "Battery-Replacement", label: "Battery Replacement" },
                                    { value: "Tire-Replacement", label: "Tire Replacement" },
                                    { value: "General-Maintenance", label: "General Maintenance" },
                                    { value: "Major-Service", label: "Major Service" },
                                    { value: "Transmission-Service", label: "Transmission Service" },
                                    { value: "Coolant-Flush", label: "Coolant Flush" },
                                    { value: "Air-Filter-Replacement", label: "Air Filter Replacement" },
                                    { value: "Wheel-Alignment", label: "Wheel Alignment" },
                                    { value: "other", label: "Other Service" }
                                ]}
                            />

                            <FormInput
                                label={"Last Service Odometer"}
                                className="mx-1"
                                name="last_service_odometer"
                                placeholder="e.g., 45,250 miles"
                                required={false}
                                message={"Last Service Odometer"}
                            />

                            <FormInput
                                label={"Next Service Due Date/Mileage"}
                                className="mx-1"
                                name="next_service_due"
                                placeholder="e.g., 2024-06-15 or 50,000 miles"
                                required={false}
                                message={"Next Service Due Date/Mileage"}
                            />

                            <FormInput
                                label={"Tire Information"}
                                className="mx-1"
                                name="tire_info"
                                placeholder="e.g., Size: 225/65R17, Brand: Michelin, Tread: 6mm, Changed: 2023-08-10"
                                multiline={true}
                                rows={3}
                                required={false}
                                message={"Tire Information"}
                            />

                            <FormInput
                                label={"Battery Information"}
                                className="mx-1"
                                name="battery_info"
                                placeholder="e.g., Type: AGM 12V, Installed: 2023-05-15, Warranty: 3 years"
                                required={false}
                                message={"Battery Information"}
                            />

                            <FormInput
                                label={"Brake Pad Last Changed"}
                                className="mx-1"
                                name="brake_pads"
                                placeholder="e.g., Front: 2023-10-20 at 40,000 miles, Rear: 2024-01-15"
                                required={false}
                                message={"Brake Pad Last Changed"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Fuel & Operational Costs</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                label={"Fuel Card/Account Number"}
                                className="mx-1"
                                name="fuel_card"
                                placeholder="e.g., FC-123456, Account: XYZ789"
                                required={false}
                                message={"Fuel Card/Account Number"}
                            />

                            <FormInput
                                label={"Average Fuel Efficiency"}
                                className="mx-1"
                                name="fuel_efficiency"
                                placeholder="e.g., 25 MPG, 9.4 L/100km"
                                required={false}
                                message={"Average Fuel Efficiency (MPG or L/100km)"}
                            />

                            <FormInput
                                label={"Monthly Fuel Budget/Cost"}
                                className="mx-1"
                                name="fuel_budget"
                                placeholder="e.g., $300/month, Budget: $2,500/year"
                                required={false}
                                message={"Monthly Fuel Budget/Cost"}
                            />

                            <CustomDate
                                label={"Last Fueling Date"}
                                className={`mx-1`}
                                name="last_fueling_date"
                                placeholder={"Last Fueling Date"}
                                message={"Last Fueling Date"}
                                required={false}
                                allowToday={true}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Electric Vehicle Charger Type"}
                                placeholder="Select Charger Type"
                                name="ev_charger_type"
                                required={false}
                                message={"Please Select Charger Type"}
                                options={[
                                    { value: "Level-1", label: "Level 1 (120V)" },
                                    { value: "Level-2", label: "Level 2 (240V)" },
                                    { value: "DC-Fast", label: "DC Fast Charger" },
                                    { value: "Tesla-Supercharger", label: "Tesla Supercharger" },
                                    { value: "Not-EV", label: "Not an Electric Vehicle" },
                                    { value: "Hybrid-Only", label: "Hybrid (No external charging)" }
                                ]}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                label={"Charging Station Access Card ID"}
                                className="mx-1"
                                name="charger_card_id"
                                placeholder="e.g., EV-CARD-789, ChargePoint: CP1234"
                                required={false}
                                message={"Charging Station Access Card ID"}
                            />

                            <FormInput
                                label={"M-GTag"}
                                className="mx-1"
                                name="m_gtag"
                                placeholder="e.g., E-ZPass: 123456789, TollTag: TT-7890"
                                required={false}
                                message={"M-GTag"}
                            />

                            <FormInput
                                label={"Parking Permit Number"}
                                className="mx-1"
                                name="parking_permit"
                                placeholder="e.g., PARK-2024-001, Permit: A-123"
                                required={false}
                                message={"Parking Permit Number"}
                            />

                            <FormInput
                                label={"Monthly Parking Cost"}
                                className="mx-1"
                                name="parking_cost"
                                placeholder="e.g., $150/month, $1,800/year"
                                required={false}
                                message={"Monthly Parking Cost"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Safety & Equipment</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                label={"Safety Equipment Check"}
                                className="mx-1"
                                name="safety_equipment"
                                placeholder="e.g., First aid kit: Yes, Fire extinguisher: Yes, Warning triangles: Yes"
                                multiline={true}
                                rows={3}
                                required={false}
                                message={"Safety Equipment Check"}
                            />

                            <FormInput
                                label={"Spare Key Location"}
                                className="mx-1"
                                name="spare_key_location"
                                placeholder="e.g., Office safe, Manager's drawer, Home key box"
                                required={false}
                                message={"Spare Key Location"}
                            />

                            <FormInput
                                label={"Anti-Theft Device"}
                                className="mx-1"
                                name="anti_theft_device"
                                placeholder="e.g., GPS tracker, Steering wheel lock, Alarm system"
                                multiline={true}
                                rows={2}
                                required={false}
                                message={"Anti-Theft Device (Details)"}
                            />
                        </div>

                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <SelectInput
                                className="mx-1"
                                label={"Dash Cam Installed"}
                                placeholder="Select Dash Cam Status"
                                name="dash_cam"
                                required={false}
                                message={"Please Select Dash Cam Status"}
                                options={[
                                    { value: "Yes", label: "Yes" },
                                    { value: "No", label: "No" },
                                    { value: "Front-Only", label: "Front Camera Only" },
                                    { value: "Front-Rear", label: "Front and Rear Cameras" },
                                    { value: "360-Degree", label: "360-Degree Camera" },
                                    { value: "GPS-Enabled", label: "GPS Enabled Dash Cam" }
                                ]}
                            />

                            <FormInput
                                label={"Emergency Contact Information"}
                                className="mx-1"
                                name="emergency_contact"
                                placeholder="e.g., Company: 555-0123, Fleet Manager: John Doe - 555-0456"
                                multiline={true}
                                rows={3}
                                required={false}
                                message={"Emergency Contact Information (In vehicle)"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Accidents & Incidents</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                label={"Current Damage/Scratches"}
                                className="mx-1"
                                name="damage_history"
                                placeholder="e.g., Scratch on right rear bumper, Dent on driver door, Photo: damage_001.jpg"
                                multiline={true}
                                rows={4}
                                required={false}
                                message={"Current Damage/Scratches (Documentation)"}
                            />

                            <FormInput
                                label={"Traffic Violations/Fines"}
                                className="mx-1"
                                name="traffic_violations"
                                placeholder="e.g., Speeding ticket: 01/15/2024 - $150, Parking fine: 03/10/2024 - $75"
                                multiline={true}
                                rows={3}
                                required={false}
                                message={"Traffic Violations/Fines (Record)"}
                            />

                            <FormInput
                                label={"Theft/Vandalism Reports"}
                                className="mx-1"
                                name="theft_reports"
                                placeholder="e.g., Broken window incident: 02/20/2024, Police report: PR-789123"
                                multiline={true}
                                rows={3}
                                required={false}
                                message={"Theft/Vandalism Reports"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                label={"Accident History"}
                                className="mx-1"
                                name="accident_history"
                                placeholder="e.g., Minor collision: 12/05/2023, Rear-ended at stoplight, Repair: $2,500"
                                multiline={true}
                                rows={4}
                                required={false}
                                message={"Accident History (Date, description, repair cost)"}
                            />

                            <FormInput
                                label={"Insurance Claim History"}
                                className="mx-1"
                                name="insurance_claim_history"
                                placeholder="e.g., Claim #CL-2023-456: $3,200 for accident repair, Deductible: $500"
                                multiline={true}
                                rows={4}
                                required={false}
                                message={"Insurance Claim History"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Lifecycle Management</h5>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Status"}
                                placeholder="Select Vehicle Status"
                                name="vehicle_status"
                                required={false}
                                message={"Please Select Vehicle Status"}
                                options={[
                                    { value: "Active", label: "Active" },
                                    { value: "In-Maintenance", label: "In Maintenance" },
                                    { value: "In-Accident-Repair", label: "In Accident Repair" },
                                    { value: "Retired", label: "Retired" },
                                    { value: "Sold", label: "Sold" },
                                    { value: "Stored", label: "Stored/Inactive" },
                                    { value: "For-Sale", label: "For Sale" },
                                    { value: "Writen-Off", label: "Written Off" },
                                    { value: "Stolen", label: "Stolen" }
                                ]}
                            />

                            <CustomDate
                                label={"Expected Replacement Date"}
                                className={`mx-1`}
                                name="replacement_date"
                                placeholder={"Expected Replacement Date"}
                                message={"Expected Replacement Date"}
                                required={false}
                                allowToday={true}
                            />

                            <FormInput
                                label={"Expected Replacement Mileage"}
                                className="mx-1"
                                name="replacement_mileage"
                                placeholder="e.g., 100,000 miles, 160,000 km"
                                required={false}
                                message={"Expected Replacement Mileage"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Retirement Reason"}
                                placeholder="Select Retirement Reason"
                                name="retirement_reason"
                                required={false}
                                message={"Please Select Retirement Reason"}
                                options={[
                                    { value: "Age", label: "Age of Vehicle" },
                                    { value: "Mileage", label: "High Mileage" },
                                    { value: "Excessive-Repairs", label: "Excessive Repair Costs" },
                                    { value: "Accident", label: "Accident Damage" },
                                    { value: "Mechanical-Failure", label: "Mechanical Failure" },
                                    { value: "Fleet-Upgrade", label: "Fleet Upgrade/Modernization" },
                                    { value: "Cost-Reduction", label: "Cost Reduction" },
                                    { value: "Environmental", label: "Environmental/Emission Reasons" },
                                    { value: "Company-Policy", label: "Company Policy" },
                                    { value: "Not-Retired", label: "Not Retired" }
                                ]}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <CustomDate
                                label={"Sold Date"}
                                className={`mx-1`}
                                name="sold_date"
                                placeholder={"Sold Date"}
                                message={"Sold Date"}
                                required={false}
                                allowToday={true}
                            />

                            <FormInput
                                label={"Sold Price"}
                                className="mx-1"
                                name="sold_price"
                                placeholder="e.g., $8,500.00, Trade-in value: $7,000"
                                required={false}
                                message={"Sold Price"}
                            />

                            <FormInput
                                label={"Buyer Information"}
                                className="mx-1"
                                name="buyer_info"
                                placeholder="e.g., John Smith, 555-0123, john@email.com"
                                multiline={true}
                                rows={2}
                                required={false}
                                message={"Buyer Information"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Disposal Method"}
                                placeholder="Select Disposal Method"
                                name="disposal_method"
                                required={false}
                                message={"Please Select Disposal Method"}
                                options={[
                                    { value: "Auction", label: "Auction" },
                                    { value: "Trade-In", label: "Trade-In" },
                                    { value: "Donation", label: "Donation" },
                                    { value: "Scrap", label: "Scrap/Recycle" },
                                    { value: "Private-Sale", label: "Private Sale" },
                                    { value: "Employee-Sale", label: "Employee Sale" },
                                    { value: "Parts-Harvesting", label: "Parts Harvesting" },
                                    { value: "Still-in-Fleet", label: "Still in Fleet" },
                                    { value: "Not-Disposed", label: "Not Yet Disposed" }
                                ]}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Documentation & Compliance</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                label={"Owner's Manual Location"}
                                className="mx-1"
                                name="owners_manual_location"
                                placeholder="e.g., Glove compartment, Digital PDF in shared drive"
                                required={false}
                                message={"Owner's Manual Location"}
                            />

                            <FormInput
                                label={"Service Manual Location"}
                                className="mx-1"
                                name="service_manual_location"
                                placeholder="e.g., Service department, Online portal access"
                                required={false}
                                message={"Service Manual Location"}
                            />

                            <FormInput
                                label={"Maintenance Log Location"}
                                className="mx-1"
                                name="maintenance_log_location"
                                placeholder="e.g., Physical binder in office, Digital spreadsheet, Fleet software"
                                required={false}
                                message={"Maintenance Log Location (Physical or digital)"}
                            />

                            <FormInput
                                label={"Vehicle Photos"}
                                className="mx-1"
                                name="vehicle_photos"
                                placeholder="e.g., Photos: VIN_plate.jpg, front_view.jpg, interior_dash.jpg"
                                multiline={true}
                                rows={3}
                                required={false}
                                message={"Vehicle Photos (Front, back, sides, interior, VIN plate)"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                label={"Compliance Stickers"}
                                className="mx-1"
                                name="compliance_stickers"
                                placeholder="e.g., Safety inspection: Exp 2024-12-31, Emission: Exp 2025-06-30"
                                multiline={true}
                                rows={3}
                                required={false}
                                message={"Compliance Stickers (Safety, emission)"}
                            />

                            <FormInput
                                label={"DOT Requirements"}
                                className="mx-1"
                                name="dot_requirements"
                                placeholder="e.g., DOT number required, Annual inspection due: 2024-09-15"
                                multiline={true}
                                rows={3}
                                required={false}
                                message={"Department of Transportation (DOT) Requirements"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"CDL Requirements"}
                                placeholder="Select CDL Class"
                                name="cdl_requirements"
                                required={false}
                                message={"Please Select CDL Requirements"}
                                options={[
                                    { value: "CDL-Class-A", label: "CDL Class A Required" },
                                    { value: "CDL-Class-B", label: "CDL Class B Required" },
                                    { value: "CDL-Class-C", label: "CDL Class C Required" },
                                    { value: "Non-CDL", label: "No CDL Required" },
                                    { value: "Commercial-License", label: "Commercial License Only" },
                                    { value: "Special-Endorsement", label: "Special Endorsement Required" },
                                    { value: "Hazmat", label: "Hazmat Endorsement Required" },
                                    { value: "Passenger", label: "Passenger Endorsement Required" }
                                ]}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Administrative</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                label={"Record Created By"}
                                className="mx-1"
                                name="record_created_by"
                                placeholder="e.g., John Smith, System Auto"
                                required={false}
                                message={"Record Created By"}
                            />

                            <CustomDate
                                label={"Record Created Date"}
                                className={`mx-1`}
                                name="record_created_date"
                                placeholder={"Record Created Date"}
                                message={"Record Created Date"}
                                required={false}
                                allowToday={true}
                            />

                            <FormInput
                                label={"Last Updated By"}
                                className="mx-1"
                                name="last_updated_by"
                                placeholder="e.g., Maria Garcia, System Auto"
                                readOnly={true}
                                required={false}
                                message={"Last Updated By"}
                            />

                            <CustomDate
                                label={"Last Updated Date"}
                                className={`mx-1`}
                                name="last_updated_date"
                                placeholder={"Last Updated Date"}
                                message={"Last Updated Date"}
                                required={false}
                                allowToday={true}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <CustomDate
                                label={"Next Review Date"}
                                className={`mx-1`}
                                name="next_review_date"
                                placeholder={"Next Review Date"}
                                message={"Next Review Date"}
                                required={false}
                                allowToday={true}
                            />

                            <FormInput
                                label={"Notes/Additional Information"}
                                className="mx-1"
                                name="notes"
                                placeholder="Enter any additional notes or information"
                                multiline={true}
                                rows={4}
                                required={false}
                                message={"Notes/Additional Information"}
                            />

                            <UploadFile
                                className="mx-1 inputFlexBox"
                                label={"Attachments"}
                                name="attachments"
                                title={"Attachments"}
                                required={false}
                                multiple={false}
                                accept="image/jpeg,image/png"
                                classNameColor={`${style.inputDefaultBg}`}
                                message={"Attachments (Photos, registration, insurance, purchase docs)"}
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
export default connect(mapStateToProps, ACTIONS)(Car);