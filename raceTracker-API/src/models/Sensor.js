import Sequelize, { Model } from 'sequelize';

class Sensor extends Model {
    static init(sequelize){
        super.init(
            {
                time: Sequelize.STRING,
                sensor: Sequelize.INTEGER
                plate: Sequelize.INTEGER
            },
            {
                sequelize
            }
        );

        return this;
    }
}

export default Sensor;
