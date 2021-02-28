const config = require("../config/auth.config");

const db = require("../models");
const User = db.users;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
    // Validate request
    let validateRes = _validateUser(req.body);
    if (!validateRes.success) {
        res.status(400).send({
            field: validateRes.field,
            message: validateRes.field+" can not be empty!"
        });
        return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const user = {
        email: req.body.email,
        password: hash,
        clinic_name: req.body.clinic_name,
        phone_no: req.body.phone_no,
        addr: req.body.addr,
    };

    // Check duplicate
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user =>{
        if (user) {
            res.status(500).send({
                message: "This email has been used"
            });
            return;
        }
    });
    User.create(user).then(data => {
        res.send({success: true});
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error occurred while creating User."
        });
    });
}

exports.login = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (!user) {
          return res.status(404).send({ message: "User Not found" });
        }

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password"
            });
        }
    
        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).send({
            id: user.id,
            email: user.email,
            clinic_name: user.clinic_name,
            phone_no: user.phone_no,
            addr: user.addr,
            accessToken: token
        });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}



// Private functions
_validateUser = (data) => {
    // TODO: type check, validation plugins?
    if (!data.email) {
        return {success: false, field: "email"};
    }
    if (!data.password) {
        return {success: false, field: "password"};
    }
    if (!data.clinic_name) {
        return {success: false, field: "clinic_name"};
    }
    if (!data.phone_no) {
        return {success: false, field: "phone_no"};
    }
    if (!data.addr) {
        return {success: false, field: "addr"};
    }

    return {success: true};
}
