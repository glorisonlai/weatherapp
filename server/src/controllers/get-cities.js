const middleware = require('../middleware/get-cities');

const Controllers = {
  async getCities(req, res) {
    const query = req.body.query;

    const data = middleware.getCities(query);

    console.log(data);

    return res.send(data);
  },
}

module.exports = Controllers;