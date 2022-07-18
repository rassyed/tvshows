import { API, key } from '@/services/api';

const country = 'US';
const include_adult = 'false';

export default {
  search(query, page) {
    const url = `search/multi?api_key=${key}&language=${language}&query=${query}&page=${page}&include_adult=${include_adult}`;
    return API.get(url);
  },
  getItemInfo(id, type) {
    const url = `${type}/${id}?api_key=${key}&language=${language}`;
    return API.get(url);
  },
  getCast(id, type) {
    const url = `${type}/${id}/credits?api_key=${key}&language=${language}`;
    return API.get(url);
  },
  getTvShowsOnAir(page){
    const url = `schedule?country=${country}&date=2022-07-18`;
    return API.get(url);    
  }
};
