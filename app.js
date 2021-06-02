const __ENV = process.env.__ENV || 'DEV';
const __SETTING = require('./setting.json')[__ENV];
console.log(__SETTING);
//------------------------------------------------------------------------
const _ = require('lodash');
const FS = require('fs');
//------------------------------------------------------------------------
let grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");
const server = new grpc.Server();
let packageDefinition = grpc.loadPackageDefinition(
    protoLoader.loadSync("./proto/iofile.proto", {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    })
);
//------------------------------------------------------------------------
let __id = 0;
const __ids = [];
const __caches = [];

function _cacheAdd(v) {
    if (v == null || typeof v != 'object') return;
    if (Array.isArray(v)) {
        for (var i = 0; i < v.length; i++) {
            __id++;
            const it = v[i];
            it.__id = __id;
            it.__ix = __caches.length;
            __caches.push(it);
        }
    } else {
        __id++;
        const it = v[i];
        it.__id = __id;
        it.__ix = __caches.length;
        __caches.push(it);
    }
}

function _cacheUpdate(v) {
    if (v == null || typeof v != 'object') return;
    if (Array.isArray(v)) {
        for (var i = 0; i < v.length; i++) {
            __id++;
            const it = v[i], ix = __caches.length;
            it.__id = __id;
            it.__ix = ix;
            __caches.push(it);
            __ids.push(ix);
        }
    } else {
        __id++;
        const it = v, ix = __caches.length;
        it.__id = __id;
        it.__ix = ix;
        __caches.push(it);
        __ids.push(ix);
    }
}
function _cacheRemove(v) {
    if (v == null || typeof v != 'number' || Array.isArray(v) == false) return;
    if (Array.isArray(v)) {
        const ixs = _.filter(_.map(__ids, function (x, k) { return _.findIndex(v, function (o) { return o == x }) == -1 ? -1 : k; }), function (j) { return j != -1 });
        if (ixs.length > 0) {
            for (var i = 0; i < ixs.length; i++) {
                __caches[i] = null;
                __ids[i] = -1;
            }
        }
    } else {
        __id++;
        v.__id = __id;
        __caches.push(v);
    }
}


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








server.addService(packageDefinition.iofile.IoService.service, {
    ioLinkUpdate: _ioLinkUpdate,
    //getFile: _getFile,
    //apiCall: _apiCall
});
server.bind(__SETTING.GRPC, grpc.ServerCredentials.createInsecure());
server.start();
console.log('GRPC_READY: ' + __SETTING.GRPC + '\r\n');


