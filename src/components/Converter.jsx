import React, { useRef } from "react";
import { useState } from "react";
import './Converter.css';
import ConverterMain from "./ConverterMain";
import { converterDetails } from "./text";
import { converterTooltips } from "./text";

export default function Converter(props){
    const [errorText, setErrorText] = useState("");
    

    const {calcConvert, calcFindOut, convt, currency, flag, setConvt, setView, view} = props;
    const {ttAddRow} = converterTooltips
    const {addRow, tab1DescriptionText, tab2DescriptionText, leftHeading, rightHeading ,tab1Caption, tab2Caption } = converterDetails;

    const convtRef = useRef();
    const errorRef = useRef();
    const convertMain = Object.keys(convt.convert).map(e => {
        return <ConverterMain currency={currency} errorDisplay={errorDisplay} key={e}
            setErrorText={setErrorText} name={e} view={view} flag={flag} setView={setView} 
            convt={convt} setConvt={setConvt} calcFindOut={calcFindOut} calcConvert={calcConvert} 
        />
    })
    
    const findoutMain = Object.keys(convt.findOut).map(e => {
        return <ConverterMain currency={currency} errorDisplay={errorDisplay} key={e}
            setErrorText={setErrorText} name={e} view={view} flag={flag} setView={setView} 
            convt={convt} setConvt={setConvt} calcFindOut={calcFindOut} calcConvert={calcConvert}
        />
    })
    
    function addConverter() {
        setConvt(prev => {
            let num;
            for (let i = 1; num !== 'off'; i++) {
                if (!convt[view].hasOwnProperty([`row${i}`])){
                    num = 'off';
                        return {
                        ...prev,
                        [view] : {...prev[view], [`row${i}`] : {selectInput: "choose", input: "", selectOutput: "choose", output: 0, id: i}}
                    }
                }
            }
        })
    } 

    function errorDisplay() { 
        let text = errorRef.current; /*the function displays the error message on the error div element class="converter-error"*/
        text.classList.add('error-fade');
        text.style.display='block';
        setTimeout(()=>{text.classList.remove('error-fade'); text.style.display='none'}, 2900)
    }

    function toggleView(e) {
        e.target.innerText === "Convert" ? setView("convert") : setView("findOut")
    }
    return(
        <div className="cards converterCard" ref={convtRef}>
            <nav className="cards-nav converter-nav">
                <ul className="cards-nav-list convt-nav-list">
                    <li className={`nav-item1 ${view === "convert" ? "nav-active" : "nav-inActive"}`} onClick={toggleView}>{tab1Caption}</li>
                    <li className={`nav-item2 ${view === "findOut" ? "nav-active" : "nav-inActive"}`} onClick={toggleView}>{tab2Caption}</li>
                    <div className='add-remove-container'>
                        <button type="button" onClick={addConverter} className="add-remove convt-add ttButton ">
                            {addRow}
                            <span className="ttText right-tt">{ttAddRow}</span>
                        </button>
                    </div>
                </ul>
            </nav>
            <div className="convt-headings">
                <h3>{leftHeading}</h3>
                <h3>{rightHeading}</h3>
            </div>

            {view === 'convert' ? convertMain : findoutMain}

            <footer className="converter-footer">
                <div className="converter-error-container" >
                    <p className="converter-error " ref={errorRef} >{errorText}</p>
                </div>
                <div className="description-text">
                    <p>{view === 'convert' ? tab1DescriptionText : tab2DescriptionText}</p>
                </div>
            </footer>
        </div> 
    )
}

