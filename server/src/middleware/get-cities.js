const store = require('../../store/sortedCountries.json');

const Middleware  = {
  firstBinarySearch(query, length) {
    let low = 0, high = length-1, result = -1;

    while (low<=high){
      let mid=Math.floor((low+high)/2);

      if (store[mid].name.toLowerCase().startsWith(query)) {
        result = mid;
        high = mid-1;
      } else if  (store[mid].name.toLowerCase() < query) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    return result;
  },

  lastBinarySearch (query, length) {
    let low = 0, high = length-1, result = -1;

    while (low<=high){
      let mid=Math.floor((low+high)/2);

      if (store[mid].name.toLowerCase().startsWith(query)) {
        result = mid;
        low = mid+1;
      } else if  (store[mid].name.toLowerCase() < query) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    return result;
  },

  getCities (query) {
    const length = store.length;
    const start = this.firstBinarySearch(query, length);
    if (start === -1) return [];
    const end = this.lastBinarySearch(query, length);
    if (end === -1) return [];
    return store.slice(start, Math.min(start+20, end+1) );
  }
};

module.exports = Middleware;