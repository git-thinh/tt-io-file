const fs = require('fs');
const pdf = require('pdf-parse');

const clearTexts = [
	'Scanned with CamScanner'
];

let file = '';
file = 'C:/test/1.pdf';
file = 'D:/book/ky mon don giap - NGUYEN MANH BAO.pdf';
file = 'D:/book/Nghìn xưa văn hiến 1975 tập 1.pdf';

let dataBuffer = fs.readFileSync(file);
pdf(dataBuffer).then(function (data) {

	// number of pages
	console.log(data.numpages);
	// number of rendered pages
	console.log(data.numrender);
	// PDF info
	console.log(data.info);
	// PDF metadata
	console.log(data.metadata);
	// PDF.js version
	// check https://mozilla.github.io/pdf.js/getting_started/
	console.log(data.version);
	// PDF text
	console.log(data.text);
});
