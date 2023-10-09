import React from "react";
import '../css/ComCalculator.css';
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { commissionDetails, commissionTooltips } from "./text";
import { faCopy, faUndo, faClose} from "@fortawesome/free-solid-svg-icons";

export default function ComCalculator () {
    const [view, setView] = useState("remove");
    const [commissionTab, setCommissionTab] = useState({
        remove: {
            row1: {amount: "", rate: "", commission: 0, output: 0, id: 1}
        },
        add : {
            row1: {amount: "", rate: "", commission: 0, output: 0, id: 1}
        }
    })

    const {addRow, heading1, heading2, heading3, heading4, tab1Caption, tab1DescriptionText, tab1Icon, tab2Caption, 
        tab2DescriptionText, tab2Icon
    } = commissionDetails;

    const {ttAddRow} = commissionTooltips;

    const removeTab = Object.keys(commissionTab.remove).map( e => {
        return <CommissionMain name={e} view={view} key={e} commissionTab={commissionTab}
            setCommissionTab={setCommissionTab}
        />
    })
    const addTab = Object.keys(commissionTab.add).map( e => {
        return <CommissionMain name={e} view={view} key={e} commissionTab={commissionTab}
            setCommissionTab={setCommissionTab}
        />
    })
    function addRowToConverter() {
        setCommissionTab(prev => {
            let num;
            for (let i = 1; num !== 'off'; i++) {
                if (!commissionTab[view].hasOwnProperty([`row${i}`])){
                    num = 'off';
                        return { ...prev,
                        [view] : {...prev[view], 
                            [`row${i}`] : {amount: "", rate: "", commission: 0, output: 0, id: i}
                        }
                    }
                }
            }
        })
    } 
    
    function toggleView(e) {
        if (e.target.textContent.match("Remove")){
            setView("remove")
        } else if (e.target.dataset['icon']) {
            setView("remove")
        } else {
           setView("add")
        }   
    }
    return (
        <div className="cards commission-card">
            <nav className="cards-nav commission-nav">
                <ul className="cards-nav-list">
                    <li className={`nav-item1 ${view === "remove" ? "nav-active" : "nav-inActive"}`} onClick={toggleView}>{tab1Caption} {tab1Icon}</li>
                    <li className={`nav-item2 ${view === "add" ? "nav-active" : "nav-inActive"}`} onClick={toggleView}>{tab2Caption} {tab2Icon}</li>
                    <div className='add-remove-container'>
                        <button type="button" onClick={addRowToConverter} className="add-remove convt-add ttButton">
                            {addRow}
                            <span className="ttText right-tt">{ttAddRow}</span>
                        </button>
                    </div>
                </ul>
            </nav> 
            <div className="comm-headings">
                <h3 className="comm-col1 amount">{heading1}</h3>
                <h3 className="comm-col2 rate"><span>{heading2}</span></h3>
                <h3 className="comm-col3 commission">{heading3}</h3>
                <h3 className="comm-col4 output">{heading4}</h3>
            </div>

            { view === 'remove' ? removeTab : addTab }

            <footer className="comm-row3 converter-footer">
                <div className="description-text">
                    <p> {view === 'remove' ? tab1DescriptionText : tab2DescriptionText}</p>
                </div>
            </footer>           
        </div>
    )
}

function CommissionMain (props) {
    const {commissionTab, name, setCommissionTab, view} = props;
    const {ttCloseButton, ttCopyResult, ttReset} = commissionTooltips;

    function calcAdd() {
        const {amount, rate} = commissionTab.add[name]
        const formatedAmount = Number( amount.replace(/,/g, '') )

        if (amount !== "" && rate !== "") {
            let calcRate = 1-(rate/100);

            if (formatedAmount !== 0 && calcRate !==0) {
                let result = formatedAmount / calcRate;
                let commission = result - formatedAmount;

                setCommissionTab(prev => ({
                    ...prev,
                    add : {...prev.add, 
                        [name]: {...prev.add[name], commission: commission, output: result.toFixed(4)}
                    }
                }))
            }
        }
    }

    function calcRemove() {
        const {amount, rate} = commissionTab.remove[name]
        const formatedAmount = Number( amount.replace(/,/g, '') )

        if (amount !== "" && rate !== "") {
            let calcRate = 1-(rate/100)

            if (formatedAmount !== 0 && calcRate !== 0) {
                let result = formatedAmount * calcRate;
                let commission = formatedAmount - result;
    
                setCommissionTab(prev => ({
                    ...prev,
                    remove : {...prev.remove, 
                        [name]: {...prev.remove[name], commission: commission, output: result.toFixed(4)}
                    }
                }))
            }
        }
    }

    function handleRateChange(e) {
        const {value} = e.target;
        setCommissionTab(prev => ({
            ...prev,
            [view] : {...prev[view], 
                [name]: {...prev[view][name], rate: value}
            }
        }))
    }
    
    function defaultOnFocus() {
        setCommissionTab(prev=>({
            ...prev,
            [view] : {...prev[view],
                [name] : {...prev[view][name], commission: 0, output: 0}
            }
        }))
    }

    function changeToCurrency(value){
        // it changes a number to comma seperated currency
        return Number(value).toLocaleString("en-US", {style: "decimal", minimumFractionDigits: 0});
    }

    function removeConverter() {
        setCommissionTab(prev =>{
            let newObj={};
            Object.keys(commissionTab[view]).map(e => {
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

    function resetRow() {
        setCommissionTab(prev => ({
            ...prev, 
            [view]: {...prev[view],
                [name] : {...prev[view][name], amount: "", rate: "", commission: 0, output: 0}
            }
        }))
    }

    return (
        <main className="card-main comm-main" >
            <div className={`${view === "remove" ? "comm-row1" : "comm-row1-2"}`}>
                <button type="button" className={`${commissionTab[view][name].id > 1 ? 'comm-copy1' : 'comm-copy2'} copy-button  ttButton`}>
                    <FontAwesomeIcon icon={faCopy} onClick={()=>{navigator.clipboard.writeText(commissionTab[view][name].output)}}/>
                    <span className="ttText right-tt">{ttCopyResult}</span>
                </button>
                <button type='button'className="reset-button converter-reset ttButton " onClick={resetRow}>
                    <FontAwesomeIcon icon={faUndo} />
                    <span className="ttText right-tt">{ttReset}</span>
                </button>
                {commissionTab[view][name].id > 1 && <button type="button" onClick={removeConverter} className="add-remove remove-button ttButton ">
                    <FontAwesomeIcon icon={faClose} />
                    <span className="ttText right-tt">{ttCloseButton}</span>
                </button>}
            </div>
            <div className="comm-row2">
                {view === 'remove'? <Amount 
                    view={view} calcAdd={calcAdd} calcRemove={calcRemove} setCommissionTab={setCommissionTab} defaultOnFocus={defaultOnFocus}
                    name={name} amount={commissionTab[view][name].amount}
                /> : <Output output={commissionTab[view][name].output} changeToCurrency={changeToCurrency}/>} 
                <div className="comm-col2 row2-items">
                    <input type="number" placeholder="Rate..." className="rate" value={commissionTab[view][name].rate} 
                        onBlur={view === 'remove'? calcRemove : calcAdd} onChange={handleRateChange} onClick={e => e.target.select()}
                        onFocus={defaultOnFocus}
                    />
                </div>
                <div className="comm-col3 row2-items comm-output-container ttButton">
                    <p className="comm-output">{changeToCurrency(commissionTab[view][name].commission)}</p>
                    <span className="ttText right-tt">{commissionTab[view][name].commission}</span>
                </div>
                {view === 'remove' ? <Output output={commissionTab[view][name].output} changeToCurrency={changeToCurrency} 
                /> : <Amount 
                    view={view} calcAdd={calcAdd} calcRemove={calcRemove} setCommissionTab={setCommissionTab}  defaultOnFocus={defaultOnFocus} 
                    name={name} amount={commissionTab[view][name].amount}
                /> } 
            </div>
        </main>
    )
}

function Amount(props){
    const {amount, calcAdd, calcRemove, defaultOnFocus, setCommissionTab, name, view} = props;

    const regex1 = /[^0-9.]/g //characters other than period and digits
    const regex2 = /^(0)(\d+)/g //input that begins with 0
    const regex3 = /(\.)(\.)/g //it will look behind the period character if it has another period character
    const regex4 = /(\.)(\d+)(\.)/g // it will check to see if a period is not the first period in the input
    
    function handleChange(e) {
        const {value} = e.target;
        setCommissionTab(prev => ({
            ...prev,
            [view]: {...prev[view], 
                [name] : {...prev[view][name], amount: 
                    value.replace(regex1, '').replace(regex2, '$2').replace(regex3, '$1').replace(regex4, '$1$2')
                }
            }
        }))
    }

    function formatValues () {
        setCommissionTab(prev => ({
            ...prev,
            [view]: {...prev[view], 
                [name] : {...prev[view][name], amount: !isNaN(Number(prev[view][name]['amount'])) ?
                    Number(prev[view][name].amount).toLocaleString('en-US') : ''
                }
            }
        }))
    }
    
    return (
    <div className="comm-col1 row2-items">
        <input type="text" placeholder="Enter Amount..." className="amount" value={amount}  
            onBlur={()=>{formatValues(); view === 'remove'? calcRemove() : calcAdd()}} onChange={handleChange} onClick={e => e.target.select()}
            onFocus={defaultOnFocus}
        />
    </div>
    )
}

function Output(props) {
    const {changeToCurrency, output} = props;
    return(
    <div className="comm-col4 row2-items comm-output-container ttButton">
        <p className="comm-output">{changeToCurrency(Number(output).toFixed(2))}</p>
        <span className="ttText right-tt">{output}</span>
    </div>
    )
}