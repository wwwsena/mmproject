//Git change

selectedEquipmentData = {};
function getEquipData(equipmentData) {
    kony.print("function     equipmentData-------------")
    frmEquipmentDetails.lblDescription.text = equipmentData[0].Description;
    frmEquipmentDetails.lblObjType.text = "ObjectType: " + equipmentData[0].ObjectType;
    frmEquipmentDetails.lblManufac.text = "Manufacturer: " + equipmentData[0].Manufacturer;
    frmEquipmentDetails.lblSerialNum.text = "SerialNumber: " + equipmentData[0].SerialNumber;
    frmEquipmentDetails.show();
}

function setSoilTypeData(){
	//alert( "selectedEquipmentData[0].SoftSoilType="+ selectedEquipmentData[0].SoftSoilType)
	if (null != selectedEquipmentData[0].SoftSoilType){
		var soilMain = selectedEquipmentData[0].SoftSoilType;
		//alert("soilMain="+soilMain);
		if (soilMain == "NO" ){
			frmVapourResp2.radSoftSoilMain.selectedKey = "2";
		}else if (soilMain == "NA" ){
			frmVapourResp2.radSoftSoilMain.selectedKey = "3";
		}else {
			//alert("inside soilMain="+soilMain);
			frmVapourResp2.radSoftSoilMain.selectedKey = "1";
			//alert("Setting Main selectedKeyValue:"+frmVapourResp2.radSoftSoilMain.selectedKeyValue);
		//if soil type is present in JSON object then select Yes and Populate diameter
			//var indexArr = soilMain.split(","); // ex: 1, Sand
			frmVapourResp2.radSoftSoilType.selectedKey = soilMain; // ex: gives 1
			//alert("Setting Type selectedKeyValue:"+frmVapourResp2.radSoftSoilType.selectedKeyValue);
			frmVapourResp2.tbxDiameter.text = selectedEquipmentData[0].SoftSoilDia;
			//alert("Setting Dia selectedKeyValue:"+frmVapourResp2.tbxDiameter.text);
		}

	}

}

function updateSoilTypeData(){
	var apcTag = selectedEquipmentData[0].APCTag;
	//alert("current frmVapourResp2.radSoftSoilMain.selectedKey="+frmVapourResp2.radSoftSoilMain.selectedKey);
	var newSoilType = frmVapourResp2.radSoftSoilMain.selectedKey;
	var newSoilTypeValue = frmVapourResp2.radSoftSoilMain.selectedKeyValue;
	//alert("newSoilTypeValue="+newSoilTypeValue);
	if  (!validateSoilTypeDataUpdates()){
		//alert("returning on validation failure.");
		return;
	}
	if (newSoilType == "2" ){
		var objectProduct = {SoftSoilType:"NO"};
		//alert("Sending object for update:"+JSON.stringify(objectProduct));
	    equipment_update(apcTag, objectProduct, successCallback_update , errorFailCallback_update)
	}else 	if (newSoilType == "3" ){
		var objectProduct = {SoftSoilType:"NA"};
		//alert("Sending object for update:"+JSON.stringify(objectProduct));
		//alert('Before update sync')
	equipment_update(apcTag, objectProduct, successCallback_update , errorFailCallback_update)
	} else{
		var stringType = frmVapourResp2.radSoftSoilType.selectedKeyValue;
		var objectProduct = {SoftSoilType:stringType[0],SoftSoilDia:frmVapourResp2.tbxDiameter.text};
		//alert("Sending object for update:"+JSON.stringify(objectProduct));
		//alert('Before update sync')
	equipment_update(apcTag, objectProduct, successCallback_update , errorFailCallback_update)
	}
	//frmVapourResp3.show();
	//alert("new frmVapourResp2.radSoftSoilMain.selectedKey="+frmVapourResp2.radSoftSoilMain.selectedKey);

}

function equipment_update(apcTag, objectProduct, successCallback_update , errorFailCallback_update){

		var wcs = "";
		if ((kony.sync.getBackEndDBType()== kony.sync.dbTypeSQLCE)) {
	        wcs = "where APCTag = '" + apcTag+"'";
	    } else if ((kony.sync.getBackEndDBType() == kony.sync.dbTypeSQLLite)) {
	        wcs = "where APCTag = " + apcTag;
	    }
		Equipment.update(wcs, objectProduct, successCallback_update , errorFailCallback_update)

}

 function successCallback_update(ressssstwert)
 {
 kony.print("@@@@  data is"+JSON.stringify(ressssstwert));
 syncStartSession();
 }

function errorFailCallback_update()
{
kony.print("some update error is there @@@@@");
}

function onClickVapourRe(){
	var apcTagVal = selectedEquipmentData[0].APCTag;
	var fLocVal = selectedEquipmentData[0].FuncLoc;
	frmVapourResp1.lblAPCTag.text = apcTagVal;
	frmVapourResp1.lblFLoc.text = fLocVal;
	frmVapourResp2.lblAPCTag.text = apcTagVal;
	frmVapourResp2.lblFuncLoc.text = fLocVal;
    frmVapourResp1.show();
}

//For setting section 14 data on screen load
function setGuyWireData(){
	var guyWireMain = selectedEquipmentData[0].GuyWireMain;
	kony.print("guyWireMain---------"+guyWireMain);
	frmVapourResp2.radGuyWireMain.selectedKey = guyWireMain.trim();
	var guyWireCond = selectedEquipmentData[0].GuyWireCond;
	frmVapourResp2.cbxGuyWire.selectedKey = guyWireCond.trim();
	var guyWireQA = selectedEquipmentData[0].GuyWireQA;
	frmVapourResp2.radGuyWireQA.selectedKey = guyWireQA.trim();
	var guyWireQB = selectedEquipmentData[0].GuyWireQB;
	frmVapourResp2.radGuyWireQB.selectedKey = guyWireQB.trim();
	var guyWireQC = selectedEquipmentData[0].GuyWireQC;
	frmVapourResp2.radGuyWireQC.selectedKey = guyWireQC.trim();
	var guyWireQD = selectedEquipmentData[0].GuyWireQD;
	frmVapourResp2.radGuyWireQD.selectedKey = guyWireQD.trim();
	var guyWireQE = selectedEquipmentData[0].GuyWireQE;
	frmVapourResp2.radGuyWireQE.selectedKey = guyWireQE.trim();
	var guyWireQF = selectedEquipmentData[0].GuyWireQF;
	frmVapourResp2.radGuyWireQF.selectedKey = guyWireQF.trim();
	var guyWireQG = selectedEquipmentData[0].GuyWireQG;
	frmVapourResp2.radGuyWireQG.selectedKey = guyWireQG.trim();
	var guyWireQH = selectedEquipmentData[0].GuyWireQH;
	frmVapourResp2.radGuyWireQH.selectedKey = guyWireQH.trim();
	var guyWireQI = selectedEquipmentData[0].GuyWireQI;
	frmVapourResp2.radGuyWireQI.selectedKey = "1";
	if 	(guyWireQI.trim() == "null"){
		frmVapourResp2.radGuyWireQI.selectedKey = "2";
	}else {
		frmVapourResp2.radradGuyWireQIDetails.selectedKey = guyWireQI.trim();
	}
}

function updateGuyWireData(){
	var apcTag = selectedEquipmentData[0].APCTag;
	var objectProduct = {GuyWireMain:frmVapourResp2.radGuyWireMain.selectedKey
						,GuyWireCond:frmVapourResp2.cbxGuyWire.selectedKey
						,GuyWireQA:frmVapourResp2.radGuyWireQA.selectedKey
						,GuyWireQB:frmVapourResp2.radGuyWireQB.selectedKey
						,GuyWireQC:frmVapourResp2.radGuyWireQC.selectedKey
						,GuyWireQD:frmVapourResp2.radGuyWireQD.selectedKey
						,GuyWireQE:frmVapourResp2.radGuyWireQE.selectedKey
						,GuyWireQF:frmVapourResp2.radGuyWireQF.selectedKey
						,GuyWireQG:frmVapourResp2.radGuyWireQG.selectedKey
						,GuyWireQH:frmVapourResp2.radGuyWireQH.selectedKey
						,GuyWireQI:frmVapourResp2.radradGuyWireQIDetails.selectedKey};
	Equipment.update("where APCTag = " + apcTag, objectProduct, successCallback_updateGuyWire , errorFailCallback_updateGuyWire)

}
 function successCallback_updateGuyWire(ressssstwert)
 {
 kony.print("@@@@  guywire data is"+JSON.stringify(ressssstwert));
 syncStartSession();
 }

function errorFailCallback_updateGuyWire()
{
kony.print("some guywire data update error is there @@@@@");
}

function setSoilTypeDataForked(){
//alert( "selectedEquipmentData[0].SoftSoilType="+ selectedEquipmentData[0].SoftSoilType)

	if (null != selectedEquipmentData[0].SoftSoilType){
	var soilMain = selectedEquipmentData[0].SoftSoilType;
	//alert("soilMain="+soilMain);
	if (soilMain == "NO" ){
		frmVapourResp2.btnSoftNo.skin = btnCheck;
		frmVapourResp2.btnSoftYes.skin = btnUnCheck;
		frmVapourResp2.btnSoftNA.skin = btnUnCheck;
	}else if (soilMain == "NA" ){
		frmVapourResp2.btnSoftNo.skin = btnUnCheck;
		frmVapourResp2.btnSoftYes.skin = btnUnCheck;
		frmVapourResp2.btnSoftNA.skin = btnCheck;
	}else {
		//alert("inside soilMain="+soilMain);
		frmVapourResp2.btnSoftYes.skin = btnCheck;
		frmVapourResp2.btnSoftNo.skin = btnUnCheck;
		frmVapourResp2.btnSoftNA.skin = btnUnCheck;
		frmVapourResp2.tbxDiameter.text = selectedEquipmentData[0].SoftSoilDia;
		for (i = 1; i < 8; i++){
			var btnObj = eval("frmVapourResp2.btnSoilType"+i);
			if(i == soilMain){
				btnObj.skin = btnCheck;
			}else{
				btnObj.skin = btnUnCheck;
			}
		}
	}

	}

}

function setGuyWireDataForked(){
	var guyWireMain = selectedEquipmentData[0].GuyWireMain;
		for (i = 1; i < 4; i++){
			var btnObj = eval("frmVapourResp2.btnTower"+i);
			if(i == guyWireMain.trim()){
				btnObj.skin = btnCheck;
			}else{
				btnObj.skin = btnUnCheck;
			}
		}
	var guyWireCond = selectedEquipmentData[0].GuyWireCond;
	frmVapourResp2.cbxTower.selectedKey = guyWireCond.trim();

	setCheckUnCheck(selectedEquipmentData[0].GuyWireQA,"A");
	setCheckUnCheck(selectedEquipmentData[0].GuyWireQB,"B");
	setCheckUnCheck(selectedEquipmentData[0].GuyWireQC,"C");
	setCheckUnCheck(selectedEquipmentData[0].GuyWireQD,"D");
	setCheckUnCheck(selectedEquipmentData[0].GuyWireQE,"E");
	setCheckUnCheck(selectedEquipmentData[0].GuyWireQF,"F");
	setCheckUnCheck(selectedEquipmentData[0].GuyWireQG,"G");
	setCheckUnCheck(selectedEquipmentData[0].GuyWireQH,"H");
	var wireI = selectedEquipmentData[0].GuyWireQI;
	//alert(wireI);
	if (wireI.trim() == null || wireI.trim() == "null" ){
		frmVapourResp2.btnWireI1.skin = btnUnCheck;
		frmVapourResp2.btnWireI2.skin = btnCheck;
	}else{
		frmVapourResp2.btnWireI1.skin = btnCheck;
		frmVapourResp2.btnWireI2.skin = btnUnCheck;
		for (i=1;i<7;i++){
			var btnObj = eval("frmVapourResp2.btnWireIDetails"+i);
			if (wireI.trim() == i){
				btnObj.skin = btnCheck;
			}else{
				btnObj.skin = btnUnCheck;
			}
		}
	}
	//setCheckUnCheck(selectedEquipmentData[0].GuyWireQI,"I");
	//btnWireIDetails6

}

function setCheckUnCheck(towerSelection,towerIndex){
	var btnObj1 = eval("frmVapourResp2.btnWire"+towerIndex+"1");
	var btnObj2 = eval("frmVapourResp2.btnWire"+towerIndex+"2");
	if (towerSelection.trim() == "1"){
		btnObj1.skin = btnCheck;
		btnObj2.skin = btnUnCheck;
	}else{
		btnObj1.skin = btnUnCheck;
		btnObj2.skin = btnCheck;
	}

}

function onSoilDeselectForked(){
	//if No/NA is selected then clear SoilType and diameter
	var soilYes = frmVapourResp2.btnSoftYes.skin;
	if (soilYes != btnCheck ){
		frmVapourResp2.tbxDiameter.setEnabled(false);
		for (i = 1; i < 8; i++){
			var btnObj = eval("frmVapourResp2.btnSoilType"+i);
			btnObj.setEnabled(false);
		}
	}else{
		frmVapourResp2.tbxDiameter.setEnabled(true);
		for (i = 1; i < 8; i++){
			var btnObj = eval("frmVapourResp2.btnSoilType"+i);
			btnObj.setEnabled(true);
		}
	}
}


function onGuyWireSelectForked(){
	var soilYes = frmVapourResp2.btnTower1.skin;
	if (soilYes != btnCheck ){
		frmVapourResp2.btnWireA1.setEnabled(false);
		frmVapourResp2.btnWireB1.setEnabled(false);
		frmVapourResp2.btnWireC1.setEnabled(false);
		frmVapourResp2.btnWireD1.setEnabled(false);
		frmVapourResp2.btnWireE1.setEnabled(false);
		frmVapourResp2.btnWireF1.setEnabled(false);
		frmVapourResp2.btnWireG1.setEnabled(false);
		frmVapourResp2.btnWireH1.setEnabled(false);
		frmVapourResp2.btnWireI1.setEnabled(false);

		frmVapourResp2.btnWireA2.setEnabled(false);
		frmVapourResp2.btnWireB2.setEnabled(false);
		frmVapourResp2.btnWireC2.setEnabled(false);
		frmVapourResp2.btnWireD2.setEnabled(false);
		frmVapourResp2.btnWireE2.setEnabled(false);
		frmVapourResp2.btnWireF2.setEnabled(false);
		frmVapourResp2.btnWireG2.setEnabled(false);
		frmVapourResp2.btnWireH2.setEnabled(false);
		frmVapourResp2.btnWireI2.setEnabled(false);

		frmVapourResp2.btnWireIDetails1.setEnabled(false);
		frmVapourResp2.btnWireIDetails2.setEnabled(false);
		frmVapourResp2.btnWireIDetails3.setEnabled(false);
		frmVapourResp2.btnWireIDetails4.setEnabled(false);
		frmVapourResp2.btnWireIDetails5.setEnabled(false);
		frmVapourResp2.btnWireIDetails6.setEnabled(false);
	}else{
		frmVapourResp2.btnWireA1.setEnabled(true);
		frmVapourResp2.btnWireB1.setEnabled(true);
		frmVapourResp2.btnWireC1.setEnabled(true);
		frmVapourResp2.btnWireD1.setEnabled(true);
		frmVapourResp2.btnWireE1.setEnabled(true);
		frmVapourResp2.btnWireF1.setEnabled(true);
		frmVapourResp2.btnWireG1.setEnabled(true);
		frmVapourResp2.btnWireH1.setEnabled(true);
		frmVapourResp2.btnWireI1.setEnabled(true);

		frmVapourResp2.btnWireA2.setEnabled(true);
		frmVapourResp2.btnWireB2.setEnabled(true);
		frmVapourResp2.btnWireC2.setEnabled(true);
		frmVapourResp2.btnWireD2.setEnabled(true);
		frmVapourResp2.btnWireE2.setEnabled(true);
		frmVapourResp2.btnWireF2.setEnabled(true);
		frmVapourResp2.btnWireG2.setEnabled(true);
		frmVapourResp2.btnWireH2.setEnabled(true);
		frmVapourResp2.btnWireI2.setEnabled(true);

		frmVapourResp2.btnWireIDetails1.setEnabled(true);
		frmVapourResp2.btnWireIDetails2.setEnabled(true);
		frmVapourResp2.btnWireIDetails3.setEnabled(true);
		frmVapourResp2.btnWireIDetails4.setEnabled(true);
		frmVapourResp2.btnWireIDetails5.setEnabled(true);
		frmVapourResp2.btnWireIDetails6.setEnabled(true);
	}
}

function onQISelectForked(){
	var soilYes = frmVapourResp2.btnWireI1.skin;
	if (soilYes != btnCheck ){
		frmVapourResp2.btnWireIDetails1.setEnabled(false);
		frmVapourResp2.btnWireIDetails2.setEnabled(false);
		frmVapourResp2.btnWireIDetails3.setEnabled(false);
		frmVapourResp2.btnWireIDetails4.setEnabled(false);
		frmVapourResp2.btnWireIDetails5.setEnabled(false);
		frmVapourResp2.btnWireIDetails6.setEnabled(false);
	}else{
		frmVapourResp2.btnWireIDetails1.setEnabled(true);
		frmVapourResp2.btnWireIDetails2.setEnabled(true);
		frmVapourResp2.btnWireIDetails3.setEnabled(true);
		frmVapourResp2.btnWireIDetails4.setEnabled(true);
		frmVapourResp2.btnWireIDetails5.setEnabled(true);
		frmVapourResp2.btnWireIDetails6.setEnabled(true);
	}
}

function updateSoilTypeDataForked(){
	var apcTag = selectedEquipmentData[0].APCTag;
	var soilYes = frmVapourResp2.btnSoftYes.skin;
	var soilNo = frmVapourResp2.btnSoftNo.skin;
	var soilNA = frmVapourResp2.btnSoftNA.skin;
	if (soilNo == btnCheck ){
		var objectProduct = {SoftSoilType:"NO"};
		//alert("Sending object for update:"+JSON.stringify(objectProduct));
	    Equipment.update("where APCTag = " + apcTag, objectProduct, successCallback_update , errorFailCallback_update)
	}else 	if (soilNA == btnCheck  ){
		var objectProduct = {SoftSoilType:"NA"};
		//alert("Sending object for update:"+JSON.stringify(objectProduct));
		//alert('Before update sync')
	Equipment.update("where APCTag = " + apcTag, objectProduct, successCallback_update , errorFailCallback_update)
	} else{
		var stringType = "null";
		for (i = 1; i < 8; i++){
			var btnObj = eval("frmVapourResp2.btnSoilType"+i);
			if (btnObj.skin == btnCheck){
				stringType = ""+i;
				break;
			}
		}
		//alert(stringType);
		//var stringType = frmVapourResp2.radSoftSoilType.selectedKeyValue;
		var objectProduct = {SoftSoilType:stringType,SoftSoilDia:frmVapourResp2.tbxDiameter.text};
		//alert("Sending object for update:"+JSON.stringify(objectProduct));
		//alert('Before update sync')
	Equipment.update("where APCTag = " + apcTag, objectProduct, successCallback_update , errorFailCallback_update)
	}
	//frmVapourResp3.show();
	//alert("new frmVapourResp2.radSoftSoilMain.selectedKey="+frmVapourResp2.radSoftSoilMain.selectedKey);

}

function updateGuyWireDataForked(){
	var apcTag = selectedEquipmentData[0].APCTag;
	//btnTower1
		var strGuyMain = "null";
		for (i = 1; i < 4; i++){
			var btnObj = eval("frmVapourResp2.btnTower"+i);
			if(btnObj.skin == btnCheck){
				strGuyMain = ""+i;
				break;
			}
		}
		var strGuyQI = "null";
		for (i=1;i<7;i++){
			var btnObj = eval("frmVapourResp2.btnWireIDetails"+i);
			if (btnObj.skin == btnCheck){
				strGuyQI = ""+i;
				break;
			}
		}

	var objectProduct = {GuyWireMain:strGuyMain
						,GuyWireCond:frmVapourResp2.cbxTower.selectedKey
						,GuyWireQA:(frmVapourResp2.btnWireA1.skin == btnCheck)?"1":"2"
						,GuyWireQB:(frmVapourResp2.btnWireB1.skin == btnCheck)?"1":"2"
						,GuyWireQC:(frmVapourResp2.btnWireC1.skin == btnCheck)?"1":"2"
						,GuyWireQD:(frmVapourResp2.btnWireD1.skin == btnCheck)?"1":"2"
						,GuyWireQE:(frmVapourResp2.btnWireE1.skin == btnCheck)?"1":"2"
						,GuyWireQF:(frmVapourResp2.btnWireF1.skin == btnCheck)?"1":"2"
						,GuyWireQG:(frmVapourResp2.btnWireG1.skin == btnCheck)?"1":"2"
						,GuyWireQH:(frmVapourResp2.btnWireH1.skin == btnCheck)?"1":"2"
						,GuyWireQI:strGuyQI};
	Equipment.update("where APCTag = " + apcTag, objectProduct, successCallback_updateGuyWire , errorFailCallback_updateGuyWire)

}
