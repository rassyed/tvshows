import Vue from 'vue';
import Vuex from 'vuex';
import AppServices from '@/services/AppServices';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseUrl: '',
    itemInfo: {}
  },
  mutations: {
    LOAD_CONF: (state, baseUrl) => {
      state.baseUrl = baseUrl;
    },
    RESET_ITEM: state => {
      Vue.set(state, 'itemInfo', {});
    },
    LOAD_ITEM: (state, { type, info, cast }) => {
      const itemInfo = {
        type,
        title: type == 'movie' ? info.title : info.name,
        year: type == 'movie' ? info.release_date : info.first_air_date,
        overview: info.overview,
        homepage: info.homepage,
        genres: info.genres,
        poster_path: info.poster_path,
        backdrop_path: info.backdrop_path,
        vote_average: info.vote_average,
        cast: cast
          .map(item => item.name)
          .slice(0, 6)
          .join(', ')
      };
      Vue.set(state, 'itemInfo', itemInfo);
    }
  },

  actions: {
    getInitialData: async ({ commit }) => {
      const response = await AppServices.getTvShowsOnAir();
    },
    getItem: async ({ commit }, { id, type }) => {
      commit('RESET_ITEM');
      const [response, responseCast] = await Promise.all([
        AppServices.getItemInfo(id, type),
        AppServices.getCast(id, type)
      ]);

      commit('LOAD_ITEM', {
        type,
        info: response.data,
        cast: responseCast.data.cast
      });
    }
  }
});
