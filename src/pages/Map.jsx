import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import maplibregl from 'maplibre-gl';

import './Map.css';

function Map(props) {
  const dispatch = useDispatch()

  //Get the value of a State variable, and store it to a const, to use it later
  const vehicles = useSelector(state => {
    return state.vehicles ? state.vehicles.data : []
  });

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(5.102406);
  const [lat] = useState(52.0729252);
  const [zoom] = useState(14);
  
  console.log('vehicles', vehicles)

  // Init MapLibre map
  
  // Docs: https://maptiler.zendesk.com/hc/en-us/articles/4405444890897-Display-MapLibre-GL-JS-map-using-React-JS
  useEffect(() => {
    const initMap = () => {
      if (map.current) return;
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
        center: [lng, lat],
        zoom: zoom
      });
      // Add controls
      map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
    }

    initMap();
    
    console.log(vehicles);
    
    if(vehicles!==null) {
      vehicles.features.filter((x,i)=>(true||i<14000)).forEach(x => {
        new maplibregl.Marker({color: "#FF0000"})
          .setLngLat([x.geometry.coordinates[0], x.geometry.coordinates[1]])
          .addTo(map.current);
      })
    }

  }, [vehicles]);

  return <div className="Map">
    <div onClick={() => {
      dispatch({
        type: 'SET_VEHICLES',
        payload: [{
          lng: 5.102406,
          lat: 52.0729252
        }]
      })
    }}>LOAD VEHICLES</div>
    <div ref={mapContainer} className="map" />
  </div>
}

export default Map;
