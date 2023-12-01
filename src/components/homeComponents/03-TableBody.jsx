import  {useEffect} from 'react'
import { useState } from "react";
import { useRef } from "react";
import '../../css/home/Rates.css';
import { rates, ratesTooltips } from './text';
import React from 'react';

export default function TableBody(props) {
    const[isOpen,setIsOpen] = useState(false);
    const [inputText, setInputText] = useState('');
    const inputRef = useRef();
    const preValue = useRef();
    const { buyValue, calcConvert, calcFindOut, convt, currency, flag, getSelectedCurrencies, location, name, rows, ratesError, selected, 
        sellValue, setConvt, setCurrency, setErrorText, setValue, setLastUpdate
    } = props;
    const { closeRow, resetRow} = rates;
    const {ttCurrencyButton, ttResetButton, ttCloseButton} = ratesTooltips;
    const curRef = useRef(Object.keys(currency));
    let selectedCursRef = useRef();
    let id = 1;

    const dropdown = curRef.current.map(e=>{
        return currency[e].name.search(inputText.toUpperCase()) > -1  &&  <DropDown  key = {id++} setValue={setValue} buyValue={buyValue} sellValue={sellValue} inputText={inputText}
            currency={currency} name={name} checkLocation={checkLocation} checkIfSelected={checkIfSelected} rows={rows} reCalculateConverter={reCalculateConverter}
            location={location} text={currency[e].name} setCurrency={setCurrency} setIsOpen={setIsOpen} flag={flag} show={true}
        />
    });
    useEffect(()=>{
        selectedCursRef.current = getSelectedCurrencies();
    });

    useEffect(()=>{
        function checkOutside(event){
            if (isOpen && preValue.current && !preValue.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mouseup", checkOutside)
        return () => {document.removeEventListener('mouseup', checkOutside)}
    },[isOpen]);

    useEffect(()=>{
        function resetUnselected() {
            for (let i  = 0; i < curRef.current.length; i++) {
                let condition = selectedCursRef.current.some(e=> (curRef.current[i] === e))
                if (!condition) {
                    setCurrency(prev=> ({
                        ...prev, 
                        [curRef.current[i]] : {...prev[curRef.current[i]], bv: 0, sv: 0}
                    }))
                }
            } 
            
        }
        resetUnselected()
    },[rows,setCurrency,selectedCursRef,location]);

    function checkIfSelected(currency) { //it will check if a selected country has been selected among the rows
        let condition =  getSelectedCurrencies().some(e=> (currency === e))  
        if (condition) { 
            setErrorText(`${currency} has been selected`)
            ratesError();
            return false;
        } else {
            return true;
        }
    }
    function checkLocation(text) {
        if (location !== "choose"){
            if (currency[text].country !== location) {
                return true
            } else {
                setErrorText("You can't select your local currency")
                ratesError();
                return false
            }
        } else {
            setErrorText("Choose your location")
            ratesError();
            return false
        }
    }
    function handleBuy(event) {
        const {value} = event.target
        setValue(prev=>{
            return{
                ...prev,
                [`row${name}`]: {...prev[`row${name}`], bv: value}
            }
        })
    }
    function handleSell(event) {
        const {value} = event.target
        setValue(prev=>{
            return{
                ...prev,
                [`row${name}`]: {...prev[`row${name}`], sv: value}
            }
        })
    }
    function removeRow() {
        setValue(prev=>{
            let newObj = {};
            Object.keys(rows).map( e => {
                if (`row${name}` !== e) {
                    newObj = {...newObj, [e]: prev[e]}
                }
                return null;
            })
            return newObj;
        })
    }
    function reset() {
        setValue(prev => (
            {
                ...prev,
                [`row${name}`]: {...prev[`row${name}`], bv: "0.000", sv: "0.000", selected: "choose"} 
            }
        ))
        Object.keys(convt).map( d => {
            Object.keys(convt[d]).map(e => {
                if (convt[d][e]['selectInput'] === selected) {
                    setConvt(prev => ({
                        ...prev,
                        [d]: {...prev[d],
                            [e]: {...prev[d][e], selectInput: 'choose'}
                        }
                    }))
                } if (convt[d][e]['selectOutput'] === selected) {
                    setConvt(prev => ({
                        ...prev,
                        [d]: {...prev[d],
                            [e]: {...prev[d][e], selectOutput: 'choose'}
                        }
                    }))
                }
                return null;
            })
            return null;
        })
    }
    function inputTextHandler(e){
        setInputText(e.target.value)
        return e.target.value
    }
    function reCalculateConverter(){
        Object.keys(convt['convert']).map(e => {
            return calcConvert(e)
        })
        Object.keys(convt['findOut']).map(e => {
            return calcFindOut(e)
        })
    }
    function addZero(num)  {
        return num < 10 ? `0${num}` : num;
    }
    function getUpdate() {
        const date = new Date().toLocaleDateString('en-UK');
        const hours = new Date().getHours()
        const minutes = new Date().getMinutes()
        const seconds = new Date().getSeconds()
        return `Last Updated: ${date} - ${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`
    }
    return (
        <tr className='rates-data'>
            <td className="column1" ref={preValue}>
                <button className="dropBtn ttButton"
                onClick={()=>setIsOpen(oldState => !oldState)} 
                >
                    <span className={selected!=="choose"? flag[selected] : ""}></span> 
                    <span className='fi-selected'>{selected}</span>
                    <span className="ttText left-tt">{ttCurrencyButton}</span>
                </button>
                <div className={`dropdownContent ${isOpen? 'active':'inactive'}`}>
                    <input type="text" placeholder="search..." className="local-currency-search dropdown-search"  
                        onFocus={e => e.target.select()} onKeyUp={inputTextHandler} ref={inputRef} defaultValue={''}
                    />
                    <ul>
                        {dropdown}
                    </ul>
                </div>
            </td>

            <td className="column2">
                <input  
                    className='rates-input'   
                    onBlur={(e)=> {
                        const {value} = e.target;
                        setValue(prev => {
                            return{...prev, [`row${name}`]: {...prev[`row${name}`], bv: Number(value).toFixed(3), sv: Number(sellValue).toFixed(3)}
                        }})
                        if (selected !== "choose" ) {
                            setCurrency(prev=>{
                                return{...prev, [selected]: {...prev[selected], bv: Number(value)}}
                            })
                        }
                        reCalculateConverter()
                        setLastUpdate(getUpdate)
                    }}
                    value={buyValue}
                    onChange={handleBuy} 
                    onFocus={e => e.target.select()}
                    type="number"
                    step='0.01'
                />
            </td>

            <td className="column3">
                <input
                    className='rates-input'
                    onBlur={(e)=> {
                        const {value} = e.target;
                        setValue(prev => {
                            return{...prev, [`row${name}`]: {...prev[`row${name}`], bv: Number(buyValue).toFixed(3), sv: Number(value).toFixed(3)}
                        }})
                        if (props.selected !== "choose") {
                            setCurrency(prev=>{
                                return{...prev, [selected]: {...prev[selected],  sv: Number(value)}}
                            })
                        }
                        reCalculateConverter()
                        setLastUpdate(getUpdate)
                    }}  
                    value={sellValue}
                    onChange={handleSell}
                    onFocus={e => e.target.select()}
                    type="number"
                    step='0.01'
                />
            </td>
            <td className='column4'>
                <div className='rates-button-cont'>
                    <button className='reset-button rates-reset ttButton' 
                        onMouseDown={()=>{
                            reset()
                        }} 
                        onMouseUp={()=>{
                            reCalculateConverter();
                        }}
                    > 
                        {resetRow} 
                        <span className="ttText right-tt">{ttResetButton}</span>
                    </button>
                    {name > 4 && <button className='add-remove remove-button ttButton' onClick={removeRow}> 
                        {closeRow}
                        <span className="ttText right-tt">{ttCloseButton}</span>
                    </button> }
                </div>
            </td>
        </tr>
    )
}
/*--dropdown function-- =>{to be rendered inside the tablebody}*/
function DropDown(props) {
    const {buyValue, checkIfSelected, checkLocation, flag, name, reCalculateConverter,
        sellValue, setCurrency, setValue, setIsOpen, text
    } = props

    return(    
    <li className="currency-list"  onMouseDown={()=>{
        checkLocation(text) && checkIfSelected(text) && setValue(prev=>{
            return{
                ...prev,
                [`row${name}`]: {...prev[`row${name}`], selected : text}
            }
        });
        checkLocation(text) && checkIfSelected(text) && setCurrency(prev=>{
            return {
                ...prev,
                [text]: {...prev[text], bv:Number(buyValue), sv:Number(sellValue)}
            }
        })
        setIsOpen(false)
    }} 
    onMouseUp={()=>{
        reCalculateConverter()
    }}
    >
        <span className={flag[text]}></span> <span className='fi-selected'> {text} </span>
    </li>
    )
}