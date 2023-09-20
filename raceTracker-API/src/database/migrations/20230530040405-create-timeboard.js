
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.createTable('timeboards', {
      id: {
        type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
      },
      car_id: {
        type: Sequelize.INTEGER,
				allowNull: false,
        references: {
          model: 'cars',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      laptime_id: {
        type: Sequelize.INTEGER,
				allowNull: true,
        references: {
          model: 'laptimes',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      championship_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'championships',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      round_number: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      best_time: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      finished_round: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      created_at:{
        type: Sequelize.DATE,
        allowNull:false,
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull:false,
      }
    });
  },

  down (queryInterface, Sequelize) {
    return queryInterface.dropTable('timeboard');
  }
};
