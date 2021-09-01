import Vue from 'vue';

/**
 * @param {String} error
 */
function sendErrorNotification(error) {
  console.log(error);

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

export {sendErrorNotification};
