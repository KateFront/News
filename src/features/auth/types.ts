import { User, UserCredential } from 'firebase/auth';

export type TLoginWithEmailAndPasswordResult = UserCredential;

export type TAuthContext = {
  isAuthenticate: boolean | null;
  user?: User | null;
  loginWithEmailAndPassword: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => void;
  logInWithOauthPopup: (provider: string) => Promise<TLoginWithEmailAndPasswordResult>;
};
