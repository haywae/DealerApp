import { Helmet } from "react-helmet-async"

export function NoPage() {
    return(
        <div>
            <Helmet>
                <title>404 - Error</title>
            </Helmet>
            <div className="doc-main">
                <p>The Page you are looking for is unavailable</p>
            </div>
            
        </div>
    )
}