import { Modal, Popconfirm, message } from 'antd';
import React, { useRef, useState } from 'react';
import style from './form.module.css';
import baseUrl from '../../../../config.json';
import FilePreviewImage from '../../../../Components/FileIconType/FilePreviewImage';
import { CiViewTimeline } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoCloudDownloadOutline } from "react-icons/io5";
import * as ACTIONS from '../../../../store/action/clients/index';
import { FaUpload } from "react-icons/fa6";
import { connect, useSelector } from 'react-redux';

function FileView({
    fileModal,
    setFileModal,
    updateClientFiles,
    code,
    pageBody,
    deleteClientFile,
    GetAllClientithPage
}) {
    const fileInputRef = useRef(null);
    const accessToken = useSelector((state) => state.Red_Auth.accessToken);
    const [currentFileType, setCurrentFileType] = useState(null);
    const [currentFileIndex, setCurrentFileIndex] = useState(null);
    const [uploading, setUploading] = useState(false);


    const handleCancel = () => {
        setFileModal(null);
    };

    const handleOk = () => {
        setFileModal(null);
    };

    const handleUploadClick = (fileType, index) => {
        setCurrentFileType(fileType);
        setCurrentFileIndex(index);
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const type = currentFileType;
        const idx = currentFileIndex;
        const tempUrl = URL.createObjectURL(file);

        if (type === 'attachments') {
            setFileModal(prev => {
                const newAttachments = [...prev.attachments];
                newAttachments[idx] = { url: tempUrl, originalName: file.name };
                return { ...prev, attachments: newAttachments };
            });
        } else if (type === 'msa_document') {
            setFileModal(prev => ({
                ...prev,
                msa_document: [{ url: tempUrl, originalName: file.name }]
            }));
        } else if (type === 'tax_exemption_certificate') {
            setFileModal(prev => ({
                ...prev,
                tax_exemption_certificate: [{ url: tempUrl, originalName: file.name }]
            }));
        }

        setUploading(true);
        const formData = new FormData();
        formData.append('files', file);

        if (type === 'attachments' && idx !== null && idx !== undefined) {
            formData.append('index', idx);
        }
        try {
            await updateClientFiles(code?.code, type, formData, accessToken);
            message.success(`${type} uploaded successfully`);
            GetAllClientithPage(pageBody, accessToken);
        } catch (error) {
            console.error('Upload error:', error);
            message.error('Upload failed');
        } finally {
            setUploading(false);
            // Reset
            fileInputRef.current.value = '';
            setCurrentFileType(null);
            setCurrentFileIndex(null);
        }
    };
    const handleDelete = async (field, index) => {
        try {
            const isCheck = await deleteClientFile(code?.code, field, index, accessToken);
            if (isCheck.success) {
                if (field === 'attachments') {
                    setFileModal(prev => {
                        const newAttachments = [...prev.attachments];
                        newAttachments.splice(index, 1);
                        return { ...prev, attachments: newAttachments };
                    });
                } else if (field === 'msa_document') {
                    setFileModal(prev => ({ ...prev, msa_document: [] }));
                } else if (field === 'tax_exemption_certificate') {
                    setFileModal(prev => ({ ...prev, tax_exemption_certificate: [] }));
                }
                message.success(isCheck?.message);
            } else {
                message.error(isCheck.message || 'Delete failed');
            }
        } catch (error) {
            console.error('Delete error:', error);
            message.error('Failed to delete file');
        }
    };

    const downloadFile = async (filePath) => {
        try {
            const fullUrl = `${baseUrl.baseUrl}${filePath}`;
            const response = await fetch(fullUrl);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filePath.split('/').pop();
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download error:', error);
            message.error('Download failed');
        }
    };

    const getFileInfo = (item) => {
        if (typeof item === 'string') {
            return { path: item, name: item?.split('/').pop() };
        } else {
            return { path: item.url, name: item?.originalName };
        }
    };

    return (
        <>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
            />
            <Modal
                title="Files Viewer"
                closable
                className='modalBgColor'
                open={fileModal !== null}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                width={600}
            >
                <div className={style.fileViewModal}>
                    {fileModal?.attachments?.length > 0 && (
                        <>
                            <h4>Attachments</h4>
                            {fileModal.attachments.map((item, index) => {
                                const { path, name } = getFileInfo(item);
                                return (
                                    <div className={style.fileContent} key={`att-${index}`}>
                                        <div>
                                            <FilePreviewImage filePath={path} originalName={name} />
                                            <span
                                                className='mx-1'
                                                onClick={() => window?.open(`${baseUrl.baseUrl}${path}`, '_blank')}
                                            >
                                                {name?.slice(0, 15)}
                                            </span>
                                        </div>
                                        <div className={style.fileBoxAction}>
                                            <CiViewTimeline
                                                className='mx-1'
                                                onClick={() => window.open(`${baseUrl.baseUrl}${path}`, '_blank')}
                                            />
                                            <Popconfirm
                                                title="Delete the File"
                                                description="Are you sure to delete the file?"
                                                okText="Yes"
                                                cancelText="No"
                                                onConfirm={() => handleDelete('attachments', index)}
                                            >
                                                <RiDeleteBin6Line className='mx-1' style={{ color: "red" }} />
                                            </Popconfirm>
                                            <IoCloudDownloadOutline
                                                className='mx-1'
                                                onClick={() => downloadFile(path)}
                                            />
                                            <FaUpload
                                                className='mx-1'
                                                onClick={() => handleUploadClick('attachments', index)}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </>
                    )}

                    {fileModal?.msa_document?.length > 0 && (
                        <>
                            <h4>MSA Document</h4>
                            {fileModal.msa_document.map((item, index) => {
                                const { path, name } = getFileInfo(item);
                                return (
                                    <div className={style.fileContent} key={`msa-${index}`}>
                                        <div>
                                            <FilePreviewImage filePath={path} originalName={name} />
                                            <span
                                                className='mx-1'
                                                onClick={() => window.open(`${baseUrl.baseUrl}${path}`, '_blank')}
                                            >
                                                {name?.slice(0, 15)}
                                            </span>
                                        </div>
                                        <div className={style.fileBoxAction}>
                                            <CiViewTimeline className='mx-1' onClick={() => window.open(`${baseUrl.baseUrl}${path}`, '_blank')} />
                                            <Popconfirm
                                                title="Delete"
                                                description="Delete this file?"
                                                okText="Yes" cancelText="No"
                                                onConfirm={() => handleDelete('msa_document')}
                                            >
                                                <RiDeleteBin6Line className='mx-1' style={{ color: "red" }} />
                                            </Popconfirm>
                                            <IoCloudDownloadOutline className='mx-1' onClick={() => downloadFile(path)} />
                                            <FaUpload className='mx-1' onClick={() => handleUploadClick('msa_document', index)} />
                                        </div>
                                    </div>
                                );
                            })}
                        </>
                    )}

                    {fileModal?.tax_exemption_certificate?.length > 0 && (
                        <>
                            <h4>Tax Exemption Certificate</h4>
                            {fileModal.tax_exemption_certificate.map((item, index) => {
                                const { path, name } = getFileInfo(item);
                                return (
                                    <div className={style.fileContent} key={`tax-${index}`}>
                                        <div>
                                            <FilePreviewImage filePath={path} originalName={name} />
                                            <span
                                                className='mx-1'
                                                onClick={() => window.open(`${baseUrl.baseUrl}${path}`, '_blank')}
                                            >
                                                {name?.slice(0, 15)}
                                            </span>
                                        </div>
                                        <div className={style.fileBoxAction}>
                                            <CiViewTimeline className='mx-1' onClick={() => window.open(`${baseUrl.baseUrl}${path}`, '_blank')} />
                                            <Popconfirm
                                                title="Delete"
                                                description="Delete this file?"
                                                okText="Yes" cancelText="No"
                                                onConfirm={() => handleDelete('tax_exemption_certificate')}
                                            >
                                                <RiDeleteBin6Line className='mx-1' style={{ color: "red" }} />
                                            </Popconfirm>
                                            <IoCloudDownloadOutline className='mx-1' onClick={() => downloadFile(path)} />
                                            <FaUpload className='mx-1' onClick={() => handleUploadClick('tax_exemption_certificate', index)} />
                                        </div>
                                    </div>
                                );
                            })}
                        </>
                    )}

                    {(!fileModal?.attachments?.length &&
                        !fileModal?.msa_document?.length &&
                        !fileModal?.tax_exemption_certificate?.length) && (
                            <div style={{ textAlign: 'center', padding: 20 }}>No documents found</div>
                        )}
                </div>
            </Modal>
        </>
    );
}

function mapStateToProps(state) {
    return {
        Red_Clients: state.Red_Clients,

    };
}
const AllActions = {
    ...ACTIONS,
};
export default connect(mapStateToProps, AllActions)(FileView);