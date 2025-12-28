const chunkspying = (req, res, next) => {
    // A middleware for calculating or monitoring a chunks of file which was receiving
    let received = 0;
    let count = 1;
    const total = req.headers['content-length'];

    req.on('data', (chunk) => {
        received += chunk.length;
        count += 1;
        const percentage = ((received / total) * 100).toFixed(2);
        console.log(`${count}. Receiving chunks... Progress: ${percentage}% (${received} bytes) [each-chunk size: ${chunk.length}]`);
    });

    next(); // Pass to Multer after setting up the listener
}

module.exports = chunkspying;