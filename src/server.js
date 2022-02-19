const http = require("http");
const listen = require("./listen.js");
const url = require("url");
const unlisten = require("./unlisten.js");
const Web3Token = require("web3-token");
let emitter;
http
  .createServer(async function (req, res) {
    const { tokenAuth } = url.parse(req.url, true).query;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");

    const { address } = await Web3Token.verify(tokenAuth);
    const client = process.env.WALLETCLIENT;

    if (address.toUpperCase() !== client.toUpperCase()) {
      res.end("USTED NO ES EL CLIENTE");
      return;
    }

    var path = url.parse(req.url, true).pathname;
    if (path === "/listen") {
      emitter = await listen(req, res);
    } else if (path === "/unlisten") {
      console.log("ME DETUVE");
      unlisten(req, res, emitter);
    } else {
      res.end(404);
    }
  })
  .listen(8080);
console.log("SERVER LISTENING...");
