import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Articles from '../Articles/Articles';
import Navigation from '../Navigation/Navigation';
import './App.css';
import { ArticleItem } from '../ArticleItem/ArticleItem';

const App = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);
  return (
    <React.Fragment>
      <header className="header">
        <div className="container">
          <Navigation className={'header__navigation'} placement={'header'} />
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Articles />} errorElement={<div>Not Found</div>} />
          <Route path="/:categoryId" element={<Articles />} />
          <Route path="/article/:id" element={<ArticleItem />} />
        </Routes>
      </main>

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

export default App;
