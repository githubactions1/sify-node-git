var reportsRtr = require('express').Router();
var appRoot ='/home/phpb/actions-runner/_work/sify-node-git/sify-node-git/'
var modRoot = appRoot + '/server/modules/reports/'
var SnModRoot = appRoot + '/server/modules/auth/'
var checkUser = require(SnModRoot + 'controllers/accessCtrl');

const reportsCtrl = require(modRoot + 'controllers/reportsCtrl');

console.log("reports router")
reportsRtr.post('/attendancedataPdfrtr', checkUser.hasToken,  reportsCtrl.attendancedataPdfrtrCtrl); 
reportsRtr.post('/attendancedatartr', checkUser.hasToken,  reportsCtrl.attendancedatartrCtrl); 
reportsRtr.post('/fieldmanpowerdata', checkUser.hasToken,  reportsCtrl.FieldManpowerDtlsCtrl); 
reportsRtr.post('/taskdumpreportdata', checkUser.hasToken,  reportsCtrl.taskdumpreportdataCtrl); 

reportsRtr.post('/locationreport', checkUser.hasToken,  reportsCtrl.lcnHstryreportdataCtrl); 
reportsRtr.post('/performancereport', checkUser.hasToken,  reportsCtrl.performancereportdataCtrl); 
reportsRtr.post('/attendancedatamanagersPdf', checkUser.hasToken,  reportsCtrl.attendancedatamanagersPdfCtrl); 

reportsRtr.post('/frtteamattendencereport', checkUser.hasToken,  reportsCtrl.frtteamattendencereportCtrl);
//reportsRtr.post('/frtteamtaskdumpreportdata', checkUser.hasToken,  reportsCtrl.frtteamtaskdumpreportdataCtrl); 


reportsRtr.post('/frtteamtaskdumpreportdata', checkUser.hasToken,  reportsCtrl.frtteamtaskdumpreportdataCtrl); 

reportsRtr.post('/frtattendancedatartr', checkUser.hasToken,  reportsCtrl.frtattendancedatartrCtrl); 



module.exports = reportsRtr;