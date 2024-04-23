import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
       
        setAuth({});
        navigate('/linkpage');
    }

    return (
        <section>
            
            <br />
            <p>Bejelentkeztél!</p>
            <br />
            <Link to="/editor">Editor felület</Link>
            <br />
            <Link to="/admin">Admin felület</Link>
            <br />
            <Link to="/lounge">Előszoba</Link>
            <br />
            <Link to="/linkpage">Belépés</Link>
            <div className="flexGrow">
                <button onClick={logout}>Sign Out</button>
            </div>
        </section>
    )
}

export default Home
