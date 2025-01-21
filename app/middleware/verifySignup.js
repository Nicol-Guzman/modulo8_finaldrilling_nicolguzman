import db from '../models/index.js';

export const checkDuplicateEmail = async (req, res, next) => {
  const user = await db.users.findOne({ where: { email: req.body.email } });
  if (user) return res.status(400).send({ message: "El email ya está en uso" });
  next();
};
