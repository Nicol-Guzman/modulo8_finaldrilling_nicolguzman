import jwt from 'jsonwebtoken';
import config from '../config/auth.config.js';

export const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) return res.status(403).send({ message: "Token requerido" });

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) return res.status(401).send({ message: "Token inválido" });
    req.userId = decoded.id;
    next();
  });
};
