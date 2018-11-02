const { Worker, MessageChannel } = require('worker_threads');
const path = require('path');
const glob = require('glob');
const { problemsGlob, timeout, workerPath } = require('./config');
const ProgressBar = require('progress');

(async function() {
    const wPath = path.resolve(workerPath)
    const maxExecTime = timeout;
    const results = new Map();
    let worker = new Worker(wPath);
    const files = await problemFiles();

    let currFile = 0;
    for(const file of files) {
        const bar = new ProgressBar(':bar :percent', { total: files.length, width: 60, head: '>' });
        const start = Date.now();
        let success = true;
        try {
            await safeExec(file);
        } catch(e) {
            console.error('Error in ' + file + '\n' + e);
            success = false
        }
        const stop = Date.now();
        results.set( file, {time: stop - start, success });
        bar.update((currFile + 1) / files.length);
        currFile ++;
    }
    worker.terminate();
    report(results);

    function problemFiles() {
        return new Promise((resolve, reject) => {
            glob(problemsGlob, undefined, (err, files) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(files.map(file => path.resolve(file)))
                }
            })
        })
    }

    function safeExec(file) {
        return new Promise((resolve, reject) => {
            const mc = new MessageChannel();
            
            const timeout = setTimeout(() => {
                worker.terminate();
                worker = new Worker(workerPath);
                reject(`Problem timed out after ${maxExecTime / 1000} seconds`)
            }, maxExecTime);

            mc.port1.once('error', (e) => reject(e));
            mc.port1.once('message', ({ data }) => {
                clearTimeout(timeout);
                if(data.success) {
                    resolve();
                } else {
                    reject(data.error);
                }
            });

            const ports = [mc.port2]

            worker.postMessage({file, ports}, ports);
        });
    }

    function report(resultMap) {
        const numTests = resultMap.size;
        let results = [], totalTime = 0, errors = 0;
        for(const [test, testData] of resultMap.entries()) {
            results.push({ test, ...testData });
            if(testData.success) {
                totalTime += testData.time
            } else {
                errors ++;
            }
        }
        results.sort((a,b) => b.time - a.time);

        console.log('\n' + `Ran ${numTests} problems in ${totalTime / 1000} seconds for an average of ${ totalTime / (numTests - errors )} ms per test`);
        console.log(`Found ${errors} errors`);
        const problemReport = results
            .filter((_, i) => i < 5)
            .map((el, i) => `${path.basename(el.test)} - ${el.time} ms`)
            .reduce((acc, el) => acc + "\n" + el);
        console.log('Slowest problems include\n' + problemReport);
    }
})()