import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://sixsigma.api/api'

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    subject: {
      code: "1821101",
      short_name: "M1",
      name: "Mathematics-1",
      department: "CED",

    }
    
  },

  getters: {
    signedIn(state) {
      return state.user !== null
    },

    user(state) {
      return state.user
    },

    getSubject(state) {
      return state.subject
    },

  }, 

  mutations: {
    destroyUser(state) {
      state.user = null
    },

    setUser(state, user) {
      state.user = {
        name: user.name,
        email: user.email,
        role: user.role,
        token: user.token,
        provider: user.provider,
      }
    },
  },

  actions: {
    doRegisterDomainUser(context, user) {
      return new Promise((resolve, reject) => {
        axios.post('/register', {
          name: user.name,
          email: user.email,
          password: user.password,
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    doDomainSignout(context) {
      if (!context.getters.signedIn) return
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.user.token
      return new Promise((resolve, reject) => {
        axios.post('/logout')
          .then(response => {
            context.commit('destroyUser')
            localStorage.removeItem('user')
            resolve(response)
          })
          .catch(error => {
            context.commit('destroyUser')
            localStorage.removeItem('user')
            reject(error)
          })
      })
    },

    doDomainSignin(context, credentials) {
      let user = {}
      let token = null
      return new Promise((resolve, reject) => {
        axios.post('/login', {
          username: credentials.username,
          password: credentials.password,
        })
          .then(response => {
            token = response.data.access_token
            axios.get('/user', {
              headers: {
                Authorization: 'Bearer ' + token
              }
            })
            .then(res => {
              user = {
                name: res.data.name,
                email: res.data.email,
                role: 'admin',
                token: token,
                provider: 'domain'
              }
              context.commit('setUser', user)
              localStorage.setItem('user', JSON.stringify(user))
              resolve(response)
            })
            .catch(err => {
              console.log(err.message)
            })
          })
          .catch(error => {
            if (error.response) {
              reject(error.response.data.message)
            } else {
              reject(error.message)
            }
          })
        })
    },
  }
})
