import { Link } from "react-router-dom"

const Editor = () => {
    return (
        <section>
            <h1>Módosító oldal</h1>
            <br />
            <div className="flexGrow">
                <Link to="/">Főoldal</Link>
            </div>
        </section>
    )
}

export default Editor
