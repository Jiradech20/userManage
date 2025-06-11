const jwt = require("jsonwebtoken");

const generateToken = (user) => { 
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d", //หมดอายุ1วัน//
    }
  );
};

module.exports = generateToken;
