require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const verfied = await jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err, decoded) => {
        if (err) {
          throw res.status(400).json({ message: "Invalid Token" });
        }
        return decoded;
      }
    );

    req.jwt = verfied;
  } catch (error) {
    return error;
  }
  next();
};
