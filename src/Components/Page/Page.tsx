import React, { FC } from 'react';
import Navigation from '../Navigation/Navigation';
import './Page.css';
import { Logo } from '@components/Logo/Logo';

interface Props {
  children?: React.ReactNode;
}

const Page: FC<Props> = ({ children }) => {
  return (
    <React.Fragment>
      <header className="header">
        <div className="container header__container">
          <Logo />
          <Navigation className={'header__navigation'} />
        </div>
      </header>

      <main>{children}</main>

      <footer className="footer">
        <div className="container">
          <div className="footer__top">
            <Logo />
            <Navigation className={'footer__navigation'} />
          </div>

          <div className="footer__bottom">
            <p className="footer__text">
              Сделано{' '}
              <a href="https://github.com/KateFront" target="_blank" className="footer__link" rel="noreferrer">
                KateFront
              </a>
            </p>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Page;
