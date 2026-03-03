import React from 'react'
import style from '../ProfileImage/ProfileImage.module.css'
import { FaPencilAlt } from "react-icons/fa";

function ProfileImage({
    handleImageChange,handleEditClick,preview, setPreview,fileInputRef
}) {
    return (
        <>

            <div className={style.editable_image_box}>
                <img src={preview} alt="editable" />
                <div className={style.overlay} onClick={handleEditClick}>
                    <FaPencilAlt className={style.pencil_icon} />
                </div>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className={style.file_input}
                />
            </div>
            
        </>
    )
}

export default ProfileImage