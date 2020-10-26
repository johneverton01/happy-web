import React, { FormEvent, useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import authHeader from "../../Services/auth-header";

import '../../styles/pages/login.css';

import logo from '../../images/logo.svg';
import api from '../../Services/api';

function Login() {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        const data = {
            'email': email,
            'password': password,
        }

        await api.post('login', data).then(response => {
            if (response.data.token) {
                localStorage.setItem("user", response.data.token);
                history.push('/dashboard');
            }

        }).catch(error => {
            console.log(error);
        });

    }

    if (authHeader()) {
        history.push('/dashboard');
    }
    return (
        <main id="page-login">
            <div id="wrap-description">
                <img src={logo} alt="Happy" />
                <div className="location">
                    <strong>Minas Gerais</strong><br />
                    <span>Belo Horizonte</span>
                </div>

            </div>
            <div id="form-content-login">
                <Link to="/" className="back">
                    <FiArrowLeft size={26} color="rgba(0, 0, 0, 0.6)" />
                </Link>
                <form onSubmit={handleSubmit} >
                    <div className="wrap-login">
                        <h1>Fazer login</h1>
                        <div className="input-block">
                            <label htmlFor="email">E-mail</label>
                            <input
                                id="email"
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="input-block">
                            <label htmlFor="password">Senha</label>
                            <input
                                id="password"
                                value={password}
                                type="password"
                                onChange={event => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="wrap-forgot">
                            <Link to="/forgot-password" className="forgot-password">
                                Esqueci minha senha
                            </Link>
                        </div>
                        <button className="confirm-button" type="submit">
                            Enviar
                        </button>
                    </div>
                </form>
            </div>

        </main>

    );
}

export default Login;