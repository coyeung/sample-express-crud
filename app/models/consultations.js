module.exports = (sequelize, Sequelize) => {
    const Consultation  = sequelize.define("consultations", {
        clinic: {
            type: Sequelize.STRING
        },
        doctor_name: {
            type: Sequelize.STRING(50)
        },
        patient_name: {
            type: Sequelize.STRING(50)
        },
        diagnosis: {
            type: Sequelize.TEXT
        },
        medication: {
            type: Sequelize.TEXT
        },
        conslt_fee: {
            type: Sequelize.INTEGER(20).UNSIGNED,
            defaultValue: 0,
            allowNull: false
        },
        date: {
            type: Sequelize.DATEONLY
        },
        time: {
            type: Sequelize.TIME
        },
        has_followup: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
    });

    return Consultation;
}
