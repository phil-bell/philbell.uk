import React from 'react';
import '../assets/scss/components/Sidebar.scss'

function Sidebar() {

    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <a className="sidebar__link">Home</a>
                <a className="sidebar__link">Resume</a>
                <a className="sidebar__link">Admin</a>
            </div>
            <div className="sidebar__bot">
                <a className="sidebar__link">Login</a>
                <a className="sidebar__link">Contact</a>
            </div>
        </div>
    )
}

export default Sidebar;