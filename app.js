﻿const __ENV = process.env.__ENV || 'DEV';
const __SETTING = require('./setting.json')[__ENV];
console.log(__SETTING);
//------------------------------------------------------------------------
const _ = require('lodash');
const FS = require('fs');
//------------------------------------------------------------------------
let grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");
const server = new grpc.Server();
let packageDefinition = grpc.loadPackageDefinition(protoLoader.loadSync("./proto/iofile.proto", { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true }));
//------------------------------------------------------------------------
const __md_defines = {};
const __mf_defines = {};
const __mf_enums = {};

const __ix_numbers = [];
const __ix_asciis = [];
const __ix_orginals = [];

function _itemIndexing(it) {
    const mf_defines = require('./data/mf_defines.json');

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

    return { __ok: true, __id = __id, __ix = __ix, __md = model };
}

function _cacheAdd(v) {
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

function _cacheUpdate(v) {
    if (v == null || typeof v != 'object') return;
    if (Array.isArray(v)) {
        for (var i = 0; i < v.length; i++) {
        }
    } else {
    }
}

function _cacheRemove(v) {
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








server.addService(packageDefinition.iofile.IoService.service, {
    ioLinkUpdate: _ioLinkUpdate,
    //getFile: _getFile,
    //apiCall: _apiCall
});
server.bind(__SETTING.GRPC, grpc.ServerCredentials.createInsecure());
server.start();
console.log('GRPC_READY: ' + __SETTING.GRPC + '\r\n');


