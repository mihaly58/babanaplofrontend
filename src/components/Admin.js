import { Link } from "react-router-dom"

const Admin = () => {
    return (
        <section>
            <h1>Admin Oldal</h1>
            <br />
            
            <div className="flexGrow">
                <Link to="/">Főoldal</Link>
            </div>
        </section>
    )
}

export default Admin
