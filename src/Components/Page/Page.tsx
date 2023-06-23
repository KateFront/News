import React, { FC } from 'react';
import Navigation from '../Navigation/Navigation';
import './Page.css';

interface Props {
  children?: React.ReactNode;
}

const Page: FC<Props> = ({ children }) => {
  return (
    <React.Fragment>
      <header className="header">
        <div className="container">
          <Navigation className={'header__navigation'} placement={'header'} />
        </div>
      </header>

      <main>{children}</main>

      <footer className="footer">
        <div className="container">
          <Navigation className={'footer__navigation'} placement={'footer'} />

          <div className="footer__bottom">
            <p className="footer__text">
              Сделано на Frontend курсе в
              <a href="https://karpov.courses/frontend" target="_blank" className="footer__link" rel="noreferrer">
                Karpov.Courses
              </a>
            </p>
            <p className="footer__text footer__text--gray">© 2021</p>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Page;
