import { Link } from "react-router-dom"

const Lounge = () => {
    return (
        <section>
            <h1>Előszoba</h1>
            <br />
            <div className="flexGrow">
                <Link to="/">Főoldal</Link>
            </div>
        </section>
    )
}

export default Lounge
