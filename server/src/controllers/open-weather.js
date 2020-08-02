const api = require('../api/open-weather');

const Controllers = {
  async getWeather(req, res) {
    console.log('MADE IT - CONTROLLERS'.green);
    const id = req.body.locId;
    const response = await api.getWeather(id);

    if (response.id !== id) {
      console.error(`Invalid ID - ${id}, Response - ${response.id}`);
      return;
    }

    // weather[0] = icon, description
    // main = temp, temp_min, temp_max
    // sys = sunrise, sunset
    const { name, weather, main, visibility, wind, sys, timezone } = response;

    const data = {
      id: id,
      name: name,
      country: sys.country,
      icon: weather[0].icon,
      desc: weather[0].description,
      current: main.temp,
      min: main.temp_min,
      max: main.temp_max,
      pressure: main.pressure,
      humidity: main.humidity,
      vision: visibility,
      windspeed: wind.speed,
      winddeg: wind.deg,
      sunrise: sys.sunrise,
      sunset: sys.sunset,
      timezone: timezone,
    }
    console.log(data);

    return res.send(data);
  }
}

module.exports = Controllers;