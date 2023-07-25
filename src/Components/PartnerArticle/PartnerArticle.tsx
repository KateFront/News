import React, { useEffect, useState } from 'react';
import { getMainPartnerArticle } from '../../api';
import { IPartnerArticle } from '../AdminArticlesItem/types';
import './PartnerArticle.css';

const PartnerArticle = () => {
  const [article, setArticle] = useState<IPartnerArticle | null>(null);

  useEffect(() => {
    (async () => {
      const article = await getMainPartnerArticle();

      setArticle(article);
    })();
  }, []);

  if (!article) {
    return null;
  }
  return (
    <section className={'partner-article'}>
      <div className={'container grid'}>
        <div className={'partner-article__image-container'}>
          <img className={'partner-article__image'} src={article.image} alt={article.title} />
        </div>
        <div className={'partner-article__content'}>
          <span className={'partner-article__caption'}>Партнерский материал от {article['company-name']}</span>
          <h2 className={'partner-article__title'}>{article.title}</h2>
          <p className={'partner-article__text'}> {article.description} </p>
        </div>
      </div>
    </section>
  );
};

export default PartnerArticle;
