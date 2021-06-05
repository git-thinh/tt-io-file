
async function get_image(req, res) {
    let file = req.query.file;
    console.log(file);
    file = 'file://C:/test/1.pdf';
    if (file == null) return __apiResponse({ ok: false, error: 'File invalid', file: file }, res);


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
    await page.goto(file, { waitUntil: 'networkidle0' });
    ////await page.screenshot({ path: '0.png', fullPage: true });
    //const base64 = await page.screenshot({ encoding: 'base64', fullPage: true });
    ////console.log(base64);
    //var base64Data = base64.replace(/^data:image\/png;base64,/, "");
    ////var err = _FS.writeFileSync("out.png", base64Data, 'base64');
    //var buf = Buffer.from(base64Data, 'base64');

    const buf = await page.screenshot({ encoding: 'binary', fullPage: true });
    var err = _FS.writeFileSync("1.png", buf, 'binary');
    console.log(err);
    await _REDIS_WRITE.hset('pdf:images', url, buf);

    //await page.waitFor(1000);
    await browser.close();

    return __apiResponse({ ok: true }, res);
}

module.exports = {
    get_image: get_image
};