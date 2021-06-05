
async function get_xpath(req, res) {
    const url = req.query.url;
    const uri = _URL.parse(url, true);
    //console.log(uri);
    if (uri.host == null) return __apiResponse({ ok: false, url: url, error: 'Url invalid' }, res);

    const hostName = uri.hostname;
    let domain = hostName.toLowerCase();
    if (domain.startsWith('www.')) domain = domain.substr(4);

    let html = '', lz4, body;
    let exist = await _REDIS_READ.hexists('curl:' + domain, uri.path);
    exist = false;
    //console.log(exist);
    if (exist) {
        lz4 = await _REDIS_READ.hget('curl:' + domain, uri.path);
        body = _LZ4.decode(lz4);
    } else {
        const response = await _FETCH(url);
        body = await response.buffer();
        lz4 = _LZ4.encode(body);
        await _REDIS_WRITE.hset('curl:' + domain, uri.path, lz4);
    }
    //console.log(body.length, lz4.length);
    if (body != null) html = body.toString('utf8');

    return __apiResponse({ ok: true, url: url, html: html }, res);
}

async function get_cookie(req, res) {
    const url = req.query.url;
    const uri = _URL.parse(url, true);
    //console.log(uri);
    if (uri.host == null) return __apiResponse({ ok: false, url: url, error: 'Url invalid' }, res);

    const response = await _FETCH(url);
    const cookies = response.headers.raw()['set-cookie'];
    await _REDIS_WRITE.hset('curl:cookies', url, cookies);
    //console.log(cookies);

    return __apiResponse({ ok: true, url: url, cookies: cookies }, res);
}

async function get_header(req, res) {
    const url = req.query.url;
    const uri = _URL.parse(url, true);
    //console.log(uri);
    if (uri.host == null) return __apiResponse({ ok: false, url: url, error: 'Url invalid' }, res);

    const response = await _FETCH(url);
    const header = response.headers.raw();
    //console.log(header);
    await _REDIS_WRITE.hset('curl:header', url, JSON.stringify(header));

    return __apiResponse({ ok: true, url: url, header: header }, res);
}

async function get_page(req, res) {
    const url = req.query.url;
    const uri = _URL.parse(url, true);
    //console.log(uri);
    if (uri.host == null) return __apiResponse({ ok: false, error: 'Url invalid', url: url }, res);
    const resources = [];


    const m_browser = await _PUPPETEER.launch({
        "headless": true,
        userDataDir: './puppeteer',
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

    return __apiResponse({ ok: true, resources: resources }, res);
}

async function get_youtube(req, res) {
    const url = req.query.url;
    const uri = _URL.parse(url, true);
    //console.log(uri);
    if (uri.host == null) return __apiResponse({ ok: false, error: 'Url invalid', url: url }, res);
    const resources = [];


    const browser = await _PUPPETEER.launch({
        "headless": true,
        userDataDir: './puppeteer',
        args: [
            '--start-maximized',
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 2000 });

    let urlVideo = '';

    await page.setRequestInterception(true);
    page.on('request', r => {
        const type = r.resourceType();//document
        const url_ = r.url();
        resources.push({ type: type, url: url_ });
        //r.abort();

        if (urlVideo.length > 0) return r.abort();
        if (url_.indexOf('.googlevideo.com/videoplayback') > 0) {
            urlVideo = url_;
            console.log(url_);
            return r.abort();
        }

        r.continue();
    });

    await page.goto(url, { waitUntil: 'networkidle0' });
    await _REDIS_WRITE.hset('curl:request', url, JSON.stringify(resources));

    const { createWriteStream } = require('fs');
    const { pipeline } = require('stream');
    const { promisify } = require('util');

    const streamPipeline = promisify(pipeline);
    const response = await _FETCH(urlVideo);
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
    await streamPipeline(response.body, createWriteStream('./yp.mp4'));

    ////await page.waitFor(1000);
    await browser.close();
    return __apiResponse({ ok: true, url: url, video: urlVideo, resources: resources }, res);
}

async function get_request(req, res) {
    const url = req.query.url;
    const uri = _URL.parse(url, true);
    //console.log(uri);
    if (uri.host == null) return __apiResponse({ ok: false, error: 'Url invalid', url: url }, res);
    const resources = [];


    const browser = await _PUPPETEER.launch({
        "headless": true,
        userDataDir: './puppeteer',
        args: [
            '--start-maximized',
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 2000 });

    await page.setRequestInterception(true);
    page.on('request', r => {
        const type = r.resourceType();//document
        const url_ = r.url();
        resources.push({ type: type, url: url_ });
        //r.abort();
        r.continue();
    });

    await page.goto(url, { waitUntil: 'networkidle0' });
    //await page.waitFor(1000);
    await browser.close();

    await _REDIS_WRITE.hset('curl:request', url, JSON.stringify(resources));

    return __apiResponse({ ok: true, resources: resources }, res);
}

async function get_screenshot(req, res) {
    const url = req.query.url;
    const uri = _URL.parse(url, true);
    //console.log(uri);
    if (uri.host == null) return __apiResponse({ ok: false, error: 'Url invalid', url: url }, res);


    const browser = await _PUPPETEER.launch({
        headless: true,
        args: [
            '--start-maximized',
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 1500 });

    //await page.goto(__url);
    await page.goto(url, { waitUntil: 'networkidle0' });
    ////await page.screenshot({ path: '0.png', fullPage: true });
    //const base64 = await page.screenshot({ encoding: 'base64', fullPage: true });
    ////console.log(base64);
    //var base64Data = base64.replace(/^data:image\/png;base64,/, "");
    ////var err = _FS.writeFileSync("out.png", base64Data, 'base64');
    //var buf = Buffer.from(base64Data, 'base64');

    const buf = await page.screenshot({ encoding: 'binary', fullPage: true });
    //var err = _FS.writeFileSync("1.png", buf, 'binary');
    //console.log(err);
    await _REDIS_WRITE.hset('curl:screenshot', url, buf);

    //await page.waitFor(1000);
    await browser.close();

    return __apiResponse({ ok: true }, res);
}

module.exports = {
    get_screenshot: get_screenshot,
    get_youtube: get_youtube,
    get_request: get_request,
    get_xpath: get_xpath,
    get_header: get_header,
    get_cookie: get_cookie
};