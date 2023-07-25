import React, { FC } from 'react';
import { Article, ArticleItemAPI, RelatedArticlesAPI, Source } from '../../types';
import './ArticleItem.css';
import { beautifyDate } from '../../utils';
import { useParams } from 'react-router-dom';
import ArticleItemInfo from '../ArticleItemInfo/ArticleItemInfo';
import { SidebarArticleCard } from '@components/SidebarArticleCard/SidebarArticleCard';
import { Hero } from '@components/Hero/Hero';
import { ArticleCard } from '@components/ArticleCard/ArticleCard';

export const ArticleItem: FC = () => {
  const { id } = useParams<{ id: string }>();

  const [articleItem, setArticleItem] = React.useState<ArticleItemAPI | null>(null);
  const [relatedArticles, setRelatedArticles] = React.useState<Article[] | null>(null);
  const [sources, setSources] = React.useState<Source[]>([]);

  React.useEffect(() => {
    fetch(`https://frontend.karpovcourses.net/api/v2/news/full/${id}`)
      .then((response) => response.json())
      .then(setArticleItem);

    Promise.all([
      fetch(`https://frontend.karpovcourses.net/api/v2/news/related/${id}?count=9`).then((response) => response.json()),
      fetch('https://frontend.karpovcourses.net/api/v2/sources').then((response) => response.json()),
    ]).then((response) => {
      const articles: RelatedArticlesAPI = response[0];
      const sources: Source[] = response[2];
      setRelatedArticles(articles.items);
      setSources(sources);
    });
  }, [id]);

  if (articleItem === null || relatedArticles === null) {
    return null;
  }

  const renderArticleItemInfo = (articleItem: ArticleItemAPI): React.ReactElement => {
    return (
      <ArticleItemInfo
        date={beautifyDate(articleItem.date)}
        categoryName={articleItem.category.name}
        author={articleItem?.author ?? ''}
        sourceLink={articleItem.link}
        sourceName={articleItem.source?.name ?? ''}
      />
    );
  };
  return (
    <section className="article-page">
      <article className="article">
        <Hero image={articleItem.image} title={articleItem.title} className={'article-page__hero'} />

        <div className="grid container article__main">
          <div className="article__content">
            {renderArticleItemInfo(articleItem)}
            <p>{articleItem.text}</p>
          </div>

          <div className="article__sidebar">
            {relatedArticles.slice(3, 9).map((item) => {
              const source = sources.find(({ id }) => item.source_id === id);
              return (
                <SidebarArticleCard
                  className="article__sidebar-item"
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  source={source?.name || ''}
                  image={item.image}
                  date={item.date}
                />
              );
            })}
          </div>
        </div>
      </article>

      <section className="article-page__related-articles">
        <div className="container">
          <h2 className="article-page__related-articles-title">Читайте также:</h2>

          <div className="grid article-page__related-articles-list">
            {relatedArticles.slice(0.3).map((item) => {
              const source = sources.find(({ id }) => item.source_id === id);
              return (
                <ArticleCard
                  className={'article-page__related-articles-item'}
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  source={source.name}
                  date={item.date}
                />
              );
            })}
          </div>
        </div>
      </section>
    </section>
  );
};
