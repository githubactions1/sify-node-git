var appRoot = '/home/phpb/actions-runner/_work/sify-node-git/sify-node-git/';
var checklistMdl = require(appRoot + 'server/modules/checklist/models/checklistMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
const mime = require('mime');
var fs = require("fs");
const path = require("path");

/**************************************************************************************
* Controller     : updateorInsrtchcklstCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 26/04/2023   -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.updateorInsrtchcklstCtrl = function (req, res) {
	var fnm = "updateorInsrtchcklstCtrl";
    
    checklistMdl.getchcklstDtlsMdl(req.body.data, req.user)
        .then((results) => {
			var length = results[0].count;
            checklistMdl.updateorInsrtchcklstMdl(req.body.data, length, req.user)
				.then((results) => {
					df.formatSucessAppRes(req, res, JSON.stringify(req.body.data), cntxtDtls, fnm, {});
				}).catch((error) => {
					df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Failed to Insert/Update to DB" });
				});
        }).catch((error) => {
			console.log(error)
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : chcklistimageDataUrlCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 26/04/2023   -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.chcklistimageDataUrlCtrl = function (req, res) {
	var fnm = "chcklistimageDataUrlCtrl";

    function img_upload(img, flname, callback) {
    var response = {};
    response.type = 'jpeg';
    response.data = Buffer.from(img, 'base64');
    let decodedImg = response;
    let imageBuffer = decodedImg.data;
    let type = decodedImg.type;
	const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var currentDate = new Date();
	var month = monthNames[currentDate.getMonth()];
	console.log(month,"monthhtthhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
	var day = moment(currentDate).format( "DD-MM-YYYY");
	console.log(day,"dayyyyyyyyyyyyyyyyyyyyyyyyyy")
	var formatdatetime = moment(currentDate).format( "DD-MM-YYYY-HHmmss");
	console.log(formatdatetime,"toimeeeeeeeeeeeeeeeeeeeeeeeeeeee")
    // var year = currentDate.getFullYear();
	var year = currentDate.getFullYear().toString()
    // var month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    // var day = String(currentDate.getDate()).padStart(2, '0');

    var name = 'offr_img_' + Date.now();
    let fileName = flname + "_" + name + ".jpg";
	 // let fileName = filename+"_"+ formatdatetime + "." + extension;
	 // var dir = '/home/centos/glits/production/uploads/'+month+'/'+day+'' ;
    var dir = `/home/centos/glits/checklist/images/${year}/${month}/${day}`;

    var url = 'http://sifydev.digitalrupay.com/checklistimagesProd/'+year+'/'+month+'/'+day+'';
	console.log(url);
    console.log(fs.existsSync(dir));

    if (!fs.existsSync(dir)) {
        // Create directory recursively
        fs.mkdirSync(dir, { recursive: true });
    }

     try {
  
		fs.writeFileSync(dir + "/" + fileName, imageBuffer, 'utf8');
            res['Location'] = `${dir}/${fileName}`;
			 res['url'] = `${url}/${fileName}`
			console.log("Location",res['Location']);
			 console.log("url",res['url'])
             callback(false, res.url)
     } catch (e) {
        console.error(e);
         callback(true, e.message); 
    }
 }





//var res = {};

	img_upload(req.body.img, req.body.stt_no,(err, attKycChres) => {
		if (!err) {
			console.log("attKycChres",attKycChres)
			df.formatSucessAppRes(req, res, attKycChres, cntxtDtls, fnm, {});
			
		} else {
			 console.error("Error uploading image:", attKycChres);
        df.formatErrorRes(req, res, attKycChres, cntxtDtls, fnm, { error_status: "707", err_message: "Failed to Insert image" });
		}
	});
	
	
	
	
	
				
}

