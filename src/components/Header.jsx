import React, { useEffect } from "react";
import "../css/Header.css"
import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNavicon } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
    const [navIsOpen, setNavIsOpen] = useState(false)
    const buttonRef = useRef();

    useEffect(()=>{
        function turnOff(event) {
            if (navIsOpen && buttonRef.current && !buttonRef.current.contains(event.target)){
                setNavIsOpen(false)
            }
        }
        document.addEventListener('click', turnOff)
        return () => {document.removeEventListener("click", turnOff)}
    }, [navIsOpen])
    return (
        <header>
            <section className="logo-container">
                <h2 className="headerText">WolexChange</h2>
            </section>
            <section className="nav-container">
                <button className="nav-button" onClick={()=>{setNavIsOpen(prev=>(!prev))}} ref={buttonRef} >
                    <FontAwesomeIcon icon={faNavicon} className="nav-icon" />
                </button>
                {navIsOpen && <ul className="nav-items">
                    <li><NavLink to='/WolexChange/Home' className="links">Home</NavLink></li>
                    <li><NavLink to='WolexChange/documentation' className="links">Documentation</NavLink></li>
                    <li><NavLink to='WolexChange/about' className='links'>About</NavLink></li>
                </ul>}
            </section>
            <section className="bg-nav-container">
                <ul className="bg-nav-items">
                    <li className="bg-nav-li"> <NavLink to='/WolexChange/Home' className="bg-links nv-home">Home</NavLink> </li>
                    <li className="bg-nav-li"> <NavLink to='/WolexChange/documentation' className="bg-links nv-docs">Documentation</NavLink> </li>
                    <li className="bg-nav-li"> <NavLink to='/WolexChange/about' className='bg-links nv-bout'>About</NavLink> </li>
                </ul>
            </section>
        </header>
    )
}
