import React from 'react';

import styles from './MapPAEPopup.module.css';

export default function MapPAEPopup({ feature }) {
  return (
    <div className={ styles.wrapper }>
      <h2 className={ styles.title }>{ feature.properties.nomeEmpree }</h2>
      <h3 className={ styles.subtitle }>{ feature.properties.nomeRio }</h3>
      <p className={ styles.text }>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <div className={ styles.actionWrapper }>
        <button id="popup-pae-button" className={ styles.actionButton }>Visualizar informações</button>
      </div>
    </div>
  );
}
