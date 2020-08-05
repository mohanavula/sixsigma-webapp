import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://sixsigma.api/api'

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    regulations: JSON.parse(localStorage.getItem('regulations')) || [],
    departments: JSON.parse(localStorage.getItem('departments')) || [],
    
  },

  getters: {
    fetchedRegulations: (state) => {
      return state.regulations.length > 0
    },

    fetchedSpecializations: (state) => (regulation_id) => {
      return state.regulations.find(r => r.id == regulation_id).hasOwnProperty("specializations")
    },

    fetchedScheme: (state) => (regulation_id) => {
      return state.regulations.find(r => r.id == regulation_id).hasOwnProperty("scheme")
    },

    fetchedSemesters: (state) => (regulation_id) => {
      return state.regulations.find(r => r.id == regulation_id).hasOwnProperty("semesters")
    },

    fetchedDepartments: (state) => {
      return state.departments.length > 0
    },

    signedIn: (state) => {
      return state.user !== null
    },

  }, 

  mutations: {
    destroyUser(state) {
      state.user = null
    },

    setDepartments(state, departments) {
      state.departments = Array.from(departments)
      localStorage.setItem('departments', JSON.stringify(departments))
    },

    setRegulations(state, regulations) {
      state.regulations = Array.from(regulations)
      localStorage.setItem('regulations', JSON.stringify(state.regulations))
    },

    setSpecializations(state, payload) {
      state.regulations.find(r => r.id == payload.regulation_id)['specializations'] = Array.from(payload.specializations)
      localStorage.setItem('regulations', JSON.stringify(state.regulations))
    },

    setScheme(state, payload) {
      state.regulations.find(r => r.id == payload.regulation_id)['scheme'] = Array.from(payload.scheme)
      localStorage.setItem('regulations', JSON.stringify(state.regulations))
    },

    setSemesters(state, payload) {
      state.regulations.find(r => r.id == payload.regulation_id)['semesters'] = Array.from(payload.semesters)
      localStorage.setItem('regulations', JSON.stringify(state.regulations))
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
    doFetchDepartments(context) {
      return new Promise((resolve, reject) => {
        axios.get('/departments')
          .then(response => {
            context.commit('setDepartments', response.data)
            resolve(response)
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

    doFetchSemesters(context, regulation_id) {
      return new Promise((resolve, reject) => {
        axios.get('/regulations/' + regulation_id + "/semesters")
          .then(response => {
            context.commit('setSemesters', { regulation_id: regulation_id, semesters: response.data })
            resolve(response)
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

    doFetchScheme(context, regulation_id) {
      return new Promise((resolve, reject) => {
        axios.get('/regulations/' + regulation_id + "/scheme")
          .then(response => {
            context.commit('setScheme', { regulation_id: regulation_id, scheme: response.data })
            resolve(response)
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

    doFetchSpecializations(context, regulation_id) {
      return new Promise((resolve, reject) => {
        axios.get('/regulations/' + regulation_id + "/specializations")
          .then(response => {
            context.commit('setSpecializations', { regulation_id: regulation_id, specializations: response.data })
            resolve(response)
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

    doFetchRegulations(context) {
      return new Promise((resolve, reject) => {
        axios.get('/regulations')
          .then(response => {
            context.commit('setRegulations', response.data)
            resolve(response)
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
