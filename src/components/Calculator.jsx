import { useState } from 'react'
import '../css/Calculator.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'

export default  function Calculator() {
    const [calculator, setCalculator] = useState({
        row1 : {input1: '', input2: '', input3: '', input4: '', result: 0},
        row2 : {input1: '', input2: '', input3: '', input4: '', result: 0}
    })
    
    function handleChange(event) {
        const regex1 =  /[^0-9.]/g //characters other than period and digits
        const regex2 =  /^(0)(\d+)/g //input that begins with 0
        const regex3 = /(\.)(\.)/g //it will look behind the period character if it has another period character
        const regex4 = /(\.)(\d+)(\.)/g // it will check to see if a period is not the first period in the input
        
        const { value, name, id} = event.target; // the function sets the value of the converter input property to the value received from the event object
        // the replace methods will remove non digit characters and excess periods
        setCalculator(prev=>{
            return{...prev, 
                [name]: {...prev[name], [id]: value.replace(regex1, '').replace(regex2, '$2').replace(regex3, '$1').replace(regex4, '$1$2')}
            }
        });
    }

    function formatValues(e) {
        // this will format the displayed value to the comman seperated digits
        const {name, id} = e.target;
        if (calculator[name][id] && !isNaN(calculator[name][id]))  {
            setCalculator(prev=>{
                return{...prev, 
                    [name]: {...prev[name], 
                        [id]: 
                        Number(prev[name][id]).toLocaleString('en-US') 
                    }
                }    
            });
        }
    }

    function addCalc(){
        let sum = 0
        const keys = Object.keys(calculator.row1)
        for (let i = 0; i < 3; i++) {
            const formatedInput = calculator.row1[keys[i]].replace(/,/g, '') 
            sum += Number(formatedInput)
        }
        setCalculator(prev=>{
            return{...prev,
                row1: {...prev.row1,
                    result: sum.toLocaleString('en-US')
                }
            }
        })
    }
    function defaultOnFocus(e){
        const {name} = e.target
        setCalculator(prev=>({
            ...prev,
            [name] : {...prev[name], result: 0}
        }))
    }
    function subCalc(){
        let result = 0;
        let base = {value: 0, status: ''}
        const keys = Object.keys(calculator.row2)
        for (let i = 0; i < 3; i++) {
            const formatedInput = calculator.row2[keys[i]].replace(/,/g, '')
            if ( formatedInput !== '' && formatedInput !== 0 && base.status === 'set' ){
                result -= Number(formatedInput)
            }
            if ( formatedInput !== '' && formatedInput !== 0 && base.value === 0)  {
                base.value = Number(formatedInput);
                base.status = 'set';
                result = base.value
            } 
        }
        setCalculator(prev=>{
            return{...prev,
                row2: {...prev.row2,
                    result: result.toLocaleString('en-US')
                }
            }
        })
    }

    return (
        <div className="cards calculator-card">
            <div className="calc-headings">
                <div className="input-col cols"><h3 className='sub-col'>Input 1</h3></div>
                <div className="input-col cols"><h3 className='sub-col'>Input 2</h3></div>
                <div className="input-col cols"><h3 className='sub-col'>Input 3</h3></div>
                <div className="sign-col cols"></div>
                <div className="res-col cols">
                    <h3 className='sub-col' >Result</h3>
                </div>
                

            </div>
            <div className='calc-main'>
                <div className="calc-r1">
                    <div className='input-col cols'>
                        <input type="text" placeholder='Amount' value={calculator.row1.input1} name='row1' id='input1' onChange={handleChange} 
                            onBlur={(e)=>{formatValues(e); addCalc()}} onFocus={(e)=>{e.target.select(); defaultOnFocus(e)}}
                        />
                    </div>
                    <div className='input-col cols'>
                        <input type="text" placeholder='Amount' value={calculator.row1.input2} name='row1' id='input2' onChange={handleChange} 
                            onBlur={(e)=>{formatValues(e); addCalc()}} onFocus={(e)=>{e.target.select(); defaultOnFocus(e)}}
                        />
                    </div>
                    <div className='input-col cols'>
                        <input type="text" placeholder='Amount' value={calculator.row1.input3} name='row1' id='input3' onChange={handleChange} 
                            onBlur={(e)=>{formatValues(e); addCalc()}} onFocus={(e)=>{e.target.select(); defaultOnFocus(e)}}
                        />
                    </div>
                    <div className='sign-col cols'>
                        <p className='sign-item'><FontAwesomeIcon icon={faPlus}/></p>
                    </div>
                    <div className='res-col cols calc-res'>
                        <p className='res-item' name='row1'>{calculator.row1.result}</p>
                    </div>
                </div>
                <div className="calc-r1">
                    <div className='input-col cols'>
                        <input type="text" placeholder='Amount' value={calculator.row2.input1} name='row2' id='input1' onChange={handleChange} 
                        onBlur={(e)=>{formatValues(e); subCalc()}} onFocus={(e)=>{e.target.select(); defaultOnFocus(e)}}/>
                    </div>
                    <div className='input-col cols'>
                        <input type="text" placeholder='Amount' value={calculator.row2.input2} name='row2' id='input2' onChange={handleChange} 
                        onBlur={(e)=>{formatValues(e); subCalc()}} onFocus={(e)=>{e.target.select(); defaultOnFocus(e)}}/>
                    </div>
                    <div className='input-col cols'>
                        <input type="text" placeholder='Amount' value={calculator.row2.input3} name='row2' id='input3' onChange={handleChange} 
                        onBlur={(e)=>{formatValues(e); subCalc()}} onFocus={(e)=>{e.target.select(); defaultOnFocus(e)}}/>
                    </div>
                    <div className='sign-col cols'>
                        <p className='sign-item'><FontAwesomeIcon icon={faMinus}/></p>
                    </div>
                    <div className='res-col cols calc-res'>
                        <p className='res-item' name='row2'>{calculator.row2.result}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}