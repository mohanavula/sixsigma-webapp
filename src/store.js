import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { resolve } from 'core-js/fn/promise'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://sixsigma.api/api'

export default new Vuex.Store({
  state: {
    // reviewd
    user: JSON.parse(localStorage.getItem('user')) || null,
    regulations: JSON.parse(localStorage.getItem('regulations')) || [],
    departments: JSON.parse(localStorage.getItem('departments')) || [],
    instruction_scheme: JSON.parse(localStorage.getItem('instruction_scheme')) || [],

    // not yet reviwed
    subject_ratings: JSON.parse(localStorage.getItem('subject_ratings')) || [],
    syllabus: JSON.parse(localStorage.getItem('syllabus')) || [],
    academic_classes: JSON.parse(localStorage.getItem('academic_classes')) || [],
    exams: JSON.parse(localStorage.getItem('exams')) || [],
    instruction_scheme: JSON.parse(localStorage.getItem('instruction_scheme')) || [],
  },

  getters: {
    // reviewed
    fetchedRegulations: (state) => {
      return state.regulations.length > 0
    },

    fetchedDepartments: (state) => {
      return state.departments.length > 0
    },

    fetchedInstructionScheme: (state) => (regulation_id) => {
      return typeof state.instruction_scheme.find(is => is.regulation_id == regulation_id) == 'object'
    },

    program(state, regulation_id) {
      let r = state.regulations.find(r => r.id == regulation_id)
      if (r == undefined)
        return {}
      else
        return r.program
    },

    specializations(state, regulation_id) {
      let r = state.regulations.find(r => r.id == regulation_id)
      if (r == undefined)
        return {}
      else
        return r.program.specializations
    },

    semesters(state, regulation_id) {
      let r = state.regulations.find(r => r.id == regulation_id)
      if (r == undefined)
        return {}
      else
        return r.semesters
    },

    instruction_scheme(state, regulation_id) {
      let is = state.instruction_scheme.find(is => is.regulation_id == regulation_id)
      if (is == undefined) 
        return {}
        else
        return is.instruction_scheme
    },



    // not yet reviwed

    // fetchedInstructionScheme(semester_id) {
    //   return state.instruction_scheme.
    // },

    // fetchedSpecializations: (state) => (regulation_id) => {
    //   return state.regulations.find(r => r.id == regulation_id).hasOwnProperty("specializations")
    // },

    // fetchedSemesters: (state) => (regulation_id) => {
    //   return state.regulations.find(r => r.id == regulation_id).hasOwnProperty("semesters")
    // },

    fetchedAcademicClasses: (state) => {
      return state.academic_classes.length > 0
    },

    fetchedSubjectRatings: (state) => (subject_id) => {
      return state.subject_ratings.filter(sr => {
        return sr.subject_id == subject_id
      }).length > 0
    },

    fetchedSyllabus: (state) => (subject_id) => {
      return state.syllabus.find(s => s.id == subject_id) !== undefined
    },

    fetchedExams: (state) => {
      return state.exams.length > 0
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
    // reviwed
    setUser(state, user) {
      state.user = {
        name: user.name,
        email: user.email,
        role: user.role,
        token: user.token,
        provider: user.provider,
      }
    },

    destroyUser(state) {
      state.user = null
    },

    setRegulations(state, regulations) {
      state.regulations = Array.from(regulations)
      localStorage.removeItem('regulations')
      localStorage.setItem('regulations', JSON.stringify(state.regulations))
    },

    setDepartments(state, departments) {
      state.departments = Array.from(departments)
      localStorage.removeItem('departments')
      localStorage.setItem('departments', JSON.stringify(departments))
    },

    setInstructionScheme(state, payload) {
      let is = state.instruction_scheme.find(i => i.regulation_id == payload.regulation_id)
      if (typeof is == 'object') {
        is.instruction_scheme = {
          regulation_id: payload.regulation_id,
          instruction_scheme: Array.from(payload.scheme)
        }
      } else {
        state.instruction_scheme.push({
            regulation_id: payload.regulation_id,
            instruction_scheme: Array.from(payload.scheme)
          })
      }
      localStorage.removeItem('instruction_scheme')
      localStorage.setItem('instruction_scheme', JSON.stringify(state.instruction_scheme))
    },
    
    // not yet reviwed

    // setSpecializations(state, payload) {
    //   state.regulations.find(r => r.id == payload.regulation_id)['specializations'] = Array.from(payload.specializations)
    //   localStorage.setItem('regulations', JSON.stringify(state.regulations))
    // },

    // setSemesters(state, payload) {
    //   state.regulations.find(r => r.id == payload.regulation_id)['semesters'] = Array.from(payload.semesters)
    //   localStorage.setItem('regulations', JSON.stringify(state.regulations))
    // },
    
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

    setAcademicClasses(state, academic_classes) {
      state.academic_classes = Array.from(academic_classes)
      localStorage.removeItem(academic_classes)
      localStorage.setItem('academic_classes', JSON.stringify(state.academic_classes))
    },

    setExams(state, exams) {
      state.exams = Array.from(exams)
      localStorage.removeItem(exams)
      localStorage.setItem('exams', JSON.stringify(state.exams))
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
  },

  actions: {
    // reviewed
    
    async doFetchRegulations(context) {
      let response = await axios.get('/regulations')
      if (response.status == 200) {
        context.commit('setRegulations', response.data)
      } else {
        throw new Error(`Error fetching regulations data! Status code: ${response.status}`)
      }
    },

    async doFetchDepartments(context) {
      let response = await axios.get('/departments')
      if (response.status == 200) {
        context.commit('setDepartments', response.data)
      } else {
        throw new Error(`Error fetching departments data! Status code: ${response.status}`)
      }
    },

    async doFetchInstructionScheme(context, regulation_id) {
      let response = await axios.get(`/regulations/${regulation_id}/instruction_scheme`)
      if (response.status == 200) {
        context.commit('setInstructionScheme', { regulation_id: regulation_id, instruction_scheme: response.data })
      } else {
        throw new Error(`Error fetching instruction scheme data! Status code: ${response.status}`)
      }
    },

    // not yet reviwed

    async doFetchExams(context) {
      let response = await axios.get('/academics/exams')
      if (response.status == 200) {
        context.commit('setExams', response.data)
      } else {
        throw new Error(`Error fetching exams data! Status code: ${response.status}`)
      }
    },

    async doFetchAcademicClasses(context) {
      let response = await axios.get('/academics/classes')
      if (response.status == 200) {
        context.commit('setAcademicClasses', response.data)
      } else {
        throw new Error(`Error fetching academic classes! Status code: ${response.status}`)
      }
    },


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

    // doFetchSemesters(context, regulation_id) {
    //   return new Promise((resolve, reject) => {
    //     axios.get('/regulations/' + regulation_id + "/semesters")
    //       .then(response => {
    //         context.commit('setSemesters', { regulation_id: regulation_id, semesters: response.data })
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
