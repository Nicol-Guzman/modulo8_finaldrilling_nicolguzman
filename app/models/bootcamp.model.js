import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Bootcamp = sequelize.define('bootcamps', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Campo requerido. Designa un título."
        },
      },
    },
    cue: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Campo requerido. Designa u numero entre mínimo 5 y máximo 20"
        },
        isInt: {
          args: true,
          msg: "Debe ser un numero entero"
        },
        max: 20,
        min: 5,
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Campo requerido. Designa una descripción"
        },
      },
    },
  });

  return Bootcamp;
};
