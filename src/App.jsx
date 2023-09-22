import Header from './components/Header'
import "/node_modules/flag-icons/css/flag-icons.min.css";
import ComCalculator from './components/ComCalculator';
import ConverterApp from './components/ConveterApp';
import './index.css'

export default function App() {

  return ( 
    <div >
      <Header/>
      <main id='content'>
        <h2 className='section-headings'>Converter</h2>
        <ConverterApp/>
        <h2 className='section-headings'>Commission Calculator</h2>
        <ComCalculator/>
      </main>
    </div>
  )
}

