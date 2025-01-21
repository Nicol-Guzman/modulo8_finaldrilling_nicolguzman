import db from '../models/index.js';

const { users: User, bootcamps: Bootcamp } = db;

// CREAR BOOTCAMP
export const createBootcamp = async (req, res) => {
  try {
    const { title, cue, description } = req.body;
    const nuevoBootcamp = await Bootcamp.create({
      title,
      cue,
      description,
    });
    console.log(`>> Bootcamp creado: ${JSON.stringify(nuevoBootcamp, null, 4)}`);
    res.status(201).json(nuevoBootcamp);
  } catch (err) {
    console.log(`>> Error al crear el bootcamp: ${err}`);
    res.status(500).send({ message: 'Error al crear el bootcamp.' });
  }
};

// AGREGAR USUARIO AL BOOTCAMP
export const addUser = async (req, res) => {
  try {
    const { bootcamp_id, user_id } = req.body;
    const bootcamp = await Bootcamp.findByPk(bootcamp_id);
    if (!bootcamp) {
      console.log("Bootcamp no encontrado!");
      return res.status(404).send({ message: "Bootcamp no encontrado" });
    }

    const user = await User.findByPk(user_id);
    if (!user) {
      console.log("Usuario no encontrado!");
      return res.status(404).send({ message: "Usuario no encontrado" });
    }

    await bootcamp.addUser(user);
    console.log(`Usuario con id=${user.id} agregado al bootcamp con id=${bootcamp.id}`);
    res.status(200).json(bootcamp);  // Enviar la respuesta con el bootcamp actualizado
  } catch (err) {
    console.log("ERROR: No se ha logrado agregar el usuario al bootcamp.", err);
    res.status(500).send({ message: 'Error al agregar el usuario al bootcamp.' });
  }
};

// OBTENER BOOTCAMP POR ID
export const findById = async (req, res) => {
  try {
    const bootcamp = await Bootcamp.findByPk(req.params.id, {
      include: [{
        model: User,
        as: "users",
        attributes: ["id", "firstName", "lastName"],
        through: {
          attributes: [],
        }
      }],
    });
    if (!bootcamp) {
      return res.status(404).send({ message: "Bootcamp no encontrado." });
    }
    res.status(200).json(bootcamp);
  } catch (err) {
    console.log("ERROR: No se pueden obtener los datos del bootcamp.", err);
    res.status(500).send({ message: 'Error al obtener el bootcamp.' });
  }
};

// OBTENER TODOS LOS BOOTCAMPS Y SUS USUARIOS
export const findAll = async (req, res) => {
  try {
    const bootcamps = await Bootcamp.findAll({
      include: [{
        model: User,
        as: "users",
        attributes: ["id", "firstName", "lastName"],
        through: {
          attributes: [],
        }
      }],
    });
    res.status(200).json(bootcamps);
  } catch (err) {
    console.log("Error: No se pudieron obtener los bootcamps y sus usuarios. ", err);
    res.status(500).send({ message: 'Error al obtener los bootcamps.' });
  }
};
