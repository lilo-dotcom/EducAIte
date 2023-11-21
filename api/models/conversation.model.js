module.exports = (sequelize, DataTypes, Model) => {

  class Conversations extends Model {}

  Conversations.init({
    user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id"
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    context: {
      type: DataTypes.STRING
    },
    sources: {
      type: DataTypes.ARRAY(DataTypes.TEXT)
    }
  }, {
    sequelize,
    modelName: 'conversations'
  });

  return Conversations;
}