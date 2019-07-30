/*******************************
 * Import Required Modules
 ****************************/
var express = require('express');
var bodyParser = require('body-parser');
var layout = require('express-layout');
var path = require("path")
var app = express();
var cookieParser = require('cookie-parser')
var session = require('cookie-session');
var compression = require('compression')


/*******************************
 * Require Configuration
 ****************************/
var conf = require('./conf');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


// compress all responses
app.use(compression())

//For Static Files
app.set('views', path.join(__dirname, 'views'));


var options = {
    maxAge: '1d',
    setHeaders: function (res, path, stat) {
        res.set('vary', 'Accept-Encoding');
        res.set('x-timestamp', Date.now());
    }
};

var controllerOptions = {
    maxAge: 0,
    setHeaders: function (res, path, stat) {
        res.set('vary', 'Accept-Encoding');
        res.set('x-timestamp', Date.now());
    }
};

app.use('/css', express.static(__dirname + '/webapps/css', options));
app.use('/images', express.static(__dirname + '/webapps/images', options));
app.use('/fonts', express.static(__dirname + '/webapps/fonts', options));
app.use('/lib', express.static(__dirname + '/webapps/lib', options));
app.use('/js', express.static(__dirname + '/webapps/js', options));

app.use('/controllers', express.static(__dirname + '/webapps/controllers', controllerOptions));


app.use(express.static(__dirname + '/webapps', controllerOptions));


app.use(layout());

app.use(cookieParser('a deep secret'));
app.use(session({secret: 'B00DSKAP'}));


//For Template Engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set("view options", {layout: "layout.html"});



var server = require('http').Server(app);


app.conf = conf;

console.log("************************************************************");
console.log(new Date() + ' | Boodskap IoT Platform Listening on ' + conf['web']['port']);
console.log("************************************************************");

server.listen(conf['web']['port']);


var boodskap = {
    api : process.env.BOODSKAP_API_PATH ? process.env.BOODSKAP_API_PATH : '/api',
    mqtt : {
        host :process.env.BOODSKAP_MQTT_HOST ? process.env.BOODSKAP_MQTT_HOST : '/mqtt',
        port :process.env.BOODSKAP_MQTT_PORT ? process.env.BOODSKAP_MQTT_PORT : 443,
        ssl :process.env.BOODSKAP_MQTT_SSL ? (process.env.BOODSKAP_MQTT_SSL === true || process.env.BOODSKAP_MQTT_SSL === 'true' ? true : false) : false
    }
}

app.boodskap = boodskap;

//Initializing the web routes
var Routes = require('./routes/http-routes');
new Routes(app);

