import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { GlobalModal, GlobalModalSetup } from 'components/GlobalModal'
import { persistor, store } from 'core/store'
import React from 'react'
import ReactDOM from 'react-dom'
import { IconContext } from 'react-icons'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { COLOR } from 'ultis/functions'
import App from './App'
import './index.css'
import * as serviceWorker from './serviceWorker'

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Cabin',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    button: {
      textTransform: 'none',
      fontSize: 16
    }
  },
  palette: {
    primary: {
      main: COLOR.primary
    },
    secondary: {
      main: '#FFFFFF'
    }
  }
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <IconContext.Provider
            value={{
              className: 'react-icon-clasname',
              style: { verticalAlign: 'middle' }
            }}
          >
            <App />
            <GlobalModal
              ref={ref => GlobalModalSetup.setGlobalModalHolder(ref)}
            />
          </IconContext.Provider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
