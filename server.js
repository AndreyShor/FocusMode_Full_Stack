const http = require("http");
const mongoConnect = require('./backend/util/database').mongoConnect;

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};



mongoConnect(() => {
  const app = require("./backend/app");
  
  const port = normalizePort(process.env.PORT || "800");
  app.set("port", port);
  
  const server = http.createServer(app);
  
  server.on("error", onError);
  
  server.listen(port);
});