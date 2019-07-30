
var Routes = function (app) {

    this.app = app;
    this.init();

};
module.exports = Routes;


Routes.prototype.init = function () {

    var self = this;

    var sessionCheck = function (req, res, next) {
        var userObj = req.cookies['session_obj'];
        if (userObj) {
            console.log(new Date() + " | unauthorized access");
            res.sendStatus(401)
        } else {
            res.redirect('/login');
        }
    };


    self.app.get('/', function (req, res) {
        var userObj = req.cookies['session_obj'];
        if (userObj) {
            req.session.userObj = JSON.parse(userObj);

            res.redirect('/dashboard');

        } else {
            res.render('login.html', {layout: false,boodskap:self.app.boodskap});
        }
    });


    self.app.get('/login', function (req, res) {
        var userObj = req.cookies['session_obj'];
        if (userObj) {
            res.redirect('/home');
        } else {
            res.render('login.html', {layout: false,boodskap:self.app.boodskap});
        }
    });
    self.app.get('/home', function (req, res) {
        res.render('home.html', {layout: '',boodskap:self.app.boodskap});
    });


    self.app.get('/404', sessionCheck, function (req, res) {
        res.render('404.html', {layout: '',boodskap:self.app.boodskap});
    });



};

