import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Form, Upload } from 'antd';
import { FaFileCirclePlus } from "react-icons/fa6";

import style from './UploadFile.module.css'


const UploadFile = ({
  className,
  title,
  name,
  label,
  required,
  message,
  multiple,
  accept
}) => {
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'http://www.baidu.com/xxx.png',
    },
  ]);


  const handleChange = info => {
    // let newFileList = [...info.fileList];
    // newFileList = newFileList.slice(-2);
    // newFileList = newFileList.map(file => {
    //   if (file.response) {
    //     file.url = file.response.url;
    //   }
    //   return file;
    // });
    // setFileList(newFileList);
  };

  const props = {
    onChange: handleChange,
    multiple: multiple,
  };
  return (
    // fileList={fileList}
    <>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              colorBgContainer: "#2f2f2f",
              display: "block",
              fontSize: 11,
              borderRadius: "0",
              colorText: "red",
              colorBorder: "#2f2f2f",
            },
          },
        }}
      >
        <div className={`${style.mainBox} ${className}`}>
          <Form.Item
            name={name}
            label={label}
            rules={[{ required: required, message: message }]}
            getValueFromEvent={(e) => e?.fileList?.[0]}
          >
            <Upload style={{width:"100%"}}
              {...props}
              showUploadList={false}
              accept={accept}
              className={style.uploadRoot}
            >
              <Button className={style.button}
                icon={<FaFileCirclePlus />}
              >{title}</Button>
            </Upload>
          </Form.Item>

        </div>
      </ConfigProvider>
    </>
  );
};
export default UploadFile;