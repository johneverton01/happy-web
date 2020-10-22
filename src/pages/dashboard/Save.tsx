import React from 'react';
import { Link } from 'react-router-dom';

import '../../styles/pages/save.css';

import logo from '../../images/logo.svg';

function Delete() {
  return (
    <div id="page-save">
      <div className="content-wrapper">
        <main>
          <h1>Ebaaa!</h1>
          <p>O cadastro deu certo e foi enviado
          ao administrador para ser aprovado.
          Agora é só esperar :)</p>
          <div className="save">
            <Link to="/app" className="save-app">
              Voltar para o mapa
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Delete;