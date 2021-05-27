//modules import from npm
const express = require("express");
const mongoose = require("mongoose");

//own models
const User = require("./routes/user");
const Reminder = require("./routes/reminder");
const Auth = require("./routes/auth");

//const app
const app = express();
//indicamos que tipo de datos vamos a manejar
app.use(express.json());

//own uses (routes)
app.use("/api/user", User);
app.use("/api/auth/", Auth);
app.use("/api/reminder", Reminder);

//creamos el puerto
const port = process.env.PORT || 3001;
//escuchamos un puerto
app.listen(port, () => console.log("Server On Port", port));

mongoose
  .connect("mongodb://localhost:27017/agendaVirtual", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Conection MongoDB ON"))
  .catch((err) => console.log("Failed To Conect MongoDB", err));
