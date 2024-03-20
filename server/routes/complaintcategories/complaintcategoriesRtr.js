var complaintcategoriesRtr = require('express').Router();
var appRoot = '/home/phpb/actions-runner/_work/sify-node-git/sify-node-git/'
var modRoot = appRoot + '/server/modules/complaintcategories/'
var SnModRoot = appRoot + '/server/modules/auth/'
var checkUser = require(SnModRoot + 'controllers/accessCtrl');

const complaintcategoriesCtrl = require(modRoot + 'controllers/complaintcategoriesCtrl');

complaintcategoriesRtr.post('/insertcomplaintcategories',checkUser.hasToken, complaintcategoriesCtrl.insertcategoriesCtrl);
complaintcategoriesRtr.post('/editcomplaintcategories',checkUser.hasToken, complaintcategoriesCtrl.editcomplaintcategoriesCtrl);
complaintcategoriesRtr.post('/deletecomplaintcategories',checkUser.hasToken, complaintcategoriesCtrl.deletecomplaintcategoriesCtrl);
complaintcategoriesRtr.get('/getcomplaintcategories',checkUser.hasToken, complaintcategoriesCtrl.getcomplaintcategoriesCtrl);



module.exports = complaintcategoriesRtr
