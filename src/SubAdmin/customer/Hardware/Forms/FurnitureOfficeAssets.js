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


function FurnitureOfficeAssets({
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
            // Basic Identification
            asset_tag: values?.asset_tag,
            item_type: values?.item_type,
            category: values?.category,
            brand_manufacturer: values?.brand_manufacturer,
            model_product_line: values?.model_product_line,
            serial_number: values?.serial_number,
            color_finish: values?.color_finish,
            material: values?.material,

            // Physical Specifications
            dimensions: values?.dimensions,
            weight: values?.weight,
            assembly_required: values?.assembly_required,
            assembly_instructions_location: values?.assembly_instructions_location,
            modular_configurable: values?.modular_configurable,
            number_of_pieces: values?.number_of_pieces,
            weight_capacity: values?.weight_capacity,
            ergonomic_certification: values?.ergonomic_certification,
            fire_safety_rating: values?.fire_safety_rating,

            // Location & Assignment
            current_location: values?.current_location,
            assigned_to: values?.assigned_to,
            assignment_date: values?.assignment_date,
            shared_common_area: values?.shared_common_area,
            space_floor_plan_ref: values?.space_floor_plan_ref,
            previous_location: values?.previous_location,
            storage_location: values?.storage_location,

            // Procurement Details
            po_number: values?.po_number,
            vendor_dealer: values?.vendor_dealer,
            purchase_date: values?.purchase_date,
            purchase_cost: values?.purchase_cost,
            delivery_date: values?.delivery_date,
            installation_date: values?.installation_date,
            delivery_installation_cost: values?.delivery_installation_cost,
            cost_center: values?.cost_center,
            expenditure_type: values?.expenditure_type,

            // Condition & Maintenance
            condition_status: values?.condition_status,
            condition_notes: values?.condition_notes,
            last_inspection_date: values?.last_inspection_date,
            next_inspection_date: values?.next_inspection_date,
            cleaning_schedule: values?.cleaning_schedule,
            last_cleaning_date: values?.last_cleaning_date,
            warranty_info: values?.warranty_info,
            warranty_expiry: values?.warranty_expiry,
            repair_history: values?.repair_history,
            cleaning_instructions: values?.cleaning_instructions,

            // Ergonomic & Compliance Features
            adjustable_height: values?.adjustable_height,
            lumbar_support: values?.lumbar_support,
            armrests: values?.armrests,
            seat_depth_width: values?.seat_depth_width,
            tilt_mechanism: values?.tilt_mechanism,
            casters_type: values?.casters_type,
            gas_lift_functioning: values?.gas_lift_functioning,
            ada_compliant: values?.ada_compliant,
            standing_desk_feature: values?.standing_desk_feature,

            // Storage & Cabinetry Specific
            number_of_drawers: values?.number_of_drawers,
            locking_mechanism: values?.locking_mechanism,
            number_of_keys: values?.number_of_keys,
            shelf_adjustability: values?.shelf_adjustability,
            fireproof_rating: values?.fireproof_rating,
            file_hanging_capacity: values?.file_hanging_capacity,

            // Lifecycle & Depreciation
            expected_lifespan: values?.expected_lifespan,
            depreciation_schedule: values?.depreciation_schedule,
            current_book_value: values?.current_book_value,
            replacement_cost_estimate: values?.replacement_cost_estimate,
            planned_replacement_date: values?.planned_replacement_date,
            furniture_status: values?.furniture_status,
            retirement_reason: values?.retirement_reason,

            // Safety & Compliance
            safety_inspection_date: values?.safety_inspection_date,
            safety_issues: values?.safety_issues,
            recall_status: values?.recall_status,
            weight_limit_labels: values?.weight_limit_labels,
            assembly_safety_check: values?.assembly_safety_check,
            electrical_certification: values?.electrical_certification,

            // Office Equipment (Non-IT)
            equipment_type: values?.equipment_type,
            power_requirements: values?.power_requirements,
            service_contract_number: values?.service_contract_number,
            service_provider: values?.service_provider,
            service_contract_expiry: values?.service_contract_expiry,
            supplies_consumables: values?.supplies_consumables,
            monthly_service_cost: values?.monthly_service_cost,
            usage_meter: values?.usage_meter,

            // Disposal & Sustainability
            disposal_date: values?.disposal_date,
            disposal_method: values?.disposal_method,
            disposal_certificate: values?.disposal_certificate,
            recyclable_materials: values?.recyclable_materials,
            environmental_certification: values?.environmental_certification,
            donation_recipient: values?.donation_recipient,
            resale_value: values?.resale_value,
            disposal_cost: values?.disposal_cost,

            // Administrative
            asset_photos: values?.asset_photos,
            manual_location: values?.manual_location,
            assembly_diagram_ref: values?.assembly_diagram_ref,
            record_created_by: values?.record_created_by,
            record_created_date: values?.record_created_date,
            last_updated_by: values?.last_updated_by,
            last_updated_date: values?.last_updated_date,
            audit_date: values?.audit_date,
            notes: values?.notes,
            attachments: values?.attachments
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
                            <h5 className="mx-1">Furniture & Office Assets Form</h5>
                            <QRCODE value={barcode} />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Basic Identification</h5>
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

                            <SelectInput
                                className="mx-1"
                                label={"Item Type"}
                                placeholder="Select Item Type"
                                name="item_type"
                                required={true}
                                message={"Please Select Item Type"}
                                options={[
                                    { value: "Desk", label: "Desk" },
                                    { value: "Chair", label: "Chair" },
                                    { value: "Cabinet", label: "Cabinet" },
                                    { value: "Bookshelf", label: "Bookshelf" },
                                    { value: "Table", label: "Table" },
                                    { value: "Sofa", label: "Sofa" },
                                    { value: "Whiteboard", label: "Whiteboard" },
                                    { value: "Filing-Cabinet", label: "Filing Cabinet" },
                                    { value: "Conference-Table", label: "Conference Table" },
                                    { value: "Office-Partition", label: "Office Partition" },
                                    { value: "Storage-Shelf", label: "Storage Shelf" },
                                    { value: "Reception-Desk", label: "Reception Desk" },
                                    { value: "Workstation", label: "Workstation" },
                                    { value: "Ergonomic-Chair", label: "Ergonomic Chair" },
                                    { value: "Coffee-Table", label: "Coffee Table" },
                                    { value: "Monitor-Stand", label: "Monitor Stand" },
                                    { value: "other", label: "Other Furniture" }
                                ]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Category"}
                                placeholder="Select Category"
                                name="category"
                                required={true}
                                message={"Please Select Category"}
                                options={[
                                    { value: "Seating", label: "Seating" },
                                    { value: "Storage", label: "Storage" },
                                    { value: "Workstation", label: "Workstation" },
                                    { value: "Meeting", label: "Meeting" },
                                    { value: "Collaborative", label: "Collaborative" },
                                    { value: "Recreational", label: "Recreational" },
                                    { value: "Office-Desk", label: "Office Desk" },
                                    { value: "Conference", label: "Conference" },
                                    { value: "Reception", label: "Reception" },
                                    { value: "Filing", label: "Filing" },
                                    { value: "Display", label: "Display" },
                                    { value: "Ergonomic", label: "Ergonomic" }
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
                                label={"Model/Product Line"}
                                className="mx-1"
                                name="model_product_line"
                                placeholder="e.g., Aeron Chair, Markus, Bekant"
                                required={true}
                                message={"Model/Product Line"}
                            />

                            <FormInput
                                label={"Serial Number/Product Code"}
                                className="mx-1"
                                name="serial_number"
                                placeholder="e.g., SN123456, IKEA-503.352.08"
                                required={true}
                                message={"Serial Number/Product Code"}
                            />

                            <FormInput
                                label={"Color/Finish"}
                                className="mx-1"
                                name="color_finish"
                                placeholder="e.g., Black, Walnut Finish, Chrome"
                                required={true}
                                message={"Color/Finish"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Material"}
                                placeholder="Select Material"
                                name="material"
                                required={true}
                                message={"Please Select Material"}
                                options={[
                                    { value: "Wood", label: "Wood" },
                                    { value: "Metal", label: "Metal" },
                                    { value: "Glass", label: "Glass" },
                                    { value: "Fabric", label: "Fabric" },
                                    { value: "Laminate", label: "Laminate" },
                                    { value: "Composite", label: "Composite" },
                                    { value: "Plastic", label: "Plastic" },
                                    { value: "Leather", label: "Leather" },
                                    { value: "Vinyl", label: "Vinyl" },
                                    { value: "MDF", label: "MDF" },
                                    { value: "Particle-Board", label: "Particle Board" },
                                    { value: "Mesh", label: "Mesh" },
                                    { value: "Mixed", label: "Mixed Materials" }
                                ]}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Physical Specifications</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                label={"Dimensions"}
                                className="mx-1"
                                name="dimensions"
                                placeholder={"e.g., 60\" × 30\" × 29\" or 152cm × 76cm × 74cm"}
                                required={true}
                                message={"Dimensions (Length × Width × Height)"}
                            />

                            <FormInput
                                label={"Weight"}
                                className="mx-1"
                                name="weight"
                                placeholder="e.g., 50 lbs, 22.7 kg"
                                required={true}
                                message={"Weight (lbs/kg)"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Assembly Required"}
                                placeholder="Select Assembly Status"
                                name="assembly_required"
                                required={true}
                                message={"Please Select Assembly Required"}
                                options={[
                                    { value: "Yes", label: "Yes" },
                                    { value: "No", label: "No" },
                                    { value: "Partially-Assembled", label: "Partially Assembled" },
                                    { value: "Professional-Assembly", label: "Professional Assembly Required" },
                                    { value: "Tool-Free-Assembly", label: "Tool-Free Assembly" }
                                ]}
                            />

                            <FormInput
                                label={"Assembly Instructions Location"}
                                className="mx-1"
                                name="assembly_instructions_location"
                                placeholder="e.g., Attached to product, Online PDF, Manufacturer website"
                                required={true}
                                message={"Assembly Instructions Location"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Modular/Configurable"}
                                placeholder="Select Modular Status"
                                name="modular_configurable"
                                required={true}
                                message={"Please Select Modular/Configurable"}
                                options={[
                                    { value: "Yes", label: "Yes" },
                                    { value: "No", label: "No" },
                                    { value: "Panel-System", label: "Panel System" },
                                    { value: "Modular-Desk", label: "Modular Desk" },
                                    { value: "Configurable-Layout", label: "Configurable Layout" },
                                    { value: "Add-on-Components", label: "Add-on Components Available" }
                                ]}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                label={"Number of Pieces/Components"}
                                className="mx-1"
                                name="number_of_pieces"
                                placeholder="e.g., 15 pieces, 8 components"
                                type="number"
                                min="1"
                                required={true}
                                message={"Number of Pieces/Components"}
                            />

                            <FormInput
                                label={"Weight Capacity"}
                                className="mx-1"
                                name="weight_capacity"
                                placeholder="e.g., 250 lbs, 500 kg (for shelves)"
                                required={true}
                                message={"Weight Capacity (For chairs, shelves)"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Ergonomic Certification"}
                                placeholder="Select Ergonomic Certification"
                                name="ergonomic_certification"
                                required={false}
                                message={"Please Select Ergonomic Certification"}
                                isMulti={true}
                                options={[
                                    { value: "BIFMA", label: "BIFMA Certified" },
                                    { value: "ANSI", label: "ANSI/BIFMA Compliant" },
                                    { value: "ISO-9241", label: "ISO 9241 Ergonomic" },
                                    { value: "GREENGUARD", label: "GREENGUARD Certified" },
                                    { value: "EU-Ergonomic", label: "EU Ergonomic Standard" },
                                    { value: "OSHA-Compliant", label: "OSHA Compliant" },
                                    { value: "No-Certification", label: "No Ergonomic Certification" }
                                ]}
                            />

                            <FormInput
                                label={"Fire Safety Rating"}
                                className="mx-1"
                                name="fire_safety_rating"
                                placeholder="e.g., Class 1 Fire Rated, CAL 117, BS 5852"
                                required={true}
                                message={"Fire Safety Rating (Flammability standard)"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Location & Assignment</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                label={"Current Location"}
                                className="mx-1"
                                name="current_location"
                                placeholder="e.g., Building A, Floor 3, Room 301"
                                required={true}
                                message={"Current Location (Building, Floor, Room Number)"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"assigned To"}
                                placeholder="e.g., John Smith, Sales Department"
                                name="assigned_to"
                                required={false}
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
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Shared/Common Area"}
                                placeholder="Select Shared Status"
                                name="shared_common_area"
                                required={true}
                                message={"Please Select Shared/Common Area"}
                                options={[
                                    { value: "Yes", label: "Yes - Shared/Common Area" },
                                    { value: "No", label: "No - Individual Assignment" },
                                    { value: "Department-Shared", label: "Department Shared" },
                                    { value: "Team-Area", label: "Team Area" },
                                    { value: "Conference-Only", label: "Conference/Meeting Only" },
                                    { value: "Hot-Desk", label: "Hot Desk" }
                                ]}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                label={"Space/Floor Plan Reference"}
                                className="mx-1"
                                name="space_floor_plan_ref"
                                placeholder="e.g., CAD-FL3-2024, FloorPlan-B3-Room301"
                                required={false}
                                message={"Space/Floor Plan Reference (CAD drawing reference)"}
                            />

                            <FormInput
                                label={"Previous Location"}
                                className="mx-1"
                                name="previous_location"
                                placeholder="e.g., Building B, Floor 2, Storage Room (Moved: 2024-06-15)"
                                multiline={true}
                                rows={2}
                                required={false}
                                message={"Previous Location (For tracking moves)"}
                            />

                            <FormInput
                                label={"Storage Location"}
                                className="mx-1"
                                name="storage_location"
                                placeholder="e.g., Warehouse A, Rack 5, Furniture Storage Room"
                                required={false}
                                message={"Storage Location (If not in use)"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Procurement Details</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                label={"Purchase Order Number"}
                                className="mx-1"
                                name="po_number"
                                placeholder="e.g., PO-FURN-2024-001, PUR-123456"
                                required={true}
                                message={"Purchase Order Number"}
                            />

                            <FormInput
                                label={"Vendor/Dealer"}
                                className="mx-1"
                                name="vendor_dealer"
                                placeholder="e.g., Steelcase Direct, IKEA Business, Office Depot"
                                required={true}
                                message={"Vendor/Dealer"}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Purchase Date"}
                                name="purchase_date"
                                required={true}
                                message={"Purchase Date"}
                                allowToday={true}
                            />

                            <FormInput
                                label={"Purchase Cost"}
                                className="mx-1"
                                name="purchase_cost"
                                placeholder="e.g., $850.00 per unit, $5,200.00 total"
                                required={true}
                                message={"Purchase Cost"}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Delivery Date"}
                                name="delivery_date"
                                required={false}
                                message={"Delivery Date"}
                                allowToday={true}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <CustomDate
                                className="mx-1"
                                label={"Installation Date"}
                                name="installation_date"
                                required={false}
                                message={"Installation Date"}
                                allowToday={true}
                            />

                            <FormInput
                                label={"Delivery/Installation Cost"}
                                className="mx-1"
                                name="delivery_installation_cost"
                                placeholder="e.g., $150.00 delivery, $200.00 installation"
                                required={false}
                                message={"Delivery/Installation Cost"}
                            />

                            <FormInput
                                label={"Cost Center/Department Budget"}
                                className="mx-1"
                                name="cost_center"
                                placeholder="e.g., FAC-2024-Furniture, IT-DEPT-BUDGET"
                                required={true}
                                message={"Cost Center/Department Budget"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Capital/Operational Expenditure"}
                                placeholder="Select Expenditure Type"
                                name="expenditure_type"
                                required={true}
                                message={"Please Select Expenditure Type"}
                                options={[
                                    { value: "CapEx", label: "CapEx - Capital Expenditure" },
                                    { value: "OpEx", label: "OpEx - Operational Expenditure" },
                                    { value: "Both", label: "Mixed (CapEx + OpEx)" },
                                    { value: "Lease", label: "Lease/Financing" },
                                    { value: "Rental", label: "Rental Expense" }
                                ]}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Condition & Maintenance</h5>
                        <div className={`${style.form_inputBox}`}>
                            <SelectInput
                                className="mx-1"
                                label={"Condition Status"}
                                placeholder="Select Condition Status"
                                name="condition_status"
                                required={true}
                                message={"Please Select Condition Status"}
                                options={[
                                    { value: "New", label: "New - Never Used" },
                                    { value: "Excellent", label: "Excellent - Like New" },
                                    { value: "Good", label: "Good - Minor Wear" },
                                    { value: "Fair", label: "Fair - Visible Wear" },
                                    { value: "Poor", label: "Poor - Heavy Wear" },
                                    { value: "Damaged", label: "Damaged - Needs Repair" },
                                    { value: "Under-Repair", label: "Under Repair" },
                                    { value: "Obsolete", label: "Obsolete/Retired" }
                                ]}
                            />

                            <FormInput
                                label={"Condition Notes"}
                                className="mx-1"
                                name="condition_notes"
                                placeholder="e.g., Small scratch on left arm, Fabric stain on seat cushion"
                                multiline={true}
                                rows={3}
                                required={false}
                                message={"Condition Notes (Scratches, stains, damage details)"}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Last Inspection Date"}
                                name="last_inspection_date"
                                required={true}
                                message={"Last Inspection Date"}
                                allowToday={true}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Next Inspection Date"}
                                name="next_inspection_date"
                                required={true}
                                message={"Next Inspection Date"}
                                allowToday={true}
                            />

                            <FormInput
                                label={"Cleaning/Maintenance Schedule"}
                                className="mx-1"
                                name="cleaning_schedule"
                                placeholder="e.g., Quarterly fabric cleaning, Monthly dusting"
                                required={false}
                                message={"Cleaning/Maintenance Schedule"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <CustomDate
                                className="mx-1"
                                label={"Last Cleaning Date"}
                                name="last_cleaning_date"
                                required={false}
                                message={"Last Cleaning Date"}
                                allowToday={true}
                            />

                            <FormInput
                                label={"Warranty Information"}
                                className="mx-1"
                                name="warranty_info"
                                placeholder="e.g., 5-year manufacturer warranty, 2-year fabric warranty"
                                required={false}
                                message={"Warranty Information (Years, coverage)"}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Warranty Expiry Date"}
                                name="warranty_expiry"
                                required={false}
                                message={"Warranty Expiry Date"}
                                allowToday={true}
                            />

                            <FormInput
                                label={"Repair History"}
                                className="mx-1"
                                name="repair_history"
                                placeholder="e.g., 2024-03-15: Replaced gas lift ($85), 2024-06-20: Fixed armrest ($45)"
                                multiline={true}
                                rows={3}
                                required={false}
                                message={"Repair History (Dates, types, costs)"}
                            />

                            <FormInput
                                label={"Cleaning Instructions/Chemicals"}
                                className="mx-1"
                                name="cleaning_instructions"
                                placeholder="e.g., Use mild soap and water, No bleach, Fabric-safe cleaner only"
                                multiline={true}
                                rows={2}
                                required={false}
                                message={"Cleaning Instructions/Chemicals"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Ergonomic & Compliance Features (for seating/desks)</h5>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Adjustable Height"}
                                placeholder="Select Height Adjustability"
                                name="adjustable_height"
                                required={true}
                                message={"Please Select Adjustable Height"}
                                options={[
                                    { value: "Yes", label: "Yes - Adjustable Height" },
                                    { value: "No", label: "No - Fixed Height" },
                                    { value: "Pneumatic", label: "Pneumatic Adjustment" },
                                    { value: "Mechanical", label: "Mechanical Adjustment" },
                                    { value: "Electric", label: "Electric Adjustment" }
                                ]}
                            />

                            <FormInput
                                label={"Lumbar Support"}
                                className="mx-1"
                                name="lumbar_support"
                                placeholder="e.g., Yes - Adjustable, Yes - Fixed, No"
                                required={true}
                                message={"Lumbar Support (Yes/No, type)"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Armrests"}
                                placeholder="Select Armrest Type"
                                name="armrests"
                                required={true}
                                message={"Please Select Armrest Type"}
                                options={[
                                    { value: "Adjustable", label: "Adjustable Armrests" },
                                    { value: "Fixed", label: "Fixed Armrests" },
                                    { value: "None", label: "No Armrests" },
                                    { value: "3D-Adjustable", label: "3D Adjustable" },
                                    { value: "4D-Adjustable", label: "4D Adjustable" },
                                    { value: "Padded", label: "Padded Fixed" },
                                    { value: "Flip-up", label: "Flip-up Armrests" }
                                ]}
                            />

                            <FormInput
                                label={"Seat Depth/Width"}
                                className="mx-1"
                                name="seat_depth_width"
                                placeholder={"e.g., 20\" W × 18\" D, 50cm × 45cm"}
                                required={true}
                                message={"Seat Depth/Width"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Tilt Mechanism"}
                                placeholder="Select Tilt Mechanism"
                                name="tilt_mechanism"
                                required={true}
                                message={"Please Select Tilt Mechanism"}
                                options={[
                                    { value: "Knee-Tilt", label: "Knee Tilt" },
                                    { value: "Center-Tilt", label: "Center Tilt" },
                                    { value: "Synchro-Tilt", label: "Synchro Tilt" },
                                    { value: "Multi-Tilt", label: "Multi-Position Tilt" },
                                    { value: "Rocking", label: "Rocking Mechanism" },
                                    { value: "No-Tilt", label: "No Tilt - Fixed" },
                                    { value: "Lockable", label: "Lockable Positions" }
                                ]}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <SelectInput
                                className="mx-1"
                                label={"Casters/Wheels Type"}
                                placeholder="Select Caster Type"
                                name="casters_type"
                                required={true}
                                message={"Please Select Caster/Wheel Type"}
                                options={[
                                    { value: "Hard-Floor", label: "Hard Floor Casters" },
                                    { value: "Carpet", label: "Carpet Casters" },
                                    { value: "Dual-Wheel", label: "Dual Wheel Casters" },
                                    { value: "Locking", label: "Locking Casters" },
                                    { value: "Rubber", label: "Rubber Wheels" },
                                    { value: "Polyurethane", label: "Polyurethane Casters" },
                                    { value: "No-Casters", label: "No Casters/Fixed Base" },
                                    { value: "Glides", label: "Floor Glides" }
                                ]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Gas Lift Functioning"}
                                placeholder="Select Gas Lift Status"
                                name="gas_lift_functioning"
                                required={false}
                                message={"Please Select Gas Lift Functioning"}
                                options={[
                                    { value: "Yes", label: "Yes - Functioning" },
                                    { value: "No", label: "No - Malfunctioning" },
                                    { value: "Not-Applicable", label: "N/A - No Gas Lift" },
                                    { value: "Needs-Replacement", label: "Needs Replacement" },
                                    { value: "Class-3", label: "Class 3 Lift" },
                                    { value: "Class-4", label: "Class 4 Lift" }
                                ]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"ADA Compliant"}
                                placeholder="Select ADA Compliance"
                                name="ada_compliant"
                                required={true}
                                message={"Please Select ADA Compliance"}
                                options={[
                                    { value: "Yes", label: "Yes - ADA Compliant" },
                                    { value: "No", label: "No - Not ADA Compliant" },
                                    { value: "Adaptable", label: "Adaptable for ADA" },
                                    { value: "Pending", label: "Compliance Pending" }
                                ]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Standing Desk Feature"}
                                placeholder="Select Standing Desk Type"
                                name="standing_desk_feature"
                                required={false}
                                message={"Please Select Standing Desk Feature"}
                                options={[
                                    { value: "Electric", label: "Electric Height Adjustable" },
                                    { value: "Manual-Crank", label: "Manual Crank" },
                                    { value: "Pneumatic", label: "Pneumatic/Gas Spring" },
                                    { value: "Fixed", label: "Fixed - No Standing Feature" },
                                    { value: "Desktop-Riser", label: "Desktop Riser/Converter" },
                                    { value: "Not-Desk", label: "Not Applicable - Not a Desk" }
                                ]}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Storage & Cabinetry Specific</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                label={"Number of Drawers"}
                                className="mx-1"
                                name="number_of_drawers"
                                placeholder="e.g., 2 drawers, 4 drawers"
                                type="number"
                                min="0"
                                max="10"
                                required={true}
                                message={"Number of Drawers"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Locking Mechanism"}
                                placeholder="Select Lock Type"
                                name="locking_mechanism"
                                required={false}
                                message={"Please Select Locking Mechanism"}
                                options={[
                                    { value: "Key-Lock", label: "Key Lock" },
                                    { value: "Combination", label: "Combination Lock" },
                                    { value: "Digital-Keypad", label: "Digital Keypad" },
                                    { value: "Biometric", label: "Biometric/Fingerprint" },
                                    { value: "Cam-Lock", label: "Cam Lock" },
                                    { value: "Central-Locking", label: "Central Locking System" },
                                    { value: "No-Lock", label: "No Locking Mechanism" },
                                    { value: "Master-Keyed", label: "Master Keyed System" },
                                    { value: "RFID", label: "RFID Card Access" }
                                ]}
                            />

                            <FormInput
                                label={"Number of Keys"}
                                className="mx-1"
                                name="number_of_keys"
                                placeholder="e.g., 2 keys (Spare: Office safe, Facility manager)"
                                multiline={true}
                                rows={2}
                                required={false}
                                message={"Number of Keys (And location of spares)"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <SelectInput
                                className="mx-1"
                                label={"Shelf Adjustability"}
                                placeholder="Select Shelf Adjustability"
                                name="shelf_adjustability"
                                required={false}
                                message={"Please Select Shelf Adjustability"}
                                options={[
                                    { value: "Adjustable", label: "Fully Adjustable" },
                                    { value: "Fixed", label: "Fixed Shelves" },
                                    { value: "Semi-Adjustable", label: "Semi-Adjustable" },
                                    { value: "Removable", label: "Removable Shelves" },
                                    { value: "Sliding", label: "Sliding Shelves" },
                                    { value: "No-Shelves", label: "No Shelves" },
                                    { value: "Not-Applicable", label: "Not Applicable" }
                                ]}
                            />

                            <FormInput
                                label={"Fireproof/Waterproof Rating"}
                                className="mx-1"
                                name="fireproof_rating"
                                placeholder="e.g., Fireproof: 1 hour @ 1700°F, Waterproof: 24 hours"
                                required={false}
                                message={"Fireproof/Waterproof Rating (For safes/special cabinets)"}
                            />

                            <FormInput
                                label={"File Hanging Capacity"}
                                className="mx-1"
                                name="file_hanging_capacity"
                                placeholder="e.g., Letter size: 24 files, Legal size: 18 files"
                                required={false}
                                message={"File Hanging Capacity (For filing cabinets)"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Lifecycle & Depreciation</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                label={"Expected Lifespan"}
                                className="mx-1"
                                name="expected_lifespan"
                                placeholder="e.g., 10 years, 5-7 years"
                                required={true}
                                message={"Expected Lifespan (Years)"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Depreciation Schedule"}
                                placeholder="Select Depreciation Type"
                                name="depreciation_schedule"
                                required={true}
                                message={"Please Select Depreciation Schedule"}
                                options={[
                                    { value: "Straight-Line", label: "Straight-Line Depreciation" },
                                    { value: "Accelerated", label: "Accelerated Depreciation" },
                                    { value: "Double-Declining", label: "Double-Declining Balance" },
                                    { value: "Sum-of-Years", label: "Sum-of-Years Digits" },
                                    { value: "MACRS", label: "MACRS (Modified Accelerated Cost Recovery System)" },
                                    { value: "No-Depreciation", label: "No Depreciation" }
                                ]}
                            />

                            <FormInput
                                label={"Current Book Value"}
                                className="mx-1"
                                name="current_book_value"
                                placeholder="e.g., $450.00, $1,200.00"
                                required={true}
                                message={"Current Book Value"}
                            />

                            <FormInput
                                label={"Replacement Cost Estimate"}
                                className="mx-1"
                                name="replacement_cost_estimate"
                                placeholder="e.g., $850.00, $1,500.00"
                                required={true}
                                message={"Replacement Cost Estimate"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <CustomDate
                                className="mx-1"
                                label={"Planned Replacement Date"}
                                name="planned_replacement_date"
                                required={false}
                                message={"Planned Replacement Date"}
                                allowToday={true}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Status"}
                                placeholder="Select Furniture Status"
                                name="furniture_status"
                                required={true}
                                message={"Please Select Status"}
                                options={[
                                    { value: "Active", label: "Active - In Use" },
                                    { value: "In-Repair", label: "In Repair/Maintenance" },
                                    { value: "Surplus", label: "Surplus - Available" },
                                    { value: "Retired", label: "Retired" },
                                    { value: "Donated", label: "Donated" },
                                    { value: "Sold", label: "Sold" },
                                    { value: "In-Storage", label: "In Storage" },
                                    { value: "Pending-Disposal", label: "Pending Disposal" }
                                ]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Retirement Reason"}
                                placeholder="Select Retirement Reason"
                                name="retirement_reason"
                                required={false}
                                message={"Please Select Retirement Reason"}
                                options={[
                                    { value: "Worn-Out", label: "Worn Out / End of Life" },
                                    { value: "Damaged", label: "Damaged - Beyond Repair" },
                                    { value: "Outdated", label: "Outdated / Obsolete" },
                                    { value: "Surplus", label: "Surplus / Excess Inventory" },
                                    { value: "Replaced", label: "Replaced with Newer Model" },
                                    { value: "Office-Renovation", label: "Office Renovation" },
                                    { value: "Space-Optimization", label: "Space Optimization" },
                                    { value: "Donated", label: "Donated to Organization" },
                                    { value: "Sold", label: "Sold" },
                                    { value: "Not-Retired", label: "Not Retired" }
                                ]}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Safety & Compliance</h5>
                        <div className={style.form_inputBox}>
                            <CustomDate
                                className="mx-1"
                                label={"Safety Inspection Date"}
                                name="safety_inspection_date"
                                required={true}
                                message={"Safety Inspection Date"}
                                allowToday={true}
                            />

                            <FormInput
                                label={"Safety Issues/Concerns"}
                                className="mx-1"
                                name="safety_issues"
                                placeholder="e.g., Wobbly leg, Sharp edge on desk corner, Tilt mechanism stiff"
                                multiline={true}
                                rows={3}
                                required={false}
                                message={"Safety Issues/Concerns (Stability, sharp edges, etc.)"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Recall Status"}
                                placeholder="Select Recall Status"
                                name="recall_status"
                                required={true}
                                message={"Please Select Recall Status"}
                                options={[
                                    { value: "No-Recall", label: "No Recall" },
                                    { value: "Under-Investigation", label: "Under Investigation" },
                                    { value: "Recall-Announced", label: "Recall Announced" },
                                    { value: "Remedied", label: "Recall Remedied" },
                                    { value: "Pending-Action", label: "Pending Action" },
                                    { value: "Not-Checked", label: "Not Checked" }
                                ]}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <SelectInput
                                className="mx-1"
                                label={"Load/Weight Limit Labels"}
                                placeholder="Select Label Status"
                                name="weight_limit_labels"
                                required={true}
                                message={"Please Select Load/Weight Limit Labels Status"}
                                options={[
                                    { value: "Visible", label: "Visible - Clearly Displayed" },
                                    { value: "Applied", label: "Applied - Newly Installed" },
                                    { value: "Faded", label: "Faded - Needs Replacement" },
                                    { value: "Missing", label: "Missing - Not Applied" },
                                    { value: "Not-Applicable", label: "Not Applicable" }
                                ]}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Assembly Safety Check"}
                                name="assembly_safety_check"
                                placeholder="Date completed"
                                required={false}
                                message={"Assembly Safety Check (Date completed)"}
                                allowToday={true}
                            />

                            <FormInput
                                label={"Electrical Certification"}
                                className="mx-1"
                                name="electrical_certification"
                                placeholder="e.g., UL Listed, ETL Certified, CE Marked, Voltage: 120V"
                                required={false}
                                message={"Electrical Certification (For powered furniture)"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Office Equipment (Non-IT)</h5>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Equipment Type"}
                                placeholder="Select Equipment Type"
                                name="equipment_type"
                                required={true}
                                message={"Please Select Equipment Type"}
                                options={[
                                    { value: "Copier", label: "Copier / Multi-Function Printer" },
                                    { value: "Printer", label: "Printer" },
                                    { value: "Shredder", label: "Shredder" },
                                    { value: "Water-Cooler", label: "Water Cooler / Dispenser" },
                                    { value: "Microwave", label: "Microwave Oven" },
                                    { value: "Refrigerator", label: "Refrigerator" },
                                    { value: "Dishwasher", label: "Dishwasher" },
                                    { value: "Coffee-Machine", label: "Coffee Machine / Espresso" },
                                    { value: "Vending-Machine", label: "Vending Machine" },
                                    { value: "Ice-Maker", label: "Ice Maker" },
                                    { value: "Air-Purifier", label: "Air Purifier" },
                                    { value: "Paper-Shredder", label: "Industrial Paper Shredder" },
                                    { value: "Scanner", label: "Scanner" },
                                    { value: "Fax-Machine", label: "Fax Machine" },
                                    { value: "other", label: "Other Equipment" }
                                ]}
                            />

                            <FormInput
                                label={"Power Requirements"}
                                className="mx-1"
                                name="power_requirements"
                                placeholder="e.g., 120V/60Hz, 15A, 110-240V"
                                required={true}
                                message={"Power Requirements (Voltage, amps)"}
                            />

                            <FormInput
                                label={"Service Contract Number"}
                                className="mx-1"
                                name="service_contract_number"
                                placeholder="e.g., SVC-123456, CON-78901"
                                required={false}
                                message={"Service Contract Number"}
                            />

                            <FormInput
                                label={"Service Provider"}
                                className="mx-1"
                                name="service_provider"
                                placeholder="e.g., Xerox Service, Cintas, Office Depot"
                                required={false}
                                message={"Service Provider"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <CustomDate
                                className="mx-1"
                                label={"Service Contract Expiry"}
                                name="service_contract_expiry"
                                required={false}
                                message={"Service Contract Expiry Date"}
                                allowToday={true}
                            />

                            <FormInput
                                label={"Supplies/Consumables"}
                                className="mx-1"
                                name="supplies_consumables"
                                placeholder="e.g., Toner: 106R04378, Water: 5-gal bottles, Filters: WF-123"
                                multiline={true}
                                rows={2}
                                required={true}
                                message={"Supplies/Consumables (Toner, filters, water bottles)"}
                            />

                            <FormInput
                                label={"Monthly Service/Lease Cost"}
                                className="mx-1"
                                name="monthly_service_cost"
                                placeholder="e.g., $150/month, $1,800/year"
                                required={false}
                                message={"Monthly Service/Lease Cost"}
                            />

                            <FormInput
                                label={"Copy Count/Usage Meter"}
                                className="mx-1"
                                name="usage_meter"
                                placeholder="e.g., 45,230 copies, Meter: 1256789"
                                required={false}
                                message={"Copy Count/Usage Meter (For copiers/printers)"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Disposal & Sustainability</h5>
                        <div className={style.form_inputBox}>
                            <CustomDate
                                className="mx-1"
                                label={"Disposal Date"}
                                name="disposal_date"
                                required={false}
                                message={"Disposal Date"}
                                allowToday={true}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Disposal Method"}
                                placeholder="Select Disposal Method"
                                name="disposal_method"
                                required={false}
                                message={"Please Select Disposal Method"}
                                options={[
                                    { value: "Sold", label: "Sold" },
                                    { value: "Donated", label: "Donated" },
                                    { value: "Recycled", label: "Recycled" },
                                    { value: "Landfill", label: "Landfill" },
                                    { value: "Trade-In", label: "Trade-In" },
                                    { value: "Return-to-Vendor", label: "Return to Vendor" },
                                    { value: "E-Waste", label: "E-Waste Recycling" },
                                    { value: "Asset-Liquidation", label: "Asset Liquidation" },
                                    { value: "Not-Disposed", label: "Not Yet Disposed" }
                                ]}
                            />

                            <FormInput
                                label={"Disposal Certificate"}
                                className="mx-1"
                                name="disposal_certificate"
                                placeholder="e.g., E-Waste Cert #12345, Recycling Receipt 789"
                                required={false}
                                message={"Disposal Certificate (For secure disposal)"}
                            />

                            <FormInput
                                label={"Recyclable Materials"}
                                className="mx-1"
                                name="recyclable_materials"
                                placeholder="e.g., Plastic, Metal, Glass, Electronics, Paper"
                                multiline={true}
                                rows={2}
                                required={false}
                                message={"Recyclable Materials (List components)"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <SelectInput
                                className="mx-1"
                                label={"Environmental Certification"}
                                placeholder="Select Environmental Certification"
                                name="environmental_certification"
                                required={false}
                                isMulti={true}
                                options={[
                                    { value: "FSC", label: "FSC (Forest Stewardship Council)" },
                                    { value: "GREENGUARD", label: "GREENGUARD Gold" },
                                    { value: "Energy-Star", label: "Energy Star" },
                                    { value: "EPEAT", label: "EPEAT Registered" },
                                    { value: "RoHS", label: "RoHS Compliant" },
                                    { value: "WEEE", label: "WEEE Compliant" },
                                    { value: "Cradle-to-Cradle", label: "Cradle to Cradle" },
                                    { value: "BIFMA", label: "BIFMA Level" },
                                    { value: "No-Certification", label: "No Environmental Certification" }
                                ]}
                            />

                            <FormInput
                                label={"Donation Recipient"}
                                className="mx-1"
                                name="donation_recipient"
                                placeholder="e.g., Goodwill, Salvation Army, Local School"
                                required={false}
                                message={"Donation Recipient (If donated)"}
                            />

                            <FormInput
                                label={"Resale Value Received"}
                                className="mx-1"
                                name="resale_value"
                                placeholder="e.g., $350.00, $1,200.00"
                                required={false}
                                message={"Resale Value Received"}
                            />

                            <FormInput
                                label={"Disposal Cost"}
                                className="mx-1"
                                name="disposal_cost"
                                placeholder="e.g., $75.00 recycling fee, $150.00 removal fee"
                                required={false}
                                message={"Disposal Cost"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Administrative</h5>
                        <div className={style.form_inputBox}>
                            <UploadFile
                                className="mx-1 inputFlexBox"
                                label={"Asset Photos"}
                                name="asset_photos"
                                title={"Asset Photos"}
                                required={false}
                                multiple={false}
                                accept="image/jpeg,image/png"
                                classNameColor={`${style.inputDefaultBg}`}
                                message={"e.g., Front_view.jpg, Side_view.png, Serial_number.jpg"}
                            />

                            <FormInput
                                label={"Manual/Documentation Location"}
                                className="mx-1"
                                name="manual_location"
                                placeholder="e.g., Shared Drive > Furniture Manuals, Cabinet A3, Vendor Portal"
                                required={true}
                                message={"Manual/Documentation Location"}
                            />

                            <FormInput
                                label={"Assembly Diagram Reference"}
                                className="mx-1"
                                name="assembly_diagram_ref"
                                placeholder="e.g., Diagram #IK-789, Assembly PDF page 12-15"
                                required={false}
                                message={"Assembly Diagram Reference"}
                            />

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
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
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
                                label={"Audit/Inventory Date"}
                                name="audit_date"
                                required={true}
                                message={"Audit/Inventory Date (Last physical verification)"}
                                allowToday={true}
                            />

                            <FormInput
                                label={"Notes/Comments"}
                                className="mx-1"
                                name="notes"
                                placeholder="e.g., Custom height modification, Requires special cleaning, Part of executive suite"
                                multiline={true}
                                rows={4}
                                required={false}
                                message={"Notes/Comments (Custom modifications, special instructions)"}
                            />

                            <UploadFile
                                className="mx-1 inputFlexBox"
                                label={"Attachments"}
                                name="attachments"
                                placeholder="Upload purchase docs, warranty cards, additional photos"
                                title={"Attachments"}
                                required={true}
                                multiple={false}
                                accept="image/jpeg,image/png"
                                classNameColor={`${style.inputDefaultBg}`}
                                message={"Attachments (Purchase docs, warranty cards, photos)"}
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
export default connect(mapStateToProps, ACTIONS)(FurnitureOfficeAssets);