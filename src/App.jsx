import { BrowserRouter, Routes, Route} from "react-router-dom"
import { Home } from "./pages/Home"
import { NoPage } from "./pages/NoPage"
import { Documentation } from "./pages/Documentaion"
import { SharedLayout } from "./pages/SharedLayout"
import { About } from "./pages/About"
import { Contact } from "./pages/Contact"
import { HelmetProvider } from "react-helmet-async"

export default function App() {
  return ( 
    <>
      <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <SharedLayout/> }>
            <Route index element={ <Home /> } />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/about" element={<About/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="*" element={<NoPage />}/>
          </Route>
        </Routes>
      </BrowserRouter>
      </HelmetProvider>
    </>
  )
}

