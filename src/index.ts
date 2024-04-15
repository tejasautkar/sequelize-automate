// src/index.ts

import { prompt  } from 'enquirer';
import { createSequelizeInstance, testDatabaseConnection } from './utils/sequelizeUtils';
import { SequelizeInstance } from './models/SequelizeInstance';

async function main() {
    const initialQuestions  = [
        {
            type: 'input',
            name: 'host',
            message: 'Enter database host:',
            validate: (value: string) => !!value.trim() || 'Host is required',
        },
        {
            type: 'input',
            name: 'port',
            message: 'Enter database port:',
            default: '3306', // Adjust the default port as needed
            validate: (value: string) => !!value.trim() || 'Port is required',
        },
        {
            type: 'input',
            name: 'username',
            message: 'Enter database username:',
            validate: (value: string) => !!value.trim() || 'Username is required',
        },
        {
            type: 'password',
            name: 'password',
            message: 'Enter database password:',
            validate: (value: string) => !!value.trim() || 'Password is required',
        },
        {
            type: 'input',
            name: 'database',
            message: 'Enter database name:',
            validate: (value: string) => !!value.trim() || 'Database name is required',
        },
        {
            type: 'confirm',
            name: 'certificatesRequired',
            message: 'Are certificates required to connect to the database?',
        }
    ];

    const userInput = await prompt<SequelizeInstance>(initialQuestions);
    if (userInput.certificatesRequired) {
        const certificatesQuestion = {
            type: 'input',
            name: 'certificatesLocation',
            message: 'Enter the location of certificates:',
            validate: (value: string) => !!value.trim() || 'Certificates location is required',
        };
        initialQuestions.push(certificatesQuestion as any);
        Object.assign(userInput, await prompt(certificatesQuestion));
    }

    try {
        const sequelize = createSequelizeInstance(userInput);
        await testDatabaseConnection(sequelize);
        console.log('Connection succeeded successfully');
    } catch (error) {
        console.error('Connection failed:', error);
    }
}

main();
