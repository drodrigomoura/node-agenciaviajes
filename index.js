// const express = require("express");
import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";

const app = express();

// conectar la BD
db.authenticate()
  .then(() => console.log("BD conectada"))
  .catch((err) => console.log(err));

// Defninir puerto
const port = process.env.PORT || 4000;

// Definir el host
const host = process.env.HOST || "0.0.0.0";

// habilitar pug
app.set("view engine", "pug");

// Obtener año actual
app.use((req, res, next) => {
  const year = new Date().getFullYear();
  res.locals.currentYear = year;
  res.locals.nombreSitio = "Agencia de viajes";

  return next();
});

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({ extended: true }));

// definir la carpeta publica
app.use(express.static("public"));

// agrega router
app.use("/", router);

app.listen(port, host, () => {
  console.log(`Èl servidor esta corriendo en el puerto ${port}`);
});
