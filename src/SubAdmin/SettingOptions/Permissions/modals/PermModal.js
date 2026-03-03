import React, { useState, useEffect } from "react";
import { Modal, ConfigProvider, Menu, Switch, message } from "antd";
import { DownCircleOutlined } from "@ant-design/icons";
import "./permModal.css";
import { ActionButton } from "../../../../Components/Button/Button";
import * as PERM_ACTIONS from "../../../../store/action/permission/index";
import { connect, useSelector } from "react-redux";

function PermModal({
  permModal,
  setpermModal,
  modulesData,
  pagBody,
  SavePermCall,
  GetAllPerm
}) {
  console.log("modulesData",modulesData)
  const accessToken = useSelector(state => state.Red_Auth.accessToken);
  const [localModulesData, setLocalModulesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleCancel = () => setpermModal(false);

  const capitalizeAndFormat = (str = "") =>
    str
      .replace(/_/g, " ")
      .split(" ")
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const prepareModulesData = (modulesArray = []) =>
    modulesArray.map(module => ({
      ...module,
      permissions: (module.permissions || []).map(perm => ({
        ...perm,
        enabled: !!perm.assigned
      })),
      fields: (module.fields || []).map(field => ({
        ...field,
        can_view: !!field.can_view,
        can_edit: !!field.can_edit
      })),

      enabled: (module.permissions || []).every(p => p.assigned)
    }));


  const toggleModule = (moduleId, checked) => {
    setLocalModulesData(prev =>
      prev.map(module =>
        module.id === moduleId
          ? {
            ...module,
            enabled: checked,
            permissions: module.permissions.map(p => ({
              ...p,
              enabled: checked
            }))
          }
          : module
      )
    );
  };

  const togglePermission = (moduleId, permId, checked) => {
    setLocalModulesData(prev =>
      prev.map(module => {
        if (module.id !== moduleId) return module;

        const updatedPerms = module.permissions.map(p =>
          p.id === permId ? { ...p, enabled: checked } : p
        );

        return {
          ...module,
          permissions: updatedPerms,
          enabled: updatedPerms.every(p => p.enabled)
        };
      })
    );
  };

  const toggleFieldView = (moduleId, fieldId, checked) => {
    setLocalModulesData(prev =>
      prev.map(module =>
        module.id === moduleId
          ? {
            ...module,
            fields: module.fields.map(f =>
              f.id === fieldId ? { ...f, can_view: checked } : f
            )
          }
          : module
      )
    );
  };

  const toggleFieldEdit = (moduleId, fieldId, checked) => {
    setLocalModulesData(prev =>
      prev.map(module =>
        module.id === moduleId
          ? {
            ...module,
            fields: module.fields.map(f =>
              f.id === fieldId ? { ...f, can_edit: checked } : f
            )
          }
          : module
      )
    );
  };


  const getPayload = (employee, modules) => ({
    employeeId: employee.id,

    permissions: modules.flatMap(module =>
      module.permissions.map(perm => ({
        permission_id: perm.id,
        assigned: perm.enabled ? 1 : 0
      }))
    ),

    // field_permissions: modules.flatMap(module =>
    //   (module.fields || []).map(field => ({
    //     module_field_id: field.id,
    //     can_view: field.can_view ? 1 : 0,
    //     can_edit: field.can_edit ? 1 : 0
    //   }))
    // )
  });


  const handleSave = async () => {
    const payload = getPayload(modulesData, localModulesData);
    setLoading(true);
    const res = await SavePermCall(payload, accessToken);
    if (res?.success) {
      messageApi.success(res.message);
      setTimeout(() => {
        GetAllPerm(pagBody, accessToken);
        // setpermModal(false);
      }, 1500);
    } else {
      messageApi.error(res?.message || "Error");
    }
    setLoading(false);
  };


  useEffect(() => {
    if (modulesData?.modules) {
      setLocalModulesData(
        prepareModulesData(modulesData.modules)
      );
    }
  }, [modulesData]);


  const menuItems = localModulesData.map(module => ({
    key: `module-${module.id}`,
    label: (
      <div className="module-row" onClick={e => e.stopPropagation()}>
        <span>{capitalizeAndFormat(module.name)}</span>
        <Switch
          checkedChildren="ON"
          unCheckedChildren="OFF"
          checked={module.enabled}
          onChange={checked => toggleModule(module.id, checked)}
        />
      </div>
    ),

    children: [
      ...(module.permissions || []).map(perm => ({
        key: `perm-${perm.id}`,
        label: (
          <div className="perm-row" onClick={e => e.stopPropagation()}>
            <span>{perm.action}</span>
            <Switch
              checked={perm.enabled}
              checkedChildren="ON"
              unCheckedChildren="OFF"
              onChange={checked =>
                togglePermission(module.id, perm.id, checked)
              }
            />
          </div>
        )
      })),

      ...(module.fields && module.fields.length
        ? [{
          key: `fields-title-${module.id}`,
          disabled: true,
          label: (
            <div className="fields-title">
              Fields Permissions
            </div>
          )
        }]
        : []),

      ...(module.fields || []).map(field => ({
        key: `field-${field.id}`,
        label: (
          <div
            className="field-row"
            onClick={e => e.stopPropagation()}
          >
            <span className="field-name">
              {capitalizeAndFormat(field.name)}
            </span>

            <div className="field-switches">
              <div className="field-switch">
                <span>View</span>
                <Switch
                  size="small"
                  checked={field.can_view}
                  checkedChildren="ON"
                  unCheckedChildren="OFF"
                  onChange={checked =>
                    toggleFieldView(module.id, field.id, checked)
                  }
                />
              </div>

              <div className="field-switch">
                <span>Edit</span>
                <Switch
                  size="small"
                  checked={field.can_edit}
                  checkedChildren="ON"
                  unCheckedChildren="OFF"
                  onChange={checked =>
                    toggleFieldEdit(module.id, field.id, checked)
                  }
                />
              </div>
            </div>
          </div>
        )
      }))
    ]
  }));



  return (
    <ConfigProvider theme={{ token: { zIndexPopupBase: 99999999 } }}>
      {contextHolder}
      <Modal
        open={permModal}
        onCancel={handleCancel}
        footer={null}
        className="perm_modal_box modalBgColor"
        classNames={{ body: "perm_modal_view" }}
      >
        <div className="perm_modal_inner_box">
          <div className="perm_modal_header_box">
            <h6>
              Permission <p>Edit | View</p>
            </h6>
          </div>

          <Menu
            mode="inline"
            items={menuItems}
            selectable={false}
            className="perm_menu"
            expandIcon={({ isOpen }) => (
              <DownCircleOutlined rotate={isOpen ? 180 : 0} />
            )}
          />

          <div className="perm_modal_footer">
            <ActionButton
              title="Apply"
              loading={loading}
              onClick={handleSave}
            />
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
}


function mapStateToProps(state) {
  return {
    Red_Permission: state.Red_Permission
  };
}

export default connect(mapStateToProps, { ...PERM_ACTIONS })(PermModal);
