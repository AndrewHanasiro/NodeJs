const express = require("express");
const Auth = require("../middleware/jwt");
const UserController = require("../controllers/user");

const router = express.Router();

router.get("/", Auth, UserController.get_all);

router.post("/", UserController.user_create);

router.get("/:usrId", Auth, UserController.user_get);

router.put("/:usrId", Auth, UserController.user_update);

router.delete("/:usrId", Auth, UserController.user_delete);

module.exports = router;
