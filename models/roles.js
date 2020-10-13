'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      roles.belongsToMany(models.users, {
        as: 'users',
        foreignKey: 'role_id',
        through: 'user_roles'
    });
    }
  };
  roles.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'roles',
    tableName: 'roles',
    underscored: true
  });
  return roles;
};