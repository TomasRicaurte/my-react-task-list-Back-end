const jwt = require("jsonwebtoken");

function generarToken(user) {
  console.log(user);
  return jwt.sign(user, "secret", { expiresIn: "60m" });
}

function validateToken(req, res, next) {
  const accesToken = req.headers["authorization"];
  if (!accesToken) {
    res.send("acceso denegado, requiere de un token");
  } else {
    jwt.verify(accesToken, "secret", (err, user) => {
      if (err) {
        res.send("acceso denegado, token expirado o incorrecto");
      } else {
        next();
      }
    });
  }
}

module.exports = { generarToken, validateToken };
