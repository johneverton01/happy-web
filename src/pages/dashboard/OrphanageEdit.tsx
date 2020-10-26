import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useParams,useHistory } from 'react-router-dom';
import mapIcon from '../../Util/mapIcon';
import Sidebar from "../../components/SideBar";
import api from "../../Services/api";
import authHeader from "../../Services/auth-header";

import '../../styles/pages/orphanage.css';
import { LeafletMouseEvent } from "leaflet";

interface Orphanage {
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  contact: string,
  images: Array<{
    id: number
    url: string
  }>;
}

interface OrphanageParams {
  id: string;
}


export default function OrphanageEdit() {
  const params = useParams<OrphanageParams>();
  const history = useHistory();
  const [position, setPosistion ] = useState({ latitude: 0, longitude: 0 });
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [contact, setContact] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [status, setStatus] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const [orphanage, setOrphanage] = useState<Orphanage>();

  useEffect(() => {
      api.get(`orphanages/${params.id}`).then(response => {
         setOrphanage(response.data);
      });
  }, [params.id]);

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if(!event.target.files) {
      return;
    }
    const selectImages = Array.from(event.target.files);
    setImages(selectImages);

    const selectedImagesPreview = selectImages.map(image => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);

  }

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    setPosistion({
      latitude: lat,
      longitude: lng,
    });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const {latitude, longitude } = position;
    const data = new FormData();
      data.append('name',name);
      data.append('about',about);
      data.append('contact',contact);
      data.append('instructions',instructions);
      data.append('latitude',String(latitude));
      data.append('longitude',String(longitude));
      data.append('opening_hours',opening_hours);
      data.append('status', String(status));
      data.append('open_on_weekends',String(open_on_weekends));
      images.forEach(image => {
        data.append('images', image);
      });

      await api.put(`/orphanages/update/${params.id}`, data, {headers: authHeader()}).then(
        response=> {
          alert('Alteração realizada  com sucesso!');
          history.push('/dashboard');
      });


  }

  function handleInputValue(orphanage: Orphanage) {
    setName(orphanage.name);
    setAbout(orphanage.about);
    setContact(orphanage.contact);
    setInstructions(orphanage.instructions);
    setStatus(true);
    setOpeningHours(orphanage.opening_hours);
    setOpenOnWeekends(orphanage.open_on_weekends);
    setPosistion({latitude: orphanage.latitude, longitude: orphanage.longitude})
  }
  if(authHeader() == null){
    history.push('/login');
}
  if (!orphanage) {
    return <p>Carregando...</p>
  }

  return (
    <div id="page-create-orphanage" onLoad={() => handleInputValue(orphanage)}>
      <Sidebar />
      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[orphanage.latitude,orphanage.longitude]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              <Marker
                interactive={false}
                icon={mapIcon}
                position={[
                  position.latitude,
                  position.longitude
                ]} />

            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea
                id="about"
                maxLength={300}
                value={about}
                onChange={event => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="contact">Número de Whatsapp</label>
              <input
                id="contact"
                value={contact}
                onChange={event => setContact(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
              {previewImages.length == 0 ?
                orphanage.images.map((image, index) => {
                  return (
                    <img key={image.id} src={image.url} alt={name} />
                  )
                })
                :
                previewImages.map(image => {
                  return (
                    <img key={image} src={image} alt={name} />
                  )
                })
                }

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
                <input multiple onChange={handleSelectImages} type="file" id="image[]" />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={event => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de Funcionamento</label>
              <input
                id="opening_hours"
                value={opening_hours}
                onChange={event => setOpeningHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={ open_on_weekends ? 'active' : '' }
                  onClick={() => setOpenOnWeekends(true)}
                >
                    Sim
                </button>
                <button
                  type="button"
                  className={ !open_on_weekends  ? 'active' : '' }
                  onClick={() => setOpenOnWeekends(false)}
                >
                    Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}