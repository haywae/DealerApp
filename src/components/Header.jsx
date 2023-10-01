import React from "react";
import "../css/Header.css"
export default function Header() {
    return (
        <header>
            <section className="logo-container">
                <h2 className="headerText">Dealer</h2>
            </section>
            <section className="nav-container">
                <ul className="nav-items">
                    <li><a href="/home">Home</a></li>
                    <li><a href="/userGuide">User Guide</a></li>
                </ul>
            </section>
        </header>
    )
}