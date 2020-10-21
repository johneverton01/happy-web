import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import '../../styles/pages/login.css';

import logo from '../../images/logo.svg';

function Login() {
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
                <form onSubmit={() => {}} >
                    <div className="wrap-login">
                        <h1>Fazer login</h1>
                        <div className="input-block">
                            <label htmlFor="email">E-mail</label>
                            <input
                                id="email"
                                onChange={() => { }}
                            />
                        </div>
                        <div className="input-block">
                            <label htmlFor="password">Senha</label>
                            <input
                                id="password"
                                type="password"
                                onChange={() => { }}
                            />
                        </div>
                        <div className="wrap-forgot">
                            <Link to="" className="forgot-password">
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