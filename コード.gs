/*//////////////////////////////////////////////

スプレッドシートが開かれた時の処理

//////////////////////////////////////////////*/


/**
 * ファイルを開いたときのイベントハンドラ
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();           // Uiクラスを取得する
  var menu = ui.createMenu('追加メニュー');  // Uiクラスからメニューを作成する
  menu.addItem('ファイルID取得', 'listFilesInFolder');   // メニューにアイテムを追加する
  menu.addToUi();                            // メニューをUiクラスに追加する
}


/*//////////////////////////////////////////////

webアプリケーション処理

//////////////////////////////////////////////*/

// html生成処理
function doGet(e) {
  var page=e.parameter["p"];
  
  if(page == "index" || page==null){
    return HtmlService.createTemplateFromFile("index")
    .evaluate()
    .addMetaTag("viewport", "width=device-width, initial-scale=1")
    .setFaviconUrl("https://drive.google.com/uc?export=view&id=0B_VdmOol25-ldHgyLUNMZm9PdlU&dummy.ico")
    .setTitle("FGOサーチャー")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);
    
  }  else if(page =="log"){
    return HtmlService.createTemplateFromFile("log")
    .evaluate()
    .addMetaTag("viewport", "width=device-width, initial-scale=1")
    .setFaviconUrl("https://drive.google.com/uc?export=view&id=0B_VdmOol25-ldHgyLUNMZm9PdlU&dummy.ico")
    .setTitle("FGOサーチャー")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);
    
  }  else { // パラメータが該当しない場合
    return HtmlService.createTemplateFromFile("error")
    .evaluate()
    .addMetaTag("viewport", "width=device-width, initial-scale=1")
    .setFaviconUrl("https://drive.google.com/uc?export=view&id=0B_VdmOol25-ldHgyLUNMZm9PdlU&dummy.ico")
    .setTitle("FGOサーチャー")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  }
}

// include処理
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// スプレッドシートからデータを取得
function getData(sheetName){
  var myData = SpreadsheetApp
        .getActive()
        .getSheetByName(sheetName)
        .getDataRange()
        .getValues();
  
//  var data = [JSON.stringify(myData),term];
//  Logger.log(data);
  
  Logger.log(myData);
  var myData = [JSON.stringify(myData)];
  return myData;
}

//googleドライブの該当フォルダのファイルidを取得してスプレッドシートに記録
function listFilesInFolder(id) {
  var folder = DriveApp.getFolderById("0B_VdmOol25-leWhxS1JxUm9sLUk");
  var contents = folder.getFiles();
  var fileId;
  var cardId;
  var name;
  var fileData = new Array();
  var fileList = new Array();

  while(contents.hasNext()) {
    file = contents.next();
    name = file.getName();
    fileId = file.getId();    
    cardId = name.substr(5,4);
    
    fileData = [cardId, name, fileId];
    fileList.push(fileData);
  }
  
  // 一応ID順にソート
  fileList.sort(function(a,b){
    if(a[0] < b[0]) return -1;
    if(a[0] > b[0]) return 1;
    return 0;
　 });
  
  /* シートに書き出す */  
  var mySS=SpreadsheetApp.getActiveSpreadsheet(); //スプレッドシートを取得
  var sheet=mySS.getSheetByName("概念礼装アイコンID");
  sheet.clear();

  sheet.getRange(1,1,fileList.length,fileList[0].length).setValues(fileList);
};

