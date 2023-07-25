import React, { FC, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Articles from '../Articles/Articles';
import { ArticleItem } from '../ArticleItem/ArticleItem';
import Page from '../Page/Page';
import AdminArticles from '../AdminArticles/AdminArticles';
import AdminArticlesItem from '../AdminArticlesItem/AdminArticlesItem';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import AdminPage from '../AdminPage/AdminPage';
import LoginContainer from '../../features/auth/login/LoginContainer';

const App: FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route
        path={'/login'}
        element={
          <Page>
            <LoginContainer />
          </Page>
        }
      />
      <Route path={'/'} element={<PrivateRoute />}>
        {/*specify public routes here*/}
        <Route
          path={'/admin'}
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
      </Route>
      {/*specify public routes here*/}
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
