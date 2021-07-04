
async function get_base(req, res) {
    let a = _FS.readdirSync('./www/ui/views/');
    a = _.filter(a, x => x.endsWith('.html') && x.indexOf(' ') == -1);
    a = _.map(a, x => x.substr(0, x.length - 5).trim().toLowerCase());
    return __apiResponse({ ok: true, items: a }, res);
}

module.exports = {
    get_base: get_base,
};