'use strict';
const express = require('express');
const router = express.Router();
const multer = require('multer');
const authMiddleware = require('../middlewares/authMiddleware');

//router.post('/patch', multer({dest: 'uploads/'}).single('file') ,require('./admin/patch/index'));
/* GET Packs. */
router.use(authMiddleware);
router.get('/', function (req, res) {
    const permissions = req.user.permissions;

    if (!permissions || (permissions | global.config.e_permissions.IS_ADMIN) === 0)
        return res.sendStatus(403);

    res.render('admin/dashboard', {title: global.translate.TITLE_DASHBOARD});
});

router.get('/patch', function (req, res) {
    const permissions = req.user.permissions;

    if (!permissions || (permissions | global.config.e_permissions.IS_ADMIN) === 0)
        return res.sendStatus(403);

    res.render('admin/patch', {title: global.translate.TITLE_DASHBOARD});
});

module.exports = router;