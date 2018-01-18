const express = require("express");
const router = express.Router();
const Auth = require("../middleware/check-auth");

const UserController = require("../controllers/user");

// Handle incoming GET requests to /orders
router.get("/", Auth, UserController.get_all);

router.post("/", UserController.user_create);

router.get("/:usrId", Auth, UserController.user_get);

router.put("/:usrId", Auth, UserController.user_update);

router.delete("/:usrId", Auth, UserController.user_delete);

module.exports = router;
