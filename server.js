const express = require("express");
const connectDb = require("./utils/connectDb");
const { validateToken } = require("./utils/jwt");
const tasksRouter = require("./routes/tasks");
const authRouter = require("./routes/auth");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/tasks", validateToken, connectDb, tasksRouter);
app.use("/auth", connectDb, authRouter);

const server = app.listen(port, () => {
  console.log(`servidor corriendo en el puerto ${port} 📡`);
});

module.exports = server;
