const middleware = require('../middleware/get-cities');

const Controllers = {
  async getCities(req, res) {
    const query = req.body.query.toLowerCase();

    const data = middleware.getCities(query);

    return res.send(data);
  },
}

module.exports = Controllers;