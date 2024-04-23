import { Link } from "react-router-dom"

const Missing = () => {
    return (
        <article style={{ padding: "100px" }}>
            <h1>Egy hiba történt!</h1>
            <p>Az oldal nem található</p>
            <div className="flexGrow">
                <Link to="/">Főoldal</Link>
            </div>
        </article>
    )
}

export default Missing
