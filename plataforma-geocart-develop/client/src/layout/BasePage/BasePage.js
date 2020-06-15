import React from 'react';

import Header from '../Header';
import Footer from '../Footer';

import styles from './BasePage.module.css';

const HEADER_HEIGHT = 50;
const FOOTER_HEIGHT = 30;

function BasePage({ children }) {
  const contentMinHeight = window.innerHeight - (HEADER_HEIGHT + FOOTER_HEIGHT);

  return (
    <div className={ styles.pageWrapper }>
      <Header />
      <div className={ styles.contentWrapper } style={ { minHeight: contentMinHeight } }>
        { children }
      </div>
      <Footer />
    </div>
  );
}

export default BasePage;
