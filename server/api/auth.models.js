require("dotenv").config();
const knex = require("../../data/dbconfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  /**
   * REQUIRED FIELDS
   * username
   * password
   */
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await knex("users").insert({ ...req.body, password: hashedPassword });

    const createdUser = {
      username: req.body.username,
      password: hashedPassword,
      department: req.body.department,
    };

    const token = jwt.sign(createdUser, process.env.JWT_SECRET);

    return res.json({ message: "User created", token });
  } catch (error) {
    return error;
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const foundUser = await knex("users")
      .select("username", "department", "password")
      .where({ username })
      .first();
    if (!foundUser) {
      throw res.status(400).json({ message: "Message not found" });
    }

    if (!bcrypt.compare(password, foundUser.password)) {
      throw res.statsu(400).json({ message: "Invalide Credentials" });
    }

    const token = jwt.sign(foundUser, process.env.JWT_SECRET);

    return res.json({ message: "You're logged in", token });
  } catch (error) {
    return error;
  }
};

module.exports = { loginUser, registerUser };
