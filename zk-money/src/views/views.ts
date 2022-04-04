import { AppAction, LoginMode } from '../app';

const views = [
  {
    path: '/',
    action: AppAction.NADA,
  },
  {
    path: '/signin',
    action: AppAction.LOGIN,
  },
  {
    path: '/signup',
    action: AppAction.LOGIN,
  },
  {
    path: '/dashboard',
    action: AppAction.ACCOUNT,
  },
  {
    path: '/earn',
    action: AppAction.ACCOUNT,
  },
  {
    path: '/send',
    action: AppAction.ACCOUNT,
  },
  {
    path: '/trade',
    action: AppAction.ACCOUNT,
  },
  {
    path: '/balance',
    action: AppAction.ACCOUNT,
  },
];

export const appPaths = views.map(p => p.path);

export const getActionFromUrl = (url: string) => views.find(v => v.path === url)?.action || AppAction.NADA;

export const getUrlFromAction = (action: AppAction) => views.find(v => v.action === action)!.path;

export const getLoginModeFromUrl = (url: string) => {
  switch (url) {
    case '/signup':
    case '/':
      return LoginMode.SIGNUP;
    default:
      return LoginMode.LOGIN;
  }
};

export const getUrlFromLoginMode = (mode: LoginMode) => {
  switch (mode) {
    case LoginMode.SIGNUP:
      return '/signup';
    default:
      return '/signin';
  }
};

export const getAccountUrl = () => '/balance';
