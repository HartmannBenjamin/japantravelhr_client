import bearer from '@websanova/vue-auth/drivers/auth/bearer'
import axios from '@websanova/vue-auth/drivers/http/axios.1.x'
import router from '@websanova/vue-auth/drivers/router/vue-router.2.x'

const config = {
    auth: bearer,
    http: axios,
    router: router,
    tokenDefaultName: 'token',
    tokenStore: ['localStorage'],
    rolesVar: 'role_id',
    registerData: {url: 'register', method: 'POST'},
    loginData: {url: 'login', method: 'POST', redirect: '/requests', fetchUser: true},
    logoutData: {url: 'logout', method: 'POST', redirect: '/login', makeRequest: true},
    fetchData: {url: 'me', method: 'GET', enable: true},
    refreshData: {url: 'refreshToken', method: 'GET', enabled: true, interval: 60}
}

export default config
