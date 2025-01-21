import db from '../models/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/auth.config.js';

// REGISTRAR USUARIO
export const signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await db.users.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword
    });
    res.status(201).send({ message: "Usuario registrado correctamente" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// INICIAR SESIÓN
export const signin = async (req, res) => {
  try {
    const user = await db.users.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(404).send({ message: "Usuario no encontrado" });

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) return res.status(401).send({ message: "Contraseña incorrecta" });

    const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 });
    res.status(200).send({ id: user.id, email: user.email, token });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// OBTENER LOS BOOTCAMPS DE UN USUARIO
export const findUserById = async (req, res) => {
  try {
    const user = await db.users.findByPk(req.params.id, {
      include: [{
        model: db.bootcamps,
        as: "bootcamps",
        attributes: ["id", "title"],
        through: {
          attributes: [],
        },
      }],
    });
    if (!user) return res.status(404).send({ message: "Usuario no encontrado" });
    res.status(200).json(user); 
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// OBTENER TODOS LOS USUARIOS Y SUS BOOTCAMPS
export const findAll = async (req, res) => { 
  try {
    const users = await db.users.findAll({
      include: [{
        model: db.bootcamps,
        as: "bootcamps",
        attributes: ["id", "title"],
        through: {
          attributes: [],
        },
      }],
    });
    res.status(200).json(users); 
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// ACTUALIZAR -- Me falta revisar que se ejecute bien
export const updateUserById = async (req, res) => { 
  const { fName, lName } = req.body;
  try {
    const updatedUser = await db.users.update(
      { firstName: fName, lastName: lName },
      { where: { id: req.params.id } }
    );
    if (!updatedUser) return res.status(404).send({ message: "Usuario no encontrado" });
    res.status(200).send({ message: "Usuario actualizado correctamente" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// ELIMINAR
export const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await db.users.destroy({ where: { id: req.params.id } });
    if (!deletedUser) return res.status(404).send({ message: "Usuario no encontrado" });
    res.status(200).send({ message: "Usuario eliminado correctamente" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
