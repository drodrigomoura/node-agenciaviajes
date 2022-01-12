import { Viaje } from "../models/Viaje.js";
import { Testimoniales } from "../models/Testimoniales.js";

const paginaInicio = async (req, res) => {
  // consultar 3 viajes del modelo Viaje
  try {
    const [viajes, testimoniales] = await Promise.all([
      Viaje.findAll({ limit: 3 }),
      Testimoniales.findAll({ limit: 3 }),
    ]);

    res.render("inicio", {
      pagina: "Inicio",
      clase: "home",
      viajes,
      testimoniales,
    });
  } catch (error) {
    console.log(error);
  }
};

const paginaNosotros = (req, res) => {
  res.render("nosotros", {
    pagina: "Nosotros",
  });
};

const paginaViajes = async (req, res) => {
  // consultar BD
  try {
    const viajes = await Viaje.findAll();
    console.log(viajes);

    res.render("viajes", {
      pagina: "Próximos Viajes",
      viajes,
    });
  } catch (error) {
    console.log(error);
  }
};

const paginaDetalleViaje = async (req, res) => {
  const { slug } = req.params;

  try {
    // consultar BD
    const resultado = await Viaje.findOne({
      where: { slug },
    });

    res.render("viaje", {
      pagina: "Información Viaje",
      resultado,
    });
  } catch (error) {
    console.log(error);
  }
};

const paginaTestimoniales = async (req, res) => {
  try {
    const testimoniales = await Testimoniales.findAll();

    res.render("testimoniales", {
      pagina: "Testimoniales",
      testimoniales,
    });
  } catch (error) {
    console.log(error);
  }
};

export { paginaInicio, paginaNosotros, paginaViajes, paginaDetalleViaje, paginaTestimoniales };
