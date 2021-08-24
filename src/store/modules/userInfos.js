const state = () => ({
    image_url: '',
    name: ''
})

const getters = {
    name: state => state.name,
    image_url: state => state.image_url
}

const actions = {
    setUserName (store, name) {
        store.commit('setUserName', name)
    },

    setUserImageUrl (store, image_url) {
        store.commit('setUserImageUrl', image_url)
    },
}

const mutations = {
    setUserName (state, name) {
        if (name) {
            state.name = name
        }
    },

    setUserImageUrl (state, image_url) {
        if (image_url) {
            state.image_url = image_url
        }
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
