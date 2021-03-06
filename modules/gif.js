var ffmpeg      = require('fluent-ffmpeg');
var path        = require('path');
var fs          = require('fs');

module.exports = function (videoFilePath, filePath, startTime, size, ifps, cb) {
    var ws  = fs.createWriteStream(path.resolve(filePath));
    var f   = ffmpeg(videoFilePath)
        .format('gif')
        .setStartTime(startTime);

    size && f.size(size);
    ifps && f.inputFPS(ifps);

    f.on('error', cb)
        .on('end', cb)
        .writeToStream(ws, { end: true });
}
