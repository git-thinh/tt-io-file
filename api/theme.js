const fs = require("fs");


async function getBodyContent(html, callback) {
    const browser = await puppeteer.launch({ headless: true });
    //let finalHtml = encodeURIComponent(html);
    const page = await browser.newPage();
    //await page.setExtraHTTPHeaders({ Referer: 'https://sparktoro.com/' });
    //page.on('domcontentloaded', () => { console.log('dom even fired'); });
    page.on('console', msg => {
        console.log(msg.text());
        if (callback) callback(msg.text());
    });
    //await page.goto('https://blog.risingstack.com', { waitUntil: 'networkidle0' });
    //await page.goto(`data:text/html;charset=UTF-8,${finalHtml}`, { waitUntil: 'networkidle0' });

    await page.setContent(html);

    await page.close();

    //const pdf = await page.pdf(options);
    //await browser.close();
}

function _init(app) {

    app.get('/api/theme', (req, res) => {
        delete require.cache[require.resolve(PATH_ROOT + '_data/ui.json')];
        UI = require(PATH_ROOT + '_data/ui.json');
        res.json(UI);
        res.end();
    });

    app.get('/api/theme/:page', (req, res) => {
        const file = PATH_ROOT + 'ui/test/' + req.params.page;
        if (fs.existsSync(file)) res.sendFile(file);
        else res.status(404).send('Not found');
    });
}

module.exports = {
    init: _init
};