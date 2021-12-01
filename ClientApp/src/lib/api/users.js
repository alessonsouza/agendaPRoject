import api from './api'

const UsersAPI = {
  allUsers: async (values) => {
    let returnFromApi
    await api.post('/auth/all-users', values).then(res => {
      returnFromApi = res
    })
    return returnFromApi.data
  },
  saveUser: async (values) => {
    let returnFromApi
    await api.post('/auth/save-user', values).then(response => {
      returnFromApi = response
    })
    return returnFromApi
  },
  updateUser: async (values) => {
    let returnFromApi
    await api.post('/auth/update-user', values).then(response => {
      returnFromApi = response
    })
    return returnFromApi
  }
}

export default UsersAPI
