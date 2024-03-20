var stateRtr = require('express').Router();
var appRoot = '/home/phpb/actions-runner/_work/sify-node-git/sify-node-git/'
var modRoot = appRoot + '/server/modules/state/'
var SnModRoot = appRoot + '/server/modules/auth/'
var checkUser = require(SnModRoot + 'controllers/accessCtrl');

const stateCtrl = require(modRoot + 'controllers/stateCtrl');

stateRtr.post('/insertstate', checkUser.hasToken, stateCtrl.insertstateCtrl);
stateRtr.post('/getstatelist', checkUser.hasToken, stateCtrl.getstatelistCtrl);
stateRtr.post('/updatestate', checkUser.hasToken, stateCtrl.updatestateCtrl);
stateRtr.get('/getstatebyid/:id', checkUser.hasToken, stateCtrl.getbyidstateCtrl);
stateRtr.post('/deletestate', checkUser.hasToken, stateCtrl.deletestateCtrl);
stateRtr.post('/getstatebyzone', checkUser.hasToken, stateCtrl.getstatebyzoneCtrl);

module.exports = stateRtr;