const router = require("express").Router();
const knex = require("../../../data/dbconfig");
const authenticate = require("../middleware/authenticate");

router.get("/", authenticate, async (req, res) => {
  return res
    .status(200)
    .json(
      await knex("users").select("*").where({ department: req.jwt.department })
    );
});

module.exports = router;
