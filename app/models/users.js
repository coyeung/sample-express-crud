module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        email: {
            type: Sequelize.STRING,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            unique: true
        },
        clinic_name: {
            type: Sequelize.STRING
        },
        phone_no: {
            type: Sequelize.STRING(20)
        },
        addr: {
            type: Sequelize.TEXT
        }
    });

    return User;
}