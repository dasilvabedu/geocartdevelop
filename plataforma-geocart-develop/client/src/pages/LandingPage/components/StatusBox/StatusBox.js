import React, { useEffect, useState } from 'react';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CloseIcon from '@material-ui/icons/Close';
import Collapse from '@material-ui/core/Collapse';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';

import paeData from '../../../../data/paeData';

import styles from './StatusBox.module.css';

export default function StatusBox({
  data,
  onClose = () => {},
  onLinkClick = () => {},
}) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (!!data) {
      setIsOpen(true);
    }
  }, [data]);

  const handleChange = (item) => {
    onLinkClick(item);
  };

  const toggleVisibility = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Fade in={ !!data }>
      <Paper className={ styles.wrapper }>
        <h2 className={ styles.title }>{ data && data.properties.nomeEmpree }</h2>
        <Tooltip title={ isOpen ? 'Minimizar conteúdo' : 'Expandir conteúdo' }>
          <IconButton
            size="small"
            className={ styles.toggleButton }
            onClick={ toggleVisibility }
          >
            { isOpen ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" /> }
          </IconButton>
        </Tooltip>
        <Tooltip title="Resetar visualização">
          <IconButton
            size="small"
            className={ styles.closeButton }
            onClick={ onClose }
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Collapse in={ isOpen }>
          <div className={ styles.content }>
            <span className={ styles.legendItem }>
              <span className={ styles.legendItemCircle } />
              <span className={ styles.legendItemLabel }>Zona de auto salvamento</span>
            </span>
            <ul className={ styles.list }>
              { paeData.map((item) => {
                return (
                  <li
                    key={ `base-map-${ item.id }` }
                    className={ styles.listItem }
                    onClick={ handleChange.bind(this, item) }
                  >
                    <button className={ styles.navButton }>
                      <span className={ styles.navButtonLabel }>{ item.title }</span>
                      <ChevronRightIcon className={ styles.navButtonIcon } />
                    </button>
                  </li>
                );
              }) }
            </ul>
          </div>
        </Collapse>
      </Paper>
    </Fade>
  );
}
