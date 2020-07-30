import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "core/store";
import { Provider } from "react-redux";
import { IconContext } from "react-icons";
import * as serviceWorker from "./serviceWorker";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { GlobalModal, GlobalModalSetup } from "components/GlobalModal";
import { COLOR } from 'ultis/functions'

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
    ].join(',')
  },
  palette: {
    primary: {
      main: COLOR.primary
    }
  }
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <IconContext.Provider
          value={{
            className: 'react-icon-clasname',
            style: { verticalAlign: 'middle' }
          }}
        >
          <App />
          <GlobalModal
            ref={(ref) => GlobalModalSetup.setGlobalModalHolder(ref)}
          />
        </IconContext.Provider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
