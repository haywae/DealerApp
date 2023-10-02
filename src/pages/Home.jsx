import "/node_modules/flag-icons/css/flag-icons.min.css";
import ComCalculator from '../components/ComCalculator';
import ConverterApp from '../components/ConveterApp';
import '../index.css'

export function Home(){
    return(
        <div >
            <main className='content'>
                <h2 className='section-headings'>Converter</h2>
                <ConverterApp/>
                <h2 className='section-headings'>Commission Calculator</h2>
                <ComCalculator/>
            </main>
        </div>
    )
}