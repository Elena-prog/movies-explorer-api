const router = require('express').Router();
const { celebrate } = require('celebrate');
const { getUserInfo, updateUser } = require('../controllers/users');
const { updateUserValidation } = require('../utils/userValidation');

router.get('/me', getUserInfo);

router.patch('/me', celebrate(updateUserValidation), updateUser);

module.exports = router;
