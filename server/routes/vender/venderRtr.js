var venderRtr = require('express').Router();
var appRoot = '/home/phpb/actions-runner/_work/sify-node-git/sify-node-git/'
var modRoot = appRoot + '/server/modules/vender/'
var SnModRoot = appRoot + '/server/modules/auth/'
var checkUser = require(SnModRoot + 'controllers/accessCtrl');

const venderCtrl = require(modRoot + 'controllers/venderCtrl');

venderRtr.post('/insertintovender', checkUser.hasToken,venderCtrl.insertvenderCtrl);
venderRtr.get('/getvenderdetails', checkUser.hasToken,venderCtrl.getvenderCtrl);
venderRtr.post('/updatevenderdetails', checkUser.hasToken,venderCtrl.updatevenderCtrl);
venderRtr.get('/getvenderdetailsbyid/:id', checkUser.hasToken,venderCtrl.getvenderbyidCtrl);
venderRtr.post('/deletevenderdetails', checkUser.hasToken,venderCtrl.deletevenderCtrl);

module.exports = venderRtr