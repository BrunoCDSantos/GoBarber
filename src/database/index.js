import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../App/models/User';
import Files from '../App/models/File';
import Appointments from '../App/models/Appointments';

const models = [User, Files, Appointments];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);
        models
            .map(model => model.init(this.connection))
            .map(
                model =>
                    model.associate && model.associate(this.connection.models)
            );
    }
}

export default new Database();
