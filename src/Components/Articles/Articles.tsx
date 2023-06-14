import React from 'react';
import { useParams } from 'react-router-dom';
import MainArticle from '../MainArticle/MainArticle';
import SmallArticle from '../SmallArticle/SmallArticle';
import './Articles.css';
import { NewsAPI } from '../../types';
import { categoryIds } from '../../utils';

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
        <div className="container grid">
          <section className="articles__big-column">
            {articles.items.slice(0, 3).map((item) => {
              const category = articles.categories.find(({ id }) => item.category_id === id);
              const source = articles.sources.find(({ id }) => item.source_id === id);
              return (
                <MainArticle
                  key={item.title}
                  id={item.id}
                  description={item.description}
                  image={item.image}
                  title={item.title}
                  category={category ? category.name : ''}
                  source={source?.name || ''}
                />
              );
            })}
          </section>
          <section className="articles__small-column">
            {articles.items.slice(3, 12).map((item) => {
              const source = articles.sources.find(({ id }) => item.source_id === id);
              return (
                <SmallArticle
                  key={item.title}
                  id={item.id}
                  title={item.title}
                  source={source?.name || ''}
                  date={item.date}
                />
              );
            })}
          </section>
        </div>
      </section>
    </main>
  );
};
export default Articles;
