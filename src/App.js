import { useEffect, useRef, useState } from 'react';
import {
 Switch,
 Route,
 useLocation,
} from "react-router-dom";
import moment from 'moment';
import { store } from './AppProvider.js';
import { useSelector, useDispatch } from 'react-redux';

import Menu from './components/Menu.jsx';
import MenuSecondary from './components/Menu/MenuSecondary.jsx';
import MapPage from './pages/MapPage.jsx';
import ContentPage from './pages/ContentPage.jsx';
import StatsPage from './pages/StatsPage.jsx';
import Login from './pages/Login.jsx';
import SetPassword from './pages/SetPassword.jsx';
import Monitoring from './pages/Monitoring.jsx';
import FilterbarDesktop from './components/Filterbar/FilterbarDesktop.jsx';
import FilterbarMobile from './components/Filterbar/FilterbarMobile.jsx';
import About from './components/About/About.jsx';
import Overlay from './components/Overlay/Overlay.jsx';
import Misc from './components/Misc/Misc.jsx';
import {SelectLayerMobile} from './components/SelectLayer/SelectLayerMobile.jsx';
import LoadingIndicator from './components/LoadingIndicator/LoadingIndicator.jsx';

import { initAccessControlList } from './poll-api/metadataAccessControlList.js';
import { updateZones } from './poll-api/metadataZones.js';
import { updateZonesgeodata } from './poll-api/metadataZonesgeodata.js';

import { initUpdateParkingData } from './poll-api/pollParkingData.js';
import {
  initUpdateVerhuringenData
} from './poll-api/pollVerhuringenData.js';

import {
  DISPLAYMODE_PARK,
  DISPLAYMODE_RENTALS,
  DISPLAYMODE_OTHER,
} from './reducers/layers.js';

import './App.css';

function App() {
  const [pathName, setPathName] = useState(document.location.pathname);
  const [uriParams, setUriParams] = useState(document.location.search);
  
  const dispatch = useDispatch()
  
  const mapContainer = useRef(null);

  let TO_delay = null, DELAY_TIMEOUT_IN_MS = 500;

  let location = useLocation();
  useEffect(() => {
    setPathName(location ? location.pathname : null);
    setUriParams(location ? location.search : null);
  }, [location]);
  
  useEffect(() => {
    if(uriParams!==null) {
      let params = new URLSearchParams(uriParams);
      let view = params.get('view')
      if(view) {
        try {
          // console.log(decodeURIComponent(view));
          const importstate = JSON.parse(decodeURIComponent(view));
          // force update to map extent
          // importstate.layers.extent = importstate.layers.mapextent;
          dispatch({type: 'IMPORT_STATE', payload: importstate });
          
          setTimeout(() => dispatch({type: 'LAYER_SET_ZONES_EXTENT', payload: importstate.layers.mapextent}), 2500);
          return;
        } catch(ex) {
          console.warn("unable to decode application state")
          alert("Ongeldige link ingegeven");
        }
        // continue
      }
    }
    
    let payload;
    if(pathName.includes("/map/park")||pathName==='/') {
      payload=DISPLAYMODE_PARK;
    } else if(pathName.includes("/map/rentals")) {
      payload=DISPLAYMODE_RENTALS;
    } else {
      payload=DISPLAYMODE_OTHER;
    }
    dispatch({type: 'LAYER_SET_DISPLAYMODE', payload});

  }, [pathName, uriParams, dispatch]);

  const isLoggedIn = useSelector(state => {
    return state.authentication.user_data ? true : false;
  });
  
  const filterDate = useSelector(state => {
    return state.filter ? state.filter.datum : false;
  });

  const isLayersMobileVisible = useSelector(state => {
    return state.ui ? state.ui['MenuSecondary.layers'] : false;
  });

  const isFilterBarVisible = useSelector(state => {
    return state.ui ? state.ui['FILTERBAR'] : false;
  });

  const filter = useSelector(state => {
    return state.filter;
  });
  
  const layers = useSelector(state => {
    return state.layers;
  });

  const displayMode = useSelector(state => {
    return state.layers ? state.layers.displaymode : DISPLAYMODE_PARK;
  });
  
  const metadata = useSelector(state => {
    return state.metadata;
  });

  // Set date to current date/time on load
  useEffect(() => {
    const setFilterDatum = newdt => {
      dispatch({
        type: 'SET_FILTER_DATUM',
        payload: newdt.toISOString()
      })
    }

    // On load, set datetime to NOW
    // - Don't do this if datetime < 10 ago
    // - Don't do this if this is a shared link (we'll then keep the shared datetime)
    const params = new URLSearchParams(uriParams);
    const isFilterDateMoreThan10MinutesAgo = moment(filterDate).diff(moment(), 'minutes') < -10;
    const isSharedLink = params.get('view');// Check if this is a shared link
    if(! isSharedLink && isFilterDateMoreThan10MinutesAgo) {
      setFilterDatum(moment().toDate())
    }
  }, [dispatch]);

  /*
  To load data using the API we use the scripts in the poll-api folder.
  We need zones to be able to fetch parking & trips data.

  First, on app load, we load user information.
  Then, we load the zones.
  As soon as the zones are loaded, we load the parking data and rentals data.
  We reload the parking data and rentals data if the filters or the URL change.
  */

  // On app start: get user data
  useEffect(() => {
    initAccessControlList(store);
  }, [isLoggedIn]);
  
  useEffect(() => {
    // console.log('useEffect zones', filter.gebied)
    updateZones(store);
  }, [isLoggedIn, metadata.metadata_loaded, filter.gebied])

  useEffect(() => {
    // console.log('useEffect zones geodata')
    updateZonesgeodata(store);
  }, [
    isLoggedIn,
    filter.gebied,
    metadata.zones_loaded,
    filter.zones
  ])

  // On app start, if zones are loaded or pathName/filter is changed: reload data
  useEffect(() => {
    if(displayMode !== 'displaymode-park') {
      return;
    }

    if(TO_delay) clearTimeout(TO_delay);

    TO_delay = setTimeout(x => {
      initUpdateParkingData(store);
    }, DELAY_TIMEOUT_IN_MS)
  }, [
    isLoggedIn,
    metadata.zones_loaded,
    pathName,
    filter,
    layers.displaymode,
    layers.zones_visible
  ]);

  useEffect(() => {
    if(displayMode !== 'displaymode-rentals') {
      return;
    }

    if(TO_delay) clearTimeout(TO_delay);

    TO_delay = setTimeout(x => {
      initUpdateVerhuringenData(store);
    }, DELAY_TIMEOUT_IN_MS)
  }, [
    isLoggedIn,
    metadata.zones_loaded,
    pathName,
    filter,
    layers.displaymode,
    layers.zones_visible
  ]);

  // Mobile menu: Filters / Layers
  const renderMobileMenus = () => {
    return <div>
      <div className="hidden sm:block h-full">
        <FilterbarDesktop isVisible={isFilterBarVisible} displayMode={displayMode} />
      </div>
      <div className="block sm:hidden">
        <FilterbarMobile isVisible={isFilterBarVisible} displayMode={displayMode} />
      </div>
      <SelectLayerMobile />
    </div>
  }

  const renderMapElements = () => {
    return <>
      <MenuSecondary />
      {renderMobileMenus()}
    </>
  }

  return (
    <div className={`app ${(isFilterBarVisible || isLayersMobileVisible) ? 'overflow-y-hidden' : ''}`}>
        <LoadingIndicator  />
        <div className="gui-layer">
        <Switch>
          { isLoggedIn ?
            <>
              <Route exact path="/">
                {renderMapElements()}
              </Route>
              <Route exact path="/map/park">
                {renderMapElements()}
              </Route>
              <Route exact path="/map/rentals">
                {renderMapElements()}
              </Route>
              <Route exact path="/stats/overview">
                <ContentPage>
                  <StatsPage />
                </ContentPage>
                {renderMobileMenus()}
              </Route>
              <Route exact path="/monitoring">
                <Monitoring />
              </Route>
              <Route exact path="/misc">
                <Overlay>
                  <Misc />
                </Overlay>
                <div key="mapContainer" ref={mapContainer} className="map-layer top-0"></div>
              </Route>
            </>
            :
            null
          }

          <Route exact path="/over">
            <Overlay>
              <About />
            </Overlay>
            <div key="mapContainer" ref={mapContainer} className="map-layer top-0"></div>
          </Route>

          <Route exact path="/login">
            <Overlay>
              <Login />
            </Overlay>
            <div key="mapContainer" ref={mapContainer} className="map-layer top-0"></div>
          </Route>

          <Route exact path="/reset-password/:changePasswordCode">
            <Overlay>
              <SetPassword />
            </Overlay>
            <div key="mapContainer" ref={mapContainer} className="map-layer top-0"></div>
          </Route>

          <Route>
            {renderMapElements()}
          </Route>

        </Switch>

        <div key="mapContainer" ref={mapContainer} className="map-layer top-0"></div>
        <MapPage mapContainer={mapContainer} />
        <Menu pathName={pathName} />

       </div>
     </div>
  );
}

export default App;
