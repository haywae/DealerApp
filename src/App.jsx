import { BrowserRouter, Routes, Route} from "react-router-dom"
import { Home } from "./pages/Home"
import { NoPage } from "./pages/NoPage"
import { Documentation } from "./pages/Documentation"
import { SharedLayout } from "./pages/SharedLayout"
import { About } from "./pages/About"
import { HelmetProvider } from "react-helmet-async"

export default function App() {

  return ( 
    <>
      <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/WolexChange" element={ <SharedLayout/> }>
            <Route index element={ <Home /> } />
            <Route path="/WolexChange/Home" element={ <Home /> } />
            <Route path="/WolexChange/documentation" element={<Documentation />} />
            <Route path="/WolexChange/about" element={<About/>} />
            <Route path="*" element={<NoPage />}/>
          </Route>
        </Routes>
      </BrowserRouter>
      </HelmetProvider>
    </>
  )
}

