export default function initCentreModel(sequelize, DataTypes) {
  return sequelize.define(
    'centre',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      slotCapacity: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      startTime: {
        allowNull: false,
        type: DataTypes.TIME,
      },
      endTime: {
        allowNull: false,
        type: DataTypes.TIME,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    { underscored: true },
  );
}
