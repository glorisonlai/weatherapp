const fetch = require("node-fetch");

const Services = {
  prepareBody(data) {
    return JSON.stringify(data);
  },

  prepareUrl(path) {
    const { protocol, hostname } = window.location;
    const PORT = process.env.PORT || 9000;

    return `${protocol}//${hostname}:${PORT}/${path}`;
  },

  async post(url, body) {
    const response = await fetch(url, {
      method: "POST",
      body: body,
      headers: { "Content-Type": "application/json" },
    });

    return await response.text();
  },

  async getWeather(data) {
    const path = "open-weather";
    const url = this.prepareUrl(path);
    const body = this.prepareBody(data);

    return JSON.parse(await this.post(url, body));
  },

  async getCities(data) {
    const path = "get-cities";
    const url = this.prepareUrl(path);
    const body = this.prepareBody(data);

    return JSON.parse(await this.post(url, body));
  },
};

export default Services;
