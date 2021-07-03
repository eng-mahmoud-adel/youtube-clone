import React, { useState } from 'react';
import './_header.scss';

import { FaBars } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { MdNotifications, MdApps } from "react-icons/md";
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = ({ handleToggleSidebar }) => {

    const [input, setInput] = useState('');

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/search/${input}`);
    }

    const {photoURL} = useSelector(state => state.auth?.user);

    return (
        <div className="header">
            <FaBars className="header-menu" size={25} onClick={() => handleToggleSidebar(false)} />
            <img src="https://storage.googleapis.com/gweb-uniblog-publish-prod/images/YouTube.max-1100x1100.png" alt="" className="header-logo" />

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Search" value={input} onChange={e => setInput(e.target.value)} />
                <button type="submit">
                    <AiOutlineSearch size={22} />
                </button>
            </form>

            <div className="header-icons">
                <MdNotifications size={28} />
                <MdApps size={28} />
                <img src={photoURL && photoURL} alt="avatar" />
            </div>
        </div>
    )
}

export default Header;
