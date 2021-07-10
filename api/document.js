const fs = require("fs");

async function get_filter(req, res) {
    let items = [];
    global.__articles = null;
    if (global.__articles == null) {

        fs.readdirSync(_ROOT + 'raw\\document').forEach(name => {
            const key = name.substr(0, name.length - 4);
            const s = fs.readFileSync(_ROOT + 'raw\\document\\' + name).toString('utf8').trim();

            const a = _.map(s.split('\n'), x => x.trim());

            let type = '', tags = [], domains = [];
            if (a.length > 1 && a[1].length > 0 && a[1][0] == '#') type = a[1].substr(1).trim();
            if (a.length > 2 && a[2].length > 0 && a[2][0] == '#') tags = _.map(a[2].substr(1).trim().split(','), x => x.trim());
            if (a.length > 3 && a[3].length > 0 && a[3][0] == '#') domains = _.map(a[3].substr(1).trim().split(','), x => x.trim());

            let simg = '', contents = [];
            for (var i = 0; i < a.length; i++) {
                const sl = a[i].toLowerCase();
                if (sl.indexOf('.jpg') != -1 || sl.indexOf('.jpeg') != -1 || sl.indexOf('.png') != -1) {
                    simg += '|' + a[i];
                }
                if (i > 0 && sl[0] != '#' && sl.length > 0) contents.push(a[i]);
            }
            let images = _.filter(simg.split('|'), x => x.trim().length > 0);

            items.push({
                title: a[0].trim(),
                key: key,
                domains: domains,
                type: type,
                tags: tags,
                publish: true,
                path: 'raw\\document\\' + name,
                images: images,
                description: contents[0],
                content: contents.join('\n').trim()
            });
            //console.log(name);
        });

        //fs.readdirSync(_ROOT + 'raw').forEach(dir => {
        //    switch (dir) {
        //        case 'article':
        //        case 'book':
        //            fs.readdirSync(_ROOT + 'raw\\' + dir).forEach(site => {
        //                fs.readdirSync(_ROOT + 'raw\\' + dir + '\\' + site).forEach(name => {
        //                    const key = name.substr(0, name.length - 4);
        //                    const s = fs.readFileSync(_ROOT + 'raw\\' + dir + '\\' + site + '\\' + name).toString('utf8');
        //                    const a = s.split('\n');
        //                    items.push({
        //                        key: dir + '.' + key,
        //                        site: site,
        //                        type: dir,
        //                        tag: a[1].trim(),
        //                        publish: true,
        //                        path: 'raw\\' + dir + '\\' + name,
        //                        title: a[0].trim(),
        //                        images: [],
        //                        data: s
        //                    });
        //                    //console.log(name);
        //                });
        //            });
        //            break;
        //        case 'theme':
        //            fs.readdirSync(_ROOT + 'raw\\' + dir).forEach(tag => {
        //                fs.readdirSync(_ROOT + 'raw\\' + dir + '\\' + tag).forEach(name => {
        //                    if (name.endsWith('.html')) {
        //                        const key = name.substr(0, name.length - 5);
        //                        const file = 'raw\\' + dir + '\\' + tag + '\\' + name;
        //                        const s = fs.readFileSync(_ROOT + file).toString('utf8');
        //                        items.push({
        //                            key: dir + '.' + tag + '.' + key,
        //                            type: dir,
        //                            tag: tag,
        //                            publish: true,
        //                            path: file,
        //                            title: tag + ' ' + key,
        //                            images: ['/static/theme/' + tag + '/' + key + '.png'],
        //                            data: s
        //                        });
        //                        //console.log(name);
        //                    }
        //                });
        //            });
        //            break;
        //    }
        //});

        global.__articles = items;
    } else items = global.__articles;

    var site = req.query.site || '';
    if (site.length > 0) items = _.filter(items, x => x.site == site);

    return __apiResponse({ ok: true, items: items }, res);
}

module.exports = {
    get_filter: get_filter
};