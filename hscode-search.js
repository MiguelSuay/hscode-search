const data = require('./hscode-data.json');
const Fuse = require('fuse.js');

const options = {
  includeScore: true,
  keys: ['Description']
};

class HSCodeSearch {
  constructor(delay = 500) {
    this.data = data;
    this.delay = delay;
    this.timeout = null;
    this.fuse = new Fuse(data, options);
  }

  search(query, callback) {
    // Clear existing timeouts (if any)
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      let results = [];
      
      if (!isNaN(query)) { // If it's a number
        results = this.data.filter(item => item.HSCODE.startsWith(query));
        
        if (results.length < 5) {
          const additionalResults = this.data.filter(item => item.HSCODE.includes(query) && !results.includes(item));
          results = results.concat(additionalResults).slice(0, 10);
        }
      } else { 
        results = this.fuse.search(query).map(res => res.item).slice(0, 10);
      }
      
      callback(results);
    }, this.delay);
  }
}

module.exports = HSCodeSearch;
