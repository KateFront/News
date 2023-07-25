import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import { TAuthContext } from './types';
import { FirebaseApp } from 'firebase/app';
import {
  getAuth,
  User,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  signOut,
  ProviderId,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

const authContext = createContext<TAuthContext>({
  isAuthenticate: null,
  user: null,
  loginWithEmailAndPassword: () => Promise.reject(''),
  logOut: () => void 0,
  logInWithOauthPopup: () => Promise.reject(''),
});

export const useAuthContext = (): TAuthContext => {
  return useContext<TAuthContext>(authContext);
};

type TProps = {
  firebaseApp: FirebaseApp;
  children: React.ReactNode;
};

export const ALLOWED_OAUTH_PROVIDERS: Record<string, any> = {
  [ProviderId.GOOGLE]: new GoogleAuthProvider(),
  [ProviderId.GITHUB]: new GithubAuthProvider(),
};

const isUserAdmin = async (firebaseApp: FirebaseApp) => {
  const db = getFirestore(firebaseApp);
  return await getDoc(doc(db, '/internal/auth'));
};

const AuthContextProvider: FC<TProps> = ({ children, firebaseApp }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<TAuthContext['isAuthenticate']>(null);
  const [user, setUser] = useState<User | null>(null);
  const [auth] = useState(getAuth(firebaseApp));

  const loginWithEmailAndPassword = (email: string, password: string) => {
    setUser(null);
    setIsAuthenticated(null);
    return signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.log('login error', error);
        throw error;
      });
  };

  useEffect(() => {
    if (!auth) {
      return;
    }
    auth.setPersistence(browserLocalPersistence);
    auth.languageCode = 'ru';

    auth.onAuthStateChanged((user) => {
      // console.log('auth changed', user);
      if (user) {
        isUserAdmin(firebaseApp)
          .then(() => {
            setUser(user);
            setIsAuthenticated(true);
          })
          .catch((e) => {
            // eslint-disable-next-line no-console
            console.error(e);
            setUser(null);
            setIsAuthenticated(false);
            signOut(auth);
          });
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });
  }, [auth]);

  const logOut = () => signOut(auth);

  const logInWithPopup = (provider: string) => {
    setUser(null);
    setIsAuthenticated(null);
    return signInWithPopup(auth, ALLOWED_OAUTH_PROVIDERS[provider])
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.log('login error', error);
        throw error;
      });
  };

  return (
    <authContext.Provider
      value={{
        isAuthenticate: isAuthenticated,
        user,
        loginWithEmailAndPassword,
        logOut,
        logInWithOauthPopup: logInWithPopup,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
