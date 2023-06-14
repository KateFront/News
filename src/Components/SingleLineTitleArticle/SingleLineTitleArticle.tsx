import React, { FC } from 'react';
import './SingleLineTitleArticle.css';
import { Link } from 'react-router-dom';

interface Props {
  image: string;
  category: string;
  id: number;
  title: string;
  source: string;
  text: string;
}

export const SingleLineTitleArticle: FC<Props> = ({ image, title, source, text, category, id }) => {
  return (
    <Link to={`/article/${id}`} className="single-line-title-article">
      <article className="single-line-title-article__container">
        <img className="single-line-title-article__image" src={image} alt={' '} />
        <span className="article-category single-line-title-article__category">{category}</span>
        <h2 className="single-line-title-article__title">{title}</h2>
        <p className="single-line-title-article__text">{text} </p>
        <span className="article-source single-line-title-article__source">{source}</span>
      </article>
    </Link>
  );
};
