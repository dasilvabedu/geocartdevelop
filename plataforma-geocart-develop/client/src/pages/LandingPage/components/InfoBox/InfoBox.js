import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import _ from 'lodash';

import CloseIcon from '@material-ui/icons/Close';
import Collapse from '@material-ui/core/Collapse';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';

import styles from './InfoBox.module.css';

export default function InfoBox({
  data,
  onClose = () => {},
  onFlyTo = () => {}
}) {
  const [isOpen, setIsOpen] = useState(!!data);
  const [activeDataItem, setActiveDataItem] = useState(null);

  useEffect(() => setIsOpen(!!data), [data]);

  const handleActiveDataItemChange = (id) => {
    if (id === activeDataItem) {
      setActiveDataItem(null);
    } else {
      setActiveDataItem(id);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Fade in={ isOpen } onExited={ onClose }>
      <Paper className={ styles.wrapper }>
        <h2 className={ styles.title }>{ _.get(data, 'title') }</h2>
        <IconButton
          size="small"
          className={ styles.closeButton }
          onClick={ handleClose }
        >
          <CloseIcon fontSize="small" />
        </IconButton>
        <div className={ styles.content }>
          { _.get(data, 'description') && <p>{ _.get(data, 'description') }</p> }
          { _.get(data, 'dataList') &&
            <ul className={ styles.dataList }>
              { _.get(data, 'dataList').map((item) => {
                return (
                  <li
                    key={ `data-list-${ _.get(data, 'id') }-${ item.title }` }
                    className={ styles.dataListItem }
                  >
                    <div className={ styles.dataListItemHeader }>
                      <span
                        className={ classnames(styles.dataListItemTitle, {
                          [styles.dataListItemTitleActive]: activeDataItem === item.title
                        }) }
                      >
                        { item.title }
                      </span>
                      { item.data &&
                        <Tooltip title="Visualizar informações">
                          <IconButton
                            size="small"
                            color={ activeDataItem === item.title ? 'primary' : 'default' }
                            className={ styles.dataListItemInfoButton }
                            onClick={ handleActiveDataItemChange.bind(this, item.title) }
                          >
                            <InfoIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      }
                      { item.coordinates &&
                        <Tooltip title="Visualizar localização">
                          <IconButton
                            size="small"
                            className={ styles.dataListItemLocationButton }
                            onClick={ onFlyTo.bind(this, item.coordinates) }
                          >
                            <MyLocationIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      }
                    </div>
                    <Collapse in={ activeDataItem === item.title }>
                      <ul className={ styles.infoList }>
                        { _.map(item.data, (info) => {
                          return (
                            <li
                              key={ `data-list-${ _.get(data, 'id') }-${ item.title }-info-${ info.label }` }
                              className={ styles.infoListItem }
                            >
                              <span className={ styles.infoListItemLabel }>{ info.label }</span>
                              <b className={ styles.infoListItemValue }>{ info.value }</b>
                            </li>
                          );
                        }) }
                      </ul>
                    </Collapse>
                  </li>
                );
              }) }
            </ul>
          }
        </div>
      </Paper>
    </Fade>
  );
}
