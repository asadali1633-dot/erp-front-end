import React from 'react'
import CSS from '../Button/button.module.css'
import { RiDeleteBin6Line as DeleteIcon } from "react-icons/ri";
import { Link } from 'react-router-dom';



const Button = ({
    type,
    title,
    className,
    loading,
    disabled,
    onClick,
    actionInfo,
    add
}) => {
    return (
        <>
        {
            add ? <Link onClick={onClick} className={`${CSS.button} ${className}`}>{title}</Link> 
            : 
            <>
                <button disabled={loading || disabled}
                className={`${CSS.button} ${className}`}
                type={type}>{loading ? "loading..." : title}</button>
                <p className='text-center m-0 p-0' style={{fontSize: "12px"}}>{actionInfo}</p>
            </>
        }
            
        </>
    )
}

const ActionButton = ({
    type,
    title,
    className,
    loading,
    onClick
}) => {
    return (
        <>
            <button disabled={loading} onClick={onClick}
             className={`${CSS.button} ${className}`}
            type={type}>{loading ? "loading..." : title}</button>
        </>
    )
}

const OutLineButton = ({
    type,
    title,
    className,
    loading,
    onClick,
    form,
    add,
    style
}) => {
    return (
        <>
        {
            form ? 
            <Link onClick={onClick} className={`${CSS.OutLineButton} ${className} OutLineButton`}>{title}</Link>
            : 
             <button disabled={loading} style={style} onClick={onClick}
             className={`${CSS.OutLineButton} ${className} OutLineButton`}
            type={type}>{loading ? "loading..." : title}</button>
        }
            
        </>
    )
}

const DeleteButton = ({
    type,
    title,
    className,
    loading,
    onClick
}) => {
    return (
        <>
            <button disabled={loading} onClick={onClick}
             className={`${CSS.DeleteButton} ${className}`}
            type={type}><DeleteIcon />{title}</button>
        </>
    )
}

const ShowMore = ({
    title,
    className,
    loading,
    disabled,
    onClick,
    actionInfo,
    add
}) => {
    return (
        <>
         <span onClick={onClick} style={{color:"#0020F2",cursor:"pointer"}} className={` ${className}`}>{title}</span> 
        </>
    )
}

export { 
    Button,
    ActionButton,
    OutLineButton,
    DeleteButton,
    ShowMore
 };