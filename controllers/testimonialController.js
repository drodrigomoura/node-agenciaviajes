import { Testimoniales } from "../models/Testimoniales.js";

const guardarTestimoniales = async (req, res) => {
  console.log(req.body);
  const testimoniales = await Testimoniales.findAll();
  // Validar...
  const { nombre, correo, mensaje } = req.body;

  const errores = [];

  if (nombre.trim() === "") {
    errores.push({ mensaje: "El nombre esta vacío" });
  }

  if (correo.trim() === "") {
    errores.push({ mensaje: "El correo esta vacío" });
  }

  if (mensaje.trim() === "") {
    errores.push({ mensaje: "El mensaje esta vacío" });
  }

  if (errores.length > 0) {
    // Mostrar la vista con errores
    res.render("testimoniales", {
      pagina: "Testimoniales",
      errores,
      nombre,
      correo,
      mensaje,
      testimoniales,
    });
  } else {
    // Guardar en la BD
    try {
      await Testimoniales.create({
        nombre,
        correo,
        mensaje,
      });

      res.redirect("/testimoniales");
    } catch (error) {
      console.log(error);
    }
  }
};

export { guardarTestimoniales };
