const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.get_all = (req, res) => {
	User.find({})
		.exec()
		.then(users => {
			if (users.length <= 0) {
				return res.status(409).json({
					message: 'nenhum usuário no banco de dados',
				});
			} else {
				return res.status(200).json({
					message: users
				});
			}
		})
		.catch();
};
exports.user_create = (req, res) => {
	User.find({ email: req.body.email })
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
							name: req.body.name,
							address: req.body.address,
						});
						newUser
							.save()
							.then((result) => {
								res.status(201).json({
									message: result,
								});
							})
							.catch((err) => {
								res.status(500).json({
									error: err,
								});
							});
					}
				});
			}
		});
};
exports.user_get = (req, res) => {
	User.find({ email: req.body.email })
		.exec()
		.then((user) => {
			if (user.length < 1) {
				return res.status(401).json({
					message: 'Autenticação falhou',
				});
			}
			bcrypt.compare(req.body.password, user[0].password, (err, result) => {
				if (err) {
					return res.status(401).json({
						message: 'Autenticação falhou',
					});
				}
				if (result) {
					const token = jwt.sign(
						{
							email: user[0].email,
							userId: user[0]._id,
						},
						process.env.JWT_KEY,
						{
							expiresIn: '1h',
						}
					);
					return res.status(200).json({
						message: 'Autenticação comfirmada',
						token: token,
					});
				}
				res.status(401).json({
					message: 'Autenticação falhou',
				});
			});
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
			});
		});
};
exports.user_update = (req, res) => {
	bcrypt.hash(req.body.password, 10, (err, hash) => {
		if (err) {
			return res.status(500).json({
				error: err,
			});
		} else {
			let conditions = {
				email: req.body.email,
				password: hash
			};
			let update = {
				name: req.body.name,
				address: req.body.address,
			};
			User.findOneAndUpdate(conditions, update)
				.exec()
				.then((result) => {
					res.status(200).json({
						message: result,
					});
				})
				.catch((err) => {
					res.status(500).json({
						error: err,
					});
				});
		}
	});
};
exports.user_delete = (req, res) => {
	User.remove({ _id: req.params.userId })
		.exec()
		.then((result) => {
			res.status(200).json({
				message: result,
			});
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
			});
		});
};
