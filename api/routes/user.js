// Importing lib
const express = require('express');

// Importing files
const Auth = require('../middleware/jwt');
const UserController = require('../controllers/user');

// Creating router
const router = express.router();

// Routes for User
router.get('/', Auth, UserController.get_all);
router.post('/', UserController.user_create);
router.get('/:usrId', Auth, UserController.user_get);
router.put('/:usrId', Auth, UserController.user_update);
router.delete('/:usrId', Auth, UserController.user_delete);

// Exporting
module.exports = router;
