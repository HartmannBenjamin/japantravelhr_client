import axios from 'axios';
import notifications from '@/config/Notifications';
import {sendErrorNotification} from '@/services/NotificationService';
import Vue from 'vue';

const state = () => ({
  requests: [],
  request: null,
});

const getters = {
  requests: (state) => state.requests,
  request: (state) => state.request,
};

const actions = {
  setRequest(store, requestId) {
    axios
        .get('request/get/' + requestId)
        .then((response) => {
          store.commit('setRequest', response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
  },
  async setRequests(store) {
    try {
      const response = await axios.get('request/all');
      store.commit('setRequests', response.data.data);
    } catch (e) {
      console.log(e);
    }
  },
  setRequestsToNull(store) {
    store.commit('setRequests', []);
  },
  addRequest(store, request) {
    axios
        .post('request/create', request)
        .then((response) => {
          store.commit('addRequest', response.data.data);

          Vue.prototype.$toasted.show(notifications.requestCreated, {
            icon: {
              name: 'done_outline',
              after: true,
            },
            theme: 'outline',
            position: 'bottom-right',
            duration: 2000,
          });
        })
        .catch(sendErrorNotification);
  },
  editRequest: (store, {requestInfosUpdated, requestId, fromRequestPage}) => {
    axios
        .put('request/edit/' + requestId, requestInfosUpdated)
        .then((response) => {
          if (fromRequestPage) {
            store.commit('editRequestSolo', response.data.data);
          } else {
            store.commit('editRequest', response.data.data);
          }

          Vue.prototype.$toasted.show(notifications.requestUpdated, {
            icon: {
              name: 'done_outline',
              after: true,
            },
            theme: 'outline',
            position: 'bottom-right',
            duration: 2000,
          });
        })
        .catch(sendErrorNotification);
  },
  updateStatusRequest: (store, {status, requestId, fromRequestPage}) => {
    axios
        .put('request/changeStatus/' + requestId, {status_id: status.id})
        .then((response) => {
          if (fromRequestPage) {
            store.commit('editRequestSolo', response.data.data);
          } else {
            store.commit('editRequest', response.data.data);
          }

          Vue.prototype.$toasted.show(
              notifications.requestChangeStatus + status.name,
              {
                icon: {
                  name: 'done_outline',
                  after: true,
                },
                theme: 'outline',
                position: 'bottom-right',
                duration: 2000,
              },
          );
        })
        .catch(sendErrorNotification);
  },
  updateRequestToComplete: (store, {requestId, fromRequestPage}) => {
    axios
        .put('request/complete/' + requestId)
        .then((response) => {
          if (fromRequestPage) {
            store.commit('editRequestSolo', response.data.data);
          } else {
            store.commit('editRequest', response.data.data);
          }

          Vue.prototype.$toasted.show(notifications.requestCompleted, {
            icon: {
              name: 'done_outline',
              after: true,
            },
            theme: 'outline',
            position: 'bottom-right',
            duration: 2000,
          });
        })
        .catch(sendErrorNotification);
  },
};

const mutations = {
  setRequest(state, request) {
    state.request = request;
  },
  setRequests(state, requests) {
    state.requests = requests;
  },
  addRequest(state, request) {
    state.requests.push(request);
  },
  editRequest(state, request) {
    const stateId = state.requests.findIndex((row) => row.id === request.id);

    state.requests[stateId].subject = request.subject;
    state.requests[stateId].description = request.description;
    state.requests[stateId].status = request.status;
    state.requests[stateId].logs = request.logs;
    state.requests[stateId].updated_at = request.updated_at;
  },
  editRequestSolo(state, request) {
    state.request = request;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
