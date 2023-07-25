import React from 'react';
import { useParams } from 'react-router-dom';
import { NewsAPI } from '../../types';
import { categoryIds, categoryTitles } from '../../utils';
import PartnerArticle from '../PartnerArticle/PartnerArticle';
import './Articles.css';
import { SidebarArticleCard } from '@components/SidebarArticleCard/SidebarArticleCard';
import { Hero } from '@components/Hero/Hero';
import { ArticleCard } from '@components/ArticleCard/ArticleCard';

const Articles = () => {
  const { categoryId = 'index' }: { categoryId?: string } = useParams();
  const [articles, setArticles] = React.useState<NewsAPI>({ items: [], categories: [], sources: [] });

  React.useEffect(() => {
    const url = 'https://frontend.karpovcourses.net/api/v2/ru/news/' + categoryIds[categoryId] || '';
    fetch(url)
      .then((response) => response.json())
      .then((response: NewsAPI) => {
        setArticles(response);
      });
  }, [categoryId]);

  return (
    <main className="main">
      <section className="articles">
        <Hero title={categoryTitles[categoryId]} image={'test'} className={'articles__hero'} />
        <div className="container grid">
          <section className="articles__content">
            {articles.items.slice(0, 3).map((item) => {
              const category = articles.categories.find(({ id }) => item.category_id === id);
              const source = articles.sources.find(({ id }) => item.source_id === id);
              return (
                <ArticleCard
                  key={item.title}
                  id={item.id}
                  description={item.description}
                  image={item.image}
                  title={item.title}
                  category={category.name}
                  source={source.name}
                />
              );
            })}
          </section>
          <section className="articles__sidebar">
            {articles.items.slice(3, 12).map((item) => {
              const source = articles.sources.find(({ id }) => item.source_id === id);
              return (
                <SidebarArticleCard
                  className="articles__sidebar-item"
                  key={item.title}
                  id={item.id}
                  title={item.title}
                  source={source?.name || ''}
                  date={item.date}
                  image={item.image}
                />
              );
            })}
          </section>
        </div>
      </section>
      <div className="articles__partner-article">
        <PartnerArticle />
      </div>
    </main>
  );
};
export default Articles;
