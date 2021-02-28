const config = require("../config/auth.config");

const db = require("../models");
const Consultations = db.consultations;

const Op = db.Sequelize.Op;

exports.createConsultation = (req, res) => {
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

    Consultations.create(consultation).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error occurred while creating Consultation Record."
        });
    });
}

exports.getConsultationsByPeriod = (req, res) => {
    var condition = {
        date:{
            [Op.gte]: req.query.dateFrom,
            [Op.lte]: req.query.dateTo,
        }
    };

    Consultations.findAll({ 
        attributes: ['id','clinic', 'patient_name', 'date', 'time'],
        where: condition,
        order: [['date', 'DESC'],['time','DESC']]
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error occurred while retrieving consultations"
        });
    });
}

exports.getConsultationById = (req, res) => {
    var condition = {
        id: req.params.id
    };

    Consultations.findOne({ 
        where: condition,
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error occurred while retrieving consultations"
        });
    });
}

