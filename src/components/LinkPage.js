import { Link } from "react-router-dom"

const LinkPage = () => {
    return (
        <section>
            <h1>Links</h1>
            <br />
            <h2>Public</h2>
            <Link to="/login">Bejelentkezés</Link>
            <Link to="/register">Regisztráció</Link>
            <br />
            <h2>Private</h2>
            <Link to="/">Főoldal</Link>
        </section>
    )
}

export default LinkPage
