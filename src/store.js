import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { resolve } from 'core-js/fn/promise'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://sixsigma.api/api'

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    regulations: JSON.parse(localStorage.getItem('regulations')) || [],
    departments: JSON.parse(localStorage.getItem('departments')) || [],
    subject_ratings: JSON.parse(localStorage.getItem('subject_ratings')) || [],
    syllabus: JSON.parse(localStorage.getItem('syllabus')) || [],
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

    fetchedSubjectRatings: (state) => (subject_id) => {
      return state.subject_ratings.filter(sr => {
        return sr.subject_id == subject_id
      }).length > 0
    },

    fetchedSyllabus: (state) => (subject_id) => {
      return state.syllabus.find(s => s.id == subject_id) !== undefined
    },

    getSyllabus: (state) => (subject_id) => {
      let obj = state.syllabus.find(s => s.id == subject_id)
      if (obj !== undefined) {
        return obj.syllabus
      }
      else {
        return '<h3>Not found</h3>'
      }

    },

    getSubjectRatings: (state) => (subject_id) => {
      let item = state.subject_ratings.filter(sr => {
        return sr.subject_id == subject_id
      })
      if (item.length > 0) {
        return item[0].data
      } else {
        return []
      }
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
    
    setSubjectRatings(state, payload) {
      // state.subject_ratings['sr' + payload.subject_id] = JSON.parse(JSON.stringify(payload.data))
      state.subject_ratings.push({
        subject_id: payload.subject_id,
        data: JSON.parse(JSON.stringify(payload.data))
      })
      // console.log(state.subject_ratings)
      localStorage.removeItem('subject_ratings')
      localStorage.setItem('subject_ratings', JSON.stringify(state.subject_ratings))
    },
    
    appendSyllabus(state, payload) {
      state.syllabus.push({
        id: payload.id,
        syllabus: payload.syllabus
      })
      localStorage.removeItem('syllabus')
      localStorage.setItem('syllabus', JSON.stringify(state.syllabus))
    },

    appendSubjectRating(state, rating) {
      let item = state.subject_ratings.filter(sr => {
        return sr.subject_id == rating.subject_id
      })
      if (item) {
        item[0].data.ratings.push(JSON.parse(JSON.stringify(rating)))
        localStorage.removeItem('subject_ratings')
        localStorage.setItem('subject_ratings', JSON.stringify(state.subject_ratings))
      }
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

    async doFetchSyllabus(context, subject_id) {
      let response = await axios.get(`/subjects/${subject_id}/syllabus`)
      if (response.status == 200) {
        context.commit('appendSyllabus', {
          id: subject_id,
          syllabus: response.data
        })
      } else {
        throw new Error(`Error fetching syllabus with subject id= ${subject_id}! Status code: ${response.status}`)
      }
    },

    async doFetchSubjectRatings(context, subject_id) {
      let response = await axios.get(`/subjects/${subject_id}/ratings`)
      if (response.status == 200) {
        context.commit('setSubjectRatings', {
          subject_id: subject_id,
          data: response.data
        })
      } else {
        throw new Error(`Error fetching ratings for subject with id: ${subject_id}! Status code: ${response.status}`)
      }
    },

    // doFetchSubjectRatings(context, subject_id) {
    //   return new Promise((resolve, reject) => {
    //     axios.get('/subjects/' + subject_id + '/ratings')
    //       .then(response => {
    //         context.commit('setSubjectRatings', {
    //           subject_id: subject_id,
    //           data: response.data
    //         })
    //         resolve(response)
    //       })
    //       .catch(error => {
    //         if (error.response) {
    //           reject(error.response.data.message)
    //         } else {
    //           reject(error.message)
    //         }
    //       })
    //   })
    // }, 

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

    doAddRating(context, rating) {
      return new Promise((resolve, reject) => {
        axios.post('/subjects/' + rating.subject_id + '/ratings', {
          author_email: rating.author_email,
          stars: rating.stars,
          comment: rating.comment
        })
        .then(response => {
          context.commit('appendSubjectRating', response.data)
          resolve(response)
        })
        .catch(error => {
          if (error.response) {
            reject(error.response.data)
          } else {
            reject(error.message)
          }
        })
      }
    )},


  } // end of actions
})
