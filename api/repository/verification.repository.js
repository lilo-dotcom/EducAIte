const { connect } = require('../config/db.config');
const logger = require('../logger/logger');
const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch("b5249c820416a8951ec62abf397c94ecfefb7a6d620720d15b5afba2406a61ce");
const { getJson } = require("serpapi");

class VerificationRepository {

  db = {};
  constructor() {
    this.db = connect();
    this.db.sequelize.sync({ force: false }).then(() => {
      console.log("Drop and re-sync db.");
    });
  }

  async searchGoogleScholar(query) {
    try {
      const params = {
        engine: "google_scholar",
        q: query
      };

      let searchResults = await this.performSearch(params);

      console.log(searchResults);
      return searchResults; 
      
    } catch (err) {
      logger.error('Error::' + err);
      return [];
    }
  }

  async citeGoogleScholar(cite) {
    try {
      return getJson({
        engine: "google_scholar_cite",
        q: cite,
        api_key: "b5249c820416a8951ec62abf397c94ecfefb7a6d620720d15b5afba2406a61ce",
      }, (json) => {
        console.log(json["citations"]);
      });
      
    } catch (err) {
      logger.error('Error::' + err);
      return [];
    }
  }

  async getHTMLContent(url) {
    try {
      const fetch = (await import('node-fetch')).default;

      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      const response = await fetch(decodeURIComponent(url), requestOptions);
  
      const html = await response.text();
  
      console.log(html);
  
      return html;
    } catch (err) {
      console.error('Error::' + err);
      return '';
    }
  }

  performSearch(params) {
    return new Promise((resolve, reject) => {
      const callback = function(data) {
        if (data && data["organic_results"]) {
          resolve(data["organic_results"]);
        } else {
          reject(new Error("No results found"));
        }
      }

      search.json(params, callback);
    });
  }

}

module.exports = new VerificationRepository();