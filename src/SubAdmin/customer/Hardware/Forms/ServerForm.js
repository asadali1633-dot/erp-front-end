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


function ServerForm({
    Red_Assets,
    setCode, code,
    pagBody,
    assetsType, setAssetsType,
    getBarCode,
    CreateAssetsFun,
    GetAllBrandsManufacturer,
    GetAllEmpList
}) {
    const [form] = Form.useForm();
    const users = Red_Assets?.Users?.[0]?.data
    const accessToken = useSelector((state) => state.Red_Auth.accessToken);
    const barcode = Red_Assets?.barcode?.[0]?.data?.barcode
    const [actionType, setActionType] = useState('');
    const [singleInput, setSingleInput] = useState(false)
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
            // Core Identification & Registration
            asset_tag: values?.asset_tag,
            server_hostname: values?.server_hostname,
            server_role: values?.server_role,
            server_type: values?.server_type,
            criticality_level: values?.criticality_level,
            date_commissioned: values?.date_commissioned,
            project_reference: values?.project_reference,

            // Physical Hardware Specifications
            brand_manufacturer: values?.brand_manufacturer,
            model_chassis: values?.model_chassis,
            serial_number: values?.serial_number,
            rack_location: values?.rack_location,
            form_factor: values?.form_factor,
            chassis_slot: values?.chassis_slot,
            primary_power_supply: values?.primary_power_supply,
            secondary_power_supply: values?.secondary_power_supply,
            nic_ports: values?.nic_ports,
            ip_addresses_hardware: values?.ip_addresses_hardware,
            operating_system_hardware: values?.operating_system_hardware,
            graphics_card: values?.graphics_card,
            screen_size: values?.screen_size,
            peripherals_included: values?.peripherals_included,

            // Compute Resources
            cpu_type_model: values?.cpu_type_model,
            cpu_sockets: values?.cpu_sockets,
            total_cores: values?.total_cores,
            total_threads: values?.total_threads,
            ram_total: values?.ram_total,
            ram_configuration: values?.ram_configuration,
            gpu_cards: values?.gpu_cards,

            // Storage Configuration
            storage_controller: values?.storage_controller,
            raid_level: values?.raid_level,
            raw_storage_capacity: values?.raw_storage_capacity,
            usable_storage_capacity: values?.usable_storage_capacity,
            drive_bays: values?.drive_bays,
            external_storage: values?.external_storage,

            // Network Configuration
            management_ip: values?.management_ip,
            primary_ip: values?.primary_ip,
            secondary_ip: values?.secondary_ip,
            mac_addresses: values?.mac_addresses,
            network_interfaces: values?.network_interfaces,
            switch_port_connections: values?.switch_port_connections,
            vlan_assignments: values?.vlan_assignments,

            // Virtualization & Software Stack
            hypervisor: values?.hypervisor,
            hypervisor_version: values?.hypervisor_version,
            vm_name: values?.vm_name,
            virtual_host_cluster: values?.virtual_host_cluster,
            guest_os: values?.guest_os,
            os_version: values?.os_version,
            os_license_key_vm: values?.os_license_key_vm,
            assigned_vcpu: values?.assigned_vcpu,
            assigned_memory: values?.assigned_memory,
            assigned_virtual_disks: values?.assigned_virtual_disks,

            // Application & Service Dependencies
            primary_application: values?.primary_application,
            application_owner: values?.application_owner,
            dependent_services: values?.dependent_services,
            dependencies: values?.dependencies,
            backup_configuration: values?.backup_configuration,
            monitoring_system: values?.monitoring_system,
            monitoring_contact: values?.monitoring_contact,

            // Financial & Procurement
            cost_center: values?.cost_center,
            business_justification: values?.business_justification,
            vendor_name: values?.vendor_name,
            purchase_cost: values?.purchase_cost,
            warranty_start: values?.warranty_start,
            warranty_end: values?.warranty_end,
            expected_lifespan: values?.expected_lifespan,

            // Assignment Status
            assigned_to: values?.assigned_to,
            managed_by: values?.managed_by,
            assigned_date: values?.assigned_date,
            server_mode_status: values?.server_mode_status,
            physical_location: values?.physical_location,
            status: values?.status,

            // Software & Compliance
            operating_system_compliance: values?.operating_system_compliance,
            os_license_key_compliance: values?.os_license_key_compliance,
            virtualization_platform: values?.virtualization_platform,
            hypervisor_details: values?.hypervisor_details,
            server_role_compliance: values?.server_role_compliance,
            ip_addresses_compliance: values?.ip_addresses_compliance,
            subnet_vlan: values?.subnet_vlan,
            backup_schedule: values?.backup_schedule,

            // Lifecycle & Management
            ownership_type: values?.ownership_type,
            lease_expiry: values?.lease_expiry,
            next_maintenance: values?.next_maintenance,
            disposal_date: values?.disposal_date,
            disposal_method: values?.disposal_method,
            depreciation_value: values?.depreciation_value,
            parent_asset: values?.parent_asset,

            // Cloud/Virtual Specific
            cloud_provider: values?.cloud_provider,
            region_zone: values?.region_zone,
            instance_type: values?.instance_type,
            instance_id: values?.instance_id,
            resource_group: values?.resource_group,
            cloud_account: values?.cloud_account,
            monthly_cost: values?.monthly_cost,
            auto_scaling_group: values?.auto_scaling_group,
            snapshot_policy: values?.snapshot_policy
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
        if (accessToken) {
            getBarCode(accessToken)
        }
    }, [accessToken]);

    useEffect(() => {
        if (barcode) {
            form.setFieldsValue({
                asset_tag: barcode
            });
        }
    }, [barcode, form]);

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
                            <h5 className="mx-1">New Asset Form Server</h5>
                            <QRCODE value={barcode} />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Core Identification & Registration</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                className="mx-1"
                                label={"Assets Tag/ID Number"}
                                name="asset_tag"
                                type={"text"}
                                placeholder="Assets Tag/ID Number"
                                required={true}
                                readOnly={true}
                                message={"Please Enter a ID Number"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Server Hostname (Primary DNS name)"}
                                name="server_hostname"
                                type={"text"}
                                placeholder="Server Hostname (Primary DNS name)"
                                required={true}
                                message={"Please Enter a Server Hostname (Primary DNS name)"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Server Role"}
                                placeholder="Server Role"
                                name="server_role"
                                required={true}
                                message={"Please Select a Server Role"}
                                options={[
                                    { value: "Web Server", label: "Web Server" },
                                    { value: "Database Server", label: "Database Server" },
                                    { value: "File Server", label: "File Server" },
                                    { value: "Application Server", label: "Application Server" },
                                    { value: "Virtualization Host", label: "Virtualization Host" },
                                    { value: "Backup Server", label: "Backup Server" },
                                    { value: "others", label: "others" },
                                ]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Server Type"}
                                placeholder="Server Type"
                                name="server_type"
                                required={true}
                                message={"Please Select a Server Type"}
                                options={[
                                    { value: "Physical", label: "Physical" },
                                    { value: "Virtual", label: "Virtual" },
                                    { value: "Cloud", label: "Cloud" },
                                    { value: "Instance", label: "Instance" },
                                    { value: "Container", label: "Container" },
                                ]}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <SelectInput
                                className="mx-1"
                                label={"Criticality Level"}
                                placeholder="Criticality Level"
                                name="criticality_level"
                                required={true}
                                message={"Please Select a Criticality Level"}
                                options={[
                                    { value: "Tier 1/Mission Critical", label: "Tier 1/Mission Critical" },
                                    { value: "Tier 2/Business Critical", label: "Tier 2/Business Critical" },
                                    { value: "Tier 3/Important", label: "Tier 3/Important" },
                                    { value: "Tier 4/Non-Critical", label: "Tier 4/Non-Critical" },
                                ]}
                            />

                            <CustomDate
                                label={"Date Commissioned/Provisioned"}
                                className={`mx-1`}
                                name="date_commissioned"
                                placeholder={"Date Commissioned/Provisioned"}
                                message={"Please Enter a Date Commissioned/Provisioned"}
                                required={true}
                                allowToday={true}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Request/Project Reference (Ticket or project code)"}
                                name="project_reference"
                                type={"text"}
                                placeholder="Request/Project Reference (Ticket or project code)"
                                required={false}
                                message={"Please Enter a Request/Project Reference (Ticket or project code)"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Physical Hardware Specifications (for physical servers)</h5>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                label={"Brand Manufacturer"}
                                className={"mx-1"}
                                name="brand_manufacturer"
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
                                className="mx-1"
                                label={"Model/Chassis"}
                                name="model_chassis"
                                type={"text"}
                                placeholder="Model/Chassis"
                                required={true}
                                message={"Please Enter a Model/Chassis"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Serial Number/Service Tag"}
                                name="serial_number"
                                type={"text"}
                                placeholder="Serial Number/Service Tag"
                                required={true}
                                message={"Please Enter a Serial Number/Service Tag"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Rack Location"}
                                placeholder="Rack Location"
                                name="rack_location"
                                required={true}
                                message={"Please Select a Rack Location"}
                                options={[
                                    { value: "Data Center", label: "Data Center" },
                                    { value: "Row", label: "Row" },
                                    { value: "Rack Number", label: "Rack Number" },
                                    { value: "U Position", label: "U Position" },
                                    { value: "others", label: "others" },
                                ]}
                            />
                        </div>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Form Factor Rack Unit"}
                                placeholder="Form Factor Rack Unit"
                                name="form_factor"
                                required={true}
                                message={"Please Select a Form Factor Rack Unit"}
                                options={[
                                    { value: "1U", label: "1U" },
                                    { value: "2U", label: "2U" },
                                    { value: "4U", label: "4U" },
                                    { value: "Blade", label: "Blade" },
                                    { value: "Tower", label: "Tower" },
                                ]}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Chassis Slot/Position"}
                                name="chassis_slot"
                                type={"text"}
                                placeholder="Chassis Slot/Position"
                                required={true}
                                message={"Please Enter a Chassis Slot/Position"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Primary Power Supply"}
                                name="primary_power_supply"
                                type={"text"}
                                placeholder="Primary Power Supply"
                                required={true}
                                message={"Please Enter a Power Supply"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Secondary Power Supply"}
                                name="secondary_power_supply"
                                type={"text"}
                                placeholder="Secondary Power Supply"
                                required={false}
                                message={"Please Enter a Power Supply"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Network Interface Cards (NICs)"}
                                name="nic_ports"
                                type={"text"}
                                placeholder="Network Interface Cards (NICs)"
                                required={true}
                                message={"Please Enter a Network Interface Cards (NICs)"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                label={"IP Address(es)"}
                                className="mx-1"
                                name="ip_addresses_hardware"
                                placeholder="IP Address(es)"
                                required={true}
                                message={"Please Enter a IP Address(es)"}
                            />

                            <FormInput
                                label={"Operating System (with version)"}
                                className="mx-1"
                                name="operating_system_hardware"
                                placeholder="Operating System (with version)"
                                required={false}
                                message={"Please Enter a Operating System (with version)"}
                            />

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
                                required={false}
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
                                name="peripherals_included"
                                required={false}
                                message={"Please Select a Peripherals Included"}
                                options={[]}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Compute Resources</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                className="mx-1"
                                label={"CPU Type & Model"}
                                name="cpu_type_model"
                                type={"text"}
                                placeholder="CPU Type & Model"
                                required={false}
                                message={"Please Enter a CPU Type & Model"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"CPU Sockets (Number of physical CPUs)"}
                                name="cpu_sockets"
                                type={"text"}
                                placeholder="CPU Sockets"
                                required={false}
                                message={"Please Enter a CPU Sockets"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Total Cores"}
                                name="total_cores"
                                type={"text"}
                                placeholder="Total Cores"
                                required={false}
                                message={"Please Enter a Total Cores"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Total Threads"}
                                name="total_threads"
                                type={"text"}
                                placeholder="Total Threads"
                                required={false}
                                message={"Please Enter a Total Threads"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                className="mx-1"
                                label={"RAM (Total GB)"}
                                name="ram_total"
                                type={"text"}
                                placeholder="RAM (Total GB)"
                                required={false}
                                message={"Please Enter a RAM (Total GB)"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"RAM Configuration"}
                                name="ram_configuration"
                                type={"text"}
                                placeholder="RAM Configuration"
                                required={false}
                                message={"Please Enter a RAM Configuration"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"GPU/Accelerator Cards"}
                                name="gpu_cards"
                                type={"text"}
                                placeholder="GPU/Accelerator Cards"
                                required={false}
                                message={"Please Enter a GPU/Accelerator Cards"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Storage Configuration</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                className="mx-1"
                                label={"Internal Storage Controller"}
                                name="storage_controller"
                                type={"text"}
                                placeholder="Internal Storage Controller"
                                required={false}
                                message={"Please Enter a Internal Storage Controller"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"RAID Level/Configuration"}
                                name="raid_level"
                                type={"text"}
                                placeholder="RAID Level/Configuration"
                                required={false}
                                message={"Please Enter a RAID Level/Configuration"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Total Raw Storage Capacity (TB)"}
                                name="raw_storage_capacity"
                                type={"text"}
                                placeholder="Total Raw Storage Capacity (TB)"
                                required={false}
                                message={"Please Enter a Total Raw Storage Capacity (TB)"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                className="mx-1"
                                label={"Total Usable Storage Capacity (TB)"}
                                name="usable_storage_capacity"
                                type={"text"}
                                placeholder="Total Usable Storage Capacity (TB)"
                                required={false}
                                message={"Please Enter a Total Usable Storage Capacity (TB)"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Drive Bays & Configuration"}
                                name="drive_bays"
                                type={"text"}
                                placeholder="Drive Bays & Configuration"
                                required={false}
                                message={"Please Enter a Drive Bays & Configuration"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"External Storage Attached"}
                                name="external_storage"
                                type={"text"}
                                placeholder="External Storage Attached"
                                required={false}
                                message={"Please Enter a External Storage Attached"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Network Configuration</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                className="mx-1"
                                label={"Management IP Address"}
                                name="management_ip"
                                type={"text"}
                                placeholder="Management IP Address"
                                required={false}
                                message={"Please Enter a Management IP Address"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Primary IP Address(es)"}
                                name="primary_ip"
                                type={"text"}
                                placeholder="Primary IP Address(es)"
                                required={false}
                                message={"Please Enter a Primary IP Address(es)"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Secondary IP Address(es)"}
                                name="secondary_ip"
                                type={"text"}
                                placeholder="Secondary IP Address(es)"
                                required={false}
                                message={"Please Enter a Secondary IP Address(es)"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"MAC Addresses (List for all NICs)"}
                                name="mac_addresses"
                                type={"text"}
                                placeholder="MAC Addresses"
                                required={false}
                                message={"Please Enter a MAC Addresses"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                className="mx-1"
                                label={"Network Interfaces"}
                                name="network_interfaces"
                                type={"text"}
                                placeholder="Network Interfaces"
                                required={false}
                                message={"Please Enter a Network Interfaces"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Switch Port Connections (Physical switch and port numbers)"}
                                name="switch_port_connections"
                                type={"text"}
                                placeholder="Switch Port Connections"
                                required={false}
                                message={"Please Enter a Switch Port Connections"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"VLAN Assignments"}
                                name="vlan_assignments"
                                type={"text"}
                                placeholder="VLAN Assignments"
                                required={false}
                                message={"Please Enter a VLAN Assignments"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Virtualization & Software Stack (for virtual hosts or VMs)</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                className="mx-1"
                                label={"Hypervisor"}
                                name="hypervisor"
                                type={"text"}
                                placeholder="Hypervisor"
                                required={false}
                                message={"Please Enter a Hypervisor"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Hypervisor Version/License Key"}
                                name="hypervisor_version"
                                type={"text"}
                                placeholder="Hypervisor Version/License Key"
                                required={false}
                                message={"Please Enter a Hypervisor Version/License Key"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Virtual Machine Name"}
                                name="vm_name"
                                type={"text"}
                                placeholder="Virtual Machine Name"
                                required={false}
                                message={"Please Enter a Virtual Machine Name"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Virtual Host/Cluster"}
                                name="virtual_host_cluster"
                                type={"text"}
                                placeholder="Virtual Host/Cluster"
                                required={false}
                                message={"Please Enter a Virtual Host/Cluster"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Guest Operating System"}
                                name="guest_os"
                                type={"text"}
                                placeholder="Guest Operating System"
                                required={false}
                                message={"Please Enter a Guest Operating System"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                className="mx-1"
                                label={"OS Version & Edition"}
                                name="os_version"
                                type={"text"}
                                placeholder="OS Version & Edition"
                                required={false}
                                message={"Please Enter a OS Version & Edition"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"OS License Key (if applicable)"}
                                name="os_license_key_vm"
                                type={"text"}
                                placeholder="OS License Key (if applicable)"
                                required={false}
                                message={"Please Enter a OS License Key (if applicable)"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Assigned vCPU/Cores"}
                                name="assigned_vcpu"
                                type={"text"}
                                placeholder="Assigned vCPU/Cores"
                                required={false}
                                message={"Please Enter a Assigned vCPU/Cores"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Assigned Memory"}
                                name="assigned_memory"
                                type={"text"}
                                placeholder="Assigned Memory"
                                required={false}
                                message={"Please Enter a Assigned Memory"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Assigned Virtual Disks"}
                                name="assigned_virtual_disks"
                                type={"text"}
                                placeholder="Assigned Virtual Disks"
                                required={false}
                                message={"Please Enter a Assigned Virtual Disks"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Application & Service Dependencies</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                className="mx-1"
                                label={"Primary Application/Service"}
                                name="primary_application"
                                type={"text"}
                                placeholder="Primary Application/Service"
                                required={false}
                                message={"Please Enter a Primary Application/Service"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Application Owner/Team"}
                                placeholder="Application Owner/Team"
                                name="application_owner"
                                required={false}
                                message={"Please Select a Application Owner/Team"}
                                options={[
                                    { value: "Owner", label: "Owner" },
                                    { value: "Team", label: "Team" },
                                ]}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Dependent Services"}
                                name="dependent_services"
                                type={"text"}
                                placeholder="Dependent Services"
                                required={false}
                                message={"Please Enter a Dependent Services"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Dependencies (What this server depends on)"}
                                name="dependencies"
                                type={"text"}
                                placeholder="Dependencies"
                                required={false}
                                message={"Please Enter a Dependencies"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                className="mx-1"
                                label={"Backup Configuration"}
                                name="backup_configuration"
                                type={"text"}
                                placeholder="Backup Configuration"
                                required={false}
                                message={"Please Enter a Backup Configuration"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Monitoring System"}
                                name="monitoring_system"
                                type={"text"}
                                placeholder="Monitoring System"
                                required={false}
                                message={"Please Enter a Monitoring System"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Monitoring Alerts Contact"}
                                name="monitoring_contact"
                                type={"text"}
                                placeholder="Monitoring Alerts Contact"
                                required={false}
                                message={"Please Enter a Monitoring Alerts Contact"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Financial & Procurement</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                label={"Cost Center/Department"}
                                className="mx-1"
                                name="cost_center"
                                placeholder="Cost Center/Department"
                                required={false}
                                message={"Cost Center/Department"}
                            />

                            <FormInput
                                label={"Business Justification/Purpose"}
                                className="mx-1"
                                name="business_justification"
                                placeholder="Business Justification/Purpose"
                                required={false}
                                message={"Please Enter a Business Justification/Purpose"}
                            />

                            <FormInput
                                label={"Vendor/Supplier Name"}
                                className="mx-1"
                                name="vendor_name"
                                placeholder="Vendor/Supplier Name"
                                required={false}
                                message={"Please Enter a Vendor/Supplier Name"}
                            />

                            <FormInput
                                label={"Purchase Cost"}
                                className="mx-1"
                                name="purchase_cost"
                                type={"number"}
                                placeholder="Purchase Cost"
                                required={false}
                                message={"Please Enter a Purchase Cost"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <CustomDate
                                label={"Warranty Start Date"}
                                className={`mx-1`}
                                name="warranty_start"
                                placeholder={"Warranty Start Date"}
                                message={"Please Enter a Warranty Start Date"}
                                required={false}
                                allowToday={true}
                            />

                            <CustomDate
                                label={"Warranty End Date"}
                                className={`mx-1`}
                                name="warranty_end"
                                placeholder={"Warranty End Date"}
                                message={"Please Enter a Warranty End Date"}
                                required={false}
                                allowToday={true}
                            />

                            <FormInput
                                label={"Expected Lifespan"}
                                className="mx-1"
                                name="expected_lifespan"
                                placeholder="Expected Lifespan"
                                required={false}
                                message={"Expected Lifespan"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Assignment Status</h5>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Assigned To"}
                                placeholder="Assigned To"
                                name="assigned_to"
                                required={false}
                                message={"Please Select a assigned to"}
                                options={users?.map((item) => ({
                                    value: item.id,
                                        label: `${item.name || ''} - ${item.email || ''}` 
                                }))}
                            />

                            <FormInput
                                label={"Managed By (IT Team or System Administrator)"}
                                className="mx-1"
                                name="managed_by"
                                placeholder="Managed By (IT Team or System Administrator)"
                                required={false}
                                message={"Please Enter Managed By"}
                            />

                            <CustomDate
                                label={"Assigned Date"}
                                className={`mx-1`}
                                name="assigned_date"
                                placeholder={"Assigned Date"}
                                message={"Please Enter a Assigned Date"}
                                required={false}
                                allowToday={true}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <SelectInput
                                className="mx-1"
                                label={"Status (Server Mode)"}
                                placeholder="Status (Server Mode)"
                                name="server_mode_status"
                                required={false}
                                message={"Please Select a Status (Server Mode)"}
                                options={[
                                    { value: "In Production", label: "In Production" },
                                    { value: "Staging", label: "Staging" },
                                    { value: "Testing", label: "Testing" },
                                    { value: "Decommissioned", label: "Decommissioned" },
                                    { value: "Spare", label: "Spare" },
                                    { value: "Others", label: "Others" },
                                ]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Physical Location"}
                                placeholder="Physical Location"
                                name="physical_location"
                                required={false}
                                message={"Please Select a Physical Location"}
                                options={[
                                    { value: "Building", label: "Building" },
                                    { value: "Floor", label: "Floor" },
                                    { value: "Room", label: "Room" },
                                    { value: "Desk Number", label: "Desk Number" },
                                ]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Status"}
                                placeholder="Status"
                                name="status"
                                required={false}
                                message={"Please Select a Status"}
                                options={[
                                    { value: "New", label: "New" },
                                    { value: "In Use", label: "In Use" },
                                    { value: "In Stock/Spare", label: "In Stock/Spare" },
                                    { value: "In Repair", label: "In Repair" },
                                    { value: "Retired", label: "Retired" },
                                    { value: "Lost/Stolen", label: "Lost/Stolen" },
                                    { value: "Disposed", label: "Disposed" },
                                ]}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Software & Compliance</h5>
                        <div className={`${style.form_inputBox}`}>
                            <FormInput
                                label={"Operating System (with version)"}
                                className="mx-1"
                                name="operating_system_compliance"
                                placeholder="Operating System (with version)"
                                required={false}
                                message={"Operating System is required"}
                            />

                            <FormInput
                                label={"OS License Key (if applicable)"}
                                className="mx-1"
                                name="os_license_key_compliance"
                                placeholder="OS License Key (if applicable)"
                                required={false}
                                message={"OS License Key is required"}
                            />

                            <FormInput
                                label={"Virtualization Platform"}
                                className="mx-1"
                                name="virtualization_platform"
                                placeholder="Virtualization Platform"
                                required={false}
                                message={"Virtualization Platform"}
                            />

                            <FormInput
                                label={"Hypervisor Details (if applicable)"}
                                className="mx-1"
                                name="hypervisor_details"
                                placeholder="Hypervisor Details (if applicable)"
                                required={false}
                                message={"Hypervisor Details"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <SelectInput
                                className="mx-1"
                                label={"Server Role"}
                                placeholder="Server Role"
                                name="server_role_compliance"
                                required={false}
                                message={"Please Select a Server Role"}
                                options={[
                                    { value: "SQL Server", label: "SQL Server" },
                                    { value: "Web Server", label: "Web Server" },
                                    { value: "File Server", label: "File Server" },
                                    { value: "others", label: "others" },
                                ]}
                            />

                            <FormInput
                                label={"IP Addresses"}
                                className="mx-1"
                                name="ip_addresses_compliance"
                                placeholder="IP Addresses"
                                required={false}
                                message={"IP Addresses"}
                            />

                            <FormInput
                                label={"Subnet/VLAN (for each interface)"}
                                className="mx-1"
                                name="subnet_vlan"
                                placeholder="Subnet/VLAN"
                                required={false}
                                message={"Subnet/VLAN"}
                            />

                            <FormInput
                                label={"Backup Schedule/Configuration (if known)"}
                                className="mx-1"
                                name="backup_schedule"
                                placeholder="Backup Schedule/Configuration"
                                required={false}
                                message={"Backup Schedule"}
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
                                options={[
                                    { value: "Owned", label: "Owned" },
                                    { value: "Leased", label: "Leased" },
                                    { value: "Rented", label: "Rented" },
                                    { value: "Contract", label: "Contract" },
                                ]}
                            />

                            <CustomDate
                                label={"Lease Expiry Date (if applicable)"}
                                className={`mx-1`}
                                name="lease_expiry"
                                placeholder={"Lease Expiry Date"}
                                message={"Please Enter a Lease Expiry Date"}
                                required={false}
                                allowToday={true}
                            />

                            <CustomDate
                                label={"Next Scheduled Maintenance Date"}
                                className={`mx-1`}
                                name="next_maintenance"
                                placeholder={"Next Scheduled Maintenance Date"}
                                message={"Please Enter a Maintenance Date"}
                                required={false}
                                allowToday={true}
                            />

                            <CustomDate
                                label={"Decommission/Disposal Date (Future)"}
                                className={`mx-1`}
                                name="disposal_date"
                                placeholder={"Decommission/Disposal Date"}
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
                                message={"Please Select a Disposal Method"}
                                options={[
                                    { value: "Sold", label: "Sold" },
                                    { value: "Recycled", label: "Recycled" },
                                    { value: "Donated", label: "Donated" },
                                    { value: "E-Waste", label: "E-Waste" },
                                    { value: "Return to Lessor", label: "Return to Lessor" },
                                ]}
                            />

                            <FormInput
                                label={"Depreciation Value"}
                                className="mx-1"
                                name="depreciation_value"
                                type={"number"}
                                placeholder="Depreciation Value"
                                required={false}
                                message={"Depreciation Value"}
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

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Cloud/Virtual Specific (for cloud instances)</h5>
                        <div className={`${style.form_inputBox}`}>
                            <SelectInput
                                className="mx-1"
                                label={"Cloud Provider"}
                                placeholder="Cloud Provider"
                                name="cloud_provider"
                                required={false}
                                message={"Please Select a Cloud Provider"}
                                options={[
                                    { value: "AWS", label: "AWS" },
                                    { value: "Azure", label: "Azure" },
                                    { value: "GCP", label: "GCP" },
                                    { value: "Others", label: "Others" },
                                ]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Region/Availability Zone"}
                                placeholder="Region/Availability Zone"
                                name="region_zone"
                                required={false}
                                message={"Please Select a Region/Availability Zone"}
                                options={[]}
                            />

                            <FormInput
                                label={"Instance Type/Size"}
                                className="mx-1"
                                name="instance_type"
                                placeholder="Instance Type/Size"
                                required={false}
                                message={"Instance Type/Size"}
                            />

                            <FormInput
                                label={"Instance ID"}
                                className="mx-1"
                                name="instance_id"
                                placeholder="Instance ID"
                                required={false}
                                message={"Instance ID"}
                            />

                            <FormInput
                                label={"Resource Group/VPC"}
                                className="mx-1"
                                name="resource_group"
                                placeholder="Resource Group/VPC"
                                required={false}
                                message={"Resource Group/VPC"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                label={"Cloud Account/Subscription"}
                                className="mx-1"
                                name="cloud_account"
                                placeholder="Cloud Account/Subscription"
                                required={false}
                                message={"Cloud Account/Subscription"}
                            />

                            <FormInput
                                label={"Monthly Cost Estimate"}
                                className="mx-1"
                                name="monthly_cost"
                                type={"number"}
                                placeholder="Monthly Cost Estimate"
                                required={false}
                                message={"Monthly Cost Estimate"}
                            />

                            <FormInput
                                label={"Auto-scaling Group (if applicable)"}
                                className="mx-1"
                                name="auto_scaling_group"
                                placeholder="Auto-scaling Group"
                                required={false}
                                message={"Auto-scaling Group"}
                            />

                            <FormInput
                                label={"Snapshot/Image Policy"}
                                className="mx-1"
                                name="snapshot_policy"
                                placeholder="Snapshot/Image Policy"
                                required={false}
                                message={"Snapshot/Image Policy"}
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
export default connect(mapStateToProps, ACTIONS)(ServerForm);