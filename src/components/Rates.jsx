import React, { useEffect } from "react";
import './Rates.css';
import TableBody from "./TableBody";
import { useState } from "react";
import { useRef } from "react";
import { rates } from "./text";
import { ratesTooltips } from "./text";

export default function Rates(props) {  
    
    const [errorText, setErrorText] = useState(''); 
    const [openHome, setOpenHome] = useState(false);
    const [localInputText, setLocalInputText] = useState('');
    const [isStoreUpdated, setIsStoreUpdated] = useState(false); //it checks if the browser local storage has sent data to the program

    const { calcConvert, calcFindOut, convt, currency, flag, rows, location, locationName, setConvt, setCurrency, setLocation, setLocationName, setRows } = props;
    const { addRow, caption, col1Heading, col2Heading, col3Heading, localCurrencyHeading } = rates
    const { ttAddRow,  ttLocationbutton } = ratesTooltips;
    
    const ratesErrorRef = useRef(); //grabs the rate container
    const localCurrencyRef = useRef();//grabs the local currency container
    const inputRef = useRef(); //grabs the local currency input
    let id = 1;

    const localCurrencyDropdown = Object.keys(currency).map(e => {
        return currency[e].name.search(localInputText.toUpperCase()) > -1 && <LocalCurrencyDropdown checkLocationOnRow={checkLocationOnRow} name={e} flag={flag} currency={currency}
            setOpenHome={setOpenHome} setCurrency={setCurrency} setLocation={setLocation} localInputText={localInputText}
            setLocationName={setLocationName} key={id++} convt={convt} setConvt={setConvt} 
        />
    })
   
    const Tablebody = Object.keys(rows).map(e=>{
        return <TableBody 
        buyValue={rows[e].bv} sellValue={rows[e].sv} name={rows[e].id} ratesError={ratesError} key={rows[e].id}
        setValue={setRows} currency={currency} setErrorText={setErrorText} location={location} flag={flag} 
        setCurrency={setCurrency} selected = {rows[e].selected} rows={rows} getSelectedCurrencies={getSelectedCurrencies}
        calcConvert={calcConvert} calcFindOut={calcFindOut} convt={convt} setConvt={setConvt} 
        />
    })
    useEffect(()=>{
        function checkOutside(event){
            if (openHome && localCurrencyRef.current && !localCurrencyRef.current.contains(event.target)) {
                setOpenHome(false)
            }
        }
        document.addEventListener("mouseup", checkOutside)
        return () => {document.removeEventListener('mouseup', checkOutside)}
    },[openHome])

    useEffect(()=>{
        const retrievedRows = localStorage.getItem('rows')
        const retreivedLocation = localStorage.getItem('location')
        const retreivedLocationName = localStorage.getItem('locationName')
        if ( retrievedRows) {
            setRows(JSON.parse(retrievedRows))
        }
        if (retreivedLocation) {
            setLocation(JSON.parse(retreivedLocation))
        }
        if (retreivedLocationName) {
            setLocationName(JSON.parse(retreivedLocationName))
        }
    },[setRows, setLocation, setLocationName ])

    useEffect(()=>{
        if (isStoreUpdated === true){
            localStorage.setItem('rows', JSON.stringify(rows))
            localStorage.setItem('location', JSON.stringify(location));
            localStorage.setItem('locationName', JSON.stringify(locationName))
        }
        setIsStoreUpdated(true);
    },[rows, location, locationName, isStoreUpdated]) 

    function addRatesRow() {
        setRows(prev=>{
            let num;
            for (let i = 5; num !== 'off'; i++) {
                if (!rows.hasOwnProperty([`row${i}`])) {
                    num = 'off';
                    return {
                        ...prev,
                        [`row${i}`] : {bv: "0.000", sv: "0.000", selected: "choose", id: i}
                    }
                } 
            }
        })
    }

    function checkLocationOnRow(clickedCurr) { //it will check if the selected location exists on the rates table
        let arr = [];   // it will display an error if the selected location has been set on the rates table
        let clickedLocation = currency[clickedCurr].country
        for(let j = 1; j <= Object.keys(rows).length; j++) {
            if (rows[`row${j}`].selected !== "choose") {
                arr[j-1] = rows[`row${j}`].selected ;
            }   
        }
        if (arr.length !== 0 && arr.some(e=>(clickedLocation === currency[e].country))) {
            setErrorText(`Clear ${clickedCurr} rates`)
            ratesError()
            return false
        } else {
            return true
        }

    }

    function getSelectedCurrencies () { /*It returns an array of all selected currencies in the rates table and home currency*/
        let arr = [];
        for(let j = 1; j <= Object.keys(rows).length; j++) {
            if (rows[`row${j}`] && rows[`row${j}`].selected !== "choose") {
                arr[j-1] = rows[`row${j}`].selected ;
            }   
        }
        if(location!=="choose") {
            for (let i = 0; i < Object.keys(currency).length; i++) {
                if (currency[Object.keys(currency)[i]].country === location) {
                    arr = [...arr, Object.keys(currency)[i]]
                }
            }
        }
        return arr;
    }

    function localInputTextHandler(e){
        setLocalInputText(e.target.value)
    }

    function ratesError() {  /*It will display errors from the rates component*/
        ratesErrorRef.current.classList.add('error-fade');
        ratesErrorRef.current.style.display='block';
        setTimeout(()=>{ratesErrorRef.current.classList.remove('error-fade'); ratesErrorRef.current.style.display='none'}, 2900)
    }
    return (
        <div id="table-card">
            <div className="local-currency " ref={localCurrencyRef}>
                <h3 className="local-currency-heading">{localCurrencyHeading}</h3>
                <button type="button" className="local-currency-button ttButton " onClick={()=>setOpenHome(old=>(!old))}> 
                    <span className={flag[locationName]}></span> {location} 
                    <span className="ttText right-tt">{ttLocationbutton}</span>
                </button>
                <div className={`local-currency-dropdown ${openHome? 'active':'inactive'}`}>
                    <input type="text" placeholder="search..." className="local-currency-search"  
                        onKeyUp={localInputTextHandler} ref={inputRef} onFocus={e => e.target.select()}
                    />
                    <ul>{localCurrencyDropdown}</ul>
                </div>
            </div>
            <h3 className="rates-table-caption">{caption}</h3>
            <div className="rates-error-container">
                <p className="error-message" ref={ratesErrorRef}>{errorText}</p>
            </div>
            <table className="rates-table">
                <thead>
                    <tr className="rates-heading">
                        <th className="column1 ">{col1Heading}</th>
                        <th className="column2 ">{col2Heading}</th>
                        <th className="column3 ">{col3Heading}</th>
                        <th className="column4 " >
                            <button className="add-remove rates-add ttButton" onClick={addRatesRow}>
                                {addRow}
                                <span className="ttText right-tt">{ttAddRow}</span>
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Tablebody}
                </tbody>
            </table>
        </div>
    )
}

function LocalCurrencyDropdown(props) {
    const{ currency, checkLocationOnRow, flag,  name, setOpenHome, setCurrency, setLocation, setLocationName}=props
    const clickedLocation= currency[name].country
    return (
        <li className="home-dropdown-list" onClick={()=>{
            checkLocationOnRow(name) && setLocation(clickedLocation)
            checkLocationOnRow(name) && setLocationName(name)
            checkLocationOnRow(name) && setCurrency((prev)=>({...prev, [name]: {...prev[name], bv: 1, sv: 1}}))
            setOpenHome(false) }}
        > <span className={flag[name]}>{}</span> {name} </li>
    )
}