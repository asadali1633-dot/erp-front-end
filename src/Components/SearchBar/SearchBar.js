import style from '../SearchBar/SearchBar.module.css'
import { IoIosSearch as SearchIcon } from "react-icons/io";



const SearchBar = ({
    placeholder,
    className,
    onChange
}) => {
    return (
        <>
            <div className={`${style.SearchBarBox} ${className}`}>
                <input type="search" placeholder={placeholder} onChange={onChange} />
                <SearchIcon />
            </div>
        </>
    )
}

export {
    SearchBar
};