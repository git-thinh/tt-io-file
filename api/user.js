
async function login(req, res) {
    //console.log(req.body);
    let ok = false;
    let body = req.body || {};
    let user = _.find(__users, x => x.user_name == body.user_name && x.password == body.password);
    let u;
    if (user) {
        u = JSON.parse(JSON.stringify(user));
        delete u.password;
        const token = u.__id + '-' + new Date().getTime();
        __token[u.__id] = token;
        u.token = token;
        ok = true;
    }
    return __apiResponse({ ok: ok, user: u, command: 'login' }, res);
}

async function change_pass(req, res) {
    let ok = false, user,
        token = req.query.token || '',
        __id = token.split('-')[0];
    let body = req.body || {};

    if (__token.hasOwnProperty(__id)
        && body.new_password_again == body.new_password
        && body.new_password.length > 2)
        user = _.find(__users, x => x.__id == __id && x.password == body.password);

    //console.log(body);
    //console.log(token, __token);
    //console.log(user, __users);

    let u;
    if (user) {
        user.password = body.new_password;

        u = JSON.parse(JSON.stringify(user));
        delete u.password;
        const token = u.__id + '-' + new Date().getTime();
        __token[u.__id] = token;
        u.token = token;
        ok = true;

        _FS.writeFileSync('./data/user.json', JSON.stringify(__users));
    }
    return __apiResponse({ ok: ok, user: u, command: 'change_pass' }, res);
}

async function check_token(req, res) {
    let ok = false, user,
        token = req.query.token || '',
        __id = token.split('-')[0];

    if (__token.hasOwnProperty(__id)) {
        user = _.find(__users, x => x.__id == __id);
        if (user) {
            ok = true;
        }
    }

    let u;
    if (user) {
        u = JSON.parse(JSON.stringify(user));
        delete u.password;
        u.token = token;
    }
    return __apiResponse({ ok: ok, user: u, command: 'check_token' }, res);
}

async function logout(req, res) {
    let ok = false, token = req.query.token || '',
        __id = Number(token.split('-')[0]);
    if (isNaN(__id)) __id = 0;
    if (__id > 0 && __token.hasOwnProperty(__id)) {
        delete __token[__id];
        ok = true;
    }
    return __apiResponse({ ok: ok, command: 'logout' }, res);
}

module.exports = {
    login: login,
    logout: logout,
    check_token: check_token,
    change_pass: change_pass
};