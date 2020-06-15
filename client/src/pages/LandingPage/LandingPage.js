import React, { useState } from 'react';

import BasePage from '../../layout/BasePage';

import InfoBox from './components/InfoBox';
import MapCanvas from './components/MapCanvas';
import MapLayersBox from './components/MapLayersBox';
import StatusBox from './components/StatusBox';

export default function LandingPage() {
  const [state, setState] = useState({
    activePAE: null,
    activeInfo: null,
    baseMap: 3,
    flyToCoordinates: null
  });

  const handleStateChange = (paramKey, paramValue) => {
    setState({
      ...state,
      [paramKey]: paramValue
    });
  };

  const handleViewPae = (data) => {
    setState({
      ...state,
      activePAE: data,
      activeInfo: null
    });
  };

  const handleStatusBoxClose = () => {
    setState({
      ...state,
      activePAE: null,
      activeInfo: null
    });
  }

  return (
    <BasePage>
      <MapCanvas
        activePAE={ state.activePAE }
        baseMap={ state.baseMap }
        flyTo={ state.flyToCoordinates }
        onViewPAE={ handleViewPae }
      />
      <StatusBox
        data={ state.activePAE }
        onClose={ handleStatusBoxClose }
        onLinkClick={ handleStateChange.bind(this, 'activeInfo') }
      />
      <MapLayersBox
        activeBaseMap={ state.baseMap }
        activePAE={ state.activePAE }
        onChange={ handleStateChange.bind(this, 'baseMap') }
      />
      <InfoBox
        data={ state.activeInfo }
        onClose={ handleStateChange.bind(this, 'activeInfo', null) }
        onFlyTo={ handleStateChange.bind(this, 'flyToCoordinates') }
      />
    </BasePage>
  )
}
