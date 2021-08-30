const state = () => ({
  image_url: '',
  name: '',
});

const getters = {
  name: (state) => state.name,
  image_url: (state) => state.image_url,
};

const actions = {
  setUserName(store, name) {
    store.commit('setUserName', name);
  },

  setUserImageUrl(store, imageUrl) {
    store.commit('setUserImageUrl', imageUrl);
  },
};

const mutations = {
  setUserName(state, name) {
    if (name) {
      state.name = name;
    }
  },

  setUserImageUrl(state, imageUrl) {
    if (imageUrl) {
      state.image_url = imageUrl;
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
