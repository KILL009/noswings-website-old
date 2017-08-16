'use strict';
const api_host = 'http://localhost:4000';

module.exports = {
    server: 'NosWings',
    api: {
        login_route: `${api_host}/user/login`,
    },
    secret: {
        jwt_key: ''
    },
    e_permissions: {
        IS_ADMIN: 0b00000001,
        IS_MODERATOR: 0b00000010,
    },
    urls: {
        logo: "https://static.noswings.fr/assets/img/logo.png",
        site: "https://noswings.fr/",
        discord: "http://discord.noswings.fr/",
        forum: "https://forum.noswings.fr/",
        validate: "https://moncompte.noswings.fr/"
    },
    db: {
        user: "noswings_site",
        password: "",
        server: "",
        database: "opennos"
    },
    smtp: {
        host: 'noswings.fr',
        port: 587,
        secure: false, // secure:true for port 465, secure:false for port 587
        auth: {
            user: '',
            pass: ''
        },
        tls: {
            rejectUnauthorized: false
        }
    }
};
