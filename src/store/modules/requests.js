import axios from "axios";

const state = () => ({
    requests: [],
    request: null
})

const getters = {
    requests: state => state.requests,
    request: state => state.request
}

const actions = {
    setRequest (store, requestId) {
        axios.get(`request/get/` + requestId)
            .then((response) => {
                store.commit('setRequest', response.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    },
    async setRequests (store) {
        try {
            const response = await axios.get(`request/all`)
            store.commit('setRequests', response.data.data)
        } catch (e) {
            console.log(e)
        }
    },
    setRequestsToNull (store) {
        store.commit('setRequests', [])
    },
    addRequest (store, request) {
        axios
            .post(`request/create`, request)
            .then((response) => {
                store.commit('addRequest', response.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    },
    editRequest: (store, { requestInfosUpdated, requestId }) => {
        axios.put(`request/edit/` + requestId, requestInfosUpdated)
            .then((response) => {
                store.commit('editRequest', response.data.data)
            })
            .catch((error) => {
                console.log(error)
            });
    },
    updateStatusRequest: (store ,{statusId, requestId}) => {
        axios.put(`request/changeStatus/` + requestId, {status_id: statusId})
            .then((response) => {
                store.commit('editRequest', response.data.data)
            })
            .catch((error) => {
                console.log(error)
            });
    },
    updateRequestToComplete: (store, requestId) => {
        axios.put(`request/complete/` + requestId)
            .then((response) => {
                store.commit('editRequest', response.data.data)
            })
            .catch((error) => {
                console.log(error)
            });
    }
}

const mutations = {
    setRequest (state, request) {
        state.request = request
    },
    setRequests (state, requests) {
        state.requests = requests
    },
    addRequest (state, request) {
        state.requests.push(request)
    },
    editRequest(state, request) {
        let stateId = state.requests.findIndex(row => row.id === request.id);

        state.requests[stateId].subject = request.subject;
        state.requests[stateId].description = request.description;
        state.requests[stateId].status = request.status;
        state.requests[stateId].logs = request.logs;
        state.requests[stateId].updated_at = request.updated_at;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}