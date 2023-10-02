import { BrowserRouter, Routes, Route} from "react-router-dom"
import { Home } from "./pages/Home"
import { NoPage } from "./pages/NoPage"
import { Documentation } from "./pages/Documentaion"
import { SharedLayout } from "./pages/SharedLayout"

export default function App() {
  return ( 
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <SharedLayout/> }>
            <Route index element={ <Home /> } />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="*" element={<NoPage />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

