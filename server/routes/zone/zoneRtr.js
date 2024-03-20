var zoneRtr = require('express').Router();
var appRoot = '/home/phpb/actions-runner/_work/sify-node-git/sify-node-git/'
var modRoot = appRoot + '/server/modules/zone/'
var SnModRoot = appRoot + '/server/modules/auth/'
var checkUser = require(SnModRoot + 'controllers/accessCtrl');

const zoneCtrl = require(modRoot + 'controllers/zoneCtrl');

zoneRtr.post('/insertzone', checkUser.hasToken, zoneCtrl.insertzoneCtrl);
zoneRtr.post('/getzonelist', checkUser.hasToken, zoneCtrl.getzonelistCtrl);
zoneRtr.post('/updatezone', checkUser.hasToken, zoneCtrl.updatezoneCtrl);
zoneRtr.get('/getzonebyid/:id', checkUser.hasToken, zoneCtrl.getbyidzoneCtrl);
zoneRtr.post('/deletezone', checkUser.hasToken, zoneCtrl.deletezoneCtrl);

zoneRtr.get('/getzonesstatesandclusters', checkUser.hasToken, zoneCtrl.getzonesstatesandclustersCtrl);


zoneRtr.get('/getallemployees_list',zoneCtrl.getallemployeesdetailsCtrl);
module.exports = zoneRtr;