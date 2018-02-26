const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.get_all = (req, res, next) => {
};
exports.user_create = (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then((user) => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'Já existe este e-mail',
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err,
                        });
                    } else {
                        const newUser = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                        });
                        newUser
                            .save()
                            .then((result) => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'Usuario criado',
                                });
                            })
                            .catch((err) => {
                                console.log(err);
                                res.status(500).json({
                                    error: err,
                                });
                            });
                    }
                });
            }
        });
};
exports.user_get = (req, res, next) => { };
exports.user_update = (req, res, next) => { };
exports.user_delete = (req, res, next) => { };
