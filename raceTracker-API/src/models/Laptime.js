import Sequelize, { Model } from 'sequelize';

class Laptime extends Model {
    static init(sequelize){
        super.init(
            {
                battery: Sequelize.NUMBER,
                lap_1: Sequelize.STRING,
                lap_2: Sequelize.STRING,
                lap_3: Sequelize.STRING,
                lap_4: Sequelize.STRING,
                lap_5: Sequelize.STRING
            },
            {
                sequelize
            }
        );

        return this;
    }
    static associate(models){
        this.belongsTo(models.Championship, {as: 'championship', foreignKey: 'championshipId'});
        this.belongsTo(models.Car, {as: 'car', foreignKey: 'carId'});
    }

}

export default Laptime;
