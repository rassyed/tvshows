import Vue from 'vue';
import Vuex from 'vuex';
import AppServices from '@/services/AppServices';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseUrl: '',
    itemInfo: {},
    genres: [
      'Action',
      'Adventure',
      'Animation',
      'Anime',
      'Biography',
      'Children',
      'Comedy',
      'Crime',
      'Documentary',
      'Drama',
      'Family',
      'Fantasy',
      'Food',
      'History',
      'Horror',
      'Music',
      'Mystery',
      'Romance',
      'Science-Fiction',
      'Sport',
      'Thriller',
      'War',
      'Western'
    ],
    selectedGenre: null
  },
  getters: {
    genres: state => {
      return state.genres
    },
    selectedGenre: state => {
      return state.selectedGenre
    }
  },
  mutations: {
    LOAD_CONF: (state, baseUrl) => {
      state.baseUrl = baseUrl;
    },
    RESET_ITEM: state => {
      Vue.set(state, 'itemInfo', {});
    },
    LOAD_ITEM: (state, {info, cast, seasons, episodes}) => {
      const itemInfo = info;
      let castDetails = '';
      cast.forEach(element => {
        if (castDetails !== '') {
          castDetails = castDetails + ', ' + element.person.name
        } else {
          castDetails = element.person.name
        }
      });
      itemInfo.cast = castDetails;
      itemInfo.seasons = seasons;
      itemInfo.episodes = episodes
      Vue.set(state, 'itemInfo', itemInfo);
    },
    setGenre: (state, selectedGenre) => {
      state.selectedGenre = selectedGenre
    }
  },

  actions: {
    getInitialData: async ({ commit }) => {
      await AppServices.getTvShowsOnAir();
    },
    getItem: async ({ commit }, item) => {
      commit('RESET_ITEM');
      const itemId = item && item.show ? item.show.id : item.id
      const [ responseCast, responseSeasons, responseEpisodes ] = await Promise.all([
        AppServices.getCast(itemId),
        AppServices.getSeasons(itemId),
        AppServices.getEpisodes(itemId),
      ]);
      commit('LOAD_ITEM', {
        info: item,
        cast: responseCast.data,
        seasons: responseSeasons.data.length,
        episodes: responseEpisodes.data.length
      });
    }
  }
});
