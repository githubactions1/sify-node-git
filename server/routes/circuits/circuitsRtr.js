var circuitsRtr = require('express').Router();
var appRoot = '/home/phpb/actions-runner/_work/sify-node-git/sify-node-git/'
var modRoot = appRoot + '/server/modules/circuits/'
var SnModRoot = appRoot + '/server/modules/auth/'
var checkUser = require(SnModRoot + 'controllers/accessCtrl');

const circuitsCtrl = require(modRoot + 'controllers/circuitsCtrl');

circuitsRtr.post('/getcircuitsbyuserstatus',checkUser.hasToken, circuitsCtrl.getcircuitdetailsbyuserstatusCtrl);


module.exports = circuitsRtr;