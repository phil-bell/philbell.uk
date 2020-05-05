import React from 'react';
import { Link } 
from "react-router-dom";import '../assets/scss/components/Sidebar.scss'

function Sidebar() {

    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <Link className="sidebar__link" to="/">Home</Link>
                <Link className="sidebar__link" to="/resume">Resume</Link>
                <Link className="sidebar__link" to="/admin">Admin</Link>
                <Link className="sidebar__link" to="/login">Login</Link>
                <Link className="sidebar__link" to="/contact">Contact</Link>
            </div>
        </div>
    )
}

export default Sidebar;