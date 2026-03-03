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


function Tablet_Phone({
    Red_Assets,
    setCode, code,
    pagBody,
    assetsType, setAssetsType,
    getBarCode,
    CreateAssetsFun,
    GetAllBrandsManufacturer,
    GetAllEmpList,
    EditAssetsData
}) {
    const accessToken = useSelector((state) => state.Red_Auth.accessToken);
    const [form] = Form.useForm();
    const [singleInput, setSingleInput] = useState(false)
    const users = Red_Assets?.Users?.[0]?.data
    const barcode = Red_Assets?.barcode?.[0]?.data?.barcode
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setloading] = useState(false);
    const [actionType, setActionType] = useState('');
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
            device_type: values?.device_type,
            manufacturer: values?.manufacturer,
            model_name: values?.model_name,
            model_number: values?.model_number,
            color: values?.color,
            imei_slot_1: values?.imei_slot_1,
            imei_slot_2: values?.imei_slot_2,
            meid_esn: values?.meid_esn,
            serial_number: values?.serial_number,
            sim_iccid: values?.sim_iccid,
            sim_type: values?.sim_type,
            secondary_sim_iccid: values?.secondary_sim_iccid,
            wifi_mac: values?.wifi_mac,
            bluetooth_mac: values?.bluetooth_mac,
            assigned_to_name: values?.assigned_to_name,
            operating_system: values?.operating_system,
            os_version: values?.os_version,
            storage_capacity: values?.storage_capacity,
            ram: values?.ram,
            processor: values?.processor,
            screen_size: values?.screen_size,
            battery_capacity: values?.battery_capacity,
            is_5g_capable: values?.is_5g_capable,
            fingerprint_sensor: values?.fingerprint_sensor,
            face_unlock: values?.face_unlock,
            water_resistance: values?.water_resistance,
            nfc_support: values?.nfc_support,
            wireless_charging: values?.wireless_charging,
            camera_specs: values?.camera_specs,
            network_lock_status: values?.network_lock_status,
            primary_carrier: values?.primary_carrier,
            mobile_number: values?.mobile_number,
            number_ported: values?.number_ported,
            plan_type: values?.plan_type,
            plan_name: values?.plan_name,
            data_allowance: values?.data_allowance,
            roaming_enabled: values?.roaming_enabled,
            roaming_restrictions: values?.roaming_restrictions,
            volte_vowifi: values?.volte_vowifi,
            apn_config: values?.apn_config,
            carrier_account: values?.carrier_account,
            billing_account: values?.billing_account,
            contract_start_date: values?.contract_start_date,
            contract_end_date: values?.contract_end_date,
            contract_renewal_date: values?.contract_renewal_date,
            early_termination_fee: values?.early_termination_fee,
            payment_plan: values?.payment_plan,
            po_number: values?.po_number,
            vendor: values?.vendor,
            purchase_date: values?.purchase_date,
            purchase_cost: values?.purchase_cost,
            subsidized_cost: values?.subsidized_cost,
            total_cost_with_plan: values?.total_cost_with_plan,
            cost_center: values?.cost_center,
            expenditure_type: values?.expenditure_type,
            warranty_start_date: values?.warranty_start_date,
            warranty_end_date: values?.warranty_end_date,
            warranty_type: values?.warranty_type,
            insurance_provider: values?.insurance_provider,
            insurance_policy_number: values?.insurance_policy_number,
            insurance_expiry_date: values?.insurance_expiry_date,
            insurance_coverage: values?.insurance_coverage,
            deductible_amount: values?.deductible_amount,
            mdm_enrolled: values?.mdm_enrolled,
            mdm_profile: values?.mdm_profile,
            last_mdm_checkin: values?.last_mdm_checkin,
            compliance_status: values?.compliance_status,
            encryption_status: values?.encryption_status,
            screen_lock_method: values?.screen_lock_method,
            min_pin_length: values?.min_pin_length,
            passcode_compliance: values?.passcode_compliance,
            security_patch_level: values?.security_patch_level,
            installed_apps: values?.installed_apps,
            blocked_apps: values?.blocked_apps,
            jailbreak_status: values?.jailbreak_status,
            remote_wipe_capable: values?.remote_wipe_capable,
            last_remote_wipe_test: values?.last_remote_wipe_test,
            certificate_expiry: values?.certificate_expiry,
            ownership_model: values?.ownership_model,
            charger_included: values?.charger_included,
            charger_asset_id: values?.charger_asset_id,
            cable_included: values?.cable_included,
            case_included: values?.case_included,
            case_asset_id: values?.case_asset_id,
            screen_protector: values?.screen_protector,
            headphones: values?.headphones,
            additional_accessories: values?.additional_accessories,
            accessory_kit_complete: values?.accessory_kit_complete,
            spare_battery: values?.spare_battery,
            condition_at_assignment: values?.condition_at_assignment,
            current_condition: values?.current_condition,
            damage_notes: values?.damage_notes,
            battery_health: values?.battery_health,
            repair_history: values?.repair_history,
            last_repair_date: values?.last_repair_date,
            total_repair_cost: values?.total_repair_cost,
            loaner_device_id: values?.loaner_device_id,
            replacement_device_id: values?.replacement_device_id,
            maintenance_schedule: values?.maintenance_schedule,
            expected_replacement_date: values?.expected_replacement_date,
            retirement_reason: values?.retirement_reason,
            retirement_date: values?.retirement_date,
            data_wipe_method: values?.data_wipe_method,
            wipe_certification: values?.wipe_certification,
            disposal_method: values?.disposal_method,
            disposal_certificate: values?.disposal_certificate,
            trade_in_value: values?.trade_in_value,
            sim_disposal: values?.sim_disposal,
            final_status: values?.final_status,
            record_created_by: values?.record_created_by,
            record_created_date: values?.record_created_date,
            last_updated_by: values?.last_updated_by,
            last_updated_date: values?.last_updated_date,
            last_inventory_date: values?.last_inventory_date,
            compliance_tags: values?.compliance_tags,
            roaming_compliance: values?.roaming_compliance,
            export_control: values?.export_control,
            attachments: values?.attachments,
            notes: values?.notes
        };
        const payload = {
            asset_tag: values?.asset_tag,
            asset_type: assetsType,
            field_values: field_values
        };
        const isCheck = await CreateAssetsFun(payload, accessToken);
        if (isCheck?.success) {
            messageApi.success({
                type: 'success',
                content: isCheck?.message,
            });
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

    };

    useEffect(() => {
        if (EditAssetsData && code?.mode === "Edit") {
            const Data = EditAssetsData;
            const values = EditAssetsData?.field_values;
            form.setFieldsValue({
                asset_tag: Data?.asset_tag,
                device_type: values?.device_type,
                manufacturer: values?.manufacturer,
                model_name: values?.model_name,
                model_number: values?.model_number,
                color: values?.color,
                imei_slot_1: values?.imei_slot_1,
                imei_slot_2: values?.imei_slot_2,
                meid_esn: values?.meid_esn,
                serial_number: values?.serial_number,
                sim_iccid: values?.sim_iccid,
                sim_type: values?.sim_type,
                secondary_sim_iccid: values?.secondary_sim_iccid,
                wifi_mac: values?.wifi_mac,
                bluetooth_mac: values?.bluetooth_mac,
                assigned_to_name: values?.assigned_to_name,
                operating_system: values?.operating_system,
                os_version: values?.os_version,
                storage_capacity: values?.storage_capacity,
                ram: values?.ram,
                processor: values?.processor,
                screen_size: values?.screen_size,
                battery_capacity: values?.battery_capacity,
                is_5g_capable: values?.is_5g_capable,
                fingerprint_sensor: values?.fingerprint_sensor,
                face_unlock: values?.face_unlock,
                water_resistance: values?.water_resistance,
                nfc_support: values?.nfc_support,
                wireless_charging: values?.wireless_charging,
                camera_specs: values?.camera_specs,
                network_lock_status: values?.network_lock_status,
                primary_carrier: values?.primary_carrier,
                mobile_number: values?.mobile_number,
                number_ported: values?.number_ported,
                plan_type: values?.plan_type,
                plan_name: values?.plan_name,
                data_allowance: values?.data_allowance,
                roaming_enabled: values?.roaming_enabled,
                roaming_restrictions: values?.roaming_restrictions,
                volte_vowifi: values?.volte_vowifi,
                apn_config: values?.apn_config,
                carrier_account: values?.carrier_account,
                billing_account: values?.billing_account,
                contract_start_date: values?.contract_start_date,
                contract_end_date: values?.contract_end_date,
                contract_renewal_date: values?.contract_renewal_date,
                early_termination_fee: values?.early_termination_fee,
                payment_plan: values?.payment_plan,
                po_number: values?.po_number,
                vendor: values?.vendor,
                purchase_date: values?.purchase_date,
                purchase_cost: values?.purchase_cost,
                subsidized_cost: values?.subsidized_cost,
                total_cost_with_plan: values?.total_cost_with_plan,
                cost_center: values?.cost_center,
                expenditure_type: values?.expenditure_type,
                warranty_start_date: values?.warranty_start_date,
                warranty_end_date: values?.warranty_end_date,
                warranty_type: values?.warranty_type,
                insurance_provider: values?.insurance_provider,
                insurance_policy_number: values?.insurance_policy_number,
                insurance_expiry_date: values?.insurance_expiry_date,
                insurance_coverage: values?.insurance_coverage,
                deductible_amount: values?.deductible_amount,
                mdm_enrolled: values?.mdm_enrolled,
                mdm_profile: values?.mdm_profile,
                last_mdm_checkin: values?.last_mdm_checkin,
                compliance_status: values?.compliance_status,
                encryption_status: values?.encryption_status,
                screen_lock_method: values?.screen_lock_method,
                min_pin_length: values?.min_pin_length,
                passcode_compliance: values?.passcode_compliance,
                security_patch_level: values?.security_patch_level,
                installed_apps: values?.installed_apps,
                blocked_apps: values?.blocked_apps,
                jailbreak_status: values?.jailbreak_status,
                remote_wipe_capable: values?.remote_wipe_capable,
                last_remote_wipe_test: values?.last_remote_wipe_test,
                certificate_expiry: values?.certificate_expiry,
                ownership_model: values?.ownership_model,
                charger_included: values?.charger_included,
                charger_asset_id: values?.charger_asset_id,
                cable_included: values?.cable_included,
                case_included: values?.case_included,
                case_asset_id: values?.case_asset_id,
                screen_protector: values?.screen_protector,
                headphones: values?.headphones,
                additional_accessories: values?.additional_accessories,
                accessory_kit_complete: values?.accessory_kit_complete,
                spare_battery: values?.spare_battery,
                condition_at_assignment: values?.condition_at_assignment,
                current_condition: values?.current_condition,
                damage_notes: values?.damage_notes,
                battery_health: values?.battery_health,
                repair_history: values?.repair_history,
                last_repair_date: values?.last_repair_date,
                total_repair_cost: values?.total_repair_cost,
                loaner_device_id: values?.loaner_device_id,
                replacement_device_id: values?.replacement_device_id,
                maintenance_schedule: values?.maintenance_schedule,
                expected_replacement_date: values?.expected_replacement_date,
                retirement_reason: values?.retirement_reason,
                retirement_date: values?.retirement_date,
                data_wipe_method: values?.data_wipe_method,
                wipe_certification: values?.wipe_certification,
                disposal_method: values?.disposal_method,
                disposal_certificate: values?.disposal_certificate,
                trade_in_value: values?.trade_in_value,
                sim_disposal: values?.sim_disposal,
                final_status: values?.final_status,
                record_created_by: values?.record_created_by,
                record_created_date: values?.record_created_date,
                last_updated_by: values?.last_updated_by,
                last_updated_date: values?.last_updated_date,
                last_inventory_date: values?.last_inventory_date,
                compliance_tags: values?.compliance_tags,
                roaming_compliance: values?.roaming_compliance,
                export_control: values?.export_control,
                attachments: values?.attachments,
                notes: values?.notes
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
                            <h5 className="mx-1">Mobile Phone Asset Form</h5>
                            <QRCODE
                                value={
                                    code?.mode === "Edit" ? EditAssetsData?.asset_tag : barcode
                                }
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Core Identification</h5>
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
                                className="mx-1"
                                label={"Device Type"}
                                placeholder="Select Device Type"
                                name="device_type"
                                required={true}
                                message={"Please Select Device Type"}
                                options={[
                                    { value: "Smartphone", label: "Smartphone" },
                                    { value: "Basic-Phone", label: "Basic Phone / Feature Phone" },
                                    { value: "Rugged-Phone", label: "Rugged Phone" },
                                    { value: "Satellite-Phone", label: "Satellite Phone" },
                                    { value: "Hotspot-MiFi", label: "Hotspot / MiFi" },
                                    { value: "Tablet", label: "Tablet" },
                                    { value: "Smartwatch", label: "Smartwatch" },
                                    { value: "other", label: "Other Device" }
                                ]}
                            />

                            <SelectInput
                                label={"Brand Manufacturer"}
                                className={"mx-1"}
                                name="manufacturer"
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
                                label={"Model Name"}
                                className="mx-1"
                                name="model_name"
                                placeholder="e.g., iPhone 15 Pro, Galaxy S24 Ultra"
                                required={true}
                                message={"Model Name"}
                            />

                            <FormInput
                                label={"Model Number"}
                                className="mx-1"
                                name="model_number"
                                placeholder="e.g., A2849, SM-S921U, Pixel 8 Pro"
                                required={true}
                                message={"Model Number"}
                            />
                        </div>
                        <div className={`${style.form_inputBox}`}>
                            <FormInput
                                label={"Color"}
                                className="mx-1"
                                name="color"
                                placeholder="e.g., Space Black, Titanium Blue, Midnight"
                                required={true}
                                message={"Color"}
                            />
                            <FormInput
                                label={"IMEI Number (Slot 1)"}
                                className="mx-1"
                                name="imei_slot_1"
                                placeholder="15-digit IMEI number"
                                required={true}
                                message={"IMEI Number (Slot 1) – Mandatory, unique"}
                            />

                            <FormInput
                                label={"IMEI Number (Slot 2)"}
                                className="mx-1"
                                name="imei_slot_2"
                                placeholder="15-digit IMEI number for dual SIM"
                                required={false}
                                message={"IMEI Number (Slot 2) – Dual SIM devices"}
                            />

                            <FormInput
                                label={"MEID/ESN"}
                                className="mx-1"
                                name="meid_esn"
                                placeholder="e.g., A1000012345678, 12345678901234"
                                required={false}
                                message={"MEID/ESN (If CDMA device)"}
                            />

                            <FormInput
                                label={"Serial Number"}
                                className="mx-1"
                                name="serial_number"
                                placeholder="Device serial number"
                                required={true}
                                message={"Serial Number"}
                            />
                        </div>
                        <div className={`${style.form_inputBox}`}>
                            <FormInput
                                label={"SIM Card ICCID"}
                                className="mx-1"
                                name="sim_iccid"
                                placeholder="19-20 digit ICCID number"
                                required={true}
                                message={"SIM Card ICCID"}
                            />
                            <SelectInput
                                className="mx-1"
                                label={"Physical SIM / eSIM"}
                                placeholder="Select SIM Type"
                                name="sim_type"
                                required={true}
                                message={"Please Select SIM Type"}
                                options={[
                                    { value: "Physical-SIM", label: "Physical SIM only" },
                                    { value: "eSIM", label: "eSIM only" },
                                    { value: "Both", label: "Both Physical SIM + eSIM" },
                                    { value: "Dual-Physical", label: "Dual Physical SIM" },
                                    { value: "Dual-eSIM", label: "Dual eSIM" }
                                ]}
                            />

                            <FormInput
                                label={"Secondary SIM ICCID"}
                                className="mx-1"
                                name="secondary_sim_iccid"
                                placeholder="19-20 digit ICCID for second SIM/eSIM"
                                required={false}
                                message={"Secondary SIM ICCID (If dual physical or second eSIM)"}
                            />


                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                label={"MAC Address (Wi-Fi)"}
                                className="mx-1"
                                name="wifi_mac"
                                placeholder="e.g., 00:1A:2B:3C:4D:5E"
                                required={true}
                                message={"MAC Address (Wi-Fi)"}
                            />
                            <FormInput
                                label={"Bluetooth MAC Address"}
                                className="mx-1"
                                name="bluetooth_mac"
                                placeholder="e.g., 00:1A:2B:3C:4D:5F"
                                required={true}
                                message={"Bluetooth MAC Address"}
                            />
                            <SelectInput
                                className="mx-1"
                                label={"Assigned To"}
                                placeholder="Assigned To"
                                name="assigned_to_name"
                                required={false}
                                message={"Please Select a assigned to"}
                                options={users?.map((item) => ({
                                    value: item.id,
                                    label: `${item.name || ''} - ${item.email || ''}`
                                }))}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Device Specifications</h5>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Operating System"}
                                placeholder="Select Operating System"
                                name="operating_system"
                                required={true}
                                message={"Please Select Operating System"}
                                options={[
                                    { value: "iOS", label: "iOS" },
                                    { value: "Android", label: "Android" },
                                    { value: "KaiOS", label: "KaiOS" },
                                    { value: "HarmonyOS", label: "HarmonyOS" },
                                    { value: "Windows", label: "Windows Mobile" },
                                    { value: "Feature-OS", label: "Feature Phone OS" },
                                    { value: "other", label: "Other OS" }
                                ]}
                            />

                            <FormInput
                                label={"OS Version"}
                                className="mx-1"
                                name="os_version"
                                placeholder="e.g., iOS 17.2, Android 14, KaiOS 3.1"
                                required={true}
                                message={"OS Version (At deployment)"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Storage Capacity"}
                                placeholder="Select Storage Capacity"
                                name="storage_capacity"
                                required={true}
                                message={"Please Select Storage Capacity"}
                                options={[
                                    { value: "16GB", label: "16GB" },
                                    { value: "32GB", label: "32GB" },
                                    { value: "64GB", label: "64GB" },
                                    { value: "128GB", label: "128GB" },
                                    { value: "256GB", label: "256GB" },
                                    { value: "512GB", label: "512GB" },
                                    { value: "1TB", label: "1TB" },
                                    { value: "other", label: "Other Capacity" }
                                ]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"RAM"}
                                placeholder="Select RAM Size"
                                name="ram"
                                required={true}
                                message={"Please Select RAM Size"}
                                options={[
                                    { value: "2GB", label: "2GB" },
                                    { value: "3GB", label: "3GB" },
                                    { value: "4GB", label: "4GB" },
                                    { value: "6GB", label: "6GB" },
                                    { value: "8GB", label: "8GB" },
                                    { value: "12GB", label: "12GB" },
                                    { value: "16GB", label: "16GB" },
                                    { value: "other", label: "Other RAM" }
                                ]}
                            />

                            <FormInput
                                label={"Processor/Chipset"}
                                className="mx-1"
                                name="processor"
                                placeholder="e.g., A17 Pro, Snapdragon 8 Gen 3, Tensor G3"
                                required={true}
                                message={"Processor/Chipset"}
                            />
                        </div>
                        <div className={`${style.form_inputBox}`}>
                            <FormInput
                                label={"Screen Size"}
                                className="mx-1"
                                name="screen_size"
                                placeholder="e.g., 6.1 inches, 6.7 inches"
                                required={true}
                                message={"Screen Size"}
                            />

                            <FormInput
                                label={"Battery Capacity"}
                                className="mx-1"
                                name="battery_capacity"
                                placeholder="e.g., 4000 mAh, 5000 mAh"
                                required={true}
                                message={"Battery Capacity (mAh)"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"5G Capable"}
                                placeholder="Select 5G Capability"
                                name="is_5g_capable"
                                required={true}
                                message={"Please Select 5G Capable"}
                                options={[
                                    { value: "Yes", label: "Yes - 5G Compatible" },
                                    { value: "No", label: "No - 4G/LTE Only" }
                                ]}
                            />

                            <FormInput
                                label={"Fingerprint Sensor"}
                                className="mx-1"
                                name="fingerprint_sensor"
                                placeholder="e.g., Yes - Side-mounted, Yes - Under display, No"
                                required={true}
                                message={"Fingerprint Sensor (Yes/No, Location)"}
                            />

                            <FormInput
                                label={"Face Unlock"}
                                className="mx-1"
                                name="face_unlock"
                                placeholder="e.g., Yes - 3D Face ID, Yes - 2D Camera, No"
                                required={true}
                                message={"Face Unlock (Yes/No, Type: 2D, 3D)"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <SelectInput
                                className="mx-1"
                                label={"Water/Dust Resistance Rating"}
                                placeholder="Select IP Rating"
                                name="water_resistance"
                                required={false}
                                message={"Please Select Water/Dust Resistance Rating"}
                                options={[
                                    { value: "IP67", label: "IP67 - Dust tight, 1m water" },
                                    { value: "IP68", label: "IP68 - Dust tight, >1m water" },
                                    { value: "IP53", label: "IP53 - Limited dust, splash resistant" },
                                    { value: "IP54", label: "IP54 - Dust protected, splash resistant" },
                                    { value: "None", label: "No official rating" },
                                    { value: "other", label: "Other rating" }
                                ]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"NFC Support"}
                                placeholder="Select NFC Support"
                                name="nfc_support"
                                required={true}
                                message={"Please Select NFC Support"}
                                options={[
                                    { value: "Yes", label: "Yes - NFC Enabled" },
                                    { value: "No", label: "No" }
                                ]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Wireless Charging"}
                                placeholder="Select Wireless Charging"
                                name="wireless_charging"
                                required={true}
                                message={"Please Select Wireless Charging"}
                                options={[
                                    { value: "Yes", label: "Yes - Wireless Charging" },
                                    { value: "No", label: "No" }
                                ]}
                            />

                            <FormInput
                                label={"Camera Specifications"}
                                className="mx-1"
                                name="camera_specs"
                                placeholder="e.g., Rear: 48MP + 12MP + 12MP, Front: 12MP"
                                required={true}
                                message={"Camera Specifications (Rear MP, Front MP)"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Network & Carrier</h5>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Network Lock Status"}
                                placeholder="Select Lock Status"
                                name="network_lock_status"  // ✅ CHANGED: "Network Lock Status" → "network_lock_status"
                                required={true}
                                message={"Please Select Network Lock Status"}
                                options={[
                                    { value: "Unlocked", label: "Unlocked - Any carrier" },
                                    { value: "Carrier-Locked", label: "Carrier Locked" },
                                    { value: "Sim-Lock", label: "SIM Locked" },
                                    { value: "Pending-Unlock", label: "Pending Unlock" }
                                ]}
                            />

                            <FormInput
                                label={"Primary Carrier/Service Provider"}
                                className="mx-1"
                                name="primary_carrier"  // ✅ CHANGED: "Primary Carrier/Service Provider" → "primary_carrier"
                                placeholder="e.g., Verizon, AT&T, T-Mobile, Vodafone, Airtel"
                                required={true}
                                message={"Primary Carrier/Service Provider"}
                            />

                            <FormInput
                                label={"Mobile Number (MSISDN)"}
                                className="mx-1"
                                name="mobile_number"  // ✅ CHANGED: "Mobile Number (MSISDN)" → "mobile_number"
                                placeholder="e.g., +1-555-123-4567"
                                required={true}
                                message={"Mobile Number (MSISDN)"}
                            />

                            <FormInput
                                label={"Mobile Number Ported"}
                                className="mx-1"
                                name="number_ported"  // ✅ CHANGED: "Mobile Number Ported" → "number_ported"
                                placeholder="e.g., Yes - Previous: Verizon, No"
                                required={false}
                                message={"Mobile Number Ported (Yes/No, Previous Carrier)"}
                            />
                            <SelectInput
                                className="mx-1"
                                label={"Plan Type"}
                                placeholder="Select Plan Type"
                                name="plan_type"  // ✅ CHANGED: "Plan Type" → "plan_type"
                                required={true}
                                message={"Please Select Plan Type"}
                                options={[
                                    { value: "Business", label: "Business Plan" },
                                    { value: "Personal", label: "Personal Plan" },
                                    { value: "Shared-Data", label: "Shared Data Plan" },
                                    { value: "Unlimited", label: "Unlimited Plan" },
                                    { value: "Pay-As-You-Go", label: "Pay-As-You-Go" },
                                    { value: "Family", label: "Family Plan" },
                                    { value: "IoT", label: "IoT/M2M Plan" },
                                    { value: "other", label: "Other Plan" }
                                ]}
                            />
                        </div>
                        <div className={style.form_inputBox}>
                            <FormInput
                                label={"Plan Name / Rate Plan"}
                                className="mx-1"
                                name="plan_name"  // ✅ CHANGED: "Plan Name / Rate Plan" → "plan_name"
                                placeholder="e.g., Unlimited Plus, Business Premium 50GB"
                                required={true}
                                message={"Plan Name / Rate Plan"}
                            />

                            <FormInput
                                label={"Data Allowance"}
                                className="mx-1"
                                name="data_allowance"  // ✅ CHANGED: "Data Allowance" → "data_allowance"
                                placeholder="e.g., 10GB, Unlimited, 50GB shared"
                                required={true}
                                message={"Data Allowance (GB per month)"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"International Roaming Enabled"}
                                placeholder="Select Roaming Status"
                                name="roaming_enabled"  // ✅ CHANGED: "International Roaming Enabled" → "roaming_enabled"
                                required={true}
                                message={"Please Select International Roaming Status"}
                                options={[
                                    { value: "Yes", label: "Yes - Roaming enabled" },
                                    { value: "No", label: "No - Roaming disabled" },
                                    { value: "Restricted", label: "Restricted - Selected countries" }
                                ]}
                            />
                            <FormInput
                                label={"Roaming Restrictions"}
                                className="mx-1"
                                name="roaming_restrictions"  // ✅ CHANGED: "Roaming Restrictions" → "roaming_restrictions"
                                placeholder="e.g., Canada/Mexico only, No EU, Data capped at 5GB"
                                required={false}
                                message={"Roaming Restrictions"}
                            />
                            <SelectInput
                                className="mx-1"
                                label={"VoLTE/VoWiFi Capable"}
                                placeholder="Select VoLTE/VoWiFi Status"
                                name="volte_vowifi"  // ✅ CHANGED: "VoLTE/VoWiFi Capable" → "volte_vowifi"
                                required={true}
                                message={"Please Select VoLTE/VoWiFi Capable"}
                                options={[
                                    { value: "Both", label: "Both VoLTE and VoWiFi" },
                                    { value: "VoLTE-Only", label: "VoLTE only" },
                                    { value: "VoWiFi-Only", label: "VoWiFi only" },
                                    { value: "None", label: "Neither supported" }
                                ]}
                            />
                        </div>
                        <div className={style.form_inputBox}>
                            <FormInput
                                label={"APN Configuration"}
                                className="mx-1"
                                name="apn_config"  // ✅ CHANGED: "APN Configuration" → "apn_config"
                                placeholder="e.g., internet.att.com, vzwinternet, Custom APN required"
                                required={false}
                                message={"APN Configuration (If custom required)"}
                            />
                            <FormInput
                                label={"Carrier Account Number"}
                                className="mx-1"
                                name="carrier_account"  // ✅ CHANGED: "Carrier Account Number" → "carrier_account"
                                placeholder="e.g., ACC-12345678"
                                required={true}
                                message={"Carrier Account Number"}
                            />
                            <FormInput
                                label={"Billing Account ID / Cost Centre"}
                                className="mx-1"
                                name="billing_account"  // ✅ CHANGED: "Billing Account ID / Cost Centre" → "billing_account"
                                placeholder="e.g., BILL-987654, Sales-Dept-01"
                                required={true}
                                message={"Billing Account ID / Cost Centre"}
                            />
                            <CustomDate
                                className="mx-1"
                                label={"Contract Start Date"}
                                name="contract_start_date"  // ✅ CHANGED: "Contract Start Date" → "contract_start_date"
                                required={true}
                                message={"Contract Start Date"}
                                allowToday={true}
                            />
                            <CustomDate
                                className="mx-1"
                                label={"Contract End Date"}
                                name="contract_end_date"  // ✅ CHANGED: "Contract End Date" → "contract_end_date"
                                required={true}
                                message={"Contract End Date"}
                                allowToday={true}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <CustomDate
                                className="mx-1"
                                label={"Contract Renewal Date"}
                                name="contract_renewal_date"  // ✅ CHANGED: "Contract Renewal Date" → "contract_renewal_date"
                                required={false}
                                message={"Contract Renewal Date"}
                                allowToday={true}
                            />
                            <FormInput
                                label={"Early Termination Fee"}
                                className="mx-1"
                                name="early_termination_fee"  // ✅ CHANGED: "Early Termination Fee" → "early_termination_fee"
                                placeholder="e.g., $350, $150 remaining"
                                required={false}
                                message={"Early Termination Fee (Amount)"}
                            />
                            <SelectInput
                                className="mx-1"
                                label={"Device Payment Plan"}
                                placeholder="Select Payment Plan"
                                name="payment_plan"  // ✅ CHANGED: "Device Payment Plan" → "payment_plan"
                                required={true}
                                message={"Please Select Device Payment Plan"}
                                options={[
                                    { value: "Upfront", label: "Upfront - Full payment" },
                                    { value: "Monthly-Installment", label: "Monthly installment" },
                                    { value: "24-Month", label: "24-month contract" },
                                    { value: "12-Month", label: "12-month contract" },
                                    { value: "Lease", label: "Device lease" },
                                    { value: "Bring-Your-Own", label: "Bring Your Own Device" }
                                ]}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Procurement & Financial</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                label={"Purchase Order Number"}
                                className="mx-1"
                                name="po_number"  // ✅ No change needed
                                placeholder="e.g., PO-MOB-2024-001, PUR-987654"
                                required={true}
                                message={"Purchase Order Number"}
                            />

                            <FormInput
                                label={"Vendor/Reseller"}
                                className="mx-1"
                                name="vendor"  // ✅ CHANGED: "Vendor/Reseller" → "vendor"
                                placeholder="e.g., Apple Business, Verizon, CDW, Amazon Business"
                                required={true}
                                message={"Vendor/Reseller"}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Purchase Date"}
                                name="purchase_date"  // ✅ CHANGED: "Purchase Date" → "purchase_date"
                                required={true}
                                message={"Purchase Date"}
                                allowToday={true}
                            />

                            <FormInput
                                label={"Purchase Cost (Device only)"}
                                className="mx-1"
                                name="purchase_cost"  // ✅ CHANGED: "Purchase Cost (Device only)" → "purchase_cost"
                                placeholder="e.g., $999.00, ₹79,900"
                                required={true}
                                message={"Purchase Cost (Device only)"}
                            />
                        </div>
                        <div className={style.form_inputBox}>
                            <FormInput
                                label={"Subsidized Cost"}
                                className="mx-1"
                                name="subsidized_cost"  // ✅ CHANGED: "Subsidized Cost" → "subsidized_cost"
                                placeholder="e.g., $199.00 with 2-year contract"
                                required={false}
                                message={"Subsidized Cost (If carrier-subsidized)"}
                            />

                            <FormInput
                                label={"Total Cost with Plan"}
                                className="mx-1"
                                name="total_cost_with_plan"  // ✅ CHANGED: "Total Cost with Plan" → "total_cost_with_plan"
                                placeholder="e.g., $1,299.00 including plan"
                                required={false}
                                message={"Total Cost with Plan (If bundled)"}
                            />

                            <FormInput
                                label={"Cost Center / Department Budget"}
                                className="mx-1"
                                name="cost_center"  // ✅ CHANGED: "Cost Center / Department Budget" → "cost_center"
                                placeholder="e.g., IT-Mobility-2024, Sales-Ops"
                                required={true}
                                message={"Cost Center / Department Budget"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Capital/Operational Expenditure"}
                                placeholder="Select Expenditure Type"
                                name="expenditure_type"  // ✅ CHANGED: "Capital/Operational Expenditure" → "expenditure_type"
                                required={true}
                                message={"Please Select Expenditure Type"}
                                options={[
                                    { value: "CapEx", label: "CapEx - Capital Expenditure" },
                                    { value: "OpEx", label: "OpEx - Operational Expenditure" },
                                    { value: "Lease", label: "Lease / Rental" },
                                    { value: "Both", label: "Mixed (CapEx + OpEx)" }
                                ]}
                            />
                        </div>
                        <div className={style.form_inputBox}>
                            <CustomDate
                                className="mx-1"
                                label={"Warranty Start Date"}
                                name="warranty_start_date"  // ✅ CHANGED: "Warranty Start Date" → "warranty_start_date"
                                required={true}
                                message={"Warranty Start Date"}
                                allowToday={true}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Warranty End Date"}
                                name="warranty_end_date"  // ✅ CHANGED: "Warranty End Date" → "warranty_end_date"
                                required={true}
                                message={"Warranty End Date"}
                                allowToday={true}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Warranty Type"}
                                placeholder="Select Warranty Type"
                                name="warranty_type"  // ✅ CHANGED: "Warranty Type" → "warranty_type"
                                required={true}
                                message={"Please Select Warranty Type"}
                                options={[
                                    { value: "Manufacturer", label: "Manufacturer Warranty" },
                                    { value: "Carrier", label: "Carrier Warranty" },
                                    { value: "Extended", label: "Extended Warranty" },
                                    { value: "AppleCare", label: "AppleCare+" },
                                    { value: "Samsung-Care", label: "Samsung Care+" },
                                    { value: "Third-Party", label: "Third-Party Warranty" },
                                    { value: "No-Warranty", label: "No Warranty" }
                                ]}
                            />

                            <FormInput
                                label={"Insurance Provider"}
                                className="mx-1"
                                name="insurance_provider"  // ✅ CHANGED: "Insurance Provider" → "insurance_provider"
                                placeholder="e.g., Assurant, Worth Ave Group, SquareTrade"
                                required={false}
                                message={"Insurance Provider"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                label={"Insurance Policy Number"}
                                className="mx-1"
                                name="insurance_policy_number"  // ✅ CHANGED: "Insurance Policy Number" → "insurance_policy_number"
                                placeholder="e.g., INS-MOB-12345678"
                                required={false}
                                message={"Insurance Policy Number"}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Insurance Expiry Date"}
                                name="insurance_expiry_date"  // ✅ CHANGED: "Insurance Expiry Date" → "insurance_expiry_date"
                                required={false}
                                message={"Insurance Expiry Date"}
                                allowToday={true}
                            />

                            <FormInput
                                label={"Insurance Coverage Details"}
                                className="mx-1"
                                name="insurance_coverage"  // ✅ CHANGED: "Insurance Coverage Details" → "insurance_coverage"
                                placeholder="e.g., Loss, Theft, Accidental Damage, Liquid Damage"
                                multiline={true}
                                rows={2}
                                required={false}
                                message={"Insurance Coverage Details (Loss, Theft, Damage)"}
                            />

                            <FormInput
                                label={"Deductible Amount"}
                                className="mx-1"
                                name="deductible_amount"  // ✅ CHANGED: "Deductible Amount" → "deductible_amount"
                                placeholder="e.g., $50 per claim, $99 deductible"
                                required={false}
                                message={"Deductible Amount"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Applications & Security</h5>
                        <div className={`${style.form_inputBox}`}>
                            <SelectInput
                                className="mx-1"
                                label={"Mobile Device Management (MDM) Enrolled"}
                                placeholder="Select MDM Enrollment Status"
                                name="mdm_enrolled"  // ✅ CHANGED: "MDM Enrolled" → "mdm_enrolled"
                                required={true}
                                message={"Please Select MDM Enrollment Status"}
                                options={[
                                    { value: "Yes", label: "Yes - Enrolled in MDM" },
                                    { value: "No", label: "No - Not enrolled" },
                                    { value: "Pending", label: "Pending enrollment" },
                                    { value: "Failed", label: "Enrollment failed" }
                                ]}
                            />

                            <FormInput
                                label={"MDM Profile Name / Server"}
                                className="mx-1"
                                name="mdm_profile"  // ✅ CHANGED: "MDM Profile Name / Server" → "mdm_profile"
                                placeholder="e.g., Intune, Workspace ONE, Jamf Pro, MobileIron"
                                required={false}
                                message={"MDM Profile Name / Server"}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Last MDM Check-in"}
                                name="last_mdm_checkin"  // ✅ CHANGED: "Last MDM Check-in" → "last_mdm_checkin"
                                required={false}
                                message={"Last MDM Check-in"}
                                allowToday={true}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Compliance Status"}
                                placeholder="Select Compliance Status"
                                name="compliance_status"  // ✅ CHANGED: "Compliance Status" → "compliance_status"
                                required={true}
                                message={"Please Select Compliance Status"}
                                options={[
                                    { value: "Compliant", label: "Compliant" },
                                    { value: "Non-compliant", label: "Non-compliant" },
                                    { value: "Pending", label: "Pending evaluation" },
                                    { value: "Grace-period", label: "Grace period" },
                                    { value: "Remediation", label: "Remediation required" }
                                ]}
                            />
                        </div>
                        <div className={`${style.form_inputBox}`}>
                            <SelectInput
                                className="mx-1"
                                label={"Encryption Status"}
                                placeholder="Select Encryption Status"
                                name="encryption_status"  // ✅ CHANGED: "Encryption Status" → "encryption_status"
                                required={true}
                                message={"Please Select Encryption Status"}
                                options={[
                                    { value: "Enabled", label: "Enabled - Device encrypted" },
                                    { value: "Disabled", label: "Disabled - Not encrypted" },
                                    { value: "Pending", label: "Pending encryption" },
                                    { value: "Not-Supported", label: "Not supported on device" }
                                ]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Screen Lock Method"}
                                placeholder="Select Screen Lock Method"
                                name="screen_lock_method"  // ✅ CHANGED: "Screen Lock Method" → "screen_lock_method"
                                required={true}
                                message={"Please Select Screen Lock Method"}
                                options={[
                                    { value: "PIN", label: "PIN (numeric)" },
                                    { value: "Pattern", label: "Pattern" },
                                    { value: "Biometric", label: "Biometric (Face/Touch ID)" },
                                    { value: "Password", label: "Password (alphanumeric)" },
                                    { value: "None", label: "No screen lock" },
                                    { value: "Mixed", label: "Mixed methods" }
                                ]}
                            />

                            <FormInput
                                label={"Minimum PIN Length Policy"}
                                className="mx-1"
                                name="min_pin_length"  // ✅ CHANGED: "Minimum PIN Length Policy" → "min_pin_length"
                                placeholder="e.g., 4 digits, 6 digits"
                                required={true}
                                message={"Minimum PIN Length Policy"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Passcode Compliance"}
                                placeholder="Select Passcode Compliance"
                                name="passcode_compliance"  // ✅ CHANGED: "Passcode Compliance" → "passcode_compliance"
                                required={true}
                                message={"Please Select Passcode Compliance"}
                                options={[
                                    { value: "Yes", label: "Yes - Meets policy" },
                                    { value: "No", label: "No - Does not meet policy" },
                                    { value: "Not-Applicable", label: "Not applicable" }
                                ]}
                            />
                        </div>
                        <div className={`${style.form_inputBox}`}>
                            <FormInput
                                label={"Security Patch Level"}
                                className="mx-1"
                                name="security_patch_level"  // ✅ CHANGED: "Security Patch Level" → "security_patch_level"
                                placeholder="e.g., 2026-01-01, January 2026"
                                required={true}
                                message={"Security Patch Level (Date)"}
                            />

                            <FormInput
                                label={"Containers/Apps Installed"}
                                className="mx-1"
                                name="installed_apps"  // ✅ CHANGED: "Containers/Apps Installed" → "installed_apps"
                                placeholder="e.g., Company Portal, Outlook, Teams, VPN Client"
                                multiline={true}
                                rows={2}
                                required={false}
                                message={"Containers/Apps Installed (Company Portal, Email, VPN)"}
                            />

                            <FormInput
                                label={"Blacklisted/Blocked Apps"}
                                className="mx-1"
                                name="blocked_apps"
                                placeholder="e.g., TikTok, Pokemon Go, Unsanctioned cloud storage"
                                multiline={true}
                                rows={2}
                                required={false}
                                message={"Blacklisted/Blocked Apps (List)"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Jailbreak/Root Detection Status"}
                                placeholder="Select Jailbreak Status"
                                name="jailbreak_status"
                                required={true}
                                message={"Please Select Jailbreak/Root Detection Status"}
                                options={[
                                    { value: "Clean", label: "Clean - No jailbreak/root" },
                                    { value: "Compromised", label: "Compromised - Jailbroken/Rooted" },
                                    { value: "Detection-Failed", label: "Detection failed" },
                                    { value: "Not-Checked", label: "Not checked" },
                                    { value: "Unable-To-Verify", label: "Unable to verify" }
                                ]}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <SelectInput
                                className="mx-1"
                                label={"Remote Wipe Capable"}
                                placeholder="Select Remote Wipe Capability"
                                name="remote_wipe_capable"
                                required={true}
                                message={"Please Select Remote Wipe Capable"}
                                options={[
                                    { value: "Yes", label: "Yes - Remote wipe supported" },
                                    { value: "No", label: "No - Not supported" },
                                    { value: "Limited", label: "Limited - Partial wipe only" }
                                ]}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Last Remote Wipe Test Date"}
                                name="last_remote_wipe_test"
                                required={false}
                                message={"Last Remote Wipe Test Date"}
                                allowToday={true}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Certificate Expiry"}
                                name="certificate_expiry"
                                required={false}
                                message={"Certificate Expiry (For VPN/Wi-Fi certs)"}
                                allowToday={true}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"BYOD / Corporate-Owned"}
                                placeholder="Select Device Ownership Model"
                                name="ownership_model"
                                required={true}
                                message={"Please Select Device Ownership Model"}
                                options={[
                                    { value: "COPE", label: "COPE - Corporate-Owned, Personally Enabled" },
                                    { value: "COBO", label: "COBO - Corporate-Owned, Business Only" },
                                    { value: "BYOD", label: "BYOD - Bring Your Own Device" },
                                    { value: "COPE-Business", label: "COPE - Business dedicated" },
                                    { value: "CYOD", label: "CYOD - Choose Your Own Device" }
                                ]}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Accessories & Kit Contents</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                label={"Charger Included"}
                                className="mx-1"
                                name="charger_included"
                                placeholder="e.g., Yes - USB-C, Yes - Lightning, Yes - Wireless, No"
                                required={true}
                                message={"Charger Included (Yes/No, Type: USB-C, Lightning, Wireless)"}
                            />

                            <FormInput
                                label={"Charger Asset ID"}
                                className="mx-1"
                                name="charger_asset_id"
                                placeholder="e.g., CHG-USB-12345, ACC-98765"
                                required={false}
                                message={"Charger Asset ID (If tracked separately)"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Cable Included"}
                                placeholder="Select Cable Status"
                                name="cable_included"
                                required={true}
                                message={"Please Select Cable Included"}
                                options={[
                                    { value: "Yes", label: "Yes - Cable included" },
                                    { value: "No", label: "No - Cable not included" },
                                    { value: "USB-C", label: "Yes - USB-C to C" },
                                    { value: "Lightning", label: "Yes - Lightning" },
                                    { value: "Micro-USB", label: "Yes - Micro-USB" }
                                ]}
                            />

                            <FormInput
                                label={"Case Included"}
                                className="mx-1"
                                name="case_included"
                                placeholder="e.g., Yes - Clear silicone, Yes - Black leather, No"
                                required={true}
                                message={"Case Included (Yes/No, Type/Color)"}
                            />

                            <FormInput
                                label={"Case Asset ID"}
                                className="mx-1"
                                name="case_asset_id"
                                placeholder="e.g., CASE-IP15-67890, ACC-45678"
                                required={false}
                                message={"Case Asset ID"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <SelectInput
                                className="mx-1"
                                label={"Screen Protector Installed"}
                                placeholder="Select Screen Protector Status"
                                name="screen_protector"
                                required={true}
                                message={"Please Select Screen Protector Installed"}
                                options={[
                                    { value: "Yes", label: "Yes - Installed" },
                                    { value: "No", label: "No - Not installed" },
                                    { value: "Tempered-Glass", label: "Yes - Tempered glass" },
                                    { value: "Film", label: "Yes - Plastic film" },
                                    { value: "Privacy", label: "Yes - Privacy filter" }
                                ]}
                            />

                            <FormInput
                                label={"Headphones/Headset"}
                                className="mx-1"
                                name="headphones"
                                placeholder="e.g., Yes - AirPods (AST-12345), No"
                                required={false}
                                message={"Headphones/Headset (Yes/No, Asset ID)"}
                            />

                            <FormInput
                                label={"Additional Accessories"}
                                className="mx-1"
                                name="additional_accessories"
                                placeholder="e.g., Power bank (PB-67890), Car charger, Mount, Stylus"
                                multiline={true}
                                rows={2}
                                required={false}
                                message={"Additional Accessories (Power bank, car charger, etc.)"}
                            />

                            <FormInput
                                label={"Accessory Kit Complete"}
                                className="mx-1"
                                name="accessory_kit_complete"
                                placeholder="e.g., Complete: All items present, Missing charging cable"
                                required={true}
                                message={"Accessory Kit Complete (Checklist)"}
                            />

                            <FormInput
                                label={"Spare Battery"}
                                className="mx-1"
                                name="spare_battery"
                                placeholder="e.g., Yes - 5000mAh (BATT-54321), No"
                                required={false}
                                message={"Spare Battery (For rugged phones)"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Maintenance & Repairs</h5>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Device Condition at Assignment"}
                                placeholder="Select Assignment Condition"
                                name="condition_at_assignment"
                                required={true}
                                message={"Please Select Device Condition at Assignment"}
                                options={[
                                    { value: "New", label: "New - Never used" },
                                    { value: "Like-New", label: "Like New - Minimal wear" },
                                    { value: "Good", label: "Good - Minor signs of use" },
                                    { value: "Fair", label: "Fair - Visible wear" },
                                    { value: "Poor", label: "Poor - Heavy wear" }
                                ]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Current Condition"}
                                placeholder="Select Current Condition"
                                name="current_condition"
                                required={true}
                                message={"Please Select Current Condition"}
                                options={[
                                    { value: "New", label: "New" },
                                    { value: "Good", label: "Good" },
                                    { value: "Damaged", label: "Damaged" },
                                    { value: "Defective", label: "Defective / Not functional" },
                                    { value: "In-Repair", label: "In Repair" },
                                    { value: "Retired", label: "Retired" }
                                ]}
                            />

                            <FormInput
                                label={"Damage/Cosmetic Notes"}
                                className="mx-1"
                                name="damage_notes"
                                placeholder="e.g., Scratches on back panel, Small dent on top corner, Hairline crack near volume button"
                                multiline={true}
                                rows={3}
                                required={false}
                                message={"Damage/Cosmetic Notes (Scratches, dents, cracks)"}
                            />

                            <FormInput
                                label={"Battery Health"}
                                className="mx-1"
                                name="battery_health"
                                placeholder="e.g., 92% maximum capacity, 85% health, 400 cycle count"
                                required={true}
                                message={"Battery Health (% capacity, iOS Battery Health, Android estimate)"}
                            />

                            <FormInput
                                label={"Repair History"}
                                className="mx-1"
                                name="repair_history"
                                placeholder="e.g., 2025-11-15: Screen replacement ($199) - uBreakiFix, 2026-01-20: Battery replacement ($79) - Apple Store"
                                multiline={true}
                                rows={4}
                                required={false}
                                message={"Repair History (Date, Issue, Vendor, Cost)"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <CustomDate
                                className="mx-1"
                                label={"Last Repair Date"}
                                name="last_repair_date"
                                required={false}
                                message={"Last Repair Date"}
                                allowToday={true}
                            />

                            <FormInput
                                label={"Total Repair Cost (Lifetime)"}
                                className="mx-1"
                                name="total_repair_cost"
                                placeholder="e.g., $278.00"
                                required={false}
                                message={"Total Repair Cost (Lifetime)"}
                            />

                            <FormInput
                                label={"Loaner Device ID"}
                                className="mx-1"
                                name="loaner_device_id"
                                placeholder="e.g., Loaner iPhone 13 - AST-7890, DVC-54321"
                                required={false}
                                message={"Loaner Device ID (During repair)"}
                            />

                            <FormInput
                                label={"Replacement Device ID"}
                                className="mx-1"
                                name="replacement_device_id"
                                placeholder="e.g., Replacement device: AST-4567 (New IMEI: 351234567890123)"
                                required={false}
                                message={"Replacement Device ID (If replaced under warranty)"}
                            />

                            <FormInput
                                label={"Maintenance Schedule"}
                                className="mx-1"
                                name="maintenance_schedule"
                                placeholder="e.g., Battery replacement due: 2026-12, Screen protector: replace every 6 months"
                                multiline={true}
                                rows={2}
                                required={false}
                                message={"Maintenance Schedule (Battery replacement, screen protector replacement)"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Lifecycle & Disposition</h5>
                        <div className={style.form_inputBox}>
                            <CustomDate
                                className="mx-1"
                                label={"Expected Replacement Date"}
                                name="expected_replacement_date"
                                required={false}
                                message={"Expected Replacement Date (Based on refresh policy, e.g., 24/36 months)"}
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
                                    { value: "End-of-life", label: "End of life / Deprecated" },
                                    { value: "Damaged", label: "Damaged - Beyond repair" },
                                    { value: "Lost", label: "Lost - Not recovered" },
                                    { value: "Stolen", label: "Stolen - Police report filed" },
                                    { value: "Upgrade", label: "Upgrade to newer model" },
                                    { value: "Surplus", label: "Surplus / Excess inventory" },
                                    { value: "Security-risk", label: "Security risk (no updates)" },
                                    { value: "Not-retired", label: "Not retired" }
                                ]}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Retirement Date"}
                                name="retirement_date"
                                required={false}
                                message={"Retirement Date"}
                                allowToday={true}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Data Wipe Method"}
                                placeholder="Select Data Wipe Method"
                                name="data_wipe_method"
                                required={false}
                                message={"Please Select Data Wipe Method"}
                                options={[
                                    { value: "Factory-reset", label: "Factory reset" },
                                    { value: "MDM-wipe", label: "MDM remote wipe" },
                                    { value: "Secure-erase", label: "Secure erase (DoD standard)" },
                                    { value: "Degaussing", label: "Degaussing (storage destruction)" },
                                    { value: "Physical-destruction", label: "Physical destruction" },
                                    { value: "Not-performed", label: "Not performed" }
                                ]}
                            />

                            <FormInput
                                label={"Data Wipe Certification"}
                                className="mx-1"
                                name="wipe_certification"
                                placeholder="e.g., Wipe cert #WD-2026-12345, MDM wipe confirmation ID"
                                required={false}
                                message={"Data Wipe Certification (Attestation)"}
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
                                    { value: "Recycle", label: "Recycle / E-waste" },
                                    { value: "Donate", label: "Donate" },
                                    { value: "Resell", label: "Resell" },
                                    { value: "Trade-in", label: "Trade-in" },
                                    { value: "Return-lease", label: "Return to lessor" },
                                    { value: "Employee-purchase", label: "Employee purchase" },
                                    { value: "Auction", label: "Auction" },
                                    { value: "Not-disposed", label: "Not disposed" }
                                ]}
                            />

                            <FormInput
                                label={"Disposal Certificate / Proof of Recycling"}
                                className="mx-1"
                                name="disposal_certificate"
                                placeholder="e.g., R2 cert #R2-2026-789, Recycling receipt #REC-456"
                                required={false}
                                message={"Disposal Certificate / Proof of Recycling"}
                            />

                            <FormInput
                                label={"Trade-in Value Received"}
                                className="mx-1"
                                name="trade_in_value"
                                placeholder="e.g., $150.00, ₹12,000"
                                required={false}
                                message={"Trade-in Value Received"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"SIM Card Disposal"}
                                placeholder="Select SIM Disposal Method"
                                name="sim_disposal"
                                required={false}
                                message={"Please Select SIM Card Disposal"}
                                options={[
                                    { value: "Destroyed", label: "Destroyed / Cut" },
                                    { value: "Returned", label: "Returned to carrier" },
                                    { value: "Reactivated", label: "Reactivated in new device" },
                                    { value: "Retained", label: "Retained (non-functional)" },
                                    { value: "eSIM-deactivated", label: "eSIM deactivated" },
                                    { value: "Not-applicable", label: "Not applicable" }
                                ]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Final Status"}
                                placeholder="Select Final Status"
                                name="final_status"
                                required={false}
                                message={"Please Select Final Status"}
                                options={[
                                    { value: "Retired", label: "Retired" },
                                    { value: "Decommissioned", label: "Decommissioned" },
                                    { value: "Disposed", label: "Disposed" },
                                    { value: "Written-off", label: "Written off" },
                                    { value: "Active", label: "Active (not retired)" }
                                ]}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Administrative & Compliance</h5>
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

                            <CustomDate
                                className="mx-1"
                                label={"Last Inventory Verification Date"}
                                name="last_inventory_date"
                                required={true}
                                message={"Last Inventory Verification Date"}
                                allowToday={true}
                            />
                        </div>

                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <SelectInput
                                className="mx-1"
                                label={"Compliance Tags"}
                                placeholder="Select Compliance Tags"
                                name="compliance_tags"
                                required={false}
                                isMulti={true}
                                options={[
                                    { value: "GDPR", label: "GDPR - EU Data Protection" },
                                    { value: "HIPAA", label: "HIPAA - Healthcare" },
                                    { value: "PCI", label: "PCI DSS - Payment Card" },
                                    { value: "SOX", label: "SOX - Financial Compliance" },
                                    { value: "ISO-27001", label: "ISO 27001" },
                                    { value: "FedRAMP", label: "FedRAMP" },
                                    { value: "CMMC", label: "CMMC" },
                                    { value: "No-Restrictions", label: "No Compliance Restrictions" }
                                ]}
                            />

                            <FormInput
                                label={"Data Roaming Compliance"}
                                className="mx-1"
                                name="roaming_compliance"
                                placeholder="e.g., Approved: USA, Canada, UK, Germany; Restricted: China, Russia"
                                multiline={true}
                                rows={2}
                                required={false}
                                message={"Data Roaming Compliance (Approved countries)"}
                            />

                            <FormInput
                                label={"Export Control Classification"}
                                className="mx-1"
                                name="export_control"
                                placeholder="e.g., EAR99, 5A992.c, Not applicable"
                                required={false}
                                message={"Export Control Classification (If applicable)"}
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
                                message={"Attachments (Purchase invoice, warranty doc, insurance cert, photos)"}
                            />

                            <FormInput
                                label={"Notes/Comments"}
                                className="mx-1"
                                name="notes"
                                placeholder="e.g., Device configured with custom VPN profile, User reported battery drain issue, Requires special charger"
                                multiline={true}
                                rows={4}
                                required={false}
                                message={"Notes/Comments (Special configurations, user feedback)"}
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
export default connect(mapStateToProps, ACTIONS)(Tablet_Phone);