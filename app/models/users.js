module.exports = class UserModel {
    constructor(sequelize, Sequelize) {
        this.model = sequelize.define("users", {
            email: {
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING(20)
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

        this.op = Sequelize.op;
    };
    
    // Create and Save a new User
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

        const user = {
            email: req.body.email,
            password: req.body.password,
            clinic_name: req.body.clinic_name,
            phone_no: req.body.phone_no,
            addr: req.body.addr,
        };

        // Save Tutorial in the database
        this.model.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while creating User."
            });
        });
    };

    // Retrieve all Users from the database.
    findAll = (req, res) => {
        
    };

    // Find a single User with an id
    findOne = (req, res) => {
        var condition = {};

        if (req.query.email) condition.email = { [Op.like]: `%${req.query.email}%` };
        if (req.query.clinic_name) condition.clinic_name = { [Op.like]: `%${req.query.clinic_name}%` };
        if (req.query.phone_no) condition.phone_no = { [Op.like]: `%${req.query.phone_no}%` };
        if (req.query.addr) condition.addr = { [Op.like]: `%${req.query.addr}%` };
      
        this.model.findOne({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while retrieving user"
            });
        });
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
        if (!req.body.email) {
            return {success: false, field: "email"};
        }
        if (!req.body.password) {
            return {success: false, field: "password"};
        }
        if (!req.body.clinic_name) {
            return {success: false, field: "clinic_name"};
        }
        if (!req.body.phone_no) {
            return {success: false, field: "phone_no"};
        }
        if (!req.body.addr) {
            return {success: false, field: "addr"};
        }

        return {success: true};
    }
}