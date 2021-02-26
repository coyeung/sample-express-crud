module.exports = class ConsultationsModel {
    constructor(sequelize, Sequelize) {
        this.model = sequelize.define("consultations", {
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
    };
    
    // Create and Save a new consultation
    create = (req, res) => {
        // Validate request
        let validateRes = this._validate(req.body);
        if (!validateRes.success) {
            res.status(400).send({
                field: validateRes.field,
                message: "Content can not be empty!"
            });
            return;
        }
        const consultation = {
            clinic: req.body.clinic,
            doctor_name: req.body.doctor_name,
            patient_name: req.body.patient_name,
            diagnosis: req.body.diagnosis,
            medication: req.body.medication,
            conslt_fee: req.body.conslt_fee,
            date: req.body.date,
            time: req.body.time,
            has_followup: req.body.has_followup,
        };

        // Save consultations in the database
        this.model.create(consultation)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while creating Consultation Record."
            });
        });
    };

    // Retrieve list of consultations from the database.
    findAll = (req, res) => {
        var condition = {};
        if (req.query.clinic) condition.clinic = { [Op.like]: `%${req.query.clinic}%` };
        if (req.query.doctor_name) condition.doctor_name = { [Op.like]: `%${req.query.doctor_name}%` };
        if (req.query.patient_name) condition.patient_name = { [Op.like]: `%${req.query.patient_name}%` };
        if (req.query.diagnosis) condition.diagnosis = { [Op.like]: `%${req.query.diagnosis}%` };
        if (req.query.medication) condition.medication = { [Op.like]: `%${req.query.medication}%` };
        if (req.query.conslt_fee) condition.conslt_fee = req.query.conslt_fee;
        if (req.query.date) condition.date = req.query.date;
        if (req.query.time) condition.time = req.query.time;
        if (req.query.hasOwnProperty('has_followup')) condition.has_followup = req.query.has_followup;
      
        this.model.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while retrieving consultations"
            });
        });
    };

    // Find a single User with an id
    findOne = (req, res) => {
    
    };

    // Update a User by the id in the request
    update = (req, res) => {
    
    };

    // Delete a User with the specified id in the request
    delete = (req, res) => {
    
    };

    // Delete all User from the database.
    deleteAll = (req, res) => {
    
    };

    // Find all published User
    findAllPublished = (req, res) => {
    
    };

    // Private functions 
    _validate = (data) => {
        // TODO: type check, validation plugins?
        if (!req.body.clinic) {
            return {success: false, field: "clinic"};
        }
        if (!req.body.doctor_name) {
            return {success: false, field: "doctor_name"};
        }
        if (!req.body.patient_name) {
            return {success: false, field: "patient_name"};
        }
        if (!req.body.diagnosis) {
            return {success: false, field: "diagnosis"};
        }
        if (!req.body.medication) {
            return {success: false, field: "medication"};
        }
        if (!req.body.conslt_fee) {
            return {success: false, field: "conslt_fee"};
        }
        if (!req.body.date) {
            return {success: false, field: "date"};
        }
        if (!req.body.time) {
            return {success: false, field: "time"};
        }
        if (!req.body.hasOwnProperty('has_followup')) {
            return {success: false, field: "has_followup"};
        }

        return {success: true};
    }
}
    
