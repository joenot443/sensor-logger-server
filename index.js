var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var json2csv = require('json2csv');
var fs = require('fs');

var dataStores = {
    "accel": [],
    "gyro": [],
    "magnet": []
};

var fields = ['x', 'y', 'z'];

app.get('/accel', function (req, res) {
    console.log(req.headers.accel.toString());
    logData('accel', JSON.parse(req.headers.accel));
    res.send('Received accel data.');
});

app.get('/gyro', function (req, res) {
    console.log(req.headers.gyro.toString());
    logData('gyro', JSON.parse(req.headers.gyro));
    res.send('Received gyro data.');
});

app.get('/magnet', function (req, res) {
    console.log(req.headers.magnet.toString());
    logData('magnet', JSON.parse(req.headers.magnet));
    res.send('Received magnet data.');
});

/*
Sends a JSON object of the logged data for the requested sensor
(accel, gyro, magnet)
*/

app.get('/*json', function (req, res) {
    var type = req.url.slice(1, -4);
    if (type in dataStores) {
        console.log(dataStores);
        res.send(dataStores[type]);
    } else {
        res.send("No logged data for " + type);
    }
});

app.get('/*csv', function (req, res) {
    console.log(req.url);
    var type = req.url.slice(1, -3);
    var csv = json2csv({
        data: dataStores[type],
        fields: fields
    });
    fs.writeFile('./' + type + Date.now() + '.csv', csv, function (err) {
        if (err) {
            console.log(err);
            res.send("Error saving CSV file");
        } else {
            res.send("Saved CSV file for " + type);
        }
    });
});

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.broadcast.emit('connection');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('accel', function (data) {
        console.log(data.toString());
        logData('accel', data);
    });

    socket.on('gyro', function (data) {
        console.log(data.toString());
        logData('gyro', data);
    });

    socket.on('magnet', function (data) {
        console.log(data.toString());
        logData('magnet', data);
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});

function logData(dataType, data) {
    dataStores[dataType].push({
        "x": data[0],
        "y": data[1],
        "z": data[2]
    });
}
