import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

import axios from "axios";
import { cat } from 'fontawesome';





const LOGIN_URL = 'https://localhost:7256/auth/login';

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const [babaids, setBabaids] = useState([]);

    
    
    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    useEffect(() => {
        fetch("http://localhost:5244/api/Szuletes/SearchSzuletesFelhasznaloId/"+localStorage.getItem("userid"))
            .then((res) => res.json())
            .then((babaids) => setBabaids(babaids))
            .catch(console.log)
    }, []);

    localStorage.setItem("babaids", babaids);

    const handleSubmit = async (e) => {
        e.persist();
        e.preventDefault();
        const logindata = {
            userName: e.target.userName.value,
            password: e.target.password.value
        };
        try {
            const response = await axios.post(LOGIN_URL,
                 logindata ,
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.token;
            const roles = jwtDecode(accessToken).role;
            const userid = jwtDecode(accessToken).sub;

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("userid", userid);
            localStorage.setItem("roles", roles);
            
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');

            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Nincs szerver válasz');
            } else if (err.response?.status === 400) {
                setErrMsg('Hiányzik a felhasználónév vagy a jelszó');
            } else if (err.response?.status === 401) {
                setErrMsg('Jogosulatlan hozzáférés');
            } else {
                setErrMsg('A bejelentkezés sikertelen');
            }
            errRef.current.focus();
        }
    }

    return (
<div className="container-fluid d-flex justify-content-center h-100 login-container">
<div className="card">
    <div>
    <div className="card-header">
                        <h3>Regisztráció</h3>
                    </div>
    </div>
    <div className="card-body "></div>
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Felhasználónév:</label>
                <input
                    name="userName"
                    type="text"
                    id="userName"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />
<br />
                <label htmlFor="password">Jelszó:</label>
                <input
                    name="password"
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
               <br /> <button type="submit" name="Bejelentkezés" className="btn float-right btn-warning">Bejelentkezés</button>
               
            </form>
            <p>
                Még nem regisztráltál?<br />
                <span className="line">
                    <Link to="/register">
                    <button type="button" class="btn btn-info">  Regisztrálás </button>
                        </Link>
                </span>
            </p>
        </section>
        </div>
</div>


    )
}

export default Login
