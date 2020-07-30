import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const DOMAIN = 'https://lemon-aid-backend.herokuapp.com/api'
export const __DEV__ = false;
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
