import React  from 'react';
import { FiPower, FiAlertCircle, FiMapPin } from "react-icons/fi";
import { Link, useHistory } from 'react-router-dom';

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/components/sidebarDashboed.css';

export default function Sidebar() {
    const { goBack } = useHistory();
    return (
        <aside className="app-sidebar">
        <img src={mapMarkerImg} alt="Happy" />

        <nav>
          <Link to="/dashboard" className="nav-icon">
            <FiMapPin size={24} color="#FFF" />
          </Link>
          <Link to="/orphanages/pending" className="nav-icon">
            <FiAlertCircle size={24} color="#FFF" />
          </Link>
        </nav>

        <footer>
          <button type="button" onClick={goBack}>
            <FiPower size={24} color="#FFF" />
          </button>
        </footer>
      </aside>
    );
}