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

async function get_resources(req, res) {
    const url = req.query.url;
    const uri = _URL.parse(url, true);
    //console.log(uri);
    if (uri.host == null) return res.json({ ok: false, error: 'Url invalid', url: url });
    const resources = [];


    const m_browser = await _PUPPETEER.launch({
        "headless": true,
        userDataDir: './puppeteer/theme',
        args: ['--start-maximized']
    });
    const m_page = await m_browser.newPage();
    await m_page.setViewport({ width: 1366, height: 2000 });

    //m_page.on('response', async response => {
    //    if (__pageType == 0) {
    //        const url_ = response.url();
    //        if (url_.startsWith(__url2)) {
    //            var v = await response.text();
    //            __list.push(v);
    //            //console.log('-->[0] ' + url_);
    //            __pageOpening = false;
    //        }
    //    }
    //});
    //m_page.on('load', async () => {
    //    if (__pageType == 1) {
    //        console.log("Loaded: " + m_page.url());
    //        await m_page.screenshot({ path: '1.png' });
    //    }
    //});

    await m_page.setRequestInterception(true);
    m_page.on('request', r => {
        const type = r.resourceType();//document
        const url_ = r.url();
        resources.push({ type: type, url: url_ });
        //r.abort();
        r.continue();
    });

    //__pageOpening = true;
    //await m_page.goto(__url);
    await m_page.goto(url, { waitUntil: 'networkidle0' });
    //await m_page.screenshot({ path: '0.png' });

    console.log('DONE ...');

    await m_browser.close();


    res.json({ ok: true, resources: resources });
}

function _init(app) {
    //app.get('/api/theme', (req, res) => {
    //    const file = PATH_ROOT + 'ui/test/' + ;
    //    if (fs.existsSync(file)) res.sendFile(file);
    //    else res.status(404).send('Not found');
    //    delete require.cache[require.resolve(PATH_ROOT + '_data/ui.json')];
    //    UI = require(PATH_ROOT + '_data/ui.json');
    //    res.json(UI);
    //    res.end();
    //});
}

module.exports = {
    get_resources: get_resources
};