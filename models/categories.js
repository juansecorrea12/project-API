'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class categories extends Model {

    static associate(models) {
      // define association here
      categories.belongsToMany(models.products, {
        as: 'products',
        foreignKey: 'id',
        through: 'product_categories'
    });
    }
  };
  categories.init({
    name: DataTypes.STRING,
    parent_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'categories',
    tableName: 'categories',
    underscored: true
  });
  return categories;
};