const { parentPort } = require('worker_threads')
const fetch = require('node-fetch-polyfill')

parentPort.on('message', ({file, ports}) => {
    let success = true;
    global.performance = global.performance || {
        now() {
            return Date.now();
        }
    };
    global.fetch = fetch;
    global.console = { log: () => {} }
    let error;
    try {
        require(file);
    } catch(e) {
        success = false;
        error = e.message;
    }
    ports[0].postMessage({data: {success, error}, ports: []});
})