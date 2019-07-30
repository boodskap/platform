var swaggerUi = require('swagger-ui-express');
var YAML = require('yamljs');
var fs = require('fs');
var async = require('async');
var express = require('express');
const router = express.Router();

var Api = function (app) {
    this.app = app;
    this.apiFolderPath = app.apiFolderPath;

};
module.exports = Api;


Api.prototype.init = function () {

    const self = this;

    var options = {
        customCss: '.swagger-ui .topbar { display: none } .models,.information-container {display: none !important}',
        customJs: '/swagger.js'

    };


    fs.readdir(self.apiFolderPath, function (err, files) {


        async.mapSeries(files, function (file, cbk) {

            const swaggerDocument = YAML.load(self.apiFolderPath + "/" + file);


            var swaggerHtml = swaggerUi.generateHTML(swaggerDocument, options)

            var url = file.split(".")[0].replace("api","doc");

            self.app.use('/' + url, swaggerUi.serveFiles(swaggerDocument, options))
            self.app.get('/' + url, (req, res) => { res.send(swaggerHtml) });

            console.log(new Date() + " | /"+url+" api docs url registered")

            cbk(null, null)

        }, function (err, result) {

            console.log(new Date() + " | "+files.length+" API Documents Loaded")
        })

    });


}


Api.prototype.getApiList = function (req, res) {

    const self = this;

    fs.readdir(self.apiFolderPath, function (err, files) {

        if (err) {
            res.json({status:false,error:err})
        }else{
            res.json({status:true,data:files})
        }
    })
}