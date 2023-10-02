import "../css/Documentation.css"

export function Documentation() {
    return(
        <div className="doc-main">
            <article className="art-1">
                <h2 className="doc-head">Converter</h2>
                <p>The Currency Converter helps with making currency conversions. </p>

                <h3 className="doc-head">3 Quick Steps </h3>
	            <ul>
                    <li>Choose a location</li>
                    <li>Set Rates</li>
                    <li>Make a Conversion</li>
                </ul> 
                <hr />

                <h3 className="doc-head">Location</h3>
                <p>
                    To use the converter, the user's base currency must first be set. This can be done by clicking on the Location 
                    button at the top right corner of the converter tab. Next, click on a country from the list of countries that 
                    show on the dropdown. Ensure that your intended selection does not exist already on the Rates table below.  
                </p>
                <hr />

                <h3 className="doc-head">Rates</h3>
                <p>
                    After setting the location, select a currency by clicking the choose button under the currency column and clicking 
                    on a currency from the dropdown list.
                </p>
                <hr />

                <h3 className="doc-head">Convert</h3>
                <p>
                    The ‘Convert’ tab makes a conversion from one currency to another. When the amount to be converted is entered and the 
                    corresponding currencies selected, it will display its equivalent in the selected output currency on the far right of the
                    row. 
                </p>
                <hr />

                <h3 className="doc-head">Find Out</h3>
                <p>
                    The ‘Find Out’ tab helps to find out the value of a currency before conversion. It will display the amount 
                    needed to get a desired output when the desired output is entered along with the corresponding currencies.
                </p>
                <hr />
            </article>
            <article className="art-2">
                <h2 className="doc-head">Commission Calculator</h2>
                <p>The Commission Calculator helps with deducting and adding percentages to a provided amount.</p>

                <h3 className="doc-head">Remove</h3>
                <p>The remove tab deducts the percentage from an amount when both values have been entered and displays the result.</p>
                <hr />

                <h3 className="doc-head">Add</h3>
                <p>
                    The add tab performs an inverse operation by displaying the amount required for a result entered in the input box. 
                    The amount will be displayed when a rate and the expected result have been provided
                </p>
                <hr />
            </article>
        </div>
    )
}