const unlisten = async (req, res, emitter) => {
  emitter.off("txPool");
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      data: "Goodbye World!",
    })
  );
};
module.exports = unlisten;
