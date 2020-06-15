import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import _ from 'lodash';

import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LayersIcon from '@material-ui/icons/Layers';
import MapIcon from '@material-ui/icons/Map';
import Paper from '@material-ui/core/Paper';

import baseMaps from '../../../../data/baseMaps';

import styles from './MapLayersBox.module.css';

const layers = [
  {
    id: 1,
    name: 'Planície inundável'
  },
  {
    id: 2,
    name: 'Zona de auto salvamento'
  },
  {
    id: 3,
    name: 'Agentes',
  },
];

export default function MapLayersBox({
  activeBaseMap,
  activePAE,
  onChange = () => {}
}) {
  const [activeLayers, setActiveLayers] = useState(_.map(layers, 'id'));

  useEffect(() => {
    setActiveLayers(_.map(layers, 'id'));
  }, [activePAE]);

  const handleBaseMapChange = (id) => {
    onChange(id);
  };

  const getActiveLayer = (id) => {
    return _.find(activeLayers, layerId => layerId === id);
  };

  const handleLayerChange = (id) => {
    let nextActiveLayers = _.cloneDeep(activeLayers);

    if (getActiveLayer(id)) {
      nextActiveLayers = _.filter(
        nextActiveLayers,
        layerId => layerId !== id
      );
    } else {
      nextActiveLayers = _.concat(nextActiveLayers, id);
    }

    setActiveLayers(nextActiveLayers);
  };

  return (
    <Paper className={ styles.wrapper }>
      <Collapse in={ !!activePAE }>
        <div className={ styles.dataSection }>
          <h2 className={ styles.title }>
            <LayersIcon />
            <span>Camadas</span>
          </h2>
          <ul className={ styles.list }>
            { layers.map((layer) => {
              return (
                <li
                  key={ `map-layer-${ layer.id }` }
                  className={ styles.listItem }
                >
                  <FormControlLabel
                    classes={{
                      root: styles.checkboxButtonRoot,
                      label: styles.checkboxButtonLabel
                    }}
                    control={
                      <Checkbox
                        checked={ getActiveLayer(layer.id) }
                        className={ styles.checkboxButtonIcon }
                        onChange={ handleLayerChange.bind(this, layer.id) }
                        value={ layer.id }
                        color="primary"
                        size="small"
                        icon={ <CheckBoxOutlineBlankIcon fontSize="small" /> }
                        checkedIcon={ <CheckBoxIcon fontSize="small" /> }
                      />
                    }
                    label={ layer.name }
                  />
                </li>
              );
            }) }
          </ul>
        </div>
      </Collapse>
      <div>
        <h2 className={ styles.title }>
          <MapIcon />
          <span>Mapa Base</span>
        </h2>
        <ul className={ styles.list }>
          { baseMaps.map((baseMap) => {
            return (
              <li
                key={ `base-map-${ baseMap.id }` }
                className={ classnames(styles.listItem, {
                  [styles.listItemActive]: baseMap.id === activeBaseMap
                }) }
                onClick={ handleBaseMapChange.bind(this, baseMap.id) }
              >
                { baseMap.name }
              </li>
            );
          }) }
        </ul>
      </div>
    </Paper>
  );
}
