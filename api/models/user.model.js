module.exports = (sequelize, DataTypes, Model) => {

  class Users extends Model {}

  Users.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    condition: {
      type: DataTypes.STRING
    }
  }, {
    sequelize, // to pass the connection instance
    modelName: 'users'
  });

  return Users;

}