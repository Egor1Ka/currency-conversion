import React from 'react';
import { PreserveQueryLink } from '../PreserveQueryLink';
import styles from './styles.module.scss';
import { ReactComponent as PromovaIcon } from '../../assets/svg/PromovaLongLogo.svg';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.container}>
        <PreserveQueryLink to='/'>
          <PromovaIcon />
        </PreserveQueryLink>
        <ul className={styles.buttonGroup}>
          <li>
            <PreserveQueryLink to='/rates'>Rates</PreserveQueryLink>
          </li>
          <li>
            <PreserveQueryLink to='/about'>About</PreserveQueryLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
