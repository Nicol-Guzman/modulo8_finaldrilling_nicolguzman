import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const User = sequelize.define('users', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Campo requerido. Designa un nombre."
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Campo requerido. Designa un apellido."
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'La dirección de email ya existe.'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "Campo requerido. Designa un email valido."
        },
        isEmail: {
          args: true,
          msg: 'Formato de email inválido'
        },
      },
    },
    // cambio 1: password
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Campo requerido. Introduce una contraseña."
        },
        len: {
          args: [8],
          msg: "La contraseña debe tener al menos 8 caracteres."
        }
      }
    },
  });

  return User;
};
