require('dotenv').config();
const app = require('./api/app');
const http = require('http');
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const numWorkers = os.cpus().length;
  console.log('Master cluster setting up ' + numWorkers + ' workers');

  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on('online', (worker) => {
    console.log('worker ' + worker.process.pid + ' is online');
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} died with code: ${code}  and signal: ${signal}`
    );
    console.log('Starting a new worker');
    cluster.fork();
  });
} else {
  const server = http.createServer(app);

  const port = process.env.PORT || 4000;

  server.listen(port, () => {
    console.log(`server running at port ${port}...`);
  });
}

// -------- For Localhost -----

// const server = http.createServer(app);
// const port = process.env.PORT || 4000;
// server.listen(port, () => {
//   console.log(`server running at port ${port}...`);
// });
