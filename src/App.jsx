import { BrowserRouter, Routes, Route} from "react-router-dom"
import { Home } from "./pages/Home"
import { NoPage } from "./pages/NoPage"
import { UserGuide } from "./pages/UserGuide"

export default function App() {
  return ( 
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={ <Home /> } />
          <Route path="/home" element={<Home />} />
          <Route path="/userGuide" element={<UserGuide />} />
          <Route path="*" element={<NoPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

