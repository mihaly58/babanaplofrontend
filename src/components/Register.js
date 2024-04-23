import {  useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import axios from "axios";
import { Link } from "react-router-dom";


const REGISTER_URL = 'https://localhost:7256/auth/register';

const Register = () => {
    
    const [success, setSuccess] = useState(false);
   
    const handleSubmit = async (e) => {
        e.persist();
        e.preventDefault();
        // if button enabled with JS hack
        const registerdata = {
            userName: e.target.userName.value,
            password: e.target.password.value,
            email: e.target.email.value,
            fullname: e.target.fullname.value,
            age: e.target.age.value
        };


        if (!registerdata.userName || !registerdata.password || !registerdata.email || !registerdata.fullname || !registerdata.age) {
                console.log("Hiányzik a felhasználónév vagy a jelszó vagy egyéb");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                registerdata,
            );
            console.log(JSON.stringify(response?.data));
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                console.log('Nincs szerver válasz');
            } else if (err.response?.status === 409) {
                console.log('A felhasználónév már használva van');
            } else {
                console.log('A regisztráció sikertelen');
            }
            
        }
    }
    return (
        <>
            {success ? (
                <section>
                    <h1>Sikeres belépés!</h1>
                    <p>
                        <a href="#">Belépés</a>
                    </p>
                </section>
            ) : (
                <div className="container-fluid d-flex justify-content-center h-100 login-container">
                    <div className="card login-card">
                        <div className="card-header">
                            <h3>Regisztráció</h3>
                        </div>
                        <div className="card-body">
                            <section>
                                <form onSubmit={handleSubmit}>
                                    <div className='input-group form-group'>
                                        <input type="text" name="userName" className="form-control" placeholder="Felhasználónév" />
                                    </div>
                                    <div className='input-group form-group'>
                                        <input type="password" name="password" className="form-control" placeholder="Jelszó" />
                                    </div>
                                    <div className='input-group form-group'>
                                        <input type="email" name="email" className="form-control" placeholder="Email" />
                                    </div>
                                    <div className='input-group form-group'>
                                        <input type="text" name="fullname" className="form-control" placeholder="Teljes név" />
                                    </div>
                                    <div className='input-group form-group'>
                                        <input type="number" name="age" className="form-control" placeholder="Kor" />
                                    </div>
                                    <br />
                                    <br />
                                    <button type="submit" name="Bejelentkezés" className="btn float-right btn-warning" placeholder="email">Regisztrálás</button>
                                </form>
                                <br />
                                Már regisztráltál?
                                <br />
                                <br />
                                <button name="Bejelentkezés" className="btn float-right btn-info" placeholder="email">
                                    <Link to="/login">Bejelentkezás</Link>
                                </button>
                            </section>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Register
