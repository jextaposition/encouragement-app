'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Encouragement extends Model {
    static associate(models) {
      this.belongsTo(models.User);
    }
  }
  Encouragement.init(
    {
      title: { type: DataTypes.STRING, allowNull: false },
      scripture: { type: DataTypes.STRING, allowNull: false },
      encouragement: { type: DataTypes.STRING, allowNull: false },
      prayer: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Encouragement',
    }
  );
  return Encouragement;
};
