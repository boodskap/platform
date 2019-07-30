
var API = require('../modules/api');

var Routes = function (app) {

    this.app = app;
    this.init();
    this.api = new API(app);
    this.api.init();

};
module.exports = Routes;


Routes.prototype.init = function () {

    var self = this;

    var sessionCheck = function (req, res, next) {
        var userObj = req.cookies['session_obj'];
        if (userObj) {
            next();
        } else {
            res.redirect('/login');
        }
    };


    self.app.get('/',function (req, res) {
        var userObj = req.cookies['session_obj'];
        if (userObj) {
            req.session.userObj = JSON.parse(userObj);

            res.redirect('/home');

        } else {
            res.render('login.html', {layout: false,boodskap:self.app.boodskap});
        }
    });


    self.app.get('/getfileapi', function (req, res) {
        self.api.getApiList(req,res);
    });



    self.app.get('/login', function (req, res) {
        var userObj = req.cookies['session_obj'];
        if (userObj) {
            res.redirect('/home');
        } else {
            res.render('login.html', {layout: false,boodskap:self.app.boodskap});
        }
    });

    self.app.get('/home', sessionCheck, function (req, res) {
        res.render('home.html', {layout: '',boodskap:self.app.boodskap});
    });
    self.app.get('/documentation', function (req, res) {
        var userObj = req.cookies['session_obj'];
        if (userObj) {
            res.render('documentation.html', {layout: '',boodskap:self.app.boodskap});
        } else {
            res.render('documentation-without-session.html', {layout: false});
        }
    });


};

