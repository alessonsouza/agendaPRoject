// eslint-disable-next-line no-use-before-define
import React, { useContext } from 'react'

import { Route, Redirect } from 'react-router-dom'
import { LoaderContext } from '../../../lib/context/loader-context'
import TokenAPI from '../../../lib/api/token'

const PrivateRoute = ({ component: Component, ...props }) => {
  const { estaAutenticado } = useContext(LoaderContext)
  const storage = TokenAPI.getToken()

  return (
    <Route
      {...props}
      render={(innerProps) =>
        estaAutenticado || storage?.token
          ? (
          <div>
            <Component {...innerProps} />
          </div>
            )
          : (
          <Redirect to="/login" />
            )
      }
    />
  )
}

export default PrivateRoute
