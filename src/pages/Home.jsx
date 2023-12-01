import "/node_modules/flag-icons/css/flag-icons.min.css";
import ComCalculator from '../components/homeComponents/01-ComCalculator';
import ConverterApp from '../components/homeComponents/01-ConveterApp';
import Calculator from "../components/homeComponents/01-Calculator";
import '../index.css'
import { Helmet } from "react-helmet-async";

export function Home(){
    return(
        <div >
            <Helmet>
                <title>WolexChange</title>
            </Helmet>
            <main className='content'>
                <h2 className='section-headings'>Converter</h2>
                <ConverterApp/>
                <h2 className='section-headings'>Commission Calculator</h2>
                <ComCalculator/>
                <h2 className="section-headings">Calculator</h2>
                <Calculator/>
            </main>
        </div>
    )
}