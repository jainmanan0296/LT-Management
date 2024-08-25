const mongoose = require('mongoose');
const User = require("./src/models/UsersModel");
const Dummy_users = [
    {
        userName: 'admin',
        name: 'Admin',
        phoneNum: '1234567890',
        email: 'admin1@example.com',
        password: 'admin',
        admin: true,
        superAdmin: false,
    }
];

async function seedDB() {
     await User.insertMany(Dummy_users);
     console.log("DB Seeded");
}

module.exports = seedDB;
