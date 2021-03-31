const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('test_table', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    testString: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'test_table',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "test_table_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
