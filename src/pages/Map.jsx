import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import maplibregl from 'maplibre-gl';

import './Map.css';

function Map(props) {
  //Get the value of a State variable, and store it to a const, to use it later
  const vehicles = useSelector(state => {
    return state.vehicles ? state.vehicles.data : null;
  });

  const mapContainer = useRef(null);
  const [lng] = useState(5.102406);
  const [lat] = useState(52.0729252);
  const [zoom] = useState(14);
  let map = useRef(null);

  // Docs: https://maptiler.zendesk.com/hc/en-us/articles/4405444890897-Display-MapLibre-GL-JS-map-using-React-JS
  useEffect(() => {
    // Init MapLibre map
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

      map.current.on('load', function() {
        // console.log('MAP loaded');
      })
    }
    initMap();

  }, [vehicles, lng, lat, zoom])

  useEffect(() => {
    const addDataSources = (vehicles) => {
      if (! map.current) {
        // console.warn('addDataSources :: Map not loaded', map)
        return;
      }
      if (! vehicles) {
        // console.warn('addDataSources :: No vehicles known')
        return;
      }
      // Check if source exists
      const doesSourceExist = map.current.getSource('vehicles');
      if(doesSourceExist) {
        // console.log('source does exist. setting vehicles', vehicles)
        // map.current.getSource('vehicles').setData(vehicles);
      } else {
        // console.log('source does not exist. setting vehicles', vehicles)
        map.current.addSource('vehicles', {
          'type': 'geojson',
          'data': vehicles
        });
      }
    }
    addDataSources(vehicles);
  }, [vehicles])

  useEffect(() => {
    const addLayers = (vehicles) => {
      if (! map.current) return;
      if (! vehicles) return;

      const doesLayerExist = map.current.getLayer('vehicles-heatmap');
      if(doesLayerExist) return;

      map.current.addLayer(
        {
          'id': 'vehicles-heatmap',
          'type': 'heatmap',
          'source': 'vehicles',
          'maxzoom': 9,
          'paint': {
            // Increase the heatmap weight based on frequency and property magnitude
            'heatmap-weight': [
              'interpolate',
              ['linear'],
              ['get', 'mag'],
              0,
              0,
              6,
              1
            ],
            // Increase the heatmap color weight weight by zoom level
            // heatmap-intensity is a multiplier on top of heatmap-weight
            'heatmap-intensity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0,
              1,
              9,
              3
            ],
            // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
            // Begin color ramp at 0-stop with a 0-transparancy color
            // to create a blur-like effect.
            'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0,
              'rgba(33,102,172,0)',
              0.2,
              'rgb(103,169,207)',
              0.4,
              'rgb(209,229,240)',
              0.6,
              'rgb(253,219,199)',
              0.8,
              'rgb(239,138,98)',
              1,
              'rgb(178,24,43)'
            ],
            // Adjust the heatmap radius by zoom level
            'heatmap-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0,
              2,
              9,
              20
            ],
            // Transition from heatmap to circle layer by zoom level
            'heatmap-opacity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              7,
              1,
              9,
              0
            ]
          }
        },
      );
      map.current.addLayer(
        {
          'id': 'vehicles-point',
          'type': 'circle',
          'source': 'vehicles',
          'minzoom': 7,
          'paint': {
          // Size circle radius by earthquake magnitude and zoom level
          'circle-radius': [
            'interpolate', ['linear'], ['zoom'],
            12, 1,
            16, ['*', 2, ['get', 'amount']]
          ],
          // Color circle by earthquake magnitude
          // 'circle-color': [
          //   'interpolate',
          //   ['linear'],
          //   ['get', 'mag'],
          //   1,
          //   'rgba(33,102,172,0)',
          //   2,
          //   'rgb(103,169,207)',
          //   3,
          //   'rgb(209,229,240)',
          //   4,
          //   'rgb(253,219,199)',
          //   5,
          //   'rgb(239,138,98)',
          //   6,
          //   'rgb(178,24,43)'
          // ],
          // 'circle-stroke-color': 'white',
          // 'circle-stroke-width': 1,
          // Transition from heatmap to circle layer by zoom level
            'circle-opacity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              7,
              0,
              8,
              1
            ],
            'circle-color': ['get', 'color']
          }
        },
      );
      console.log('MAP layers added')
    }
    addLayers(vehicles);
  }, [vehicles]);

  return <div className="Map">
    <div ref={mapContainer} className="map" />
  </div>
}

export default Map;
