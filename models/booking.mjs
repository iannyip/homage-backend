export default function initBookingModel(sequelize, DataTypes) {
  return sequelize.define(
    'booking',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      personId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'people',
          key: 'id',
        },
      },
      centreId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'centres',
          key: 'id',
        },
      },
      time: {
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
