const __ENV = process.env.__ENV || 'DEV';
const __SETTING = require('./setting.json')[__ENV];
console.log('PATH = ' + __dirname);
console.log(__SETTING);
//------------------------------------------------------------------------
global.__API = {};
global._ = require('lodash');
global._FS = require('fs');
global._PATH = require('path');
global._URL = require('url');
//------------------------------------------------------------------------
global._LZ4 = require('lz4');
global._FETCH = require('node-fetch');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
global._PUPPETEER = require('puppeteer');
//------------------------------------------------------------------------
const REDIS = require("ioredis");
global._REDIS_WRITE = new REDIS(__SETTING.REDIS_WRITE);
global._REDIS_READ = new REDIS(__SETTING.REDIS_READ);
global._REDIS_PUBSUB = new REDIS(__SETTING.REDIS_PUBSUB);
//------------------------------------------------------------------------
global.__apiResponse = function (data, res) {
    if (res) res.json(data);
    else return data;
}
global.__apiLz4ObjectJson = function (obj) {
    if (obj == null || typeof obj != 'object') return null;
    const json = JSON.stringify(obj);
    const buf = Buffer.from(json);
    const lz4 = _LZ4.encode(buf);
    return lz4;
}
__API.pdf = require('./api/pdf.js');
__API.curl = require('./api/curl.js');
__API.theme = require('./api/theme.js');
//------------------------------------------------------------------------
global.PATH_ROOT = __dirname + '\\';
const PATH_WWW = _PATH.join(__dirname, 'www/');

const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const serverHttp = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.use('/', express.static('www'));

app.get('/', (req, res) => {
    _FS.readdir(PATH_ROOT + 'test/', (err, files) => {
        if (err == null) {
            var s = '<!DOCTYPE html><html><head><title>Home</title><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>';
            files.forEach(file => {
                s += '<h3><a href="/test/' + file + '" target="_blank">' + file.substr(0, file.length - 5) + '</a></h3>';
            });
            s += '</body></html>';
            return res.end(s);
        }
        res.end('OK');
    });
});
app.get('/test/:page', (req, res) => {
    const file = PATH_ROOT + 'test/' + req.params.page;
    if (_FS.existsSync(file)) res.sendFile(file);
    else res.status(404).send('Not found');
});
app.get('/api/:module/:command', (req, res) => {
    const module = req.params.module;
    const cmd = req.params.command;
    if (__API[module] && __API[module][cmd]) __API[module][cmd](req, res);
    else res.status(404).send('Not found');
});

serverHttp.listen(__SETTING.HTTP_PORT, () => {
    console.log('HTTP_PORT = ' + __SETTING.HTTP_PORT + '\r\n');
});
//------------------------------------------------------------------------
let grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");
const serverGrpc = new grpc.Server();
let packageDefinition = grpc.loadPackageDefinition(protoLoader.loadSync("./proto/iofile.proto", { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true }));
//------------------------------------------------------------------------
const __md_defines = {};
const __mf_defines = {};
const __mf_enums = {};

const __ix_numbers = [];
const __ix_asciis = [];
const __ix_orginals = [];

function _itemIndexing(it) {
    const mf_defines = require('./setting/mf_defines.json');

}

//------------------------------------------------------------------------
let __id = 0;          // item.__id auto increment
const __it_ids = [];   // [index] = item.__id
const __it_base = [];  // [index] = item base field data
const __it_extend = [];// [index] = item extend field by jobs,...

function _itemAdd(it) {
    if (it == null) return { __ok: false, __err: 'item is NULL' };

    var model = it.__md;
    if (model == null || model == '' || typeof model != 'string')
        return { __err: 'missing field __m  or it is NULL, empty or type of __m must be string' };

    const __ix = __it_ids.length;
    __id++;
    it.__md = model;
    it.__id = __id;
    it.__ix = __ix;

    __it_ids.push(__id);
    __it_base.push(it);

    _itemIndexing(it);

    return { __ok: true, __id: __id, __ix: __ix, __md: model };
}

__API._cacheAdd = function (v) {
    if (v == null || typeof v != 'object') return;
    if (Array.isArray(v)) {
        var rs = [];
        for (var i = 0; i < v.length; i++) {
            var it = _itemAdd(v[i]);
            rs.push(it);
        }
    } else {
        var it1 = _itemAdd(v);
        return it1;
    }
}

__API._cacheUpdate = function (v) {
    if (v == null || typeof v != 'object') return;
    if (Array.isArray(v)) {
        for (var i = 0; i < v.length; i++) {
            ;
        }
    } else {
        ;
    }
}

__API._cacheRemove = function (v) {
    if (v == null || typeof v != 'number' || Array.isArray(v) == false) return;
    if (Array.isArray(v)) {
        const ixs = _.filter(_.map(__it_ids, function (x, k) {
            return _.findIndex(v, function (o) { return o == x }) == -1 ? -1 : k;
        }), function (j) { return j != -1 });
        if (ixs.length > 0) {
            for (var i = 0; i < ixs.length; i++) {
                __it_base[i] = null;
                __it_ids[i] = -1;
            }
        }
    } else {
        __id++;
        v.__id = __id;
        __it_base.push(v);
    }
}

function _cacheInit() {

}

//------------------------------------------------------------------------



//------------------------------------------------------------------------
function _ioLinkUpdate(call, callback) {
    const links = call.request;

    console.log(links);

    const linkReply = {
        ok: false,
        message: '',
        count: 0,
        total: 0
    };
    callback(null, linkReply);
}

function _update(call, callback) {
    //const m = call.request;
    ////console.log('UPDATE_CACHE = ', m);
    ////callback(null, {Ok: true, Message: '', Id: 1, Request: m});
    //self.API_ASYNC('cache/update', m).then(function (r) {
    //    //console.log('cache/update = ', r);
    //    r.Request = m;
    //    callback(null, r);
    //});
}

function _apiCall(call, callback) {
    //const m = call.request;
    ////console.log(m);
    //if (m && m.ApiName) {
    //    if (m.Input == null) m.Input = {};
    //    if (m.File != null) m.Input.___file = m.File;
    //    self.API_ASYNC(m.ApiName, m.Input).then(function (r) {
    //        //console.log(r);
    //        let ok = true;
    //        if (r.Ok) ok = r.Ok;
    //        callback(null, {
    //            Ok: ok,
    //            Request: m,
    //            Message: '',
    //            TextJsonResult: JSON.stringify(r)
    //        });
    //    });
    //} else {
    //    const errMessage = 'Missing paramenter { ApiName:..., Input:... }';
    //    callback(null, {
    //        Ok: false,
    //        Request: m,
    //        Message: errMessage,
    //        TextJsonResult: JSON.stringify({
    //            Ok: false,
    //            Message: errMessage
    //        })
    //    });
    //}
}








serverGrpc.addService(packageDefinition.iofile.IoService.service, {
    ioLinkUpdate: _ioLinkUpdate,
    //getFile: _getFile,
    //apiCall: _apiCall
});
serverGrpc.bind(__SETTING.GRPC, grpc.ServerCredentials.createInsecure());
serverGrpc.start();
console.log('GRPC_READY: ' + __SETTING.GRPC);

async function __exit() {
    await _BROWSER.close();
}