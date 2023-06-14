import React, { FC } from 'react';
import './ArticleItemInfo.css';

type TProps = {
  categoryName: string;
  date: string;
  sourceLink?: string;
  sourceName?: string;
  author?: string;
};

const ArticleItemInfo: FC<TProps> = ({ categoryName, sourceLink, sourceName, author, date }) => {
  return (
    <div className="grid">
      <div className="article-item-info__category-container">
        <span className="article-category article-item-info">{categoryName}</span>
        {sourceLink && (
          <a href={sourceLink} target={'_blank'} rel={'noreferrer'} className="article-item-info__link">
            Источник: {sourceName}
            {author && <span className="article-item-info__author">{author}</span>}
          </a>
        )}
      </div>
      <span className="article-date article-item-info__date">{date}</span>
    </div>
  );
};

export default ArticleItemInfo;
