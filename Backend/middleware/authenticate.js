const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticate(req, res, next) {
  var token = req.headers.authorization;
  token = token && token.split(/\s+/)[1] // Token Format: BEARER 4324fdsirejwrewk

  if (!token) {
    return res.status(401).json({ message: 'Token is missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.userId = decoded.userId; // Attach user ID to the request for use in protected routes
    next();
  });
}

module.exports = authenticate;