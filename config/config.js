'use strict';
const api_host = 'https://api.noswings.fr';

module.exports = {
    server: 'NosWings',
    api: {
        admin: {
            get_patch: `${api_host}/admin/patch`,
            post_patch: `${api_host}/admin/patch`,
            post_add_money: `${api_host}/admin/addmoney`,
        },
        get_ranking: `${api_host}/ranking`,
        get_news: `${api_host}/get_news`,
        get_online: `${api_host}/online`,
        get_info: `${api_host}/user/get_info`,
        get_token: `${api_host}/user/token`,
        get_packs: `${api_host}/shop/packs`,
        get_validate: `${api_host}/register/validate/`,
        post_kick: `${api_host}/user/kick`,
        post_buy: `${api_host}/shop/buy`,
        post_buy_vip: `${api_host}/shop/vip`,
        post_register: `${api_host}/register`,
        post_forgotten: `${api_host}/forgotten`
    },
    links: {
        staticDomain: `https://static.noswings.fr`,
        launcher: `https://www.dropbox.com/s/du7lltiab9persj/NosWings.exe?dl=0`,
        website: `https://noswings.fr/`,
        forum: `https://forum.noswings.fr/`,
        discord: `https://discord.gg/uyFs2yz`,
    },
    e_permissions: {
        IS_ADMIN: 0b00000001,
        IS_GM: 0b00000010,
    },
};