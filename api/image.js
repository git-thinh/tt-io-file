const fs = require("fs");

async function get_filter(req, res) {
    let items = [];
    //global.__images = null;
    //if (global.__images == null) {
    fs.readdirSync(_ROOT + 'raw\\images').forEach(site => {
        fs.readdirSync(_ROOT + 'raw\\images\\' + site).forEach(name => {
            if (name.endsWith('.webp')
                || name.endsWith('.jpg')
                || name.endsWith('.jpeg')
                || name.endsWith('.png')
                || name.endsWith('.gif')) {
                const a = name.split('.');
                const title = name.toLowerCase().substr(0, name.length - a[a.length - 1].length - 1);
                items.push({
                    key: name.toLowerCase(),
                    site: site,
                    type: 'image',
                    tag: '',
                    publish: false,
                    title: title
                });
            }
        });
    });
    //    global.__images = items;
    //} else items = global.__images;

    var site = req.query.site || '';
    if (site.length > 0) items = _.filter(items, x => x.site == site);

    return __apiResponse({ ok: true, items: items }, res);
}

module.exports = {
    get_filter: get_filter
};