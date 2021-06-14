const fs = require("fs");

async function get_filter(req, res) {
    let items = [];
    if (global.__articles == null) {
        fs.readdirSync(_ROOT + 'raw').forEach(dir => {
            fs.readdirSync(_ROOT + 'raw\\' + dir).forEach(name => {
                const s = fs.readFileSync(_ROOT + 'raw\\' + dir + '\\' + name).toString('utf8');
                const a = s.split('\n');
                items.push({ key: name, path: 'raw\\' + dir + '\\' + name, tag: a[1].split(','), title: a[0].trim(), text: s });
                //console.log(name);
            })
        });
        global.__articles = items;
    } else items = global.__articles;

    return __apiResponse({ ok: true, items:items }, res);
}

module.exports = {
    get_filter: get_filter
};