import Sequelize from 'sequelize';

import Car from '../models/Car';
import Category from '../models/Category';
import Championship from '../models/Championship';
import Laptime from '../models/Laptime';
import Timeboard from '../models/Timeboard';
import dataBaseConfig from '../config/database';

const models = [
    Car,
    Category,
    Championship,
    Laptime,
    Timeboard
]

class Database{
    constructor(){
        this.init();
    }

    init(){
        this.connection = new Sequelize(dataBaseConfig);
        models
            .map(model => model.init(this.connection))
            .map(model => model.associate && model.associate(this.connection.models));
    }
}

export default new Database();
