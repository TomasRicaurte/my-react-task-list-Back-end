const express = require("express")
const authRouter = express.Router()
const userModel = require("../models/userModel");
const { generarToken } = require("../utils/jwt");

authRouter.post("/", async (req, res) => {
  console.log("Entro una petición de autorización");
  console.log(req.body);
  const { username, password } = req.body;
  const user = await userModel.findOne({ username, password });
  if (!user) {
    res.status(401).json("ususario no registrado");
  } else {
    const accesToken = generarToken({ userName: user.username });
    res.header("autorization", accesToken).json({
      mensaje: "usuario autenticado",
      token: accesToken,
    });
  }
});

module.exports = authRouter;
