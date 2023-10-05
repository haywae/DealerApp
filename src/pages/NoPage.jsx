import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import "../css/NoPage.css"

export function NoPage() {
    return(
        <div>
            <Helmet>
                <title>404 - Error</title>
            </Helmet>
            <div className="error-main">
                <h2 className="error-h2">404</h2>
                <p className="error-p1">Page not Found</p>
                <p className="error-p2">Sorry, the page you are looking for can't be found. <br /> Please check your address and try again</p>
                <button className="back-home"><Link to="/WolexChange/home" className="back-home-link"> back to Home </Link></button>
            </div>
            
        </div>
    )
}