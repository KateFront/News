import React, { FC } from 'react';
import { categoryNames } from '../../utils';
import './Navigation.css';
import logo from '../../images/logo.svg';
import { NavLink } from 'react-router-dom';

interface Props {
  className?: string;
  placement: 'header' | 'footer';
}

const Navigation: FC<Props> = ({ className = '', placement = 'header' }) => {
  /*const location = useLocation();*/
  return (
    <nav className={`grid navigation navigation--${placement} ${className}`}>
      <NavLink to="/" className="navigation__logo">
        <img className="navigation__logo-image" src={logo} alt="Логотип" />
      </NavLink>
      <ul className="navigation__list">
        {['index', 'fashion', 'technologies', 'sport', 'karpov'].map((item) => {
          return (
            <li className="navigation__item" key={item}>
              <NavLink
                to={`/${item}`}
                className={({ isActive }) => (isActive ? 'navigation__link--active' : 'navigation__link')}
              >
                {categoryNames[item]}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default Navigation;
