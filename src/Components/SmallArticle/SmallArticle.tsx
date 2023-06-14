import React, { FC } from 'react';
import './SmallAtricles.css';
import { beautifyDate } from '../../utils';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
  source: string;
  date: string;
  id: number;
}

const SmallArticle: FC<Props> = ({ title, source, date, id }) => {
  return (
    <Link to={`/article/${id}`} className="small-article">
      <article className="small-article__container">
        <h2 className="small-article__title">{title}</h2>
        <span className="article-date">{source}</span>
        <span className="article-source">{beautifyDate(date)}</span>
      </article>
    </Link>
  );
};
export default SmallArticle;
