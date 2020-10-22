import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import '../../styles/pages/login.css';

import logo from '../../images/logo.svg';

function NewPassword() {

    const { goBack } = useHistory();

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
                <button className="back" onClick={goBack}>
                    <FiArrowLeft size={26} color="rgba(0, 0, 0, 0.6)" />
                </button>
                <form onSubmit={() => {}} >
                    <div className="wrap-login">
                        <h1>Esqueci a senha</h1>
                        <p>Sua redefinição de senha será enviada
                        para o e-mail cadastrado.</p>
                        <div className="input-block">
                            <label htmlFor="email">E-mail</label>
                            <input
                                id="email"
                                onChange={() => { }}
                            />
                        </div>
                        <Link to="/dashboard" >
                            <button className="confirm-button" type="submit">
                                Enviar
                            </button>

                        </Link>

                    </div>
                </form>
            </div>

        </main>

    );
}

export default NewPassword;