import React from "react";
import "../css/Header.css"
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNavicon } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
    return (
        <header>
            <section className="logo-container">
                <h2 className="headerText">Dealer</h2>
            </section>
            <section className="nav-container">
                <button >
                    <FontAwesomeIcon icon={faNavicon} className="nav-icon" />
                </button>
                <ul className="nav-items">
                    <li><NavLink to='/'>Home</NavLink></li>
                    <li><NavLink to='/documentation'>Documentation</NavLink></li>
                </ul>
            </section>
        </header>
    )
}