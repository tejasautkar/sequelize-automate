// src/utils/sequelizeUtils.ts

import { Sequelize } from 'sequelize';
import { SequelizeInstance } from '../models/SequelizeInstance';
import fs from 'fs';

export function createSequelizeInstance(userInput: SequelizeInstance): Sequelize {
    // Use the userInput object to configure Sequelize instance
    const sequelize = new Sequelize({
        dialect: 'postgres',
        host: userInput.host,
        port: parseInt(userInput.port, 10),
        username: userInput.username,
        password: userInput.password,
        database: userInput.database,
        dialectOptions: {
            
            ssl: userInput.certificatesRequired ? { ca: fs.readFileSync(userInput.certificateLocation) } : false,
        },
    });

    return sequelize;
}

export async function testDatabaseConnection(sequelize: Sequelize): Promise<void> {
    try {
        await sequelize.authenticate();
    } catch (error) {
        throw new Error(`Unable to connect to the database: ${error}`);
    }
}
