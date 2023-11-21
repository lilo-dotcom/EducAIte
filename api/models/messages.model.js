module.exports = (sequelize, DataTypes, Model) => {

  class Messages extends Model {}

  Messages.init({
    sender: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id"
      },
      allowNull: false,
    },
    recipient: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id"
      },
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    conversation: {
      type: DataTypes.INTEGER,
      references: {
        model: "conversations",
        key: "id"
      },
      allowNull: false,
    }
  }, {
    sequelize, // to pass the connection instance
    modelName: 'messages'
  });

  return Messages;

}