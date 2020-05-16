const cluster = require('cluster');
const http = require('http');
const os = require('os');
const { app } = require('./src/server/app');
const cpusLength = os.cpus().length;
if (cluster.isMaster) {
    for (let i = 0; i < cpusLength; i++) {
        cluster.fork();
    }
    cluster.on('online', (worker) => {
        console.log(`process with ${worker.process.pid} id forked successfully`);
    });
    cluster.on('disconnect', (worker) => {
        console.log(`process with ${worker.process.pid} id disconnected`);
    });
    cluster.on('exit', (worker, code, singnal) => {
        console.log(`process with ${worker.process.pid} exited with ${code} code & ${signal} signal`);
    });
} else if (cluster.isWorker) {
    let server = http.createServer(app);
    server.listen(app.get('port'), () => {
        console.log(`server is up and running at ${server.address().address}:${server.address().port}`);
    });
}