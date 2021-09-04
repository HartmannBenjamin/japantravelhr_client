import Vue from 'vue';

/**
 * @param {String} msg
 */
function sendNotification(msg) {
  Vue.prototype.$toasted.show(msg, {
    icon: {
      name: 'done_outline',
      after: true,
    },
    theme: 'outline',
    position: 'bottom-right',
    duration: 2000,
  });
}

/**
 * @param {String} error
 */
function sendErrorNotification(error) {
  Vue.prototype.$toasted.show(error, {
    icon: {
      name: 'error',
      after: true,
    },
    theme: 'bubble',
    position: 'bottom-right',
    duration: 2000,
  });
}

export {sendNotification, sendErrorNotification};
