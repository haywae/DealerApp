import React, { forwardRef, useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import '../css/Converter.css';
import { converterDetails } from "./text";
import { converterTooltips } from "./text";

export default function ConverterMain (props) {
    const { convt,  setConvt, currency, calcConvert, calcFindOut,
        errorDisplay, flag, name,  setErrorText, view
    } = props;
    const {closeRow, copyOutput, resetRow, switchButton} = converterDetails;
    const {ttCloseButton, ttCopyResult, ttReset, ttSwitchValues} = converterTooltips;

    const[isOpen,setIsOpen] = React.useState({selectInput: false, selectOutput:false});
    const [inputText, setInputText] = useState({leftInput: '', rightInput: ''}); // the value of the  input on the currency select dropdrown
    
    const preValue = useRef([]);
    const main = useRef(); //grabs the main element
    const inputRef = useRef([]);//grabs the input element
    const curRef = useRef(Object.keys(currency))
    let id = 1;

    const convtDropdown1 = curRef.current.map(e=>{
        return currency[e].name.search(inputText['leftInput'].toUpperCase()) > -1 && <Dropdown key={id++} type="selectInput" convt={convt} setConvt={setConvt} errorDisplay={errorDisplay}
        text={e} currency={currency} checkSelectValue={checkSelectValue} setIsOpen={setIsOpen} view={view} 
        checkSameValue={checkSameValue} name={name} flag={flag} calcConvert={calcConvert} calcFindOut={calcFindOut}/>
    })
    const convtDropdown2 = curRef.current.map(e=>{
        return currency[e].name.search(inputText['rightInput'].toUpperCase()) > -1 && <Dropdown key={id++} type="selectOutput" convt={convt} setConvt={setConvt} errorDisplay={errorDisplay}
        text={e} currency={currency} checkSelectValue={checkSelectValue} setIsOpen={setIsOpen} view={view}
        checkSameValue={checkSameValue} name={name} flag={flag} calcConvert={calcConvert} calcFindOut={calcFindOut}/>
    })

    useEffect(()=>{
        /*This use effect will turn off the corresponding dropdown on mouseup*/
        function checkOutside(event){     
            if (isOpen.selectInput && preValue.current[0] && !preValue.current[0].contains(event.target)) {
                setIsOpen(prev=>({...prev, selectInput: false}))
            }
            if (isOpen.selectOutput && preValue.current[1] && !preValue.current[1].contains(event.target)) {
                setIsOpen(prev=>({...prev, selectOutput: false}))
            }
        }
        document.addEventListener("mouseup", checkOutside)
        return () => {document.removeEventListener("mouseup", checkOutside)}
    },[isOpen])

    function checkSameValue(value, type) { 
        if (type === "selectInput" && value === convt[view][name].selectOutput) { 
            setErrorText(`You can't select same currencies`)     //it will check if selected currency already exists on the other side
            errorDisplay();                                      //it will display error if currency exists and returns true if it doesn't exist
            return false;                                        // it receives the currency type to exchange from and currency value to exchange to as parameters 
        } else if (type === "selectOutput" && value === convt[view][name].selectInput) {
            setErrorText(`You can't select same currencies`)
            errorDisplay();
            return false;
        } else {
            return true;
        }
    }   

    function checkSelectValue(value, type){
        if (type === "selectInput" && currency[value].bv === 0) { 
            setErrorText(`Set ${value} rates`);       /*It will check if a selected currency has been set on the rates table*/
            errorDisplay()                            // it will display error if it's rates is not set and return falsenpm start
            return false;                             // if it is set, it will return true
        } else if (type === "selectOutput" && currency[value].sv === 0){
            setErrorText(`Set ${value} rates`);
            errorDisplay()
            return false;
        }else {
            return true;
        }
    }

    function removeConverter() {
        setConvt(prev =>{
            let newObj={};
            Object.keys(convt[view]).map(e => {
                if (name !== e ){
                    newObj = {
                        ...newObj, [e]: prev[view][e] 
                    }
                }    
                return null
            })
            return {...prev, [view]: {...newObj}}
        })
    }

    function resetConverter() {
        setConvt(prev=>( {...prev, 
            [view]: {...prev[view], 
                [name]: {...prev[view][name], selectInput: "choose", input: "", selectOutput: "choose", output: 0}
            } 
        } )) //it will reset values to default
    }

    function switchValues() {
        const f = convt[view][name]
        setConvt(prev=>( {...prev, 
            [view]: {...prev[view], 
                [name]: {...prev[view][name], selectInput: f.selectOutput, selectOutput: f.selectInput } 
            }
        } )) // it will switch the values from the select button
    }

    function changeToCurrency(value){
        // it changes a number to comma seperated currency
        return Number(value).toLocaleString("en-US", {style: "decimal", minimumFractionDigits: 0});
    }

    function inputTextHandler(e){
        //it handles the droplist search input
        const {value} = e.target 
        const {name} = e.target
        setInputText(prev => {
            if (name === 'leftInput') {
                return{
                    ...prev, leftInput : value
                }
            } else {
                return{
                    ...prev, rightInput: value
                }
            }
        
        })
    }

    return ( 
        <main className="card-main converter-main" ref={main}>
            <div className="converter-row1">
                <div className={`${view ==='findOut'? 'copy-reset-container2' : 'copy-reset-container1'}`}>
                    <button type="button" className={`${ convt[view][name]['id'] !== 1 ? 'convt-copy2': 'convt-copy1'} ttButton copy-button`} onClick={()=>{navigator.clipboard.writeText(convt[view][name].output)}}>
                        {copyOutput}
                        <span className="ttText right-tt">{ttCopyResult}</span>
                    </button>
                    <button type='button'className="reset-button converter-reset ttButton" onClick={resetConverter}>
                        {resetRow}
                        <span className="ttText right-tt">{ttReset}</span>
                    </button>
                    {convt[view][name]['id'] !== 1 && <button type="button" onClick={removeConverter} className="converter-remove remove-button ttButton">
                        {closeRow}
                        <span className="ttText right-tt">{ttCloseButton}</span>
                    </button>}
                </div>
            </div>

            <div className="converter-row2" >
                { view === 'convert' ?
                    <SelectInput  convtDropdown={convtDropdown1} flag={flag} isOpen={isOpen} selectInput={convt[view][name]['selectInput']}
                        inputTextHandler={inputTextHandler} view={view} setIsOpen={setIsOpen} ref={{preValue, inputRef}}
                    /> :
                    <SelectOutput convtDropdown={convtDropdown2} flag={flag} isOpen={isOpen} selectOutput={convt[view][name]['selectOutput']}
                        inputTextHandler={inputTextHandler} view={view} setIsOpen={setIsOpen} ref={{preValue, inputRef}}
                    />
                }

                {view === "convert"? <Input name={name} setConvt={setConvt} view={view} calcConvert={calcConvert}
                    calcFindOut={calcFindOut} input={convt[view][name]['input']}
                /> : 
                    <Output changeToCurrency={changeToCurrency} output={convt[view][name]['output']}
                />}

                <button className="switch-button ttButton " onMouseDown={switchValues} onMouseUp={()=>{view === 'convert'? calcConvert(name) : calcFindOut(name);}}>
                    {switchButton}
                    <span className="ttText left-tt">{ttSwitchValues}</span>
                </button>
                { view === 'convert' ?
                    <SelectOutput convtDropdown={convtDropdown2} flag={flag} isOpen={isOpen} selectOutput={convt[view][name]['selectOutput']}
                        inputTextHandler={inputTextHandler} view={view} setIsOpen={setIsOpen} ref={{preValue, inputRef}}
                    /> :
                    <SelectInput convtDropdown={convtDropdown1} flag={flag} isOpen={isOpen} selectInput={convt[view][name]['selectInput']}
                        inputTextHandler={inputTextHandler} view={view} setIsOpen={setIsOpen} ref={{preValue, inputRef}}
                    />
                }

                {view === "convert"? <Output changeToCurrency={changeToCurrency} output={convt[view][name]['output']}/> : 
                    <Input name={name} setConvt={setConvt} view={view} calcConvert={calcConvert} calcFindOut={calcFindOut} input={convt[view][name]['input']}
                />}
            </div>
        </main>
    )
}

function Dropdown(props) {
    const { calcConvert, calcFindOut, checkSameValue, checkSelectValue, flag, name, setConvt, setIsOpen, 
        text, type, view
    } = props;
    
    return(                        
    <li className="currencyList"  
    onMouseDown={()=>{
        checkSelectValue(text, type) && 
        checkSameValue(text, type) && 
        setConvt( prev=>{
            return {...prev, 
                [view]: {...prev[view],
                    [name]: {...prev[view][name], [type]: text}
                }
            }
        });
    }}
    onMouseUp={()=>{
        setIsOpen(false);
        view === 'convert'? calcConvert(name) : calcFindOut(name);
    }}
    >
        <span className={flag[text]}></span>{text}
    </li>)
}

const SelectInput = forwardRef(function SelectInput(props, ref){
    const {selectInput, convtDropdown, flag, inputTextHandler, isOpen, setIsOpen, view} = props;
    const {preValue, inputRef} = ref;
    const {ttCurrencyButton} = converterTooltips

    return (
        <div className="currency-button-container" ref={e => {preValue.current[0] = e}}>
            <button className="currencyButton ttButton" onClick= {()=>setIsOpen(oldState => ({...oldState, selectInput: !oldState.selectInput}))}
                ref={e => {preValue.current[0] = e}}>
                <span className={flag[selectInput]}></span>
                {selectInput}
                <span className="ttText left-tt">{ttCurrencyButton}</span>
            </button>
            <ul className={`currencyButtonContent ${view==='convert'? 'content1': 'content2'} ${isOpen.selectInput? 'active':'inactive'}`}> 
                <input type="text" placeholder="search..." className="local-currency-search dropdown-search" name="leftInput" 
                    onFocus={e => e.target.select()} onKeyUp={inputTextHandler} ref={el=>(inputRef.current[0]=el)}
                />
                {convtDropdown}
            </ul>
        </div>
    )
})

function Input (props) {
    const {calcConvert, calcFindOut, input, name, view, setConvt} = props;
    //Regular Expressions is used in this component

    function handleChange(event) { 
        const regex1 =  /[^0-9.]/g //characters other than period and digits
        const regex2 =  /^(0)(\d+)/g //input that begins with 0
        const regex3 = /(\.)(\.)/g //it will look behind the period character if it has another period character
        const regex4 = /(\.)(\d+)(\.)/g // it will check to see if a period is not the first period in the input
        
        const { value} = event.target; // the function sets the value of the converter input property to the value received from the event object
        // the replace methods will remove non digit characters and excess periods
        setConvt(prev=>{
            return{...prev, 
                [view]: {...prev[view], 
                    [name]: {...prev[view][name], input: 
                        value.replace(regex1, '').replace(regex2, '$2').replace(regex3, '$1').replace(regex4, '$1$2')
                    }
                }
            }
        });
    }
    function formatValues() {
        // this will format the displayed value to the comman seperated digits
        setConvt(prev=>{
            return{...prev, 
                [view]: {...prev[view], 
                    [name]: {...prev[view][name], input: !isNaN(Number(prev[view][name]['input'])) ?
                        Number(prev[view][name]['input']).toLocaleString('en-US') : ''
                    }
                }
            }
          
        });
       
    }

    return (  
        <div className="inputContainer "> 
            <input onFocus={
                    (e)=>{
                        e.target.select();
                        setConvt( prev=>{
                            return {...prev, 
                                [view]: {...prev[view],
                                    [name]: {...prev[view][name], output: 0}
                                }
                            }
                        });
                    }
                } 
                type="text" placeholder="Enter amount..." className="converterInput" value={input} 
                onChange={handleChange} onBlur={()=>{ formatValues(); view==='convert'? calcConvert(name): calcFindOut(name)}} onClick={(e)=>e.target.select()}
            /> 
        </div>
    )
}

const SelectOutput = forwardRef(function SelectOutput(props, ref) {
    const {selectOutput, convtDropdown, flag, inputTextHandler, isOpen, setIsOpen, view} = props;
    const {preValue, inputRef} = ref;
    const {ttCurrencyButton} = converterTooltips
    return (
        <div className="currency-button-container" ref={e => {preValue.current[1] = e}}>
            <button className="currencyButton ttButton" onClick= {()=>setIsOpen(oldState => ({...oldState, selectOutput: !oldState.selectOutput}))}>
                <span className={flag[selectOutput]}></span>
                {selectOutput}
                <span className="ttText left-tt">{ttCurrencyButton}</span>
            </button>
            <ul className={`currencyButtonContent ${view==='convert'? 'content2': 'content1'} ${isOpen.selectOutput? 'active':'inactive'}`}>
                <input type="text" placeholder="search..." className="local-currency-search dropdown-search" name="rightInput"  
                    onFocus={e => e.target.select()} onKeyUp={inputTextHandler} ref={el=>(inputRef.current[1]=el)}
                />
                {convtDropdown}
            </ul>
        </div>
    )
})
function Output (props) {
    const {changeToCurrency, output} = props;
    return (
        <div className="outputContainer ttButton">
            <p className="outputText"> {changeToCurrency(Number(output).toFixed(2))} </p>
            <span className="ttText right-tt">{output}</span>
        </div>
    )
}