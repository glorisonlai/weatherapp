const fetch = require('node-fetch');

const Services = {
  prepareBody(data) {
    return JSON.stringify(data);
  },

  prepareUrl(path) {
    return 'http://localhost:1337' + path;
  },

  async post(url, body) {
    const response = await fetch(url, {
      method: 'POST',
      body: body,
      headers: {'Content-Type': 'application/json'},
    });
  
    return await response.text();
  },

  async getWeather(data) {
    const path = '/open-weather';
    const url = this.prepareUrl(path);
    const body = this.prepareBody(data);

    return JSON.parse(await this.post(url, body));
  },
}

module.exports = Services;