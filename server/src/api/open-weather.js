const fetch = require('node-fetch');

const Api = {
  getWeather: async(id) => {
    const apikey = process.env.WEATHER_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${apikey}`;

    try {
      const response = await fetch(url);
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(`%c ${error}`, 'color:red');
    }
  },
}

module.exports = Api;