import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

// const APIENDPOINT = 'http://localhost:8000/api/'
// const APIENDPOINT = 'https://api-arene.menopi.ch/api/'
// const APIENDPOINT = 'https://o34z4ajegy.preview.infomaniak.website/api/'
const APIENDPOINT = 'https://api.menopi.ch/api/'

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        status: '',
        token: localStorage.getItem('token'),
        user: {},
        mobileBreakPoints: null
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        myUser: state => state.user,
        isMobile: state => state.mobileBreakPoints
    },
    mutations: {
        isMobileView(state) {
            state.mobileBreakPoints = true
        },
        isNotMobileView(state) {
            state.mobileBreakPoints = false
        },
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, {token, user}) {
            state.status = 'success'
            state.token = token
            state.user = user
        },
        auth_successRegister(state, {user}) {
            state.status = 'success'
            state.user = user
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = ''
            state.token = ''
            state.user = {}
        },
        r() {}
    },
    actions: {
        login({commit}, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({url: APIENDPOINT + 'login', data: user, method: 'POST'})
                    .then(resp => {
                        // const tmpUser = user
                        user.password = ''
                        const token = resp.data.token
                        localStorage.setItem('token', token)
                        this.dispatch('me', token)
                        // axios.defaults.headers.common.Authorization = token
                        commit('auth_success', {token, user})
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error')
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        },
        me({commit}, token) {
            return axios.request({
                url: APIENDPOINT + 'user',
                headers: {
                    Authorization: 'Bearer ' + token,
                    Accept: 'application/json'
                }
                // il faut mettre post sur du long terme pour recup la data return par lapi et non utilsé nos infos en local
                // method: 'POST'
            }).then((response) => {
                const user = response.data
                commit('auth_success', {token, user})
            }).catch(() => {
            })
        },
        register({commit}, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({url: APIENDPOINT + 'register', data: user, method: 'POST'})
                    .then(resp => {
                        this.dispatch('login', user)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error', err)
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        },
        logout({commit}) {
            return new Promise((resolve) => {
                commit('logout')
                localStorage.removeItem('token')
                delete axios.defaults.headers.common.Authorization
                resolve()
            })
        },
        addProduct({commit}, product) {
            console.log(product)
            commit('r')
            const _token = localStorage.getItem('token')
            return axios.request({
                url: APIENDPOINT + "products",
                method: "POST",
                headers: {
                    Authorization: 'Bearer ' + _token,
                    Accept: 'application/json'
                },
                data: product
            }).then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
        },
        updateProduct({commit}, product) {
            commit('r')
            const _token = localStorage.getItem('token')
            return axios.request({
                url: APIENDPOINT + "products/" + product.id,
                method: "PUT",
                headers: {
                    Authorization: 'Bearer ' + _token,
                    Accept: 'application/json'
                },
                data: product
            }).then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
        },
        deleteProduct({commit}, product) {
            commit('r')
            const _token = localStorage.getItem('token')
            return axios.request({
                url: APIENDPOINT + "products/" + product.id,
                method: "DELETE",
                headers: {
                    Authorization: 'Bearer ' + _token,
                    Accept: 'application/json'
                },
            }).then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
        },
        addEvent({commit}, event) {
            commit('r')
            const _token = localStorage.getItem('token')
            return axios.request({
                url: APIENDPOINT + "events",
                method: "POST",
                headers: {
                    Authorization: 'Bearer ' + _token,
                    Accept: 'application/json'
                },
                data: event
            }).then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
        },
        updateEvent({commit}, event) {
            commit('r')
            const _token = localStorage.getItem('token')
            return axios.request({
                url: APIENDPOINT + "events/" + event.id,
                method: "PUT",
                headers: {
                    Authorization: 'Bearer ' + _token,
                    Accept: 'application/json'
                },
                data: event
            }).then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
        },
        deleteEvent({commit}, event) {
            commit('r')
            const _token = localStorage.getItem('token')
            return axios.request({
                url: APIENDPOINT + "events/" + event.id,
                method: "DELETE",
                headers: {
                    Authorization: 'Bearer ' + _token,
                    Accept: 'application/json'
                },
            }).then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
        },
        getOrders({commit}) {
            commit('r')
            const _token = localStorage.getItem('token')
            const promise = axios.request({
                url: APIENDPOINT + "orders",
                method: "GET",
                headers: {
                    Authorization: 'Bearer ' + _token,
                    Accept: 'application/json'
                },
            })
            const dataPromise = promise.then((response) => response.data)
            return dataPromise
        },
        getOrder({commit}, idOrder) {
            commit('r')
            const _token = localStorage.getItem('token')
            const promise = axios.request({
                url: APIENDPOINT + "orders/" + idOrder,
                method: "GET",
                headers: {
                    Authorization: 'Bearer ' + _token,
                    Accept: 'application/json'
                },
            })
            const dataPromise = promise.then((response) => response.data)
            return dataPromise
        },
        deleteOrder({commit}, orders) {
            commit('r')
            const _token = localStorage.getItem('token')
            return axios.request({
                url: APIENDPOINT + "orders/" + orders.id,
                method: "DELETE",
                headers: {
                    Authorization: 'Bearer ' + _token,
                    Accept: 'application/json'
                },
            }).then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
        },
        updateOrder({commit}, order) {
            commit('r')
            const _token = localStorage.getItem('token')
            return axios.request({
                url: APIENDPOINT + "orders/" + order.id,
                method: "PUT",
                headers: {
                    Authorization: 'Bearer ' + _token,
                    Accept: 'application/json'
                },
                data: order
            }).then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
        }
    },
    modules: {}
})
