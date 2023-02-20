const router = require('express').Router();
const { getUserData, updateUserData } = require('../controllers/users');
const { changeUserDataValidate } = require('../middlewares/validate');

router.get('/me', getUserData);
router.patch('/me', changeUserDataValidate, updateUserData);

module.exports = router;
