import React from 'react'
import '../css/Footer.css'
import { Link } from 'react-router-dom'

export function Footer() {
    return (
        <div className='footer-container'>
            {/*<div className='footer-r'>
                <Link className='footer-tags'>Disclaimer </Link>
                <span className='footer-tag-sep'>|</span>
                <Link className='footer-tags'>Terms of Service</Link>
                <span className='footer-tag-sep'>|</span>
                <Link className='footer-tags'>Privacy Policy</Link>
    </div>*/}
            <div className='footer-r'> &copy; 2023 Wolex Enterprise</div>
        </div>
    )
}