import React from 'react';
import Articles from '../Articles/Articles';
import Navigation from '../Navigation/Navigation';
import { categoryIds } from '../../utils';
import './App.css';
import { ArticleItem } from '../ArticleItem/ArticleItem';
import { NewsAPI } from '../../types';

const App = () => {
  const [articleId, setArticleId] = React.useState<number | null>(null);
  const [category, setCategory] = React.useState<string>('index');
  const [articles, setArticles] = React.useState<NewsAPI>({ items: [], categories: [], sources: [] });

  const onNavClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setArticleId(null);
    const category = e.currentTarget.dataset.href;
    if (category) {
      setCategory(category);
    }
  };

  const onArticleClick = (id: number) => {
    setArticleId(id);
  };

  React.useEffect(() => {
    const url = 'https://frontend.karpovcourses.net/api/v2/ru/news/' + categoryIds[category] || '';
    fetch(url)
      .then((response) => response.json())
      .then((response: NewsAPI) => {
        setArticles(response);
      });
  }, [category]);

  return (
    <React.Fragment>
      <header className="header">
        <div className="container">
          <Navigation
            onNavClick={onNavClick}
            currentCategory={category}
            className={'header__navigation'}
            placement={'header'}
          />
        </div>
      </header>

      <main>
        {articleId !== null ? (
          <ArticleItem
            id={articleId}
            categories={articles.categories}
            sources={articles.sources}
            onArticleClick={onArticleClick}
          />
        ) : (
          <Articles articles={articles} onArticleClick={onArticleClick} />
        )}
      </main>

      <footer className="footer">
        <div className="container">
          <Navigation
            onNavClick={onNavClick}
            currentCategory={category}
            className={'footer__navigation'}
            placement={'footer'}
          />

          <div className="footer__column">
            <p className="footer__text">
              Сделано на Frontend курсе в
              <a href="https://karpov.courses/frontend" target="_blank" className="footer__link" rel="noreferrer">
                Karpov.Courses
              </a>
            </p>
            <p className="footer__copyright">© 2021</p>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};
export default App;
