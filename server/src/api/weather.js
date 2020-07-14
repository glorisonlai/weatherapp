var express = require("express");
var router = express.Router();

router.get("/", function(req,res) {
  return res ={
    status: 200,
    body: {
      success: true,
      data: 'yes',
    }
  }
});

module.exports = router;