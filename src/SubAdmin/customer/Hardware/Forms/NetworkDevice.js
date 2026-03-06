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


function NetworkDevice({
    Red_Assets,
    setCode, code,
    pagBody,
    assetsType, setAssetsType,
    getBarCode,
    CreateAssetsFun,
    GetAllBrandsManufacturer,
    GetAllEmpList,
    EditAssetsData,
    UpdateAssets,
    GetAllHardware
}) {
    const [form] = Form.useForm();
    const users = Red_Assets?.Users?.[0]?.data
    const [singleInput, setSingleInput] = useState(false)
    const [messageApi, contextHolder] = message.useMessage();
    const accessToken = useSelector((state) => state.Red_Auth.accessToken);
    const barcode = Red_Assets?.barcode?.[0]?.data?.barcode
    const [actionType, setActionType] = useState('');
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
            device_hostname: values?.device_hostname,
            device_type: values?.device_type,
            sub_type: values?.sub_type,
            brand_manufacturer: values?.brand_manufacturer,
            model_number: values?.model_number,
            serial_number: values?.serial_number,
            date_deployed: values?.date_deployed,
            request_ticket: values?.request_ticket,
            assigned_to: values?.assigned_to,
            form_factor: values?.form_factor,
            chassis_model: values?.chassis_model,
            slot_module_config: values?.slot_module_config,
            power_supply_details: values?.power_supply_details,
            cooling_details: values?.cooling_details,
            rack_location: values?.rack_location,
            rack_position: values?.rack_position,
            physical_port_count: values?.physical_port_count,
            port_types: values?.port_types,
            management_ip_primary: values?.management_ip_primary,
            oob_management_ip: values?.oob_management_ip,
            management_interface: values?.management_interface,
            management_vlan: values?.management_vlan,
            mac_address: values?.mac_address,
            default_gateway: values?.default_gateway,
            dns_servers: values?.dns_servers,
            domain_name: values?.domain_name,
            configured_hostname: values?.configured_hostname,
            network_role: values?.network_role,
            network_os: values?.network_os,
            os_version: values?.os_version,
            config_register: values?.config_register,
            licensed_features: values?.licensed_features,
            license_keys: values?.license_keys,
            license_expiry: values?.license_expiry,
            last_firmware_update: values?.last_firmware_update,
            next_scheduled_update: values?.next_scheduled_update,
            config_backup_location: values?.config_backup_location,
            uplink_device: values?.uplink_device,
            uplink_port_remote: values?.uplink_port_remote,
            local_uplink_port: values?.local_uplink_port,
            uplink_speed_media: values?.uplink_speed_media,
            circuit_wan: values?.circuit_wan,
            vlan_config: values?.vlan_config,
            stp_role: values?.stp_role,
            routing_protocols: values?.routing_protocols,
            management_access_methods: values?.management_access_methods,
            tacacs_radius_server: values?.tacacs_radius_server,
            snmp_community_strings: values?.snmp_community_strings,
            syslog_server: values?.syslog_server,
            netflow_collector: values?.netflow_collector,
            access_lists: values?.access_lists,
            security_zone: values?.security_zone,
            compliance_standards: values?.compliance_standards,
            po_number: values?.po_number,
            vendor_reseller: values?.vendor_reseller,
            purchase_date: values?.purchase_date,
            purchase_cost: values?.purchase_cost,
            cost_center: values?.cost_center,
            warranty_dates: values?.warranty_dates,
            support_contract_number: values?.support_contract_number,
            support_level: values?.support_level,
            support_expiry: values?.support_expiry,
            lease_terms: values?.lease_terms,
            ap_name_ssid: values?.ap_name_ssid,
            radio_types: values?.radio_types,
            radio_channels: values?.radio_channels,
            transmit_power: values?.transmit_power,
            controller_type: values?.controller_type,
            wireless_controller: values?.wireless_controller,
            connected_clients: values?.connected_clients,
            ssids_supported: values?.ssids_supported,
            security_policy_count: values?.security_policy_count,
            vpn_tunnel_capacity: values?.vpn_tunnel_capacity,
            concurrent_sessions: values?.concurrent_sessions,
            threat_prevention_license: values?.threat_prevention_license,
            url_filtering_license: values?.url_filtering_license,
            ips_signature_version: values?.ips_signature_version,
            security_zone_config: values?.security_zone_config,
            ha_role: values?.ha_role,
            device_status: values?.device_status,
            criticality_level: values?.criticality_level,
            planned_replacement_date: values?.planned_replacement_date,
            eol_date: values?.eol_date,
            eos_date: values?.eos_date,
            decommission_date: values?.decommission_date,
            replacement_asset_tag: values?.replacement_asset_tag,
            disposal_method: values?.disposal_method,
            primary_admin_team: values?.primary_admin_team,
            oncall_contact: values?.oncall_contact,
            vendor_support_contact: values?.vendor_support_contact,
            notes: values?.notes,
            rack_diagram_ref: values?.rack_diagram_ref,
            network_diagram_ref: values?.network_diagram_ref,
            attachments: values?.attachments,
            record_created: values?.record_created,
            last_updated: values?.last_updated
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
        }else {
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
                device_hostname: values?.device_hostname,
                device_type: values?.device_type,
                sub_type: values?.sub_type,
                brand_manufacturer: values?.brand_manufacturer,
                model_number: values?.model_number,
                serial_number: values?.serial_number,
                date_deployed: values?.date_deployed,
                request_ticket: values?.request_ticket,
                assigned_to: values?.assigned_to,
                form_factor: values?.form_factor,
                chassis_model: values?.chassis_model,
                slot_module_config: values?.slot_module_config,
                power_supply_details: values?.power_supply_details,
                cooling_details: values?.cooling_details,
                rack_location: values?.rack_location,
                rack_position: values?.rack_position,
                physical_port_count: values?.physical_port_count,
                port_types: values?.port_types,
                management_ip_primary: values?.management_ip_primary,
                oob_management_ip: values?.oob_management_ip,
                management_interface: values?.management_interface,
                management_vlan: values?.management_vlan,
                mac_address: values?.mac_address,
                default_gateway: values?.default_gateway,
                dns_servers: values?.dns_servers,
                domain_name: values?.domain_name,
                configured_hostname: values?.configured_hostname,
                network_role: values?.network_role,
                network_os: values?.network_os,
                os_version: values?.os_version,
                config_register: values?.config_register,
                licensed_features: values?.licensed_features,
                license_keys: values?.license_keys,
                license_expiry: values?.license_expiry,
                last_firmware_update: values?.last_firmware_update,
                next_scheduled_update: values?.next_scheduled_update,
                config_backup_location: values?.config_backup_location,
                uplink_device: values?.uplink_device,
                uplink_port_remote: values?.uplink_port_remote,
                local_uplink_port: values?.local_uplink_port,
                uplink_speed_media: values?.uplink_speed_media,
                circuit_wan: values?.circuit_wan,
                vlan_config: values?.vlan_config,
                stp_role: values?.stp_role,
                routing_protocols: values?.routing_protocols,
                management_access_methods: values?.management_access_methods,
                tacacs_radius_server: values?.tacacs_radius_server,
                snmp_community_strings: values?.snmp_community_strings,
                syslog_server: values?.syslog_server,
                netflow_collector: values?.netflow_collector,
                access_lists: values?.access_lists,
                security_zone: values?.security_zone,
                compliance_standards: values?.compliance_standards,
                po_number: values?.po_number,
                vendor_reseller: values?.vendor_reseller,
                purchase_date: values?.purchase_date,
                purchase_cost: values?.purchase_cost,
                cost_center: values?.cost_center,
                warranty_dates: values?.warranty_dates,
                support_contract_number: values?.support_contract_number,
                support_level: values?.support_level,
                support_expiry: values?.support_expiry,
                lease_terms: values?.lease_terms,
                ap_name_ssid: values?.ap_name_ssid,
                radio_types: values?.radio_types,
                radio_channels: values?.radio_channels,
                transmit_power: values?.transmit_power,
                controller_type: values?.controller_type,
                wireless_controller: values?.wireless_controller,
                connected_clients: values?.connected_clients,
                ssids_supported: values?.ssids_supported,
                security_policy_count: values?.security_policy_count,
                vpn_tunnel_capacity: values?.vpn_tunnel_capacity,
                concurrent_sessions: values?.concurrent_sessions,
                threat_prevention_license: values?.threat_prevention_license,
                url_filtering_license: values?.url_filtering_license,
                ips_signature_version: values?.ips_signature_version,
                security_zone_config: values?.security_zone_config,
                ha_role: values?.ha_role,
                device_status: values?.device_status,
                criticality_level: values?.criticality_level,
                planned_replacement_date: values?.planned_replacement_date,
                eol_date: values?.eol_date,
                eos_date: values?.eos_date,
                decommission_date: values?.decommission_date,
                replacement_asset_tag: values?.replacement_asset_tag,
                disposal_method: values?.disposal_method,
                primary_admin_team: values?.primary_admin_team,
                oncall_contact: values?.oncall_contact,
                vendor_support_contact: values?.vendor_support_contact,
                notes: values?.notes,
                rack_diagram_ref: values?.rack_diagram_ref,
                network_diagram_ref: values?.network_diagram_ref,
                attachments: values?.attachments,
                record_created: values?.record_created,
                last_updated: values?.last_updated
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
                            <h5 className="mx-1">New Asset Form Networking Equipment</h5>
                            <QRCODE
                                value={
                                    code?.mode === "Edit" ? EditAssetsData?.asset_tag : barcode
                                }
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Core Identification & Classification</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                className="mx-1"
                                label={"Assets Tag/ID Number"}
                                name="asset_tag"
                                type={"text"}
                                placeholder="Assets Tag/ID Number"
                                required={false}
                                readOnly={true}
                                message={"Please Enter a ID Number"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Device Hostname"}
                                name="device_hostname"
                                type={"text"}
                                placeholder="Device Hostname"
                                required={true}
                                message={"Please Enter a Device Hostname"}
                            />

                            <SelectInput
                                label={"Device Type"}
                                className={"mx-1"}
                                name="device_type"
                                placeholder="Device Type"
                                message="Please Select a Device Type"
                                required={true}
                                showSearch={true}
                                options={[
                                    { value: "Switch", label: "Switch" },
                                    { value: "Router", label: "Router" },
                                    { value: "Firewall", label: "Firewall" },
                                    { value: "Wireless Access Point", label: "Wireless Access Point" },
                                    { value: "Wireless Controller", label: "Wireless Controller" },
                                    { value: "Load Balancer", label: "Load Balancer" },
                                    { value: "Modem", label: "Modem" },
                                    { value: "Media Converter", label: "Media Converter" },
                                    { value: "Network Appliance", label: "Network Appliance" },
                                    { value: "SAN Switch", label: "SAN Switch" },
                                    { value: "KVM/IP KVM", label: "KVM/IP KVM" },
                                ]}
                            />

                            <SelectInput
                                label={"Sub-Type"}
                                className={"mx-1"}
                                name="sub_type"
                                placeholder="Sub-Type"
                                message="Please Select a Sub-Type"
                                required={true}
                                showSearch={true}
                                options={[
                                    { value: "Core Switch", label: "Core Switch" },
                                    { value: "Distribution Switch", label: "Distribution Switch" },
                                    { value: "Access Switch", label: "Access Switch" },
                                    { value: "Edge Router", label: "Edge Router" },
                                    { value: "VPN Concentrator", label: "VPN Concentrator" },
                                ]}
                            />

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
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                label={"Model Number"}
                                className="mx-1"
                                name="model_number"
                                placeholder="Model Number"
                                required={true}
                                message={"Please Enter a Model Number"}
                                type={"text"}
                            />

                            <FormInput
                                label={"Serial Number/Chassis ID"}
                                className="mx-1"
                                name="serial_number"
                                placeholder="Serial Number/Chassis ID"
                                type={"text"}
                                required={true}
                                message={"Please Enter a Serial Number/Chassis ID"}
                            />

                            <CustomDate
                                label={"Date Deployed/Commissioned"}
                                className={`mx-1`}
                                name="date_deployed"
                                placeholder={"Date Deployed/Commissioned"}
                                message={"Please Enter a Date Deployed/Commissioned"}
                                required={true}
                                allowToday={true}
                            />

                            <FormInput
                                label={"Request Ticket/Reference Number"}
                                className="mx-1"
                                name="request_ticket"
                                placeholder="Request Ticket/Reference Number"
                                required={true}
                                message={"Please Enter a Request Ticket/Reference Number"}
                                type={"text"}
                            />
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
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Physical Hardware Details</h5>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Form Factor"}
                                placeholder="Form Factor"
                                name="form_factor"
                                required={false}
                                message={"Please Select Form Factor"}
                                options={[
                                    { value: "1U", label: "1U" },
                                    { value: "2U", label: "2U" },
                                    { value: "Chassis-based", label: "Chassis-based" },
                                    { value: "Wall-mount", label: "Wall-mount" },
                                    { value: "Desktop", label: "Desktop" }
                                ]}
                            />

                            <FormInput
                                label={"Chassis Model"}
                                className="mx-1"
                                name="chassis_model"
                                placeholder="Chassis Model"
                                required={false}
                                message={"Chassis Model"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Slot/Module Configuration"}
                                placeholder="Slot/Module Configuration"
                                name="slot_module_config"
                                required={false}
                                message={"Please Select a Slot/Module Configuration"}
                                options={[]}
                            />

                            <FormInput
                                label={"Power Supply Details"}
                                className="mx-1"
                                name="power_supply_details"
                                placeholder="Quantity, type: AC/DC, PoE capacity if applicable"
                                required={false}
                                message={"Power Supply Details"}
                            />

                            <FormInput
                                label={"Cooling/Fan Tray Details"}
                                className="mx-1"
                                name="cooling_details"
                                placeholder="Cooling/Fan Tray Details"
                                required={false}
                                message={"Cooling/Fan Tray Details"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <SelectInput
                                className="mx-1"
                                label={"Rack Location"}
                                placeholder="Rack Location"
                                name="rack_location"
                                required={false}
                                message={"Please Select Rack Location"}
                                options={[
                                    { value: "Data Center", label: "Data Center" },
                                    { value: "IDF", label: "IDF" },
                                    { value: "MDF", label: "MDF" },
                                    { value: "Closet Name", label: "Closet Name" }
                                ]}
                            />

                            <FormInput
                                label={"Rack Number & U Position"}
                                className="mx-1"
                                name="rack_position"
                                placeholder="Rack Number & U Position"
                                required={false}
                                message={"Rack Number & U Position"}
                            />

                            <FormInput
                                label={"Physical Port Count"}
                                className="mx-1"
                                name="physical_port_count"
                                placeholder="Total interfaces"
                                required={false}
                                message={"Physical Port Count"}
                            />

                            <FormInput
                                label={"Port Types"}
                                className="mx-1"
                                name="port_types"
                                placeholder="e.g., 48x 1GbE, 4x 10Gb SFP+, 2x 40Gb QSFP"
                                required={false}
                                message={"Port Types"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Network Configuration & Addressing</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                label={"Management IP Address (Primary)"}
                                className="mx-1"
                                name="management_ip_primary"
                                placeholder="e.g., 192.168.1.10"
                                required={false}
                                message={"Management IP Address (Primary)"}
                            />

                            <FormInput
                                label={"Out-of-Band Management IP"}
                                className="mx-1"
                                name="oob_management_ip"
                                placeholder="e.g., 192.168.1.11"
                                required={false}
                                message={"Out-of-Band Management IP"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Management Interface"}
                                placeholder="Management Interface"
                                name="management_interface"
                                required={false}
                                message={"Please Select Management Interface"}
                                options={[
                                    { value: "vlan1", label: "vlan1" },
                                    { value: "mgmt0", label: "mgmt0" },
                                    { value: "me0", label: "me0" },
                                    { value: "other", label: "Other" }
                                ]}
                            />

                            <FormInput
                                label={"Management VLAN"}
                                className="mx-1"
                                name="management_vlan"
                                placeholder="e.g., 10"
                                required={false}
                                message={"Management VLAN"}
                            />

                            <FormInput
                                label={"MAC Address (Base MAC/System MAC)"}
                                className="mx-1"
                                name="mac_address"
                                placeholder="e.g., 00:1A:2B:3C:4D:5E"
                                required={false}
                                message={"MAC Address"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                label={"Default Gateway"}
                                className="mx-1"
                                name="default_gateway"
                                placeholder="e.g., 192.168.1.1"
                                required={false}
                                message={"Default Gateway"}
                            />

                            <FormInput
                                label={"DNS Servers"}
                                className="mx-1"
                                name="dns_servers"
                                placeholder="e.g., 8.8.8.8, 8.8.4.4"
                                required={false}
                                message={"DNS Servers"}
                            />

                            <FormInput
                                label={"Domain Name"}
                                className="mx-1"
                                name="domain_name"
                                placeholder="e.g., example.com"
                                required={false}
                                message={"Domain Name"}
                            />

                            <FormInput
                                label={"Configured Hostname"}
                                className="mx-1"
                                name="configured_hostname"
                                placeholder="e.g., router-nyc-01"
                                required={false}
                                message={"Configured Hostname"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Network Role"}
                                placeholder="Network Role"
                                name="network_role"
                                required={false}
                                message={"Please Select Network Role"}
                                options={[
                                    { value: "Core", label: "Core" },
                                    { value: "Distribution", label: "Distribution" },
                                    { value: "Access", label: "Access" },
                                    { value: "Edge", label: "Edge" },
                                    { value: "DMZ", label: "DMZ" },
                                    { value: "Management", label: "Management" }
                                ]}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Software & Operating System</h5>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Network OS"}
                                placeholder="Network OS"
                                name="network_os"
                                required={false}
                                message={"Please Select Network OS"}
                                options={[
                                    { value: "IOS-XE", label: "IOS-XE" },
                                    { value: "NX-OS", label: "NX-OS" },
                                    { value: "JunOS", label: "JunOS" },
                                    { value: "ScreenOS", label: "ScreenOS" },
                                    { value: "PanOS", label: "PanOS" },
                                    { value: "IOS", label: "IOS" },
                                    { value: "IOS-XR", label: "IOS-XR" },
                                    { value: "FTOS", label: "FTOS" },
                                    { value: "EOS", label: "EOS" },
                                    { value: "other", label: "Other OS" }
                                ]}
                            />

                            <FormInput
                                label={"OS Version"}
                                className="mx-1"
                                name="os_version"
                                placeholder="e.g., 16.12.4, 9.1.7"
                                required={false}
                                message={"OS Version"}
                            />

                            <FormInput
                                label={"Configuration Register/BOOT Version"}
                                className="mx-1"
                                name="config_register"
                                placeholder="e.g., 0x2102, BOOTLDR: 1.0.0.0"
                                required={false}
                                message={"Configuration Register/BOOT Version"}
                            />

                            <FormInput
                                label={"Licensed Features"}
                                className="mx-1"
                                name="licensed_features"
                                placeholder="e.g., BGP, OSPF, MPLS, Security Plus"
                                required={false}
                                message={"Licensed Features"}
                            />

                            <FormInput
                                label={"License Keys/Authorization Codes"}
                                className="mx-1"
                                name="license_keys"
                                placeholder="Enter license keys (secure field)"
                                type="password"
                                required={false}
                                message={"License Keys/Authorization Codes"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                label={"Feature License Expiration Dates"}
                                className="mx-1"
                                name="license_expiry"
                                placeholder="e.g., 2024-12-31, 2025-06-15"
                                required={false}
                                message={"Feature License Expiration Dates"}
                            />

                            <CustomDate
                                label={"Last Firmware Update Date"}
                                className={`mx-1`}
                                name="last_firmware_update"
                                placeholder={"Last Firmware Update Date"}
                                message={"Last Firmware Update Date"}
                                required={false}
                                allowToday={true}
                            />

                            <CustomDate
                                label={"Next Scheduled Update"}
                                className={`mx-1`}
                                name="next_scheduled_update"
                                placeholder={"Next Scheduled Update"}
                                message={"Next Scheduled Update"}
                                required={false}
                                allowToday={true}
                            />

                            <FormInput
                                label={"Configuration File Location/Backup Path"}
                                className="mx-1"
                                name="config_backup_location"
                                placeholder="e.g., tftp://server/configs/, flash:/backup/"
                                required={false}
                                message={"Configuration File Location/Backup Path"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Connectivity & Topology</h5>
                        <div className={`${style.form_inputBox}`}>
                            <FormInput
                                label={"Uplink Device"}
                                className="mx-1"
                                name="uplink_device"
                                placeholder="e.g., Core-Switch-01, 10.0.0.1"
                                required={false}
                                message={"Uplink Device"}
                            />

                            <FormInput
                                label={"Uplink Port (Remote device port)"}
                                className="mx-1"
                                name="uplink_port_remote"
                                placeholder="e.g., GigabitEthernet1/0/1, Te1/1"
                                required={false}
                                message={"Uplink Port (Remote)"}
                            />

                            <FormInput
                                label={"Local Uplink Port (Port on this device)"}
                                className="mx-1"
                                name="local_uplink_port"
                                placeholder="e.g., GigabitEthernet0/1, Gi0/0/24"
                                required={false}
                                message={"Local Uplink Port"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Uplink Speed & Media"}
                                placeholder="Uplink Speed & Media"
                                name="uplink_speed_media"
                                required={false}
                                message={"Please Select Uplink Speed & Media"}
                                options={[
                                    { value: "10MbE-copper", label: "10MbE copper" },
                                    { value: "100MbE-copper", label: "100MbE copper" },
                                    { value: "1GbE-copper", label: "1GbE copper" },
                                    { value: "1GbE-fiber", label: "1GbE fiber" },
                                    { value: "10GbE-fiber", label: "10GbE fiber" },
                                    { value: "25GbE-fiber", label: "25GbE fiber" },
                                    { value: "40GbE-fiber", label: "40GbE fiber" },
                                    { value: "100GbE-fiber", label: "100GbE fiber" },
                                    { value: "other", label: "Other" }
                                ]}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                label={"Circuit/WAN Connection"}
                                className="mx-1"
                                name="circuit_wan"
                                placeholder="e.g., ISP: Verizon, Circuit-ID: VZ.12345.678"
                                required={false}
                                message={"Circuit/WAN Connection"}
                            />

                            <FormInput
                                label={"VLAN Database/Trunk Configuration"}
                                className="mx-1"
                                name="vlan_config"
                                placeholder="e.g., VLANs: 10,20,30, Trunk allowed: 10-50"
                                required={false}
                                message={"VLAN Database/Trunk Configuration"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"STP/RSTP Root Role"}
                                placeholder="STP/RSTP Root Role"
                                name="stp_role"
                                required={false}
                                message={"Please Select STP/RSTP Root Role"}
                                options={[
                                    { value: "Root Bridge", label: "Root Bridge" },
                                    { value: "Secondary Root", label: "Secondary Root" },
                                    { value: "Designated Port", label: "Designated Port" },
                                    { value: "Alternate Port", label: "Alternate Port" },
                                    { value: "Backup Port", label: "Backup Port" },
                                    { value: "Disabled", label: "Disabled" },
                                    { value: "Not Applicable", label: "Not Applicable" }
                                ]}
                            />

                            <FormInput
                                label={"Routing Protocol Participation"}
                                className="mx-1"
                                name="routing_protocols"
                                placeholder="e.g., BGP AS: 65001, OSPF Area: 0"
                                required={false}
                                message={"Routing Protocol Participation"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Security Configuration</h5>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Management Access Methods"}
                                placeholder="Select Access Methods"
                                name="management_access_methods"
                                required={false}
                                message={"Please Select Management Access Methods"}
                                isMulti={true}
                                options={[
                                    { value: "SSH", label: "SSH" },
                                    { value: "HTTPS", label: "HTTPS" },
                                    { value: "HTTP", label: "HTTP" },
                                    { value: "SNMP", label: "SNMP" },
                                    { value: "Console", label: "Console" },
                                    { value: "Telnet", label: "Telnet" },
                                    { value: "API", label: "API" },
                                    { value: "other", label: "Other" }
                                ]}
                            />

                            <FormInput
                                label={"TACACS/RADIUS Server"}
                                className="mx-1"
                                name="tacacs_radius_server"
                                placeholder="e.g., Primary: 10.1.1.10, Backup: 10.1.1.11"
                                required={false}
                                message={"TACACS/RADIUS Server"}
                            />

                            <FormInput
                                label={"SNMP Community Strings"}
                                className="mx-1"
                                name="snmp_community_strings"
                                placeholder="Enter SNMP community strings"
                                type="text"
                                required={false}
                                message={"SNMP Community Strings"}
                            />

                            <FormInput
                                label={"Syslog Server Destination"}
                                className="mx-1"
                                name="syslog_server"
                                placeholder="e.g., 10.2.2.10:514, syslog.company.com"
                                required={false}
                                message={"Syslog Server Destination"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                label={"NetFlow/IPFIX Collector"}
                                className="mx-1"
                                name="netflow_collector"
                                placeholder="e.g., 10.3.3.10:9995, netflow.company.com"
                                required={false}
                                message={"NetFlow/IPFIX Collector"}
                            />

                            <FormInput
                                label={"Access Control Lists Applied"}
                                className="mx-1"
                                name="access_lists"
                                placeholder="e.g., ACL-INBOUND, ACL-MGMT, ACL-DMZ"
                                required={false}
                                message={"Access Control Lists Applied"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Security Zone/Context"}
                                placeholder="Security Zone/Context"
                                name="security_zone"
                                required={false}
                                message={"Please Select Security Zone/Context"}
                                options={[
                                    { value: "Inside", label: "Inside" },
                                    { value: "Outside", label: "Outside" },
                                    { value: "DMZ", label: "DMZ" },
                                    { value: "Trust", label: "Trust" },
                                    { value: "Untrust", label: "Untrust" },
                                    { value: "Management", label: "Management" },
                                    { value: "Guest", label: "Guest" },
                                    { value: "Data", label: "Data" },
                                    { value: "Voice", label: "Voice" }
                                ]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Compliance Standards"}
                                placeholder="Compliance Standards"
                                name="compliance_standards"
                                required={false}
                                message={"Please Select Compliance Standards"}
                                isMulti={true}
                                options={[
                                    { value: "PCI-DSS", label: "PCI-DSS" },
                                    { value: "NIST", label: "NIST" },
                                    { value: "HIPAA", label: "HIPAA" },
                                    { value: "GDPR", label: "GDPR" },
                                    { value: "SOX", label: "SOX" },
                                    { value: "ISO-27001", label: "ISO 27001" },
                                    { value: "CIS", label: "CIS Benchmarks" },
                                    { value: "other", label: "Other" }
                                ]}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Financial & Procurement</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                label={"Purchase Order Number"}
                                className="mx-1"
                                name="po_number"
                                placeholder="e.g., PO-2024-00123"
                                required={false}
                                message={"Purchase Order Number"}
                            />

                            <FormInput
                                label={"Vendor/Reseller"}
                                className="mx-1"
                                name="vendor_reseller"
                                placeholder="e.g., Cisco, CDW, Amazon Business"
                                required={false}
                                message={"Vendor/Reseller"}
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
                                label={"Purchase Cost"}
                                className="mx-1"
                                name="purchase_cost"
                                placeholder="e.g., $5,000.00"
                                required={false}
                                message={"Purchase Cost"}
                            />

                            <FormInput
                                label={"Cost Center/Department"}
                                className="mx-1"
                                name="cost_center"
                                placeholder="e.g., IT-Network, Dept-1234"
                                required={false}
                                message={"Cost Center/Department"}
                            />

                            <FormInput
                                label={"Warranty Start/End Dates"}
                                className="mx-1"
                                name="warranty_dates"
                                placeholder="e.g., 2024-01-15 to 2027-01-14"
                                required={false}
                                message={"Warranty Start/End Dates"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                label={"SmartNet/Support Contract Number"}
                                className="mx-1"
                                name="support_contract_number"
                                placeholder="e.g., CON-12345678"
                                required={false}
                                message={"SmartNet/Support Contract Number"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Support Level"}
                                placeholder="Support Level"
                                name="support_level"
                                required={false}
                                message={"Please Select Support Level"}
                                options={[
                                    { value: "8x5", label: "8x5 Business Hours" },
                                    { value: "8x5xNBD", label: "8x5 Next Business Day" },
                                    { value: "24x7", label: "24x7" },
                                    { value: "24x7x4", label: "24x7 with 4-hour replacement" },
                                    { value: "24x7x2", label: "24x7 with 2-hour replacement" },
                                    { value: "SmartNet", label: "Cisco SmartNet" },
                                    { value: "no-support", label: "No Support" }
                                ]}
                            />

                            <CustomDate
                                label={"Support Expiry Date"}
                                className={`mx-1`}
                                name="support_expiry"
                                placeholder={"Support Expiry Date"}
                                message={"Support Expiry Date"}
                                required={false}
                                allowToday={true}
                            />

                            <FormInput
                                label={"Lease/Rental Terms"}
                                className="mx-1"
                                name="lease_terms"
                                placeholder="e.g., 36-month lease, $300/month"
                                required={false}
                                message={"Lease/Rental Terms"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Monitoring & Management</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                label={"AP Name/SSID Broadcast Name"}
                                className="mx-1"
                                name="ap_name_ssid"
                                placeholder="e.g., AP-Floor1-01, Corp-WiFi"
                                required={false}
                                message={"AP Name/SSID Broadcast Name"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Radio Types"}
                                placeholder="Radio Types"
                                name="radio_types"
                                required={false}
                                message={"Please Select Radio Types"}
                                isMulti={true}
                                options={[
                                    { value: "802.11a", label: "802.11a" },
                                    { value: "802.11b", label: "802.11b" },
                                    { value: "802.11g", label: "802.11g" },
                                    { value: "802.11n", label: "802.11n" },
                                    { value: "802.11ac", label: "802.11ac (Wi-Fi 5)" },
                                    { value: "802.11ax", label: "802.11ax (Wi-Fi 6)" },
                                    { value: "802.11be", label: "802.11be (Wi-Fi 7)" }
                                ]}
                            />

                            <FormInput
                                label={"Radio Channels/Frequencies"}
                                className="mx-1"
                                name="radio_channels"
                                placeholder="e.g., Ch 36 (5GHz), Ch 1,6,11 (2.4GHz)"
                                required={false}
                                message={"Radio Channels/Frequencies"}
                            />

                            <FormInput
                                label={"Transmit Power Settings"}
                                className="mx-1"
                                name="transmit_power"
                                placeholder="e.g., 15 dBm (2.4GHz), 17 dBm (5GHz)"
                                required={false}
                                message={"Transmit Power Settings"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <SelectInput
                                className="mx-1"
                                label={"Controller Managed/Standalone"}
                                placeholder="Management Type"
                                name="controller_type"
                                required={false}
                                message={"Please Select Management Type"}
                                options={[
                                    { value: "Controller-Managed", label: "Controller Managed" },
                                    { value: "Standalone", label: "Standalone" },
                                    { value: "Cloud-Managed", label: "Cloud Managed" },
                                    { value: "Mesh", label: "Mesh" }
                                ]}
                            />

                            <FormInput
                                label={"Wireless Controller Name"}
                                className="mx-1"
                                name="wireless_controller"
                                placeholder="e.g., WLC-5508-01, Meraki-MX-Cloud"
                                required={false}
                                message={"Wireless Controller Name"}
                            />

                            <FormInput
                                label={"Number of Connected Clients"}
                                className="mx-1"
                                name="connected_clients"
                                placeholder="e.g., Current: 45, Max: 128"
                                required={false}
                                message={"Number of Connected Clients"}
                            />

                            <FormInput
                                label={"SSIDs Supported"}
                                className="mx-1"
                                name="ssids_supported"
                                placeholder="e.g., Corp-Secure, Guest, IoT, Voice"
                                required={false}
                                message={"SSIDs Supported"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Firewall/Security Appliance Specific</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                label={"Security Policy Count"}
                                className="mx-1"
                                name="security_policy_count"
                                placeholder="e.g., 150 policies, 25 NAT rules"
                                required={false}
                                message={"Security Policy Count"}
                            />

                            <FormInput
                                label={"VPN Tunnel Capacity"}
                                className="mx-1"
                                name="vpn_tunnel_capacity"
                                placeholder="e.g., 500 tunnels, 50 site-to-site"
                                required={false}
                                message={"VPN Tunnel Capacity"}
                            />

                            <FormInput
                                label={"Concurrent Sessions Capacity"}
                                className="mx-1"
                                name="concurrent_sessions"
                                placeholder="e.g., 1,000,000 sessions"
                                required={false}
                                message={"Concurrent Sessions Capacity"}
                            />

                            <FormInput
                                label={"Threat Prevention License"}
                                className="mx-1"
                                name="threat_prevention_license"
                                placeholder="e.g., Licensed until 2025-12-31"
                                required={false}
                                message={"Threat Prevention License"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                label={"URL Filtering License"}
                                className="mx-1"
                                name="url_filtering_license"
                                placeholder="e.g., Licensed, Category: Enterprise"
                                required={false}
                                message={"URL Filtering License"}
                            />

                            <FormInput
                                label={"IPS/IDS Signature Version"}
                                className="mx-1"
                                name="ips_signature_version"
                                placeholder="e.g., Version 8562-4567, Updated: 2024-03-15"
                                required={false}
                                message={"IPS/IDS Signature Version"}
                            />

                            <FormInput
                                label={"Security Zone Configuration"}
                                className="mx-1"
                                name="security_zone_config"
                                placeholder="e.g., Trust, Untrust, DMZ, Guest"
                                required={false}
                                message={"Security Zone Configuration"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"High Availability Role"}
                                placeholder="High Availability Role"
                                name="ha_role"
                                required={false}
                                message={"Please Select HA Role"}
                                options={[
                                    { value: "Active", label: "Active" },
                                    { value: "Passive", label: "Passive" },
                                    { value: "Active-Active", label: "Active-Active" },
                                    { value: "Active-Passive", label: "Active-Passive" },
                                    { value: "Standalone", label: "Standalone" },
                                    { value: "Primary", label: "Primary" },
                                    { value: "Secondary", label: "Secondary" }
                                ]}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Lifecycle & Status</h5>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Status"}
                                placeholder="Device Status"
                                name="device_status"
                                required={false}
                                message={"Please Select Device Status"}
                                options={[
                                    { value: "Active", label: "Active" },
                                    { value: "Standby", label: "Standby/Spare" },
                                    { value: "In-Maintenance", label: "In Maintenance" },
                                    { value: "Decommissioned", label: "Decommissioned" },
                                    { value: "Retired", label: "Retired" },
                                    { value: "Quarantined", label: "Quarantined" },
                                    { value: "Test", label: "Test/Lab" }
                                ]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Criticality Level"}
                                placeholder="Criticality Level"
                                name="criticality_level"
                                required={false}
                                message={"Please Select Criticality Level"}
                                options={[
                                    { value: "Tier-1", label: "Tier 1 - Critical" },
                                    { value: "Tier-2", label: "Tier 2 - High" },
                                    { value: "Tier-3", label: "Tier 3 - Medium" },
                                    { value: "Tier-4", label: "Tier 4 - Low" },
                                    { value: "Non-Critical", label: "Non-Critical" }
                                ]}
                            />

                            <FormInput
                                label={"Planned Replacement Date"}
                                className="mx-1"
                                name="planned_replacement_date"
                                placeholder="YYYY-MM-DD"
                                type="date"
                                required={false}
                                message={"Planned Replacement Date"}
                            />

                            <FormInput
                                label={"End-of-Life Date"}
                                className="mx-1"
                                name="eol_date"
                                placeholder="YYYY-MM-DD"
                                type="date"
                                required={false}
                                message={"End-of-Life Date (Vendor announced)"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                label={"End-of-Support Date"}
                                className="mx-1"
                                name="eos_date"
                                placeholder="YYYY-MM-DD"
                                type="date"
                                required={false}
                                message={"End-of-Support Date"}
                            />

                            <FormInput
                                label={"Decommission Date"}
                                className="mx-1"
                                name="decommission_date"
                                placeholder="YYYY-MM-DD"
                                type="date"
                                required={false}
                                message={"Decommission Date (If planned)"}
                            />

                            <FormInput
                                label={"Replacement Asset Tag"}
                                className="mx-1"
                                name="replacement_asset_tag"
                                placeholder="e.g., ASST-2025-001, NW-SW-001-REPL"
                                required={false}
                                message={"Replacement Asset Tag"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Disposal Method"}
                                placeholder="Disposal Method"
                                name="disposal_method"
                                required={false}
                                message={"Please Select Disposal Method"}
                                options={[
                                    { value: "Secure-Wipe", label: "Secure Wipe/Erase" },
                                    { value: "Physical-Destruction", label: "Physical Destruction" },
                                    { value: "Resale", label: "Resale/Refurbish" },
                                    { value: "Donate", label: "Donate" },
                                    { value: "Recycle", label: "Recycle" },
                                    { value: "Return-to-Vendor", label: "Return to Vendor" },
                                    { value: "Not-Disposed", label: "Not Disposed" }
                                ]}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Administrative</h5>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Primary Administrator/Team"}
                                placeholder="Primary Administrator/Team"
                                name="primary_admin_team"
                                required={false}
                                message={"Please Select Primary Administrator/Team"}
                                options={[
                                    { value: "Network-Team", label: "Network Team" },
                                    { value: "Security-Team", label: "Security Team" },
                                    { value: "Infrastructure-Team", label: "Infrastructure Team" },
                                    { value: "IT-Operations", label: "IT Operations" },
                                    { value: "NOC", label: "Network Operations Center" },
                                    { value: "SOC", label: "Security Operations Center" },
                                    { value: "External-Vendor", label: "External Vendor" },
                                    { value: "other", label: "Other Team" }
                                ]}
                            />

                            <FormInput
                                label={"On-Call Contact"}
                                className="mx-1"
                                name="oncall_contact"
                                placeholder="e.g., John Doe, +1-555-0123, john@company.com"
                                required={false}
                                message={"On-Call Contact"}
                            />

                            <FormInput
                                label={"Vendor Support Contact"}
                                className="mx-1"
                                name="vendor_support_contact"
                                placeholder="e.g., Cisco TAC: 1-800-553-2447, Case: SR-1234567"
                                required={false}
                                message={"Vendor Support Contact"}
                            />

                            <FormInput
                                label={"Notes/Configuration Details"}
                                className="mx-1"
                                name="notes"
                                placeholder="Enter any additional notes or configuration details"
                                multiline={true}
                                rows={4}
                                required={false}
                                message={"Notes/Configuration Details"}
                            />

                            <FormInput
                                label={"Rack Diagram Reference"}
                                className="mx-1"
                                name="rack_diagram_ref"
                                placeholder="e.g., Rack-Diagram-001, https://link.to/diagram"
                                required={false}
                                message={"Rack Diagram Reference"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                label={"Network Diagram Reference"}
                                className="mx-1"
                                name="network_diagram_ref"
                                placeholder="e.g., Network-Map-VLAN10, https://link.to/network-diagram"
                                required={false}
                                message={"Network Diagram Reference"}
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
                                message={"Attachments (Config files, photos, diagrams)"}
                            />

                            <CustomDate
                                label={"Record Created By & Date"}
                                className={`mx-1`}
                                name="record_created"
                                placeholder={"Record Created By & Date"}
                                message={"Record Created By & Date"}
                                required={false}
                                allowToday={true}
                            />

                            <CustomDate
                                label={"Last Updated By & Date"}
                                className={`mx-1`}
                                name="last_updated"
                                placeholder={"Last Updated By & Date"}
                                message={"Last Updated By & Date"}
                                required={false}
                                allowToday={true}
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
export default connect(mapStateToProps, ACTIONS)(NetworkDevice);