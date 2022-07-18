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
  getTvShowsOnAir(page) {
    let current_date = new Date();
    current_date = formatDate(current_date)
    const url = `schedule?country=${country}&date=${current_date}`;
    return API.get(url);    
  }
};

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}