var appRoot = '/home/centos/glits/code/nodejs/SIFY_server'
var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
//var jsonUtils = require(appRoot + '/utils/json.utils');
var sqldb = require(appRoot+'/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

var dbutil = require(appRoot + '/utils/db.utils');

/**************************************************************************************
* Controller     : insertemployeeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.insertzoneMdl = function (data, user, callback) {
    var fnm = 'insertzoneMdl';

	var QRY_TO_EXEC = `insert into zones set zone_name= '${data.zone_name}', zone_status=1, 
    zone_date_created = CURRENT_TIMESTAMP()`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
* Controller     : insertemployeeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.getzonelistMdl = function (data, user, callback) {
    var fnm = 'getzonelistMdl';
    let qry = ``
    if(data.status === 1){
        qry = `where zone_status = 1;`;
    }
    if(data.status === 0){
        qry = ``;
    }
    var QRY_TO_EXEC = `select * from zones ${qry};`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : insertemployeeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.getbyidzoneMdl = function (data, user, callback) {
    var fnm = 'getbyidzoneMdl';

	var QRY_TO_EXEC = `select * from zones where zone_id=${data};`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
* Controller     : insertemployeeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.updatezoneMdl = function (data, user, callback) {
    let qry = ``
  
  
    if(data.zone_name){
        qry = `zone_name= '${data.zone_name}', zone_date_updated = CURRENT_TIMESTAMP()`
    }
    
    var fnm = 'updatezoneMdl';

	var QRY_TO_EXEC = `update zones set ${qry} where zone_id=${data.zone_id};`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
* Controller     : insertemployeeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 05/04/2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.deletezoneMdl = function (data, user, callback) {

    var fnm = 'deletezoneMdl';

	var QRY_TO_EXEC = `update zones set zone_status=${data.zone_status}, zone_date_updated = CURRENT_TIMESTAMP() where zone_id=${data.zone_id};`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
* Controller     : getzonesstatesandclustersMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 26/04/2023   -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.getzonesstatesandclustersMdl = function (data, user, callback) {

    var fnm = 'deletgetzonesstatesandclustersMdlezoneMdl';

	var QRY_TO_EXEC = `SELECT z.zone_id,z.zone_status,z.zone_name,s.state_id,s.state_name,c.cluster_id,c.cluster_name
	 FROM zones  as z
    join states as s on z.zone_id = s.zone_id 
    join clusters as c on s.state_id = c.state_id and c.zone_id=z.zone_id order by z.zone_id asc;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}




/**************************************************************************************
* Controller     : zoneCtrl
* Parameters     : req,res()
* Description    : get details of Employees List
* Change History :
* 24--01-2024   -  Srikanth G  - Initial Function
*
***************************************************************************************/
exports.getallemployeesdetailsMdl = function (data, user, callback) {
    var fnm = 'getallemployeesdetailsMdl';
    
     console.log("success", data)
	 
	 let qry= ``;
	 
		// if (user.emp_designation == 234){
		// qry = ` and e.cluster_id in (${user.cluster_id})`

		// }

	var QRY_TO_EXEC = `select e.*,v.vendor_name,z.zone_name,sc.sub_cat_name as 'member_type_name',e.lock_user,sc1.sub_cat_name as 'team_type',s.state_name,c.cluster_name,r.role_name from employees as e
left join zones as z on z.zone_id=e.zone_id 
left join states as s on s.state_id=e.state
left join clusters as c on c.cluster_id=e.cluster_id 
left join roles as r on r.role_id=e.emp_role 
left join vendors as v on v.vendor_id=e.vendor_name 
left join sub_categories as sc on sub_cat_id=e.member_type
left join sub_categories as sc1 on sc1.sub_cat_id=e.team_type
left join shifts as sf on sf.shift_id=e.shift_type_id
 where emp_status not in (2) and e.emp_designation not in (284,234) and team_type not in (417,418) ${qry} order by e.emp_id desc`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
    sqldb.MySQLConPool.connection.release()
}