import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const DOMAIN = 'https://lemon-aid-backend.herokuapp.com/api'
export const __DEV__ = false;
export const CLIENT_ID = '681822890932-3usrm13q5ahmhnbjh94ebp6fdqloob6e.apps.googleusercontent.com'
export const COLOR = {
  primary: '#6A961F',
  deactiveGray: '#9B9B9B'
}

export const MODAL_TYPE = {
  NORMAL: 'NORMAL',
  CHOICE: 'CHOICE',
};

export function log(...arg) {
  if (__DEV__) {
    console.info(
      arg
        .map((i) =>
          ['string', 'number'].indexOf(typeof i) === -1 ? JSON.stringify(i, null, ' ') : i,
        )
        .join(' '),
    );
  }
}
