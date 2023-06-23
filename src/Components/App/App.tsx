import React, { FC, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Articles from '../Articles/Articles';
import { ArticleItem } from '../ArticleItem/ArticleItem';
import Page from '../Page/Page';
import AdminArticles from '../AdminArticlesItem/AdminArticles';
import AdminPage from '../AdminPage/AdminPage';
import AdminArticlesItem from '../AdminArticles/AdminArticlesItem';

const App: FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route
        path="/admin"
        element={
          <AdminPage>
            <AdminArticles />
          </AdminPage>
        }
      />
      <Route
        path="/admin/create"
        element={
          <AdminPage>
            <AdminArticlesItem />
          </AdminPage>
        }
      />
      <Route
        path="/admin/edit/:id"
        element={
          <AdminPage>
            <AdminArticlesItem />
          </AdminPage>
        }
      />
      <Route
        path="/"
        element={
          <Page>
            <Articles />
          </Page>
        }
        errorElement={<div>Not Found</div>}
      />
      <Route
        path="/article/:id"
        element={
          <Page>
            <ArticleItem />
          </Page>
        }
      />
      <Route
        path="/:categoryId"
        element={
          <Page>
            <Articles />
          </Page>
        }
      />
    </Routes>
  );
};

export default App;
