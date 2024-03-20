var appRoot ='/home/phpb/actions-runner/_work/sify-node-git/sify-node-git/'
var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
//var jsonUtils = require(appRoot + '/utils/json.utils');
var sqldb = require(appRoot+'/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
moment = require('moment');
var mysql=require('mysql')
var dbutil = require(appRoot + '/utils/db.utils');


/**************************************************************************************
* Controller     : chckpincodefrSNMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 25/07/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.chckpincodefrSNMdl = function(data){
	var fnm = 'chckpincodefrSNMdl'; 
	var QRY_TO_EXEC = `select cluster_name,cluster_id from clusters where pincodes like '%${data.taskAddress.pincode}%'`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : getapicalltaskdatabyIdMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 25/07/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.getapicalltaskdatabyIdMdl = function(service_no){
	var fnm = 'getapicalltaskdatabyIdMdl';
	var QRY_TO_EXEC = `select task_id as id,task_no as primaryAssignment,service_no as externalID from tasks where service_no='${service_no}'`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : insrtapicalldtlsMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 25/07/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.insrtapicalldtlsMdl = function(reqst, data, options, web_app, user){
	var fnm = 'insrtapicalldtlsMdl';
	var emp_id=0;
	if(user){
		if(user.emp_id)
		emp_id = user.emp_id;
	}
	var QRY_TO_EXEC = `insert into api_rqst_cl_dtl_t ( web_app,task_id, task_no, service_no, url_tx, url_dta_tx, hdr_tx, crte_usr_id, a_in, i_ts) 
	values (${web_app},'${data.id}','${data.primaryAssignment}','${data.externalID}','${JSON.stringify(options.url)}','${JSON.stringify(options.data).replace(/'/g, "''")}','${JSON.stringify(options.headers).replace(/'/g, "''")}','${emp_id}',1,current_timestamp());`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : updateapicalldtlsMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 25/07/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.updateapicalldtlsMdl = function(reqst, id, data, resp){
	var fnm = 'updateapicalldtlsMdl';
	const statusCode = resp.status !== undefined ? resp.status : resp.statusCode;
	// var QRY_TO_EXEC = `update api_rqst_cl_dtl_t set rspne_tx='${JSON.stringify(reqst).replace(/'/g, "''")}',respnse_hdr='${statusCode}' where rest_cl_id=${id};`
	var QRY_TO_EXEC = `update api_rqst_cl_dtl_t set rspne_tx='${JSON.stringify(reqst).replace(/'/g, "''")}',respnse_hdr='${resp.status}' where rest_cl_id=${id};`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : childtaskdatafrutilizationMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 01/07/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.childtaskdatafrutilizationMdl = function(reqst, data){
	var fnm = 'childtaskdatafrutilizationMdl';
	var QRY_TO_EXEC = `select group_concat(distinct(call_attend_by)) as call_attnd from tasks where parent_id='${data.task_id}' and task_status not in (271,408) ;`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : utilizationReduceCountMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 30/06/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.utilizationReduceCountMdl = function(empassgnId ){
	var fnm = 'utilizationReduceCountMdl';
	
	var QRY_TO_EXEC = `update attendence set utilization_count = utilization_count - 1 where date_format(i_ts,'%Y-%m-%d')=curdate() and emp_id in (${empassgnId}) and utilization_count>0`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : utilizationCountMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 30/06/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.utilizationCountMdl = function(engassgn ,engassgnId ,regassgn ,regassgnId ){
	var fnm = 'utilizationCountMdl';
	var empIds;
	if(engassgn == true && regassgn == true ){
		empIds = `${engassgnId},${regassgnId}`
	} else if(engassgn == true && regassgn == false ){
		empIds = engassgnId
	} else if(engassgn == false && regassgn == true ){
		empIds = regassgnId
	}
	var QRY_TO_EXEC = `update attendence set utilization_count = utilization_count + 1 where date_format(i_ts,'%Y-%m-%d')=curdate() and emp_id in (${empIds}) `
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : getSottaskScnClsdetailsMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 15/06/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.getSottaskScnClsdetailsMdl = function(empdata){
	var fnm = 'getSottaskScnClsdetailsMdl';
	
	var QRY_TO_EXEC = `select * from task_section_cols where task_id=${empdata.task_id}`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : getRiggerinsrttaskMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/06/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.getRiggerinsrttaskMdl = function(id,emplngth){
	var fnm = 'getRiggerinsrttaskMdl';
	if(emplngth == 0){
		return new Promise((resolve, reject) => {
			resolve(true)
		})
	} else {
		var QRY_TO_EXEC = `select * from tasks where task_no='${id}'`
		console.log(QRY_TO_EXEC);
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
	}
}

/**************************************************************************************
* Controller     : insrtasklogsdatabyIdMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/06/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.insrtasklogsRiggerdatabyIdMdl = function(data ,tskdata, emplngth, prntdata){
	var fnm = 'insrtasklogsdatabyIdMdl';
	if(emplngth == 0){
		return new Promise((resolve, reject) => {
			resolve(true)
		})
	} else {
		var newtskdata = tskdata[0]
		var sts = 218;
		var tskid = `${newtskdata.task_id}`
		var emp_id = 9999; //sify admin ID

		var QRY_TO_EXEC = `insert into task_logs (task_id, task_status, comments, call_attend_by, emp_id, tl_date_created, task_log_lat, task_log_long) values 
		(${tskid},${sts},'${newtskdata.task_message}',${newtskdata.emp_id},${emp_id},current_timestamp(),'${newtskdata.task_latitude}','${newtskdata.task_longitude}')`
		console.log(QRY_TO_EXEC);
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
	}
}

/**************************************************************************************
* Controller     : updateSottaskScnClsdetailsMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 15/06/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.updateSottaskScnClsdetailsMdl = function(taskdata,scscnTask,empdata){
	var fnm = 'updateSottaskScnClsdetailsMdl';
	scscnTask.filter((k) => {
		if (k.section_col_name == 'ownerphonenum') {
		var QRY_TO_EXEC_1 = `update task_section_cols set section_col_value=${empdata.emp_mobile} where task_section_col_id in (${k.task_section_col_id})`
		console.log(QRY_TO_EXEC_1);
				dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC_1, cntxtDtls, '', fnm);
		} else if (k.section_col_name == 'Assigned To'){
			var QRY_TO_EXEC_2 = `update task_section_cols set section_col_value="${empdata.emp_name}" where task_section_col_id in (${k.task_section_col_id})`
			console.log(QRY_TO_EXEC_2);
				dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC_2, cntxtDtls, '', fnm);
		} else if (k.section_col_name == 'userid'){
			var QRY_TO_EXEC_3 = `update task_section_cols set section_col_value="${empdata.emp_name}" where task_section_col_id in (${k.task_section_col_id})`
			console.log(QRY_TO_EXEC_3);
				dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC_3, cntxtDtls, '', fnm);
		} else if (k.section_col_name == 'username'){
			var QRY_TO_EXEC_4 = `update task_section_cols set section_col_value="${empdata.emp_email}" where task_section_col_id in (${k.task_section_col_id})`
			console.log(QRY_TO_EXEC_4);
				dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC_4, cntxtDtls, '', fnm);
		} else if (k.section_col_name == 'mailid'){
			var QRY_TO_EXEC_4 = `update task_section_cols set section_col_value="${empdata.emp_email}" where task_section_col_id in (${k.task_section_col_id})`
			console.log(QRY_TO_EXEC_4);
				dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC_4, cntxtDtls, '', fnm);
		} else if (k.section_col_name == 'Mobileno'){
			var QRY_TO_EXEC_4 = `update task_section_cols set section_col_value="${empdata.emp_mobile}" where task_section_col_id in (${k.task_section_col_id})`
			console.log(QRY_TO_EXEC_4);
				dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC_4, cntxtDtls, '', fnm);
		}
	})
	var QRY_TO_EXEC = `update tasks set task_owner=${empdata.emp_id} where (task_id in (${taskdata.task_id}) or parent_id in (${taskdata.task_id}))`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : chcksotcodeemptaskMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 13/06/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.chcksotcodeemptaskMdl = function(data, sotemplnth){
	var fnm = 'chcksotcodeemptaskMdl';
	if(sotemplnth > 0)
		return new Promise((resolve, reject) => {
			resolve(true)
		})
	else {
		var QRY_TO_EXEC = `select e.*,c.cluster_name from employees as e
					join clusters as c on find_in_set(c.cluster_id,e.cluster_id) and c.pincodes like '%${data.taskAddress.pincode}%'
					where emp_code='${data.ownerIdentity}' limit 1`
		console.log(QRY_TO_EXEC);
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
	}
}

/**************************************************************************************
* Controller     : updateSottaskdetailsMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 15/06/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.updateSottaskdetailsMdl = function(empdata){
	var fnm = 'updateSottaskdetailsMdl';
	var QRY_TO_EXEC = `update tasks set task_owner=${empdata.emp_id} where (task_id in (${data.task_id}) or parent_id in (${data.task_id}))`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : taskcanceldatafrservicenowMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 23/05/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.taskcanceldatafrservicenowMdl = function(reqst, data){
	var fnm = 'taskcanceldatafrservicenowMdl';
	var QRY_TO_EXEC = `update tasks set task_status=407,mngr=0 where (task_id in (${data.task_id}) or parent_id in (${data.task_id})) and task_status not in (271,408)`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : gettaskdetailsMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 23/05/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.gettaskdetailsMdl = function(data){
	var fnm = 'gettaskdetailsMdl';
	var QRY_TO_EXEC = `select * from tasks where service_no = '${data.externalId}'`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : childtaskdataMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 24/05/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.childtaskdataMdl = function(reqst, data){
	var fnm = 'childtaskdataMdl';
	var QRY_TO_EXEC = `select * from tasks where parent_id = '${data.task_id}' and task_status not in (271,408)`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : childtaskChcktrvldataMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 08/08/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.childtaskChcktrvldataMdl = function(reqst, data){
	var fnm = 'childtaskChcktrvldataMdl';
	var QRY_TO_EXEC = `select * from tasks where (parent_id=${data.task_id} or task_id=${data.task_id}) and task_status>219 and task_status not in (271,407,408) order by task_created_date desc;`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : tasklogcanceldataMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 23/05/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.tasklogcanceldataMdl = function(reqst, data, childtskdata){
	var fnm = 'tasklogcanceldataMdl';
	if(childtskdata.length == 0){
		var QRY_TO_EXEC = `insert into task_logs (task_id, task_status, call_attend_by, comments, emp_id, tl_date_created) values (${data.task_id},407,${data.call_attend_by},'Ticket Canceled from Service Now',${data.emp_id},current_timestamp())`
	} else {
		var QRY_TO_EXEC = `insert into task_logs (task_id, task_status, call_attend_by, comments, emp_id, tl_date_created) `
		var dlmtr = ', ';
		var valQry = ' VALUES ';
		var counter = 0;
		childtskdata.filter((k)=>{
			if (childtskdata.length == ++counter) {
                dlmtr = ' ; '
            }
			valQry += `(${data.task_id},407,${k.call_attend_by},'Ticket Canceled from Service Now',${data.emp_id},current_timestamp()) ${dlmtr} `
		})
		QRY_TO_EXEC = QRY_TO_EXEC + valQry;
	}
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : taskdatafrRejectservicenowMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 24/05/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.taskdatafrRejectservicenowMdl = function(data){
	var fnm = 'taskdatafrRejectservicenowMdl';
	var QRY_TO_EXEC = `select 'Rejected' as 'eventId',t.task_id as id,t.task_latitude as 'taskLatitude',t.task_longitude as 'taskLongitude',null as 'taskType',null as 'priority',
						null as 'revisionNo',(select service_no from tasks as t2 where parent_id is null and (t2.task_id = ${data.task_id} or t2.task_id= t.parent_id)) as 'externalID',
						task_message as 'title',unix_timestamp(task_appointment_date) as 'eventDateTime','' as 'locationGroupId',
						unix_timestamp(task_appointment_date) as 'appointmentDate',null as 'appointmentStartDateTime', null as 'appointmentEndDateTime',
						(select group_concat(service_no,'|',e2.emp_name,'|',e2.emp_code,'|',v.vendor_name,'|',v.vendor_code,'|',e2.emp_mobile) from employees as e2 join tasks as t2 on t2.call_attend_by=e2.emp_id and t2.task_status <> 271
						left join vendors as v on v.vendor_id=e2.vendor_name where t2.parent_id=${data.task_id}) as 'assignedToIDs',
						#concat(service_no,'|',e.emp_name,'|',e.emp_code,'|',v.vendor_name,'|',v.vendor_code,'|',e.emp_mobile) as 'assignedToIDs',
						(select service_no from tasks where parent_id = ${data.task_id} and primary_flag = 1) as 'primaryAssignment',formId as formID,null as description,circuit_id as customerId,null as customerName,null as customerContactNo,null as customerEmail,
						null as city,null as country,null as shortURLTravel,null as customFieldGroups,null as checklistData,null as reasonCde,'' as attachments,
						t.emp_id as modifiedBy,null as userRole,null as managerId,null as deviceIdentity,null as recordedHardware,
						case when t.task_status=221 then (Select distance as dst from task_logs where task_id='${data.task_id}' and task_status=221) else 0 end as travelledDistance,null as identity,'false' as isAutoAssigned,
						'' as state,'' as street1,'' as street2, '' as street3,task_pincode as pincode,'' as blockNo,'' as floorNo from tasks as t
						#join sub_categories as s on s.cat_id=9 and s.sub_cat_id=${data.task_status} #not required for rejected
						join employees as e on find_in_set(e.emp_id,t.call_attend_by)
						where t.task_id='${data.task_id}'`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : srvcnowcreatetaskMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 18/04/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.srvcnowcreatetaskMdl = function(data,empdata,crcktid,tasktypedata,emplnth, taskowner, pincodeSNdata,repeated,FeasibilityId,PurposeOfVisit,LinkId,oldtaskid){
	
	console.log(emplnth,'employeeeeee lenghttttttttttt')
	var task_types1 = ``;
    var customerName = ``;
    var PurposeOfVisitValue = ``;  
    var FeasibilityIdValue = ``; 
	var mngr = 0;
	var sts = 218;
	
	var auto_asgn = 0;
	
	if(emplnth == 0  ){ 
		mngr = 1;
		sts = 217;
		auto_asgn = 1; 
	}
	if(repeated > 0){
		sts = 228;
		mngr = 1;
	}
	var appointmentDate;
	data.customFieldGroups.filter((k) => {
		if (k.customfieldGroupName == 'ScheduleDate') {
			console.log("k.additionalProperties.ScheduleDate",k.additionalProperties.ScheduleDate)
			let dat = moment(k.additionalProperties.ScheduleDate, 'DD/MM/YYYY hh:mm:ss A').toDate()
			appointmentDate = moment(dat).format("YYYY-MM-DD HH:mm:ss");
			console.log("appointmentDate",appointmentDate)
		}
	})
	
	var taskAddressblock = ``;
	var taskAddressstreet1 = ``;
	var taskAddressstreet2 = ``;
	var linkid=``;
	if(data.taskAddress.block){
		taskAddressblock = `${data.taskAddress.block.replace(/['"]+/g, '')}`
	}	
	if(data.taskAddress.street1){
		taskAddressstreet1 = `${data.taskAddress.street1.replace(/['"]+/g, '')}`
	}	
	if(data.taskAddress.street2){
		taskAddressstreet2 = `${data.taskAddress.street2.replace(/['"]+/g, '')}`
	}
	
	if (data.taskType != '' || data.taskType != null || data.taskType != undefined) {
        task_types1 = `,'${data.taskType}'`;
    }

    if (data.customerContactName != '' || data.customerContactName != null || data.customerContactName != undefined) {
        customerName = `,'${data.customerContactName}'`;
    }

    if (PurposeOfVisit != '' || PurposeOfVisit != null || PurposeOfVisit != undefined) {
        PurposeOfVisitValue = `,'${PurposeOfVisit}'`;
    }

    if (FeasibilityId != '' || FeasibilityId != null || FeasibilityId != undefined) {
        FeasibilityIdValue = `,'${FeasibilityId}'`;
    }
	if (LinkId != '' || LinkId != null || LinkId != undefined) {
        linkid = `,'${LinkId}'`;
    }
	
	console.log(LinkId,"linkiddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd")
	
	
	var fnm = 'srvcnowcreatetaskMdl'; 
	var taskStatusTimestamp = moment(data.taskStatus.taskStatusTimestamp).format("YYYY-MM-DD HH:mm:ss");
	var priority = `p${data.priority}`
	var QRY_TO_EXEC = `insert into tasks (cluster_id,auto_assgn,primary_flag,mngr,task_status,task_type,circuit_id,task_no, service_no, call_attend_by, call_type, task_other_issue, task_category, task_owner, task_message, task_created_date,
	emp_id, remarks, task_priority, emp_department_id, task_latitude, task_longitude, task_assigned_date, task_appointment_date, taskAddress, task_pincode, formId, slaTime,repeat_tasks,task_type_name,customer_name,purpose_of_visit,feasibility_id,link_id) values 
	(${pincodeSNdata.cluster_id},${auto_asgn},0,${mngr},${sts},${tasktypedata.comp_cat_id},'${crcktid}','${data.taskIdentity}','${data.externalId}',${empdata.emp_id},'${data.taskAction}','${data.taskType}',${tasktypedata.main_cat_id},${taskowner},'${data.title}',current_timestamp(),
	${empdata.emp_id},'${data.ownerIdentity}','${priority}','${empdata.emp_dept}','${data.taskLatitude}','${data.taskLongitude}','${taskStatusTimestamp}','${appointmentDate}',
	'${taskAddressblock} , ${taskAddressstreet1} ,${taskAddressstreet2} ,${data.taskAddress.state} ,${data.taskAddress.city} ,${data.taskAddress.country} ,${data.taskAddress.pincode}'
	 ,'${data.taskAddress}','${data.formId}','${data.slaTime}','${repeated}' ${task_types1}${customerName}${PurposeOfVisitValue}${FeasibilityIdValue}${linkid})`;
	
	// console.log(sts,'------------------------statusssssssss')
	// if(oldtaskid){
		// console.log('entered inseidddd----------------------------------------')
		// var QRY_TO_EXEC =` update tasks set task_status=${sts} where task_id=${oldtaskid} `
		// console.log(QRY_TO_EXEC,'//////////////////////////////////////////////')
	// }

   console.log(QRY_TO_EXEC);
	
	
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : insrtservicenowfulldataMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 15/05/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.insrtservicenowfulldataMdl = function(data){
	var fnm = 'insrtservicenowfulldataMdl';
	console.log(data[0].customFieldGroups[0].additionalProperties['Short Description'],'dataaaaaaaaaaaaa[00000000000000000000000000000000000000000]')
   var taskdata = JSON.stringify(data[0]).replace(/'/g,"");
   taskdata = JSON.parse(taskdata);
    var QRY_TO_EXEC = `insert into servicenow_data (task_data,task_no,service_no,i_ts) values ('${JSON.stringify(taskdata).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}','${data[0].taskIdentity}','${data[0].externalId}',current_timestamp())`;
    //var QRY_TO_EXEC = `insert into servicenow_data (task_data,task_no,service_no,i_ts) values ('${JSON.stringify(data[0]).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}','${data[0].taskIdentity}','${data[0].externalId}',current_timestamp())`;
	//var QRY_TO_EXEC = `insert into servicenow_data (task_data,task_no,service_no,i_ts) values ('${JSON.stringify(data[0]).replace(/[\\[\]{}()*+?.,^$|#\s]/g, '\\$&')}','${data[0].taskIdentity}','${data[0].externalId}',current_timestamp())`
  // var QRY_TO_EXEC = `insert into servicenow_data (task_data,task_no,service_no,i_ts) values ('${JSON.stringify(data[0]).replace(/'./g, "`")}','${data[0].taskIdentity}','${data[0].externalId}',current_timestamp())`
 // var QRY_TO_EXEC = `insert into servicenow_data (task_data,task_no,service_no,i_ts) values ('${JSON.stringify(data[0])}','${data[0].taskIdentity}','${data[0].externalId}',current_timestamp())`
// var QRY_TO_EXEC = `insert into servicenow_data (task_data,task_no,service_no,i_ts) values ('${responce}','${data[0].taskIdentity}','${data[0].externalId}',current_timestamp())`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : srvcnowcreateParenttaskMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 11/05/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.srvcnowcreateParenttaskMdl = function(data,empdata,crcktid,tasktypedata,emplnth, taskowner, taskno, serviceno, parentid,FeasibilityId,PurposeOfVisit,LinkId,oldtaskid){ 
	var fnm = 'srvcnowcreateParenttaskMdl'; 
	if(emplnth == 0) {
		return new Promise((resolve, reject) => {
			resolve(true)
		})
	} else {
		var task_types1 = ``;
		var customerName = ``;
		var PurposeOfVisitValue = ``;  
		var FeasibilityIdValue = ``; 
		var mngr = 0;
		var sts = 218;
		var taskAddressblock = ``;
		var taskAddressstreet1 = ``;
		var taskAddressstreet2 = ``;
		if(data.taskAddress.block){
			taskAddressblock = `${data.taskAddress.block.replace(/['"]+/g, '')}`
		}	
		if(data.taskAddress.street1){
			taskAddressstreet1 = `${data.taskAddress.street1.replace(/['"]+/g, '')}`
		}	
		if(data.taskAddress.street2){
			taskAddressstreet2 = `${data.taskAddress.street2.replace(/['"]+/g, '')}`
		}
		if (data.taskType != '' || data.taskType != null || data.taskType != undefined) {
        task_types1 = `,'${data.taskType}'`;
		}

		if (data.customerContactName != '' || data.customerContactName != null || data.customerContactName != undefined) {
			customerName = `,'${data.customerContactName}'`;
		}

		if (PurposeOfVisit != '' || PurposeOfVisit != null || PurposeOfVisit != undefined) {
			PurposeOfVisitValue = `,'${PurposeOfVisit}'`;
		}

		if (FeasibilityId != '' || FeasibilityId != null || FeasibilityId != undefined) {
			FeasibilityIdValue = `,'${FeasibilityId}'`;
		}
		if (LinkId != '' || LinkId != null || LinkId != undefined) {
			linkid = `,'${LinkId}'`;
		}
		var taskStatusTimestamp = moment(data.taskStatus.taskStatusTimestamp).format("YYYY-MM-DD HH:mm:ss");
		var appointmentDate = moment(data.appointmentDate).format("YYYY-MM-DD HH:mm:ss");
		var priority = `p${data.priority}`
		var QRY_TO_EXEC = `insert into tasks (parent_id,primary_flag,mngr,task_status,task_type,circuit_id,task_no, service_no, call_attend_by, call_type, task_other_issue, task_category, task_owner, task_message, task_created_date,
		emp_id, remarks, task_priority, emp_department_id, task_latitude, task_longitude, task_assigned_date, task_appointment_date, taskAddress, task_pincode, formId, slaTime,task_type_name,customer_name,purpose_of_visit,feasibility_id,link_id) values 
		(${parentid},1,${mngr},218,${tasktypedata.comp_cat_id},'${crcktid}','${taskno}','${serviceno}',${empdata.emp_id},'${data.taskAction}','${data.taskType}',${tasktypedata.main_cat_id},${taskowner},'${data.title}',current_timestamp(),
		${empdata.emp_id},'${data.ownerIdentity}','${priority}','${empdata.emp_dept}','${data.taskLatitude}','${data.taskLongitude}','${taskStatusTimestamp}','${appointmentDate}',
		'${taskAddressblock} , ${taskAddressstreet1} ,${taskAddressstreet2} ,${data.taskAddress.state} ,${data.taskAddress.city} ,${data.taskAddress.country} ,${data.taskAddress.pincode} '
		,'${data.taskAddress.pincode}','${data.formId}','${data.slaTime}'${task_types1}${customerName}${PurposeOfVisitValue}${FeasibilityIdValue}${linkid})`
		
		

		console.log(QRY_TO_EXEC);
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
	}
}


/**************************************************************************************
* Controller     : chckpincodeemptaskMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 19/04/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.chckpincodeemptaskMdl = function(data,engineer,rigger){
	var fnm = 'chckpincodeemptaskMdl';
	/*var QRY_TO_EXEC = `select e.* from employees as e
				 join attendence as a on a.emp_id=e.emp_id where e.pincode like '%${data.taskAddress.pincode}%' and a.utilization_count=0 and a.emp_sts=0
				 and a.punch_status=1`*/
	/*var QRY_TO_EXEC = `select e.*,c.cluster_name from clusters as c 
					join employees as e on e.zone_id=c.zone_id and e.cluster_id=c.cluster_id #and e.emp_designation in (202)
					join attendence as a on  a.emp_id=e.emp_id and e.emp_designation=231 and a.emp_sts=0 and a.punch_status=1
					where c.pincodes like '%${data.taskAddress.pincode}%' and date_format(a.i_ts,'%Y-%m-%d')=curdate()
					group by e.emp_id`*/
	var dsgn = ``;
	if((engineer == 1 && rigger == 0) || (engineer == 1 && rigger == 1)){
		dsgn = ` and e.emp_designation=231 `
	} else if(engineer == 0 && rigger == 1) {
		dsgn = ` and e.emp_designation=232 `
	}
	if(engineer == 0 && rigger == 0){
		var QRY_TO_EXEC = `select * from employees where emp_id='a1234567890'`
	} else if(data.taskLatitude == '' && data.taskLongitude == ''){
		var QRY_TO_EXEC = `select e.* from clusters as c 
					join employees as e on e.zone_id=c.zone_id and e.cluster_id=c.cluster_id 
					join attendence as a on  a.emp_id=e.emp_id ${dsgn} and a.punch_status=1 and a.emp_sts=0 #and a.utilization_count=0 
					where c.pincodes like '%${data.taskAddress.pincode}%' and date_format(a.i_ts,'%Y-%m-%d')=curdate()
					group by e.emp_id order by utilization_count asc`

	}else{
		var QRY_TO_EXEC = `select e.*,c.cluster_name,111.111 * DEGREES(ACOS(LEAST(1.0, COS(RADIANS(${data.taskLatitude}))
	 * COS(RADIANS(e.emp_latitude)) * COS(RADIANS(e.emp_longitude - ${data.taskLongitude}))
	 + SIN(RADIANS(${data.taskLatitude})) * SIN(RADIANS(e.emp_latitude))))) as distance_loc from clusters as c 
					join employees as e on e.zone_id=c.zone_id and e.cluster_id=c.cluster_id 
					join attendence as a on  a.emp_id=e.emp_id ${dsgn} and a.punch_status=1 and a.emp_sts=0 #and a.utilization_count=0 
					where c.pincodes like '%${data.taskAddress.pincode}%' and date_format(a.i_ts,'%Y-%m-%d')=curdate()
					group by e.emp_id order by a.utilization_count,distance_loc asc `
	}
					
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : checkcircuitdataMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 19/04/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.checkcircuitdataMdl = function(data){
	var fnm = 'checkcircuitdataMdl';
		var customerId = ``
		if(data.customerId){
			customerId = `${data.customerId.replace(/['"]+/g, '')}`
		}
	var QRY_TO_EXEC = `select * from circuits where circuit_code='${customerId}' or user_name='${data.ownerIdentity}' limit 1`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : chckNopincodeemptaskMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 19/04/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.chckNopincodeemptaskMdl = function(data, emplnth){
	var fnm = 'chckNopincodeemptaskMdl';
	/*if(emplnth > 0)
		return new Promise((resolve, reject) => {
			resolve(true)
		})
	else {*/
		var QRY_TO_EXEC = ``;
		if (data && data.customFieldGroups.length > 0) {
			console.log("data",data)
			var counter = 0;
			data.customFieldGroups.filter((k) => {
				counter++
				console.log("counter",counter)
				if (k.customfieldGroupName == 'OwnerContactDetails') {
					QRY_TO_EXEC = `select e.*,c.cluster_name from employees as e
					join clusters as c on find_in_set(c.cluster_id,e.cluster_id) and c.pincodes like '%${data.taskAddress.pincode}%'
					where emp_mobile='${k.additionalProperties.ownerphonenum}' or emp_email='${k.additionalProperties.username}' limit 1;`
				}
			})
		}
		
		console.log(QRY_TO_EXEC);
		if(counter == data.customFieldGroups.length)
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
	//}
}

/**************************************************************************************
* Controller     : chckpincodeRiggeremptaskMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 20/06/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.chckpincodeRiggeremptaskMdl = function(data,engineer,rigger){
	var fnm = 'chckpincodeRiggeremptaskMdl';
	/*var QRY_TO_EXEC = `select e.* from employees as e
				 join attendence as a on a.emp_id=e.emp_id where e.pincode like '%${data.taskAddress.pincode}%' and a.utilization_count=0 and a.emp_sts=0
				 and a.punch_status=1`*/
	/*var QRY_TO_EXEC = `select e.*,c.cluster_name from clusters as c 
					join employees as e on e.zone_id=c.zone_id and e.cluster_id=c.cluster_id #and e.emp_designation in (202)
					join attendence as a on  a.emp_id=e.emp_id and e.emp_designation=231 and a.emp_sts=0 and a.punch_status=1
					where c.pincodes like '%${data.taskAddress.pincode}%' and date_format(a.i_ts,'%Y-%m-%d')=curdate()
					group by e.emp_id`*/

	if(data.taskLongitude != null && data.taskLongitude != '' && data.taskLatitude!= null && data.taskLatitude != ''){				
		var QRY_TO_EXEC = `select e.*,c.cluster_name,111.111 * DEGREES(ACOS(LEAST(1.0, COS(RADIANS(${data.taskLatitude}))
		* COS(RADIANS(e.emp_latitude)) * COS(RADIANS(e.emp_longitude - ${data.taskLongitude}))
		+ SIN(RADIANS(${data.taskLatitude})) * SIN(RADIANS(e.emp_latitude))))) as distance_loc from clusters as c 
					join employees as e on e.zone_id=c.zone_id and e.cluster_id=c.cluster_id 
					join attendence as a on  a.emp_id=e.emp_id and e.emp_designation=232 and a.punch_status=1 and a.emp_sts=0 #and a.utilization_count=0 
					where c.pincodes like '%${data.taskAddress.pincode}%' and date_format(a.i_ts,'%Y-%m-%d')=curdate()
					group by e.emp_id order by utilization_count,distance_loc asc `
	} else {
		var QRY_TO_EXEC = `select e.*,c.cluster_name from clusters as c 
					join employees as e on e.zone_id=c.zone_id and e.cluster_id=c.cluster_id 
					join attendence as a on  a.emp_id=e.emp_id and e.emp_designation=232 and a.punch_status=1 and a.emp_sts=0 #and a.utilization_count=0 
					where c.pincodes like '%${data.taskAddress.pincode}%' and date_format(a.i_ts,'%Y-%m-%d')=curdate()
					group by e.emp_id order by utilization_count asc`
	}
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : srvcnowcreateRiggertaskMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 11/05/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.srvcnowcreateRiggertaskMdl = function(data,empdata,crcktid,tasktypedata,emplnth, taskowner, taskno, serviceno, parentid,FeasibilityId,PurposeOfVisit,LinkId,oldtaskid){ 
	var fnm = 'srvcnowcreateRiggertaskMdl'; 
	
	if(emplnth == 0) {
		return new Promise((resolve, reject) => {
			resolve(true)
		})
	} else {
		var task_types1 = ``;
		var customerName = ``;
		var PurposeOfVisitValue = ``;  
		var FeasibilityIdValue = ``;
		var mngr = 0;
		var sts = 218;
		var taskAddressblock = ``;
		var taskAddressstreet1 = ``;
		var taskAddressstreet2 = ``;
		if(data.taskAddress.block){
			taskAddressblock = `${data.taskAddress.block.replace(/['"]+/g, '')}`
		}	
		if(data.taskAddress.street1){
			taskAddressstreet1 = `${data.taskAddress.street1.replace(/['"]+/g, '')}`
		}	
		if(data.taskAddress.street2){
			taskAddressstreet2 = `${data.taskAddress.street2.replace(/['"]+/g, '')}`
		}
		if (data.taskType != '' || data.taskType != null || data.taskType != undefined) {
        task_types1 = `,'${data.taskType}'`;
		}

		if (data.customerContactName != '' || data.customerContactName != null || data.customerContactName != undefined) {
			customerName = `,'${data.customerContactName}'`;
		}

		if (PurposeOfVisit != '' || PurposeOfVisit != null || PurposeOfVisit != undefined) {
			PurposeOfVisitValue = `,'${PurposeOfVisit}'`;
		}

		if (FeasibilityId != '' || FeasibilityId != null || FeasibilityId != undefined) {
			FeasibilityIdValue = `,'${FeasibilityId}'`;
		}
		if (LinkId != '' || LinkId != null || LinkId != undefined) {
			linkid = `,'${LinkId}'`;
		}
		console.log(data,'dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa12344')
		console.log(data[0],'dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa12344')
		// console.log(oldtaskid,'oldtaskiddddddd456')
		var taskStatusTimestamp = moment(data.taskStatus.taskStatusTimestamp).format("YYYY-MM-DD HH:mm:ss");
		var appointmentDate = moment(data.appointmentDate).format("YYYY-MM-DD HH:mm:ss");
		var priority = `p${data.priority}`
		var QRY_TO_EXEC = `insert into tasks (parent_id,primary_flag,mngr,task_status,task_type,circuit_id,task_no, service_no, call_attend_by, call_type, task_other_issue, task_category, task_owner, task_message, task_created_date,
		emp_id, remarks, task_priority, emp_department_id, task_latitude, task_longitude, task_assigned_date, task_appointment_date, taskAddress, task_pincode, formId, slaTime,task_type_name,customer_name,purpose_of_visit,feasibility_id,link_id) values 
		(${parentid},0,${mngr},218,${tasktypedata.comp_cat_id},'${crcktid}','${taskno}','${serviceno}',${empdata.emp_id},'${data.taskAction}','${data.taskType}',${tasktypedata.main_cat_id},${taskowner},'${data.title}',current_timestamp(),
		${empdata.emp_id},'${data.ownerIdentity}','${priority}','${empdata.emp_dept}','${data.taskLatitude}','${data.taskLongitude}','${taskStatusTimestamp}','${appointmentDate}',
		'${taskAddressblock} , ${taskAddressstreet1} ,${taskAddressstreet2} ,${data.taskAddress.state} ,${data.taskAddress.city} ,${data.taskAddress.country} ,${data.taskAddress.pincode} '
		,'${data.taskAddress.pincode}','${data.formId}','${data.slaTime}'${task_types1}${customerName}${PurposeOfVisitValue}${FeasibilityIdValue}${linkid})`
		console.log(QRY_TO_EXEC);
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
	}
}

/**************************************************************************************
* Controller     : gettaskcatIdMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 19/04/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.gettaskcatIdMdl = function(data){
	var fnm = 'gettaskcatIdMdl';
	var QRY_TO_EXEC = `select comp_cat_id,main_cat_id from complaint_categories where comp_cat_name='${data.Category}' or comp_cat_name='${data.taskType}' #and comp_status=1`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : getstateIdMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 19/04/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.getstateIdMdl = function(data){
	var fnm = 'getstateIdMdl';
	var QRY_TO_EXEC = `select * from states where state_name like '%${data.taskAddress.state}%' order by state_id asc`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : insrtstateIdMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 17/05/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.insrtstateIdMdl = function(data, stslngth){
	var fnm = 'insrtstateIdMdl';
	if(stslngth > 0)
		return new Promise((resolve, reject) => {
			resolve(true)
		})
	else {
		if(stslngth.length == 0 && data.taskAddress.state != '' && data.taskAddress.state != null && data.taskAddress.state != undefined ){
			var zoneid = 1;
			data.customFieldGroups.filter((k) => {
				if (k.customfieldGroupName == 'incidentInfo') {
					if(k.additionalProperties.Region && k.additionalProperties.Region == 'SOUTH'){
						zoneid = 1
					} else if(k.additionalProperties.Region && k.additionalProperties.Region == 'NORTH') {
						zoneid = 3
					} else if(k.additionalProperties.Region && k.additionalProperties.Region == 'EAST') {
						zoneid = 2
					} else if(k.additionalProperties.Region && k.additionalProperties.Region == 'WEST') {
						zoneid = 4
					}
				}
			})
			var QRY_TO_EXEC = `insert into states (zone_id, state_name, state_status, state_created_date_time) values (${zoneid}, '${data.taskAddress.state}', 1, current_timestamp())`
			console.log(QRY_TO_EXEC);
		} else {
			return new Promise((resolve, reject) => {
				resolve(true)
			})
		}
	}
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : insrtcircuitdataMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 19/04/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.insrtcircuitdataMdl = function(data,circuitdata,empdata,stateid){
	var fnm = 'insrtcircuitdataMdl';
	//if(circuitdata.length == 0){
		var customerName = ``
		var customerContactName = ``
		var customerId = ``
		if(data.customerName){
			customerName = `${data.customerName.replace(/['"]+/g, '')}`
		}
		if(data.customerId){
			customerId = `${data.customerId.replace(/['"]+/g, '')}`
		}
		if(data.customerContactName){
			customerContactName = `${data.customerContactName.replace(/['"]+/g, '')}`
		}
		var QRY_TO_EXEC = `insert into circuits (user_name,contact_person_name,circuit_name,circuit_code,city,state,pincode,mobile_no,email_id,zone_id,cluster_id,circuit_latitude,circuit_longitude,created_on,user_status) values 
		('${data.ownerIdentity}','${customerContactName}','${customerName}','${customerId}','${data.taskAddress.city}','${stateid}','${data.taskAddress.pincode}',
		'${data.customerContactNo}','${data.customerEmail}','${empdata.zone_id}','${empdata.cluster_id}','${data.taskLatitude}','${data.taskLongitude}',current_timestamp(),1)`
	/*} else {
		var QRY_TO_EXEC = `select * from circuits where circuit_code='${data.customerId.replace(/['"]+/g, '')}' or user_name='${data.ownerIdentity}' limit 1`
	}*/
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : getinsrttaskMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 19/04/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.getinsrttaskMdl = function(id,){
	var fnm = 'getinsrttaskMdl';
	var QRY_TO_EXEC = `select * from tasks where task_id=${id}`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : srvcnowcreatetasksessionMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 19/04/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.srvcnowcreatetasksessionMdl = function(data,tcktdata,){
	var fnm = 'srvcnowcreatetasksessionMdl';

	var QRY_TO_EXEC = `insert into task_section (task_id, section_name, emp_id, status, date_created) `;
	var dlmtr = ', ';
    var valQry = ' VALUES ';
	if (data && data.customFieldGroups.length > 0) {
        var counter = 0;
        data.customFieldGroups.filter((k) => {
			if (data.customFieldGroups.length == ++counter) {
                dlmtr = ' ; '
            }
            valQry += `(${tcktdata.task_id},'${k.customfieldGroupName}','${tcktdata.emp_id}',1,current_timestamp())  ${dlmtr} `
        })
    }
	QRY_TO_EXEC = QRY_TO_EXEC + valQry;
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : gettaskcolssessionMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 19/04/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.gettaskcolssessionMdl = function(data){
	var fnm = 'gettaskcolssessionMdl';
	var QRY_TO_EXEC = `select * from task_section where task_id='${data.task_id}' order by section_id ASC`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : srvcnowcreatetaskcolssessionMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 19/04/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.srvcnowcreatetaskcolssessionMdl = function(data,tcktdata,tskssesnata){
	var fnm = 'srvcnowcreatetaskcolssessionMdl';

	var QRY_TO_EXEC = `insert into task_section_cols (section_id, task_id, section_col_name, section_col_value, emp_id, status, date_created) `;
	var dlmtr = ', ';
    var valQry = ' VALUES ';
	var counter = 0;
	var matchlength = false;
	if (data && data.customFieldGroups.length > 0) {
        data.customFieldGroups.filter((k) => {
			if (data.customFieldGroups.length == ++counter) {
				console.log("counter incriment")
				matchlength = true;
			}
			//data.customFieldGroups.additionalProperties.filter((key) => { 
			//console.log("counter",counter)	
			var keycounter=0;
			Object.keys(k.additionalProperties).filter((key) => {
				console.log(Object.keys(k.additionalProperties).length)
				if(matchlength){
					if (Object.keys(k.additionalProperties).length == ++keycounter) {
						dlmtr = ' ; '
					}
				}
				let addprpkey = JSON.stringify(k.additionalProperties[key]).replace(/"|'/g, "\"","\'");
				 //addprpkey = JSON.stringify(addprpkey).replace(/'/g, "\'");
				 console.log("addprpkey",addprpkey)
				valQry += `(${tskssesnata[counter-1].section_id},${tskssesnata[0].task_id},'${key}','${addprpkey}','${tcktdata.emp_id}',1,current_timestamp())  ${dlmtr} `
			})
        })
    }
	QRY_TO_EXEC = QRY_TO_EXEC + valQry;
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : taskdatafrservicenowpincodeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 11/05/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.taskdatafrservicenowpincodeMdl = function(taskid){
	var fnm = 'taskdatafrservicenowpincodeMdl';
	console.log(taskid,'----------------------------------------------------------------------------------1769')
	var QRY_TO_EXEC = `select s.sub_cat_name as 'eventId',t.task_id as id,t.task_latitude as 'taskLatitude',t.task_longitude as 'taskLongitude',null as 'taskType',null as 'priority',
						null as 'revisionNo',(select service_no from tasks as t2 where parent_id is null and (t2.task_id = ${taskid} or t2.task_id= t.parent_id)) as 'externalID',task_message as 'title',unix_timestamp(task_appointment_date) as 'eventDateTime','' as 'locationGroupId',
						unix_timestamp(task_appointment_date) as 'appointmentDate',null as 'appointmentStartDateTime', null as 'appointmentEndDateTime',
						(select group_concat(service_no,'|',e2.emp_name,'|',e2.emp_code,'|',v.vendor_name,'|',v.vendor_code,'|',e2.emp_mobile) from employees as e2 join tasks as t2 on t2.call_attend_by=e2.emp_id left join vendors as v on v.vendor_id=e.vendor_name where t2.parent_id=t.parent_id ) as 'assignedToIDs',
						#concat(service_no,'|',e.emp_name,'|',e.emp_code,'|',v.vendor_name,'|',v.vendor_code,'|',e.emp_mobile) as 'assignedToIDs',
						(select service_no from tasks where parent_id = ${taskid} and primary_flag = 1) as 'primaryAssignment',formId as formID,null as description,circuit_id as customerId,null as customerName,null as customerContactNo,null as customerEmail,
						null as city,null as country,null as shortURLTravel,null as customFieldGroups,null as checklistData,null as reasonCde,'' as attachments,
						t.emp_id as modifiedBy,null as userRole,t.task_owner as managerId,null as deviceIdentity,null as recordedHardware,0 as travelledDistance,null as identity,'True' as isAutoAssigned,
						'' as state,'' as street1,'' as street2, '' as street3,task_pincode as pincode,'' as blockNo,'' as floorNo from tasks as t
						join sub_categories as s on s.cat_id=9 and s.sub_cat_id=218
						join employees as e on find_in_set(e.emp_id,t.call_attend_by)
						join vendors as v on v.vendor_id=e.vendor_name
						where t.parent_id='${taskid}'`
	
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : taskdatafrservicenowMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 20/04/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.taskdatafrservicenowMdl = function(data){
	var fnm = 'taskdatafrservicenowMdl';
	var QRY_TO_EXEC = `select s.sub_cat_name as 'eventId',t.task_id as id,t.task_latitude as 'taskLatitude',t.task_longitude as 'taskLongitude',null as 'taskType',null as 'priority',
						null as 'revisionNo',(select service_no from tasks as t2 where parent_id is null and (t2.task_id = ${data.task_id} or t2.task_id= t.parent_id)) as 'externalID',task_message as 'title',unix_timestamp(task_appointment_date) as 'eventDateTime','' as 'locationGroupId',
						unix_timestamp(task_appointment_date) as 'appointmentDate',null as 'appointmentStartDateTime', null as 'appointmentEndDateTime',concat(service_no,'|',e.emp_name,'|',e.emp_code,'|',e.emp_mobile) as 'assignedToIDs',
						(select service_no from tasks where (parent_id = ${data.task_id} or task_id= ${data.task_id}) and primary_flag = 1) as 'primaryAssignment',formId as formID,null as description,circuit_id as customerId,null as customerName,null as customerContactNo,null as customerEmail,
						null as city,null as country,null as shortURLTravel,null as customFieldGroups,null as checklistData,null as reasonCde,'' as attachments,
						t.emp_id as modifiedBy,null as userRole,null as managerId,null as deviceIdentity,null as recordedHardware,0 as travelledDistance,null as identity,'false' as isAutoAssigned,
						'' as state,'' as street1,'' as street2, '' as street3,task_pincode as pincode,'' as blockNo,'' as floorNo from tasks as t
join sub_categories as s on s.cat_id=9 and s.sub_cat_id=218
join employees as e on find_in_set(e.emp_id,t.call_attend_by)
where t.task_id='${data.task_id}'`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : checkcountoftaskidMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/04/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.checkcountoftaskidMdl = function(data){
	var fnm = 'checkcountoftaskidMdl';
	var QRY_TO_EXEC = `select count(*) as ct from tasks where parent_id=${data.task_id}`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : getempdatabyIdMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/04/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.getempdatabyIdMdl = function(data){
	var fnm = 'getempdatabyIdMdl';
	var QRY_TO_EXEC = `select * from employees where emp_id=${data.emp_id}`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : gettaskdatabyIdMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/04/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.gettaskdatabyIdMdl = function(data){
	var fnm = 'gettaskdatabyIdMdl';
	var QRY_TO_EXEC = `select * from tasks where task_id=${data.task_id}`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : insrtasklogsdatabyIdMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/04/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.insrtasklogsdatabyIdMdl = function(data ,tskdata, emplngth, prntdata){
	var fnm = 'insrtasklogsdatabyIdMdl';
	var sts = 218;
	var tskid = ``
	var emp_id ;
	if(emplngth == 0){
		sts = 217;
		tskid = `${tskdata.task_id}`
		emp_id = `${tskdata.emp_id}`
	} else {
		tskid = `${prntdata.insertId}`
		emp_id = 9999
	}
	var QRY_TO_EXEC = `insert into task_logs (task_id, task_status, comments, call_attend_by, emp_id, tl_date_created, task_log_lat, task_log_long) values 
(${tskid},${sts},'${tskdata.task_message}',${tskdata.emp_id},${emp_id},current_timestamp(),'${tskdata.task_latitude}','${tskdata.task_longitude}')`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : insrttaskchilddatafrservicenowMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/04/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.insrttaskchilddatafrservicenowMdl = function(data, taskdata, task_tckt, srvc_tckt, user){
	var fnm = 'insrttaskchilddatafrservicenowMdl';
	var QRY_TO_EXEC = `insert into tasks (circuit_id, task_no, service_no, parent_id, call_attend_by, call_type, task_type, task_status, task_category, task_other_issue, task_owner, task_message, task_created_date, emp_id, remarks, task_priority, emp_department_id, task_latitude, task_longitude, task_assigned_date, task_appointment_date, taskAddress, task_pincode, formId, slaTime) values 
	('${taskdata.circuit_id}','${task_tckt}','${srvc_tckt}','${taskdata.task_id}','${data.emp_id}','${taskdata.call_type}','${taskdata.task_type}','${taskdata.task_status}','${taskdata.task_category}','${taskdata.task_other_issue}','${taskdata.task_owner}','${taskdata.task_message}','${taskdata.task_created_date}','${taskdata.emp_id}','${taskdata.remarks}','${taskdata.task_priority}','${taskdata.emp_department_id}','${taskdata.task_latitude}','${taskdata.task_longitude}',current_timestamp(),'${taskdata.task_appointment_date}','${taskdata.taskAddress}','${taskdata.task_pincode}','${taskdata.formId}','${taskdata.slaTime}')`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : updatetask_mobile_Mdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 05/04/2023   -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.updatetask_mobile_Mdl = function (data, user, callback) {
    var fnm = 'updatetask_mobile_Mdl';
    let qry = ``

    if(data.task_status || data.task_status == 0){
        qry = qry + `, task_status = ${data.task_status}`
    }
	var QRY_TO_EXEC = `  tasks set last_updated_time = current_timestamp() ${qry} where service_no = '${data.service_no}' and call_attend_by=${data.call_attend_by};`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : gettaskdtlsinsrttaskMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/06/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.gettaskdtlsinsrttaskMdl = function(data,emplngth){
	var fnm = 'gettaskdtlsinsrttaskMdl';

	var QRY_TO_EXEC = `select * from tasks where service_no = '${data.service_no}'`
	console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);

}

/**************************************************************************************
* Controller     : updatetasklogsMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 06/04/2023   -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.updatetasklogsMdl = function (data, taskdata, user) {
    var fnm = 'updatetasklogsMdl';
    let qry = ``

    if(data.task_status){
        qry = qry + ` ,task_status = '${data.task_status}'`
    }
    if(data.call_attend_by){
        qry = qry + ` ,call_attend_by = '${data.call_attend_by}',emp_id='${data.call_attend_by}'`
    }

console.log("i'm in model---------------------")
	var QRY_TO_EXEC = `insert into task_logs set task_id = ${taskdata.task_id}, tl_date_created = current_timestamp() ${qry}`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : uatsuccessserviceNowMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 30/05/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.uatsuccessserviceNowMdl = function(data){
	var fnm = 'uatsuccessserviceNowMdl';
	var QRY_TO_EXEC = `select * from tasks where service_no='${data.assignmentIdentity}' and task_status=223`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : uatUpdatesuccessserviceNowMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 30/05/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.uatUpdatesuccessserviceNowMdl = function(data, taskdata, user){
	var fnm = 'uatUpdatesuccessserviceNowMdl';
	var QRY_TO_EXEC = `update tasks set task_status=225 where (task_id=${taskdata.task_id} or primary_flag=1) and task_status not in (408,271)`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : taskdatafrservicenowUatSuccessMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 02/06/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.taskdatafrservicenowUatSuccessMdl = function(data, reqbody, user){
	var fnm = 'taskdatafrservicenowUatSuccessMdl';
	var QRY_TO_EXEC = `select s.sub_cat_name as 'eventId',t.task_id as id,t.task_latitude as 'taskLatitude',t.task_longitude as 'taskLongitude',null as 'taskType',null as 'priority',
						null as 'revisionNo',(select service_no from tasks as t2 where parent_id is null and (t2.task_id = ${data.task_id} or t2.task_id= t.parent_id)) as 'externalID',task_message as 'title',unix_timestamp(task_appointment_date) as 'eventDateTime','' as 'locationGroupId',
						unix_timestamp(task_appointment_date) as 'appointmentDate',null as 'appointmentStartDateTime', null as 'appointmentEndDateTime',
						#(select group_concat(service_no,'|',e2.emp_name,'|',e2.emp_code,'|',e2.emp_mobile,'|',v.vendor_name) from employees as e2 join tasks as t2 on t2.call_attend_by=e2.emp_id and t2.task_status <> 271 left join vendors as v on v.vendor_id=e2.vendor_name where t2.parent_id=${data.task_id}) as 'assignedToIDs',
						concat(service_no,'|',e.emp_name,'|',e.emp_code,'|',v.vendor_name,'|',v.vendor_code,'|'e.emp_mobile) as 'assignedToIDs',
						(select service_no from tasks where parent_id = ${data.parent_id} and primary_flag = 1) as 'primaryAssignment',formId as formID,null as description,circuit_id as customerId,null as customerName,null as customerContactNo,null as customerEmail,
						null as city,null as country,null as shortURLTravel,null as customFieldGroups,null as checklistData,null as reasonCde,'' as attachments,
						t.emp_id as modifiedBy,null as userRole,null as managerId,null as deviceIdentity,null as recordedHardware,
						case when t.task_status=221 then (Select distance as dst from task_logs where task_id='${data.task_id}' and task_status=221) else 0 end as travelledDistance,null as identity,'false' as isAutoAssigned,
						'' as state,'' as street1,'' as street2, '' as street3,task_pincode as pincode,'' as blockNo,'' as floorNo from tasks as t
						join sub_categories as s on s.cat_id=9 and s.sub_cat_id=225
						join employees as e on find_in_set(e.emp_id,t.call_attend_by)
						left join vendors as v on v.vendor_id=e.vendor_name
						where t.task_id='${data.task_id}'`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : appVersioncheckMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 06/06/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.appVersioncheckMdl = function(reqst, data){
	var fnm = 'appVersioncheckMdl';
	var QRY_TO_EXEC = `select * from business_information`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}


/**************************************************************************************
* Controller     : getattendencedataforservicenowMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 20/06/2023   -  shaik  - Initial Function
*
***************************************************************************************/

exports.getattendencedataforservicenowMdl = function(data){
	var fnm = 'getattendencedataforservicenowMdl';
	var QRY_TO_EXEC = `select emp_name as userName, emp_code as  userIdentity, emp_username as loginName, 	
	case when a.emp_sts = 0 THEN 'Present'
		 when a.emp_sts = 1 THEN 'Absent'
		 when a.emp_sts = 2 THEN 'Weekoff' 
		 when a.emp_sts is null THEN 'Punch missing' end as status, 
	v.vendor_name as vendorName, v.vendor_code as vendorCode, a.punch_in_latlang as punchInLatitude, group_concat( c.cluster_name ) as clusters
	from attendence  as a 
	join employees as e on e.emp_id =  a.emp_id
	left join vendors as v on e.vendor_name = v.vendor_id
	left join clusters as c on find_in_set(c.cluster_id,e.cluster_id)
	where date_format(punch_in_time, '%Y-%m-%d %H:%i:%S') between  '${data.fromTimestamp}' and '${data.toTimestamp}'  group by a.attendence_id;`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     :  
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 20/06/2023   -  shaik  - Initial Function
*
***************************************************************************************/

exports.getrepeateddetailsMdl = function(data,tasknotrim){
	var fnm = 'getrepeateddetailsMdl';
	var QRY_TO_EXEC = ` SELECT * FROM tasks WHERE  task_created_date >= CURDATE() - INTERVAL  30 DAY 
  and task_no like '%${tasknotrim}%' and task_status in (220,221,222,223,224,225,226,227,271) and travel_flg=1 `
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
} 

/**************************************************************************************
* Controller     : repeatedtaskapprovalMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 20/06/2023   -  shaik  - Initial Function
*
***************************************************************************************/

exports.repeatedtaskapprovalMdl = function(data,tasknotrim){
	var fnm = 'repeatedtaskapprovalMdl';
	var QRY_TO_EXEC = ` update tasks set repeated_approved_by=${data.emp_id},repeated_approved_date=current_timestamp(),repeated_approve_status=${data.repeated_approve_status}  where task_id=${data.task_id} `
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : getrepeatedteaskdetailsMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 20/06/2023   -  shaik  - Initial Function
*
***************************************************************************************/

exports.getrepeatedteaskdetailsMdl = function(data,tasknotrim){
	var fnm = 'getrepeatedteaskdetailsMdl';
	var QRY_TO_EXEC = ` select * from servicenow_data  where service_no='${data.service_no}'; `
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
} 
/**************************************************************************************
* Controller     : chckpincodefrSNMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 25/07/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.repeatchckpincodefrSNMdl = function(data,pincode){
	var fnm = 'chckpincodefrSNMdl'; 
	var QRY_TO_EXEC = `select cluster_name,cluster_id from clusters where pincodes like '%${pincode}%'`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}


/**************************************************************************************
* Controller     : srvcnowcreatetaskMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 18/04/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

// exports.srvcnowcreatetaskMdl = function(data,empdata,crcktid,tasktypedata,emplnth, taskowner,repeated, pincodeSNdata,FeasibilityId,PurposeOfVisit){
	

	// console.log(emplnth,'employeeeeee lenghttttttttttt')
	// var mngr = 0;
	// var sts = 218;
	// var auto_asgn = 0;
	
	// if(emplnth == 0  ){ 
		// mngr = 1;
		// sts = 217;
		// auto_asgn = 1; 
	// }
	// if(repeated > 0){
		// sts = 228;
	// }
	
	// var appointmentDate;
	// data.customFieldGroups.filter((k) => {
		// if (k.customfieldGroupName == 'ScheduleDate') {
			// console.log("k.additionalProperties.ScheduleDate",k.additionalProperties.ScheduleDate)
			// let dat = moment(k.additionalProperties.ScheduleDate, 'DD/MM/YYYY hh:mm:ss A').toDate()
			// appointmentDate = moment(dat).format("YYYY-MM-DD HH:mm:ss");
			// console.log("appointmentDate",appointmentDate)
		// }
	// })  
	// var taskAddressblock = ``;
	// var taskAddressstreet1 = ``;
	// var taskAddressstreet2 = ``;
	// if(data.taskAddress.block){
		// taskAddressblock = `${data.taskAddress.block.replace(/['"]+/g, '')}`
	// }	
	// if(data.taskAddress.street1){
		// taskAddressstreet1 = `${data.taskAddress.street1.replace(/['"]+/g, '')}`
	// }	
	// if(data.taskAddress.street2){
		// taskAddressstreet2 = `${data.taskAddress.street2.replace(/['"]+/g, '')}`
	// }
	// var fnm = 'srvcnowcreatetaskMdl'; 
	// var taskStatusTimestamp = moment(data.taskStatus.taskStatusTimestamp).format("YYYY-MM-DD HH:mm:ss");
	// var priority = `p${data.priority}`
	// var QRY_TO_EXEC = `insert into tasks (cluster_id,auto_assgn,primary_flag,mngr,task_status,task_type,circuit_id,task_no, service_no, call_attend_by, call_type, task_other_issue, task_category, task_owner, task_message, task_created_date,
	// emp_id, remarks, task_priority, emp_department_id, task_latitude, task_longitude, task_assigned_date, task_appointment_date, taskAddress, task_pincode, formId, slaTime) values 
	// (${pincodeSNdata.cluster_id},${auto_asgn},0,${mngr},${sts},${tasktypedata.comp_cat_id},'${crcktid}','${data.taskIdentity}','${data.externalId}',${empdata.emp_id},'${data.taskAction}','${data.taskType}',${tasktypedata.main_cat_id},${taskowner},'${data.title}',current_timestamp(),
	// ${empdata.emp_id},'${data.ownerIdentity}','${priority}','${empdata.emp_dept}','${data.taskLatitude}','${data.taskLongitude}','${taskStatusTimestamp}','${appointmentDate}',
	// '${taskAddressblock} , ${taskAddressstreet1} ,${taskAddressstreet2} ,${data.taskAddress.state} ,${data.taskAddress.city} ,${data.taskAddress.country} ,${data.taskAddress.pincode} '
	// ,'${data.taskAddress.pincode}','${data.formId}','${data.slaTime} ')`
    // console.log(QRY_TO_EXEC); 
	// return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
// }

/**************************************************************************************
* Controller     : srvcnowcreatetaskMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 18/04/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.srvcnowrepeatecreatetaskMdl = function(data,empdata,crcktid,tasktypedata,emplnth, taskowner, pincodeSNdata,oldtaskid){
	
	
	

	
	console.log(emplnth,'employeeeeee lenghttttttttttt')
	console.log(oldtaskid,'oldtask lenghttttttttttt')
	
	// var task_types1 = ``;
    // var customerName = ``;
    // var PurposeOfVisitValue = ``;  
    // var FeasibilityIdValue = ``; 
	var mngr = 0;
	var sts = 218;
	
	var auto_asgn = 0;
	
	if(emplnth == 0  ){ 
		mngr = 1;
		sts = 217;
		auto_asgn = 1; 
	}
	
	var appointmentDate;
	data.customFieldGroups.filter((k) => {
		if (k.customfieldGroupName == 'ScheduleDate') {
			console.log("k.additionalProperties.ScheduleDate",k.additionalProperties.ScheduleDate)
			let dat = moment(k.additionalProperties.ScheduleDate, 'DD/MM/YYYY hh:mm:ss A').toDate()
			appointmentDate = moment(dat).format("YYYY-MM-DD HH:mm:ss");
			console.log("appointmentDate",appointmentDate)
		}
	})
	var taskAddressblock = ``;
	var taskAddressstreet1 = ``;
	var taskAddressstreet2 = ``;
	if(data.taskAddress.block){
		taskAddressblock = `${data.taskAddress.block.replace(/['"]+/g, '')}`
	}	
	if(data.taskAddress.street1){
		taskAddressstreet1 = `${data.taskAddress.street1.replace(/['"]+/g, '')}`
	}	
	if(data.taskAddress.street2){
		taskAddressstreet2 = `${data.taskAddress.street2.replace(/['"]+/g, '')}`
	}
	
	// if (data.task_type_name != '' && data.task_type_name != null && data.task_type_name != undefined) {
        // task_types1 = `,'${data.task_type_name}'`;
    // }

    // if (data.customerName != '' && data.customerName != null && data.customerName != undefined) {
        // customerName = `,'${data.customerName}'`;
    // }

    // if (PurposeOfVisit != '' || PurposeOfVisit != null || PurposeOfVisit != undefined) {
        // PurposeOfVisitValue = `,'${PurposeOfVisit}'`;
    // }

    // if (FeasibilityId != '' || FeasibilityId != null || FeasibilityId != undefined) {
        // FeasibilityIdValue = `,'${FeasibilityId}'`;
    // }
	
	
	var fnm = 'srvcnowcreatetaskMdl'; 
	var taskStatusTimestamp = moment(data.taskStatus.taskStatusTimestamp).format("YYYY-MM-DD HH:mm:ss");
	var priority = `p${data.priority}`     
	var QRY_TO_EXEC = ` UPDATE tasks
SET
    cluster_id = ${pincodeSNdata.cluster_id},
    auto_assgn = ${auto_asgn},
    primary_flag = 0,
    mngr = ${mngr},
    task_status = ${sts},
    task_type = ${tasktypedata.comp_cat_id},
    circuit_id = '${crcktid}',
    task_no = '${data.taskIdentity}',
    service_no = '${data.externalId}',
    call_attend_by = ${empdata.emp_id},
    call_type = '${data.taskAction}',
    task_other_issue = '${data.taskType}',
    task_category = ${tasktypedata.main_cat_id},
    task_owner = ${taskowner},
    task_message = '${data.title}',
    task_created_date = current_timestamp(),
    emp_id = ${empdata.emp_id},
    remarks = '${data.ownerIdentity}',
    task_priority = '${priority}',
    emp_department_id = '${empdata.emp_dept}',
    task_latitude = '${data.taskLatitude}',
    task_longitude = '${data.taskLongitude}',
    task_assigned_date = '${taskStatusTimestamp}',
    task_appointment_date = '${appointmentDate}',
    taskAddress = '${taskAddressblock} , ${taskAddressstreet1} ,${taskAddressstreet2} ,${data.taskAddress.state} ,${data.taskAddress.city} ,${data.taskAddress.country} ,${data.taskAddress.pincode}',
    task_pincode = '${data.taskAddress.pincode}',
    formId = '${data.formId}',
    slaTime = '${data.slaTime}'
WHERE
    task_id = ${oldtaskid};
  `	
	console.log(oldtaskid,'this is the oldtaskiddddddddddddddddddddddd')
	console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

// /**************************************************************************************
// * Controller     : srvcnowcreaterepeateParenttaskMdl
// * Parameters     : req,res()
// * Description    : get details of all EntrpeCstmrTyp
// * Change History :
// * 11/05/2023   -  Ramesh Patlola - Initial Function
// *
// ***************************************************************************************/

// exports.srvcnowcreaterepeateParenttaskMdl = function(data,empdata,crcktid,tasktypedata,emplnth, taskowner, taskno, serviceno,oldtaskid,parentid){ 
	// var fnm = 'srvcnowcreaterepeateParenttaskMdl'; 
	// if(emplnth == 0) {
		// return new Promise((resolve, reject) => {
			// resolve(true)
		// })
	// } else {
		// var mngr = 0;
		// var sts = 218;
		// var taskAddressblock = ``;
		// var taskAddressstreet1 = ``;
		// var taskAddressstreet2 = ``;
		// if(data.taskAddress.block){
			// taskAddressblock = `${data.taskAddress.block.replace(/['"]+/g, '')}`
		// }	
		// if(data.taskAddress.street1){
			// taskAddressstreet1 = `${data.taskAddress.street1.replace(/['"]+/g, '')}`
		// }	
		// if(data.taskAddress.street2){
			// taskAddressstreet2 = `${data.taskAddress.street2.replace(/['"]+/g, '')}`
		// }
		// var taskStatusTimestamp = moment(data.taskStatus.taskStatusTimestamp).format("YYYY-MM-DD HH:mm:ss");
		// var appointmentDate = moment(data.appointmentDate).format("YYYY-MM-DD HH:mm:ss");
		// var priority = `p${data.priority}`
		// var QRY_TO_EXEC = ` UPDATE tasks
// SET
    // parent_id = ${parentid},
    // primary_flag = 1,
    // mngr = ${mngr},
    // task_status = 218,
    // task_type = ${tasktypedata.comp_cat_id},
    // circuit_id = '${crcktid}',
    // service_no = '${serviceno}',
    // call_attend_by = ${empdata.emp_id},
    // call_type = '${data.taskAction}',
    // task_other_issue = '${data.taskType}',
    // task_category = ${tasktypedata.main_cat_id},
    // task_owner = ${taskowner},
    // task_message = '${data.title}',
    // task_created_date = current_timestamp(),
    // emp_id = ${empdata.emp_id},
    // remarks = '${data.ownerIdentity}',
    // task_priority = '${priority}',
    // emp_department_id = '${empdata.emp_dept}',
    // task_latitude = '${data.taskLatitude}',
    // task_longitude = '${data.taskLongitude}',
    // task_assigned_date = '${taskStatusTimestamp}',
    // task_appointment_date = '${appointmentDate}',
    // taskAddress = '${taskAddressblock} , ${taskAddressstreet1} ,${taskAddressstreet2} ,${data.taskAddress.state} ,${data.taskAddress.city} ,${data.taskAddress.country} ,${data.taskAddress.pincode}',
    // task_pincode = '${data.taskAddress.pincode}',
    // formId = '${data.formId}',
    // slaTime = '${data.slaTime}'
// WHERE
    // task_id = '${oldtaskid}';
 // `
		
		// console.log(oldtaskid,'this is the oldtaskiddddddddddddddddddddddd')
		// console.log(QRY_TO_EXEC);
		// return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
	// }
// }


/**************************************************************************************
* Controller     : srvcnowcreaterepeateRiggertaskMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 11/05/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.srvcnowcreaterepeateRiggertaskMdl = function(data,empdata,crcktid,tasktypedata,emplnth, taskowner, taskno, serviceno, parentid,oldtaskid){ 
	var fnm = 'srvcnowcreaterepeateRiggertaskMdl'; 
	if(emplnth == 0) {
		return new Promise((resolve, reject) => {
			resolve(true)
		})
	} else {
		var mngr = 0;
		var sts = 218;
		var taskAddressblock = ``;
		var taskAddressstreet1 = ``;
		var taskAddressstreet2 = ``;
		if(data.taskAddress.block){
			taskAddressblock = `${data.taskAddress.block.replace(/['"]+/g, '')}`
		}	
		if(data.taskAddress.street1){
			taskAddressstreet1 = `${data.taskAddress.street1.replace(/['"]+/g, '')}`
		}	
		if(data.taskAddress.street2){
			taskAddressstreet2 = `${data.taskAddress.street2.replace(/['"]+/g, '')}`
		}
		var taskStatusTimestamp = moment(data.taskStatus.taskStatusTimestamp).format("YYYY-MM-DD HH:mm:ss");
		var appointmentDate = moment(data.appointmentDate).format("YYYY-MM-DD HH:mm:ss");
		var priority = `p${data.priority}`
		var QRY_TO_EXEC = ` UPDATE tasks
SET
    parent_id = ${parentid},
    primary_flag = 0,
    mngr = ${mngr},
    task_status = 218,
    task_type = ${tasktypedata.comp_cat_id},
    circuit_id = '${crcktid}',
    service_no = '${serviceno}',
    call_attend_by = ${empdata.emp_id},
    call_type = '${data.taskAction}',
    task_other_issue = '${data.taskType}',
    task_category = ${tasktypedata.main_cat_id},
    task_owner = ${taskowner},
    task_message = '${data.title}',
    task_created_date = current_timestamp(),
    emp_id = ${empdata.emp_id},
    remarks = '${data.ownerIdentity}',
    task_priority = '${priority}',
    emp_department_id = '${empdata.emp_dept}',
    task_latitude = '${data.taskLatitude}',
    task_longitude = '${data.taskLongitude}',
    task_assigned_date = '${taskStatusTimestamp}',
    task_appointment_date = '${appointmentDate}',
    taskAddress = '${taskAddressblock} , ${taskAddressstreet1} ,${taskAddressstreet2} ,${data.taskAddress.state} ,${data.taskAddress.city} ,${data.taskAddress.country} ,${data.taskAddress.pincode}',
    task_pincode = '${data.taskAddress.pincode}',
    formId = '${data.formId}',
    slaTime = '${data.slaTime}'
WHERE
    task_id = '${oldtaskid}';
  `
		console.log(QRY_TO_EXEC);
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
	}
}


/**************************************************************************************
* Controller     : getrepeateinsrttaskMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 19/04/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.getrepeateinsrttaskMdl = function(id,oldtaskid){
	var fnm = 'getrepeateinsrttaskMdl';
	var QRY_TO_EXEC = `select * from tasks where task_id='${oldtaskid}'`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : srvcnowcreaterepeatetaskMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 18/04/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.srvcnowcreaterepeatetaskMdl = function(data,empdata,crcktid,tasktypedata,emplnth, taskowner, pincodeSNdata,FeasibilityId,PurposeOfVisit){
	
	
	

	
	console.log(emplnth,'employeeeeee lenghttttttttttt')
	var task_types1 = ``;
    var customerName = ``;
    var PurposeOfVisitValue = ``;  
    var FeasibilityIdValue = ``; 
	var mngr = 0;
	var sts = 218;
	
	var auto_asgn = 0;
	
	if(emplnth == 0  ){ 
		mngr = 1;
		sts = 217;
		auto_asgn = 1; 
	}
	var appointmentDate;
	data.customFieldGroups.filter((k) => {
		if (k.customfieldGroupName == 'ScheduleDate') {
			console.log("k.additionalProperties.ScheduleDate",k.additionalProperties.ScheduleDate)
			let dat = moment(k.additionalProperties.ScheduleDate, 'DD/MM/YYYY hh:mm:ss A').toDate()
			appointmentDate = moment(dat).format("YYYY-MM-DD HH:mm:ss");
			console.log("appointmentDate",appointmentDate)
		}
	})
	var taskAddressblock = ``;
	var taskAddressstreet1 = ``;
	var taskAddressstreet2 = ``;
	if(data.taskAddress.block){
		taskAddressblock = `${data.taskAddress.block.replace(/['"]+/g, '')}`
	}	
	if(data.taskAddress.street1){
		taskAddressstreet1 = `${data.taskAddress.street1.replace(/['"]+/g, '')}`
	}	
	if(data.taskAddress.street2){
		taskAddressstreet2 = `${data.taskAddress.street2.replace(/['"]+/g, '')}`
	}
	
	if (data.taskType != '' || data.taskType != null || data.taskType != undefined) {
        task_types1 = `,'${data.taskType}'`;
    }

    if (data.customerContactName != '' || data.customerContactName != null || data.customerContactName != undefined) {
        customerName = `,'${data.customerContactName}'`;
    }

    if (PurposeOfVisit != '' || PurposeOfVisit != null || PurposeOfVisit != undefined) {
        PurposeOfVisitValue = `,'${PurposeOfVisit}'`;
    }

    if (FeasibilityId != '' || FeasibilityId != null || FeasibilityId != undefined) {
        FeasibilityIdValue = `,'${FeasibilityId}'`;
    }
	
	
	var fnm = 'srvcnowcreatetaskMdl'; 
	var taskStatusTimestamp = moment(data.taskStatus.taskStatusTimestamp).format("YYYY-MM-DD HH:mm:ss");
	var priority = `p${data.priority}`
	var QRY_TO_EXEC = `insert into tasks (cluster_id,auto_assgn,primary_flag,mngr,task_status,task_type,circuit_id,task_no, service_no, call_attend_by, call_type, task_other_issue, task_category, task_owner, task_message, task_created_date,
	emp_id, remarks, task_priority, emp_department_id, task_latitude, task_longitude, task_assigned_date, task_appointment_date, taskAddress, task_pincode, formId, slaTime,task_type_name,customer_name,purpose_of_visit,feasibility_id) values 
	(${pincodeSNdata.cluster_id},${auto_asgn},0,${mngr},${sts},${tasktypedata.comp_cat_id},'${crcktid}','${data.taskIdentity}','${data.externalId}',${empdata.emp_id},'${data.taskAction}','${data.taskType}',${tasktypedata.main_cat_id},${taskowner},'${data.title}',current_timestamp(),
	${empdata.emp_id},'${data.ownerIdentity}','${priority}','${empdata.emp_dept}','${data.taskLatitude}','${data.taskLongitude}','${taskStatusTimestamp}','${appointmentDate}',
	'${taskAddressblock} , ${taskAddressstreet1} ,${taskAddressstreet2} ,${data.taskAddress.state} ,${data.taskAddress.city} ,${data.taskAddress.country} ,${data.taskAddress.pincode} '
	 ,'${data.taskAddress.pincode}','${data.formId}','${data.slaTime}' ${task_types1}${customerName}${PurposeOfVisitValue}${FeasibilityIdValue})`;
	

   console.log(QRY_TO_EXEC);
	
	
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : srvcnowcreaterepeateParenttaskMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 11/05/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.srvcnowcreaterepeateParenttaskMdl = function(data,empdata,crcktid,tasktypedata,emplnth, taskowner, taskno, serviceno, parentid,oldtaskid){ 
	var fnm = 'srvcnowcreaterepeateParenttaskMdl'; 
	if(emplnth == 0) {
		return new Promise((resolve, reject) => {
			resolve(true)
		})
	} else {
		var mngr = 0;
		var sts = 218;
		var taskAddressblock = ``;
		var taskAddressstreet1 = ``;
		var taskAddressstreet2 = ``;
		if(data.taskAddress.block){
			taskAddressblock = `${data.taskAddress.block.replace(/['"]+/g, '')}`
		}	
		if(data.taskAddress.street1){
			taskAddressstreet1 = `${data.taskAddress.street1.replace(/['"]+/g, '')}`
		}	
		if(data.taskAddress.street2){
			taskAddressstreet2 = `${data.taskAddress.street2.replace(/['"]+/g, '')}`
		}
		console.log(oldtaskid,'oldtaskidddddddddd1234')
		var taskStatusTimestamp = moment(data.taskStatus.taskStatusTimestamp).format("YYYY-MM-DD HH:mm:ss");
		var appointmentDate = moment(data.appointmentDate).format("YYYY-MM-DD HH:mm:ss");
		var priority = `p${data.priority}`
		var QRY_TO_EXEC = `insert into tasks (parent_id,primary_flag,mngr,task_status,task_type,circuit_id,task_no, service_no, call_attend_by, call_type, task_other_issue, task_category, task_owner, task_message, task_created_date,
		emp_id, remarks, task_priority, emp_department_id, task_latitude, task_longitude, task_assigned_date, task_appointment_date, taskAddress, task_pincode, formId, slaTime) values 
		(${oldtaskid},1,${mngr},218,${tasktypedata.comp_cat_id},'${crcktid}','${taskno}','${serviceno}',${empdata.emp_id},'${data.taskAction}','${data.taskType}',${tasktypedata.main_cat_id},${taskowner},'${data.title}',current_timestamp(),
		${empdata.emp_id},'${data.ownerIdentity}','${priority}','${empdata.emp_dept}','${data.taskLatitude}','${data.taskLongitude}','${taskStatusTimestamp}','${appointmentDate}',
		'${taskAddressblock} , ${taskAddressstreet1} ,${taskAddressstreet2} ,${data.taskAddress.state} ,${data.taskAddress.city} ,${data.taskAddress.country} ,${data.taskAddress.pincode} '
		,'${data.taskAddress.pincode}','${data.formId}','${data.slaTime}')`
		
		// console.log(oldtaskid,'oldtaskiddddddddddddddddddddddddddddddd')
		// if(oldtaskid){
			// var QRY_TO_EXEC =`update tasks set task_status=217 where task_id=${oldtaskid}`
		// }
		

		console.log(QRY_TO_EXEC);
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
	}
}

/**************************************************************************************
* Controller     : insrtrepeateapicalldtlsMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 25/07/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.insrtrepeateapicalldtlsMdl = function(reqst, data, options, web_app, user,oldtaskid,taskDataObject,tskdata){
	var fnm = 'insrtrepeateapicalldtlsMdl';
	var emp_id=0;
	console.log(data,'dataaaaaaaa')
	console.log(oldtaskid,'oldtaskkdataaaaaaaa1')
	 console.log(tskdata,'taskkkdataaaaaaaa1')
	console.log(taskDataObject,'taskkkdataaaaaaaaobject2')
	console.log(taskDataObject[0],'taskkkdataaaaaaaaobject2')
	if(user){
		if(user.emp_id)
		emp_id = user.emp_id;
	}
	var QRY_TO_EXEC = `insert into api_rqst_cl_dtl_t ( web_app,task_id, task_no, service_no, url_tx, url_dta_tx, hdr_tx, crte_usr_id, a_in, i_ts) 
	values (${web_app},'${tskdata}','${taskDataObject.primaryAssignment}','${taskDataObject.externalID}','${JSON.stringify(options.url)}','${JSON.stringify(options.data).replace(/'/g, "''")}','${JSON.stringify(options.headers).replace(/'/g, "''")}','${emp_id}',1,current_timestamp());`
	
	console.log(oldtaskid,'oldtaskiddddddddddddddddddddddddddddddd')
		if(oldtaskid){
			var QRY_TO_EXEC =`update tasks set task_status=217 where task_id=${oldtaskid}`
		}

   console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}
/**************************************************************************************
* Controller     : getinsrttaskMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 19/04/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.getinsrtrepeatetaskMdl = function(id,oldtaskid){
	var fnm = 'getinsrttaskMdl';
	var QRY_TO_EXEC = `select * from tasks where task_id=${oldtaskid}`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : repeatesrvcnowcreateRiggertaskMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 11/05/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.repeatesrvcnowcreateRiggertaskMdl = function(data,empdata,crcktid,tasktypedata,emplnth, taskowner, taskno, serviceno, parentid,oldtaskid){ 
	var fnm = 'repeatesrvcnowcreateRiggertaskMdl'; 
	if(emplnth == 0) {
		return new Promise((resolve, reject) => {
			resolve(true)
		})
	} else {
		var mngr = 0;
		var sts = 218;
		var taskAddressblock = ``;
		var taskAddressstreet1 = ``;
		var taskAddressstreet2 = ``;
		if(data.taskAddress.block){
			taskAddressblock = `${data.taskAddress.block.replace(/['"]+/g, '')}`
		}	
		if(data.taskAddress.street1){
			taskAddressstreet1 = `${data.taskAddress.street1.replace(/['"]+/g, '')}`
		}	
		if(data.taskAddress.street2){
			taskAddressstreet2 = `${data.taskAddress.street2.replace(/['"]+/g, '')}`
		}
		
		console.log(oldtaskid,'oldtaskiddddddd456')
		var taskStatusTimestamp = moment(data.taskStatus.taskStatusTimestamp).format("YYYY-MM-DD HH:mm:ss");
		var appointmentDate = moment(data.appointmentDate).format("YYYY-MM-DD HH:mm:ss");
		var priority = `p${data.priority}`
		var QRY_TO_EXEC = `insert into tasks (parent_id,primary_flag,mngr,task_status,task_type,circuit_id,task_no, service_no, call_attend_by, call_type, task_other_issue, task_category, task_owner, task_message, task_created_date,
		emp_id, remarks, task_priority, emp_department_id, task_latitude, task_longitude, task_assigned_date, task_appointment_date, taskAddress, task_pincode, formId, slaTime) values 
		(${oldtaskid},0,${mngr},218,${tasktypedata.comp_cat_id},'${crcktid}','${taskno}','${serviceno}',${empdata.emp_id},'${data.taskAction}','${data.taskType}',${tasktypedata.main_cat_id},${taskowner},'${data.title}',current_timestamp(),
		${empdata.emp_id},'${data.ownerIdentity}','${priority}','${empdata.emp_dept}','${data.taskLatitude}','${data.taskLongitude}','${taskStatusTimestamp}','${appointmentDate}',
		'${taskAddressblock} , ${taskAddressstreet1} ,${taskAddressstreet2} ,${data.taskAddress.state} ,${data.taskAddress.city} ,${data.taskAddress.country} ,${data.taskAddress.pincode} '
		,'${data.taskAddress.pincode}','${data.formId}','${data.slaTime}')`
		console.log(QRY_TO_EXEC);
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
	}
}

/**************************************************************************************
* Controller     : insrtservicenowfulldatarepeatedMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 15/05/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

// exports.insrtservicenowfulldatarepeatedMdl = function(data){
	// var fnm = 'insrtservicenowfulldatarepeatedMdl';
	// console.log(data[0],'dataaaaaaaaaaaaa[00000000000000000000000000000000000000000]')
	// const dataa=data[0]
  // var QRY_TO_EXEC = ` insert    `
    // console.log(QRY_TO_EXEC);
	 // var responce=mysql.escape(replace)
	// return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
// }

