const fs = require("fs");
var sizeOf = require('image-size');

async function get_filter(req, res) {
    let items = [];
    global.__images = null;
    if (global.__images == null) {
        fs.readdirSync(_ROOT + 'raw\\images').forEach(site => {
            fs.readdirSync(_ROOT + 'raw\\images\\' + site).forEach(name => {
                if (name.endsWith('.webp')
                    || name.endsWith('.jpg')
                    || name.endsWith('.jpeg')
                    || name.endsWith('.png')
                    || name.endsWith('.gif')) {

                    const file = _ROOT + 'raw\\images\\' + site + '\\' + name;
                    const stat = fs.statSync(file);
                    const last_modified = stat.mtime;
                    const d = sizeOf(file);

                    let orientation = d.orientation || 0, w = d.width, h = d.height;
                    if (orientation == 6) {
                        w = d.height;
                        h = d.width;
                    }

                    const a = name.split('.');
                    const title = name.toLowerCase().substr(0, name.length - a[a.length - 1].length - 1);
                    items.push({
                        key: name.toLowerCase(),
                        site: site,
                        type: 'image',
                        tag: '',
                        publish: false,
                        title: title,
                        last_modified: last_modified,
                        orientation: orientation,
                        width: w,
                        height: h
                    });
                }
            });
        });
        //global.__images = items;
    } else items = global.__images;

    var site = req.query.site || '';
    if (site.length > 0) items = _.filter(items, x => x.site == site);

    return __apiResponse({ ok: true, items: items }, res);
}

module.exports = {
    get_filter: get_filter
};