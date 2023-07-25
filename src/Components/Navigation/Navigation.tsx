import React, { FC } from 'react';
import { categoryNames } from '../../utils';
import './Navigation.css';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

interface Props {
  className?: string;
}

const Navigation: FC<Props> = ({ className = '' }) => {
  return (
    <nav className={classNames('navigation', className)}>
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
