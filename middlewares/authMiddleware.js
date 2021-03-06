'use strict';
const Cookies = require('cookies');
const request = require('request');

function authRequired(req, res, next) {
    const cookies = new Cookies(req, res);
    const token = cookies.get(`${global.config.server}-token`);

    /* No token */
    if (!token)
        return res.redirect(req.protocol + '://' + req.get('host') + '/login');

    const params = token.split('.');

    if (params.length !== 3)
        return res.redirect(req.protocol + '://' + req.get('host') + '/login');

    /* Parse token */
    let user;
    try {
        user = JSON.parse(new Buffer(params[1], 'base64').toString('utf-8'));
    }
    catch (e) {
        return res.redirect(req.protocol + '://' + req.get('host') + '/login');
    }

    /* Check fields */
    if (!user || !user.username || !user.hashedPassword || !user.exp)
        return res.redirect(req.protocol + '://' + req.get('host') + '/login');

    /* Check expiration date */
    if (Date.now() > parseInt(user.exp) * 1000)
        return res.redirect(req.protocol + '://' + req.get('host') + '/login');

    /* Check token */
    const opt = {
        method: 'get',
        url: global.config.api.get_info,
        headers: {'x-access-token': token}
    };

    request(opt, (err, response, body) => {
        if (err || response.statusCode !== 200) {
            console.log(response ? response.statusCode : '', err);
            return res.redirect(req.protocol + '://' + req.get('host') + '/login');
        }

        let info;
        try {
            info = JSON.parse(body);
            if (!info.success)
                throw new Error('Not succeed');
            info = info.data;
        }
        catch (e) {
            console.log(e);
            return res.redirect(req.protocol + '://' + req.get('host') + '/login');
        }

        user.characters = info.characters;
        user.money = info.money || null;
        user.permissions = {};
        user.permissions.IS_ADMIN = (info.permissions & global.config.e_permissions.IS_ADMIN) === 1;
        user.permissions.IS_GM = (info.permissions & global.config.e_permissions.IS_GM >> 1) === 1;
        if (req.originalUrl.startsWith("/admin")) {
            user.actualPanel = "admin";
        }
        else if (req.originalUrl.startsWith("/moderator")) {
            user.actualPanel = "moderator";
        }
        else {
            user.actualPanel = "user";
        }
        req.user = user;
        req.user.token = token;
        next();
    });
}

module.exports = authRequired;
