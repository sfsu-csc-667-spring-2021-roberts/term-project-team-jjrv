const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('messages', {
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: "unq_messages_user_id"
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    content: {
      type: DataTypes.STRING(500),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'messages',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "unq_messages_user_id",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
