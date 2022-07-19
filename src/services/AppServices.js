import { API } from '@/services/api';

const country = 'US';

export default {
  search(query, page) {
    const url = `search/shows?q=${query}&page=${page}`;
    return API.get(url);
  },
  getItemInfo(id, type) {
    const url = `${type}/${id}`;
    return API.get(url);
  },
  getCast(id) {
    const url = `shows/${id}/cast`;
    return API.get(url);
  },
  getTvShowsOnAir() {
    let current_date = new Date();
    current_date = formatDate(current_date)
    const url = `schedule?country=${country}&date=${current_date}`;
    return API.get(url);    
  },
  getShows(page) {
    const url = `shows?page=${page}`;
    return API.get(url);    
  },
  getSeasons(id) {
    const url = `shows/${id}/seasons`;
    return API.get(url);
  },
  getEpisodes(id) {
    const url = `shows/${id}/episodes`;
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