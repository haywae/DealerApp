import Header from './components/Header'
import "/node_modules/flag-icons/css/flag-icons.min.css";
import ComCalculator from './components/ComCalculator';
import ConverterApp from './components/ConveterApp';

function App() {

  return (
    <div >
      <Header/>
      <main id='content'>
        <ConverterApp/>
        <ComCalculator/>
      </main>
    </div>
  )
}

export default App;
