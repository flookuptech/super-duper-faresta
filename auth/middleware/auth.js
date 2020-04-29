const jwt = require("jsonwebtoken");

const jwtPrivateKey = process.env.FAR_JWT_PRIVATEKEY;

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).send({ err: "Access denied. No token provided" });

  try {
    const decoded = jwt.verify(token, jwtPrivateKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send({ err: "Invalid token" });
  }
}

module.exports = auth;
