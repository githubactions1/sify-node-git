var appRoot = '/home/phpb/actions-runner/_work/sify-node-git/sify-node-git/'
var std = require( appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var scheduleJobsMdl = require(appRoot + '/server/modules/scheduleJobs/models/scheduleJobsMdl');


/**************************************************************************************
* Controller     : tokenExpiry
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 11-09-2023   -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.tokenexpiryCtrl = (req, res) => {

    scheduleJobsMdl.tokenexpiryMdl()
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}