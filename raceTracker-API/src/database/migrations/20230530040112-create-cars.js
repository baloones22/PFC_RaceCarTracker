
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.createTable('cars', {
      id: {
        type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
				allowNull: false
      },
      plate: {
        type: Sequelize.STRING,
				allowNull: false
      },
      model: {
        type: Sequelize.STRING,
				allowNull: false
      },
      owner: {  
        type: Sequelize.STRING,
				allowNull: false
      },
      on_track: {
        type: Sequelize.BOOLEAN,
				defaultValue: false
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id' }
        },
      created_at:{
          type: Sequelize.DATE,
          allowNull:false,
        },
      updated_at:{
          type: Sequelize.DATE,
          allowNull:false,
        }
        //onUpdate: 'CASCADE',
        //onDelete: 'CASCADE',
      });
  },

  down (queryInterface, Sequelize) {
    return queryInterface.dropTable('cars');
  }
};
