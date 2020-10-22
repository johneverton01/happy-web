import React from 'react';
import { Link } from 'react-router-dom';

import '../../styles/pages/delete.css';

import logo from '../../images/logo.svg';

function Delete() {
    return (
        <div id="page-delete">
        <div className="content-wrapper">
          <main>
            <h1>Excluir!</h1>
            <p>Orfanato excluido com sucesso</p>
            <div className="delete">
            <Link to="/dashboard" className="delete-app">
                Voltar
            </Link>
          </div>
          </main>
        </div>
      </div>
    );
}

export default Delete;