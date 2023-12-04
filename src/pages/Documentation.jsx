import "../css/Documentation.css"
import { Helmet } from "react-helmet-async"

export function Documentation() {
    return(
        <div className="doc-main">
            <Helmet>
                <title>Documentation - WolexChange</title>
            </Helmet>
            <article className="art-1">
                <h2 className="doc-head-2">Currency Converter</h2>
                <p>The Currency Converter helps with making currency conversions. </p>

                <h3 className="doc-head-3 underline">3 Quick Steps </h3>
	            <ol>
                    <li>Choose a location</li>
                    <li>Set Rates</li>
                    <li>Make a Conversion</li>
                </ol> 

                <p className="doc-p">
                    <strong className="doc-head-3">Location: </strong>
                    To use the converter, the user's base currency must be set. This can be done by clicking the <span className="emphasis">Location </span>
                    button at the top right corner of the <span className="emphasis">Rates </span>tab. Next, click on a country from the list of countries that 
                    show on the dropdown. Ensure that your intended selection does not exist already on the Rates table below.  
                </p>

                <p className="doc-p">
                    <strong className="doc-head-3">Rates: </strong>
                    After setting the location, select a currency by clicking the <span className="emphasis">choose </span> button under the currency column and clicking 
                    on a currency from the dropdown list.
                </p>

                <p className="doc-p">
                    <strong className="doc-head-3">Convert: </strong>
                    The <span className="emphasis">Convert </span> tab makes a conversion from one currency to another. When the amount to be converted is entered and the 
                    corresponding currencies selected, it will display its equivalent in the selected output currency on the far right of the
                    row. 
                </p>

                <p className="doc-p">
                    <strong className="doc-head-3">Find Out: </strong>
                    The <span className="emphasis">Find Out </span>tab helps to find out the value of a currency before conversion. It will display the amount 
                    needed to get a desired output when the desired output is entered along with the corresponding currencies.
                </p>

            </article>
            <article className="art-2">
                <h2 className="doc-head-2">Commission Calculator</h2>
                <p>The Commission Calculator helps with deducting and adding percentages to a provided amount.</p>

                <p className="doc-p"> 
                    <strong className="doc-head-3">Remove: </strong>
                    The <span className="emphasis">Remove </span> tab deducts the percentage from an amount when both values have been entered and displays the result.
                </p>

                <p className="doc-p">
                    <strong className="doc-head-3">Add: </strong>
                    The <span className="emphasis">Add </span>tab performs an inverse operation by displaying the amount required for a result entered in the input box. 
                    The amount will be displayed when a rate and the expected result have been provided
                </p>
            </article>
        </div>
    )
}