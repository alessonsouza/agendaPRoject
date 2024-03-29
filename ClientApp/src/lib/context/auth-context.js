/* eslint-disable no-use-before-define */
import React, { createContext, useState } from 'react'

// const initicalState = {
//   username: '',
//   name: '',
//   groups: []
// }

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [dadosUser, setDadosUser] = useState(null)

  return (
    <AuthContext.Provider value={{ dadosUser, setDadosUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
