import Vue from 'vue';

/**
 * @return {boolean}
 */
function isUser() {
  return Vue.prototype.$auth.user().role.name === 'User';
}

/**
 * @return {boolean}
 */
function isHR() {
  return Vue.prototype.$auth.user().role.name === 'HR';
}

/**
 * @return {boolean}
 */
function isManager() {
  return Vue.prototype.$auth.user().role.name === 'Manager';
}

export {isUser, isHR, isManager};
