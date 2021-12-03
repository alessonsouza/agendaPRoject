/* eslint-disable import/no-cycle */
// eslint-disable-next-line no-use-before-define
import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'

import { ThemeProvider, createTheme } from '@material-ui/core'
import useMediaQuery from '@mui/material/useMediaQuery'

import parser from 'ua-parser-js'
import mediaQuery from 'css-mediaquery'
import PrivateRoute from './components/routes/private-route'
import DefaultRoute from './components/routes/public-route'
import FreeRoute from './components/routes/free-route'
import Loader from './components/loader'
import Home from './components/home'
import Todos from './components/todosEventos'
import Info from './components/saibaMais'
// eslint-disable-next-line import/no-cycle
import Layout from './components/Layout'
import EventList from './components/events-list'
import UserList from './components/user-list'
// import TermosAceitos from './pages/reports/termos-aceitos'
// import ConsumosAceitos from './pages/reports/consumos-aceitos'
import Login from './components/layout/login'

// const TermosAceitos = lazy(() => import('./pages/reports/termos-aceitos'));

const Rotas = (props) => {
  const darkMode = false
  const matches = useMediaQuery('(min-width:600px)')

  const ssrMatchMedia = (query) => ({
    matches: mediaQuery.match(query, {
      // The estimated CSS width of the browser.
      width: 800
    })
  })
  const theme = createTheme({
    spacing: 8,

    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#f44336'
      },
      secondary: {
        main: '#3EA6FF'
      },
      background: {
        default: darkMode ? '#232323' : '#FFF',
        dark: darkMode ? '#181818' : '#006690',
        paper: darkMode ? '#232323' : '#FFF'
      },
      backgroundImage: 'linear-gradient(45deg, #006600 30%, #FF8E53 96%)',
      MuiUseMediaQuery: {
        // Change the default options of useMediaQuery
        defaultProps: { ssrMatchMedia }
      }
    }
  })
  return (
    <Suspense
      fallback={
        <div>
          <Loader loading />
        </div>
      }>
      {/* <Switch> */}
      <Switch>
        <DefaultRoute exact path="/login" component={Login} />
        <ThemeProvider theme={theme}>
          <Layout>
            {/* <Route path="/" exact component={Home} />
          <Route path="/events-list" component={FetchData} /> */}
            <FreeRoute exact path="/" component={() => <Home />} />
            <FreeRoute exact path="/todos" component={() => <Todos />} />
            <FreeRoute exact path="/info" component={() => <Info />} />
            <PrivateRoute path="/events-list" component={() => <EventList />} />
            <PrivateRoute path="/user-list" component={() => <UserList />} />
          </Layout>
        </ThemeProvider>
        <Route path="*" component={() => <h1>Page not found</h1>} />
      </Switch>
      {/* <PrivateRoute path="/restrito" component={PaginaRestrita} /> */}

      {/* <PrivateRoute path="/" component={() => <Home />} /> */}
      {/* </Switch> */}
    </Suspense>
  )
}
export default Rotas
