// const firestore = firebase.firestore();
// const settings = {/* your settings... */ timestampsInSnapshots: true};
// firestore.settings(settings);

// // Initialize Cloud Firestore through Firebase
// const db = firebase.firestore();

/* //////////////////////////////////////////////////////////////

 FGO Searche

////////////////////////////////////////////////////////////// */

/*///////////////////////////////////////////////////////

　初期化処理

*////////////////////////////////////////////////////////

// 概念礼装リスト、アビリティリストの定義

var abilityTypeList = parseCSV2("/csv/abilityTypeList.csv");
// var abilityTypeList = getAbilityTypeList();
var cpList = parseCSV2("/csv/cpList.csv");
// var cpList = getCpList();
var logList = [];

var checkListLast = [];
var searchWordLast = "";
var searchTypeLast;
var sortTypeLast = [];

for (let i = 0; i < cpList.length; i++) {
  cpList[i][0] = cpList[i][0] - 0;
  cpList[i][1] = cpList[i][1] - 0;
  cpList[i][5] = cpList[i][5] - 0;
  cpList[i][7] = cpList[i][7] - 0;
}


//更新履歴の取得
function setLogList(myData){
  logList = JSON.parse(myData);  //スプレッドシートから取得したデータ

  document.getElementById("version").innerHTML = logList[(logList.length - 1)][1];
}

// データ取得エラー
function hendolerError() {
  alert("データを正常に取得できませんでした。リロードしてみてください。");
}

/*///////////////////////////////////////////////////////

　チェックボックス関連処理
  選択能力タグ表示処理

*////////////////////////////////////////////////////////

// 全てのチェックボックのチェックを外す and 概念礼装もリセット
function chBxOff(){
  document.getElementById("searchWord").value = "";
  for(i=0; i<abilityTypeList.length; i++) {
    document.getElementById("formAbilityType").elements[abilityTypeList[i][2]].checked = false;
    document.getElementById("container02").innerHTML = "<div class='contents_text'>該当する概念礼装がありません。</div>";
    console.log("カウント：" + [i]);
  }
    console.log("チェックボックス外しオワタ");
}

// 選択しているチェックボックスの一覧表示
function showChBx(checkList) {
    var msg = createTag(checkList);
      document.getElementById("container").innerHTML = msg;
}

// タグを生成
function createTag(checkList){
    var msg = "";
    var checkList = checkList;

    console.log("checkList:"+ checkList);

      for(var i=0; i<checkList.length;i++){
        console.log("abilityTypeList => ", abilityTypeList);
        for(var ii=0; ii<abilityTypeList.length;ii++){
          if(abilityTypeList[ii][2] == checkList[i]){
            msg = msg + "<span class='choiceAbilityType'>" + abilityTypeList[ii][1] + "</span>";
            break;
          }
        }
      }
      if(msg == ""){
       msg = "<div class='contents_text'>選択されている能力がありません。</div>"
      }
      return msg;
}

// 選択しているチェックボックスを取得
function convertChbx(){
    var flag = false;
    var checkList = new Array();
    for(var i=0; i<document.getElementById("formAbilityType").elements.length;i++){
        if(document.getElementById("formAbilityType").elements[i].checked){
	    flag = true;
          checkList.push(document.getElementById("formAbilityType").elements[i].value);
        }
    }

    return checkList;
}

// 検索文字列の取得
function getSearchWord(){
  let searchWord = "";
  searchWord = document.getElementById("searchWord").value;
  return searchWord;
}

// 検索タイプの取得
function getSearchType(){
  var searchType = document.getElementById("and").checked;
  return searchType;
}

// ソートタイプの取得
function getSortType(){

  //ラジオボタンオブジェクトを取得する
  var checkSortType = document.getElementsByName("sortType");

  //取得したラジオボタンオブジェクトから選択されたものを探し出す
  var sortType = [document.getElementById("orderType").checked];
  for(var i=0; i<checkSortType.length; i++){
    if (checkSortType[i].checked) {
      //選択されたラジオボタンのvalue値を取得する
      sortType.push(checkSortType[i].id);
      break;
    }
  }
  return sortType;
}


/*///////////////////////////////////////////////////////

　概念礼装情報表示処理

*////////////////////////////////////////////////////////

// 該当する概念礼装の一覧表示（or検索）
function chBxCheckOr(checkList,searchWord,sortType){
    var checkList = checkList;

    if(!checkList){
        alert("項目が選択されていません。");
    }

    // 数値に変換
    for(var i=0; i<checkList.length;i++){
      for(var ii=0; ii<abilityTypeList.length;ii++){
        if(abilityTypeList[ii][2] == checkList[i]){
          checkList[i] = abilityTypeList[ii][0];
          break;
        }
      }
    }

    var choiceList = [];
    // 該当する概念礼装の情報を整形してmsgに入れる
    var msg = "";
    for(var i=0; i<cpList.length;i++){
      for(var ii=0; ii<checkList.length;ii++){

        // 能力検索
        if(cpList[i][Number(checkList[ii]) + 10] == "○"){
          msg = createMsg(msg,cpList,i);
          choiceList = setChoiceList(cpList,choiceList,msg,i);
          break;
        }
      }

      // 礼装名検索
      if(!(searchWord == "")){
        let wordCheck = wordSearch(searchWord,i);
        if (wordCheck) {
          msg = createMsg(msg,cpList,i);
          choiceList = setChoiceList(cpList,choiceList,msg,i);
        }
      }
    }

    sort(choiceList,sortType);
    setMsg(msg,choiceList);
}



// 該当する概念礼装の一覧表示（and検索）
function chBxCheckAnd(checkList,searchWord,sortType){
    var checkList = checkList;

    if(!checkList){
        alert("項目が選択されていません。");
    }

    // 数値に変換
    for(var i=0; i<checkList.length;i++){
      for(var ii=0; ii<abilityTypeList.length;ii++){
        if(abilityTypeList[ii][2] == checkList[i]){
          checkList[i] = abilityTypeList[ii][0];
          break;
        }
      }
    }

    var choiceList = [];
    // 該当する概念礼装の情報を整形してmsgに入れる
    for(var i=0; i<cpList.length;i++){
      var orCheck = false;
      var msg = "";

      // 能力検索
      for(var ii=0; ii<checkList.length;ii++){
        if(cpList[i][Number(checkList[ii]) + 10] == "○"){
          orCheck = true;
        }else{
          orCheck = false;
          break;
        }
      }

      // 礼装名検索
      if(!(searchWord == "")){
        let wordCheck = wordSearch(searchWord,i);
        if (!wordCheck) {
          orCheck = false;
        } else if (wordCheck && !checkList[0]) {
          orCheck = true;
        }
      }

      if(orCheck){
        msg = createMsg(msg,cpList,i);
        choiceList = setChoiceList(cpList,choiceList,msg,i);
      }
    }

    sort(choiceList,sortType);
    setMsg(msg,choiceList);

    if (choiceList.length == undefined || choiceList.length == 0) {
      document.getElementById("choiceCount").innerHTML = "【0件】";
    } else {
      document.getElementById("choiceCount").innerHTML = "【" + choiceList.length + "件】";
    }
}

// 表示する概念礼装の情報リスト
function setChoiceList(cpList,choiceList,msg,i){
  var temp = [];
  temp = cpList[i].concat();
  temp.unshift(msg);
  choiceList.push(temp);

  return choiceList;
}


// ソート処理
function sort(choiceList,sortType){

  // 昇順、降順判定
  var orderType = -1;
  if(sortType[0]){
    orderType = 1;
  }

  // ソートの基準判定
　var sortTypeList = [
   ["sortNo",1],
   ["sortRarity",2],
   ["sortHp",6],
   ["sortAtk",8]
  ];

  var row;
  for(var i = 0; i < sortTypeList.length; i++){
    if(sortTypeList[i][0] == sortType[1]){
      row = sortTypeList[i][1];
    }
  }

  choiceList.sort(function(a,b){
    if(a[row] < b[row]) return orderType;
    if(a[row] > b[row]) return -orderType;
  });
}

// 文字列検索処理
function wordSearch(searchWord,cpId){

  var wordCheck = false;
  if(!(searchWord == "")){

  console.log("----------------------------------------");
  console.log("言語検索処理はじめたよ");

    // 説明文含めた全文検索してたけど、名前だけにした。
    // for(var i = 0; i< 11; i++ ){

  console.log("----------------------------------------");
  console.log("cpList["+ cpId +"]: " + cpList[cpId] );
  console.log("wordCheck: " + wordCheck);
  console.log("searchWord: " + searchWord);
  // console.log("result[" + i + "]: " + (cpList[cpId][i] + "").search(searchWord));

    // if( 0 <= (cpList[cpId][i] + "").search(searchWord) ){
    if( 0 <= (cpList[cpId][3] + "").search(searchWord) ){
      wordCheck = true;
        // break;
      }
    // }
  }
  return wordCheck;
}


// 表示する概念礼装の情報を生成
function createMsg(msg,cpList,cpId){
  var no = cpList[cpId][0]; // 番号
  var rarity = cpList[cpId][1]; // レアリティ
  var cost = cpList[cpId][2]; // コスト
  var name = cpList[cpId][3]; // 名称
  var hpMin = cpList[cpId][4]; // HP（レベル1）
  var hpMax = cpList[cpId][5]; // HP（最大値）
  var atkMin = cpList[cpId][6]; // ATK（レベル1）
  var atkMax = cpList[cpId][7]; // ATK（最大値）
  var abilityMin = cpList[cpId][8]; // 効果
  var abilityMax = cpList[cpId][9]; // 効果（最大開放）
  var other = cpList[cpId][10]; // 備考
  var abilityTag = ""; // 能力タグ
  var fileName = ""; // アイコンのファイル名
  var cardName = ""; // カードのファイル名

  if (no < 10) {
    cardName = "card_000" + no + ".png";
    fileName = "icon_000" + no + ".png";
  } else if(no < 100) {
    cardName = "card_00" + no + ".png";
    fileName = "icon_00" + no + ".png";
  } else if(no < 1000) {
    cardName = "card_0" + no + ".png";
    fileName = "icon_0" + no + ".png";
  } else {
    cardName = "card_" + no + ".png";
    fileName = "icon_" + no + ".png";
  }

  // 能力タグの生成
  for(var i=0; i<abilityTypeList.length;i++){
    for(var col=11; col<cpList[cpId].length;col++){
      if(abilityTypeList[i][0] == col-10 && cpList[cpId][col] == "○"){
        abilityTag = abilityTag + "<span class='choiceAbilityType'>" + abilityTypeList[i][1] + "</span>";
        break;
      }
    }
  }

  //レアリティは星に変換
  var count = "";
  for(var i=0; i<5 ; i++ ){
    if(i<rarity){
      count = count + "★";
    }else{
      count = count + "☆";
    }
  }
  rarity = count;

  // 差し込むHTMLを生成
  msg = "<div class='cp'><div class='cpParam'><div class='cpIcon'><img src='/images/icon/" + fileName + "' onerror='this.src=&quot;/images/icon/icon_0000.png&quot;'></div><div class='status'><span class='cpNo'>No."   + no + "</span> <span class='cpName'>"   + name + "</span><br><span class='rarity'>"   + rarity + "</span>　COST："   + cost + "<br>HP："    + hpMin + "("    + hpMax + ")　ATK："    + atkMin + "("    + atkMax + ")</div></div><div style='width:100%'>" + abilityTag + "</div><div class='abilityMin'>"    + abilityMin + "</div><div class='abilityMax'>"    + abilityMax + "</div>";
  // 備考があれば追加
  if(other){
    msg += "<div class='other'>" + other + "</div>";
  }
  // カード画像+フレーバーテキスト画像追加
  // msg += "<div id=\"andMore" + no + "\" class='andMore' onclick='switchAndMore(\"" + no + "\",\"" + cardName + "\");'>and more...▼<br></div>"
  //   + "<div id='id" + no + "' style='display:none; clear:both; width=100%;'>"
  //   + "</div>";

  msg += "</div>";
  return msg;
}

// andmore 開閉処理

function switchAndMore(no, cardName) {
  const obj = document.getElementById("id" + no).style;
  if (obj.display == "none") {
    obj.display = "block";
    document.getElementById("andMore" + no).innerHTML = "close▲";
    document.getElementById("id" + no).innerHTML = "<div class='card'><img src='/images/card/" + cardName + "' onerror='this.src=\"/images/icon/icon_0000.png\"'></div><div class='flavorText'>" + "準備中" + "</div>";
  } else{
    obj.display = "none";
    document.getElementById("andMore" + no).innerHTML = "and more...▼";
    document.getElementById("id" + no).innerHTML = "";
  }
}

// announce 開閉処理
function switchAnnounceArea() {
  const obj = document.getElementById("announce").style;
  if (obj.display == "none") {
    obj.display = "block";
    document.getElementById("announceArea").innerHTML = "close▲";
  } else{
    obj.display = "none";
    document.getElementById("announceArea").innerHTML = "and more...▼";
  }
}


// 検索結果をメッセージとして挿入
function setMsg(msg,choiceList){
    msg = "";
    choiceList.forEach(function(value) {
      msg = msg + value[0];
    });

    if(msg == ""){
     msg = "<div class='contents_text'>該当する概念礼装がありません。</div>"
    }

    document.getElementById("container02").innerHTML = msg;
}

//描画更新処理
function update(){
  // 最終更新とチェックリストを比較して変化してるかチェック
  var checkList = convertChbx();
  var searchWord = getSearchWord();
  var searchType = getSearchType();
  var sortType = getSortType();

  var checkuUpdateChbx = false;
  checkuUpdateChbx = !(checkList.toString() == checkListLast.toString());

  var checkuUpdateWord = false;
  checkuUpdateWord = !(searchWord == searchWordLast);

  var checkuSearchType = false;
  checkuSearchType = !(searchType == searchTypeLast);

  var checkuSortType = false;
  checkuSortType = !(sortType.toString() == sortTypeLast.toString());

  if(checkuUpdateChbx || checkuUpdateWord || checkuSearchType || checkuSortType){

    // チェックリストの状態を保存（最終入力との比較用）
    checkListLast = [];
    for (var i = 0, len = checkList.length; i < len; i++) {
      checkListLast.push(checkList[i]);
    }

    // 入力された文字列を保存（最終入力との比較用）
    searchWordLast = searchWord;

    // 検索タイプを保存（最終入力との比較用）
    searchTypeLast = searchType;

    // ソートタイプを保存（最終入力との比較用）
    sortTypeLast = sortType.concat();

    // 選択している能力の描画更新
    showChBx(checkList);

    // 能力から概念礼装を検索して描画する処理
    if(document.getElementById("and").checked){
      chBxCheckAnd(checkList,searchWord,sortType);
    }else{
      chBxCheckOr(checkList,searchWord,sortType);
    }
    console.log("更新したよ");
  }

}

setInterval('update()',1000);
