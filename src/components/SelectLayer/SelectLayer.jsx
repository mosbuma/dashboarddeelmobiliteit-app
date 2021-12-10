import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SlideBox from '../SlideBox/SlideBox.jsx';

import './SelectLayer.css';

import {
  DISPLAYMODE_PARKEERDATA_HEATMAP,
  DISPLAYMODE_PARKEERDATA_CLUSTERS,
  DISPLAYMODE_PARKEERDATA_VOERTUIGEN } from '../../reducers/layers.js';

function SelectLayer(props) {
  // const {setLayers, setActiveSource} = props;
  const dispatch = useDispatch()
  
  const showZoneOnOff = useSelector(state => {
    return state.filter ? state.filter.gebied!=='' : false;
  });

  const zonesVisible = useSelector(state => {
    return state.layers ? state.layers.zones_visible : false;
  });
  
  const displayMode = useSelector(state => {
    return state.layers ? state.layers.displaymode : DISPLAYMODE_PARKEERDATA_VOERTUIGEN;
  });
  
  return (
    <SlideBox name="SelectLayer" direction="right" options={{
      title: 'Lagen',
      backgroundColor: '#fff',
    }} style={{
      position: 'absolute',
      top: '59px',
      right: 0
    }}>
      <div className="SelectLayer pr-1">
        <div data-type="heat-map" className={`layer${displayMode!==DISPLAYMODE_PARKEERDATA_HEATMAP ? ' layer-inactive':''}`}
          onClick={() => { dispatch({ type: 'LAYER_SET_DISPLAYMODE', payload: DISPLAYMODE_PARKEERDATA_HEATMAP }) }}>
          <span className="layer-title">
            Heat map
          </span>
        </div>

        <div data-type="pointers" className={`layer${displayMode!==DISPLAYMODE_PARKEERDATA_CLUSTERS ? ' layer-inactive':''}`}
          onClick={() => { dispatch({ type: 'LAYER_SET_DISPLAYMODE', payload: DISPLAYMODE_PARKEERDATA_CLUSTERS }) }}>
          <span className="layer-title">
            Clusters
          </span>
        </div>

        <div data-type="vehicles"  className={`layer${displayMode!==DISPLAYMODE_PARKEERDATA_VOERTUIGEN ? ' layer-inactive':''}`}
          onClick={() => { dispatch({ type: 'LAYER_SET_DISPLAYMODE', payload: DISPLAYMODE_PARKEERDATA_VOERTUIGEN }) }}>
          <span className="layer-title">
            Voertuigen
          </span>
        </div>

        { showZoneOnOff ?
          <div data-type="zones" className={`layer${!zonesVisible ? ' layer-inactive':''}`} onClick={() => {
              dispatch({ type: 'LAYER_TOGGLE_ZONES_VISIBLE', payload: null })
          }}>
            <span className="layer-title">
              Zones
            </span>
          </div> : null
        }
      </div>
    </SlideBox>
  )
}

export {
  SelectLayer
}