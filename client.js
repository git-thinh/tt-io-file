const __ENV = process.env.__ENV || 'DEV';
const __SETTING = require('./setting.json')[__ENV];
console.log(__SETTING);

let grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = __dirname + '/proto/iofile.proto';
let packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
let iofile_proto = grpc.loadPackageDefinition(packageDefinition).iofile;

let _client = new iofile_proto.IoService(__SETTING.GRPC, grpc.credentials.createInsecure());

var links = {
    domain: 'test.com', paths: ['/link1', '/links']
};
_client.ioLinkUpdate(links, function (err, linkReply) {
    console.log(linkReply);
});
