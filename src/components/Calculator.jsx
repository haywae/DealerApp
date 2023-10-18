import '../css/Calculator.css'

export default  function Calculator() {
    return (
        <div className="cards calculator-card">
            <div className="calc-headings">
                <div className="input-col cols"></div>
                <div className="input-col cols"></div>
                <div className="input-col cols"></div>
                <div className="input-col cols"></div>
                <div className="sign-col cols"></div>
                <div className="res-col cols">
                    <h3 className='res-item' >Result</h3>
                </div>
                

            </div>
            <div className='calc-main'>
                <div className="calc-r1">
                    <div className='input-col cols'>
                        <input type="text" placeholder='Amount'/>
                    </div>
                    <div className='input-col cols'>
                        <input type="text" placeholder='Amount'/>
                    </div>
                    <div className='input-col cols'>
                        <input type="text" placeholder='Amount'/>
                    </div>
                    <div className='input-col cols'>
                        <input type="text" placeholder='Amount'/>
                    </div>
                    <div className='sign-col cols'>
                        <p className='sign-item'>+</p>
                    </div>
                    <div className='res-col cols calc-res'>
                        0
                    </div>
                </div>
                <div className="calc-r1">
                    <div className='input-col cols'>
                        <input type="text" placeholder='Amount'/>
                    </div>
                    <div className='input-col cols'>
                        <input type="text" placeholder='Amount'/>
                    </div>
                    <div className='input-col cols'>
                        <input type="text" placeholder='Amount'/>
                    </div>
                    <div className='input-col cols'>
                        <input type="text" placeholder='Amount'/>
                    </div>
                    <div className='sign-col cols'>
                        <p className='sign-item'>-</p>
                    </div>
                    <div className='res-col cols calc-res'>
                        0-1
                    </div>
                </div>
            </div>
        </div>
    )
}