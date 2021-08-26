import Vue from 'vue';

function isUser() {
    return Vue.prototype.$auth.user().role.name === 'User'
}

function isHR() {
    return Vue.prototype.$auth.user().role.name === 'HR'
}

function isManager() {
    return Vue.prototype.$auth.user().role.name === 'Manager'
}

export { isUser, isHR, isManager }
