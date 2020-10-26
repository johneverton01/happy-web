import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowRight } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import mapIcon from '../../Util/mapIcon';
import Sidebar from '../../components/SideBarDashbord';
import api from "../../Services/api";
import authHeader from "../../Services/auth-header";

import '../../styles/pages/dashbord.css'

interface Orphanage {
    latitude: number;
    longitude: number;
    name: string;
    id: number
}

export default function ListOrphanages() {
    const history = useHistory();
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    useEffect(() => {
        api.get(`orphanages/status/${0}`).then(response => {
            setOrphanages(response.data);
        });
    }, []);

    if(authHeader() == null){
        history.push('/login');
    }

    if (!orphanages) {
        return <p>Carregando ...</p>
    }

    return (
        <div id="page-orphanage">
            <Sidebar />
            <main className="dasboard-wrap">
                <header>
                    <h1>Cadastros pendentes</h1>
                    {orphanages.length} orfanatos
                </header>
                <div className="orphanages-wraper">
                    {orphanages.map(orphanage => {
                        return (
                            <div className="map-container">
                                <Map
                                    center={[orphanage.latitude, orphanage.longitude]}
                                    zoom={16}
                                    style={{ width: '100%', height: 280 }}
                                    dragging={false}
                                    touchZoom={false}
                                    zoomControl={false}
                                    scrollWheelZoom={false}
                                    doubleClickZoom={false}
                                >
                                    <TileLayer
                                        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                                    />
                                    <Marker interactive={false} icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]} />
                                </Map>
                                <div className="map-footer">
                                    <h2>{orphanage.name}</h2>
                                    <nav>
                                        <Link to={`/orphanages/accept/${orphanage.id}`} className="nav-icon">
                                            <FiArrowRight size={24} color="#15C3D6" />
                                        </Link>
                                    </nav>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </main>
        </div>
    );
}