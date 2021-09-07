import axios from 'axios';
import notifications from '@/config/Notifications';
import {sendErrorNotification, sendNotification} from '@/services/NotificationService';

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
          if (response.data.success) {
            store.commit('setRequest', response.data.data);
          } else {
            sendErrorNotification(response.data.message);
          }
        })
        .catch(sendErrorNotification);
  },

  async setRequests(store) {
    axios
        .get('request/all')
        .then((response) => {
          if (response.data.success) {
            store.commit('setRequests', response.data.data);
          } else {
            sendErrorNotification(response.data.message);
          }
        })
        .catch(sendErrorNotification);
  },

  setRequestsToNull(store) {
    store.commit('setRequests', []);
  },

  addRequest(store, request) {
    axios
        .post('request/create', request)
        .then((response) => {
          if (response.data.success) {
            store.commit('addRequest', response.data.data);

            sendNotification(notifications.requestCreated);
          } else {
            sendErrorNotification(response.data.message);
          }
        })
        .catch(sendErrorNotification);
  },

  editRequest: (store, {requestInfosUpdated, requestId, fromRequestPage}) => {
    axios
        .put('request/edit/' + requestId, requestInfosUpdated)
        .then((response) => {
          if (response.data.success) {
            if (fromRequestPage) {
              store.commit('editRequestSolo', response.data.data);
            } else {
              store.commit('editRequest', response.data.data);
            }

            sendNotification(notifications.requestUpdated);
          } else {
            sendErrorNotification(response.data.message);
          }
        })
        .catch(sendErrorNotification);
  },

  updateStatusRequest: (store, {status, requestId, fromRequestPage}) => {
    axios
        .put('request/changeStatus/' + requestId, {status_id: status.id})
        .then((response) => {
          if (response.data.success) {
            if (fromRequestPage) {
              store.commit('editRequestSolo', response.data.data);
            } else {
              store.commit('editRequest', response.data.data);
            }

            sendNotification(notifications.requestChangeStatus + status.name);
          } else {
            sendErrorNotification(response.data.message);
          }
        })
        .catch(sendErrorNotification);
  },

  updateRequestToComplete: (store, {requestId, fromRequestPage}) => {
    axios
        .put('request/complete/' + requestId)
        .then((response) => {
          if (response.data.success) {
            if (fromRequestPage) {
              store.commit('editRequestSolo', response.data.data);
            } else {
              store.commit('editRequest', response.data.data);
            }

            sendNotification(notifications.requestCompleted);
          } else {
            sendErrorNotification(response.data.message);
          }
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
