// CSVファイル読み込み
function csvToArray(path) {
  var csvData = new Array();
  var data = new XMLHttpRequest();        
  data.open("GET", path, false);
  data.send(null);
  var LF = String.fromCharCode(10);
  var lines = data.responseText.split(LF);
  for (var i = 0; i < lines.length;++i) {
          var cells = lines[i].split(",");
          if( cells.length != 1 ) {
                  csvData.push(cells);
          }
  }
  return csvData;
}

// CSVファイル読み込み ダブルクオートに対応している
function parseCSV2(path, delim) {

  var csvData = new Array();
  var data = new XMLHttpRequest();        
  data.open("GET", path, false);
  data.send(null);
  var LF = String.fromCharCode(10);
  var text = data.responseText;

	if (!delim) delim = ',';
	var tokenizer = new RegExp(delim + '|\r?\n|[^' + delim + '"\r\n][^' + delim + '\r\n]*|"(?:[^"]|"")*"', 'g');

	var record = 0, field = 0, data = [['']], qq = /""/g;
	text.replace(/\r?\n$/, '').replace(tokenizer, function(token) {
		switch (token) {
			case delim: 
				data[record][++field] = '';
				break;
			case '\n': case '\r\n':
				data[++record] = [''];
				field = 0;
				break;
			default:
				data[record][field] = (token.charAt(0) != '"') ? token : token.slice(1, -1).replace(qq, '"');
		}
	});

	return data;
}

// ページロード時に実行
// window.onload=function () {
// var data = csvToArray("fateGO_data.csv");
// alert(data[0]);
// };

// csvを読み込んでテーブル生成
function csvToTable() {
  let tableData = "<table border='1'>";
  const csvData = parseCSV2("/csv/cpList.csv");

  csvData.forEach(function (item) {
    tableData = tableData + "<tr>";
    for (let i = 0; i < item.length; i++) {
      console.log("item.length:" + item.length)
      const element = item[i];
      tableData = tableData + "<td>" + item[i] + "</td>";
    }
    tableData = tableData + "</tr>";
  });
  
  tableData = tableData + "</table>";
  document.getElementById("area").insertAdjacentHTML('beforeend',tableData);
}


// cpIconIds.csvを読み込んでdbに追加
function csvToDb(fileName) {
  const csvData = parseCSV2("/csv/" + fileName + ".csv");

  let batch = db.batch();
  let count = 0;
  let docCount = 0;
  const batchRef = db.collection(fileName);

  

  csvData.forEach(function (item) {
    console.log(item);

    switch (fileName) {
      case "cpIconIds": // 概念礼装アイコンID
        let id = "id" + item[0];
        let path = "path" + item[0];
        let googleDriveId = "googleDriveId" + item[0];

        batch.set(batchRef.doc(String(docCount)),{　
          id: item[0],　
          path: "/images/" + item[0],
          googleDriveId: item[0]
        });
        break;

      case "abilityTypeList":　// 効果カテゴリー
        if (count == 0) {
          batch.set(batchRef.doc(String(docCount)),{
            [item[0]]:{
              id: item[0],
              name: item[1],
              label: item[2]
            }
          });          
        } else {
          batch.update(batchRef.doc(String(docCount)),{
            [item[0]]:{
              name: item[1],
              label: item[2]
            }
          });          
        }
        break;

      case "cpList":　// 概念礼装リスト
        if (count == 0) {
          batch.set(batchRef.doc(String(docCount)),{
            [item[0]]:{
              id: item[0],
              rarity: item[1],
              cost: item[2],
              name: item[3],
              hpMin: item[4],
              hpMax: item[5],
              atkMin: item[6],
              atkMax: item[7],
              abilityMin: item[8],
              abilityMax: item[9],
              comment: item[10],
              attackUp: item[11],
              npDamageUp: item[12],
              damageUp: item[13],
              specialAttackUp: item[14],
              busterUp: item[15],
              quickUp: item[16],
              artsUp: item[17],
              criticalDamageUp: item[18],
              starGenerationUp: item[19],
              starGatherUp: item[20],
              getStar: item[21],
              invincibleIgnore: item[22],
              setDebuff: item[23],
              defenseUp: item[24],
              damageCut: item[25],
              specialDefenseUp: item[26],
              setGuts: item[27],
              invincible: item[28],
              resistDebuff: item[29],
              DebuffIgnore: item[30],
              hpRegeneration: item[31],
              healUp: item[32],
              maxHpUp: item[33],
              getNpCharge: item[34],
              getNpUp: item[35],
              npRegeneration: item[36],
              targetGatherUp: item[37],
              npChargeCountUp: item[38],
              exit: item[39],
              rewardUp: item[40]
            }
          });          
        } else {
          batch.update(batchRef.doc(String(docCount)),{
            [item[0]]:{
              id: item[0],
              rarity: item[1],
              cost: item[2],
              name: item[3],
              hpMin: item[4],
              hpMax: item[5],
              atkMin: item[6],
              atkMax: item[7],
              abilityMin: item[8],
              abilityMax: item[9],
              comment: item[10],
              attackUp: item[11],
              npDamageUp: item[12],
              damageUp: item[13],
              specialAttackUp: item[14],
              busterUp: item[15],
              quickUp: item[16],
              artsUp: item[17],
              criticalDamageUp: item[18],
              starGenerationUp: item[19],
              starGatherUp: item[20],
              getStar: item[21],
              invincibleIgnore: item[22],
              setDebuff: item[23],
              defenseUp: item[24],
              damageCut: item[25],
              specialDefenseUp: item[26],
              setGuts: item[27],
              invincible: item[28],
              resistDebuff: item[29],
              DebuffIgnore: item[30],
              hpRegeneration: item[31],
              healUp: item[32],
              maxHpUp: item[33],
              getNpCharge: item[34],
              getNpUp: item[35],
              npRegeneration: item[36],
              targetGatherUp: item[37],
              npChargeCountUp: item[38],
              exit: item[39],
              rewardUp: item[40]
            }
          });          
        }
        break;
    
      default:
        break;
    }

    count++;
    if (count == 400) {
      bacthCommit(batch);
      count = 0;
      docCount++;
      batch = db.batch();  
    }
  });
  bacthCommit(batch);
}

function bacthCommit(batch) {
  batch.commit().then(function () {
    console.log("succes!! cpIconIds => DB");
  }).catch(function(error) {
    console.log("Error :", error);
  });
}

