import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FiEdit3, FiTrash} from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import mapIcon from '../../Util/mapIcon';
import Sidebar from '../../components/SideBarDashbord';
import api from "../../Services/api";

import '../../styles/pages/dashbord.css'

interface Orphanage {
    latitude: number;
    longitude: number;
    name: string;
    id: number
}

export default function ListOrphanages() {
    function handleDeleteOrphanage(id: number) {
        api.delete(`orphanages/delete/${id}`).then(response => {
            if(response.data.id){
                return <Redirect to='/delete' />
            }
        })
    }
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    useEffect(() => {
        api.get(`orphanages/status/${1}`).then(response => {
            setOrphanages(response.data);
        });
    }, []);
    if (!orphanages) {
        return <p>Carregando ...</p>
    }

    return (
        <div id="page-orphanage">
            <Sidebar />
            <main className="dasboard-wrap">
                <header>
                    <h1>Orfanatos Cadastrados</h1>
                    {orphanages.length} orfanatos
                </header>
                <div className="orphanages-wraper">
                    {orphanages.map(orphanage => {
                        return (
                            <div
                                key={orphanage.id}
                                className="map-container">
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
                                        <Link to="" className="nav-icon">
                                            <FiEdit3 size={24} color="#15C3D6" />
                                        </Link>
                                        <button onClick={() => {handleDeleteOrphanage(orphanage.id)}} className="nav-icon">
                                            <FiTrash size={24} color="#15C3D6" />
                                        </button>
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