// 概念礼装リストをdbから取得
function getCpList(){
  let cpList = new Array;
  db.collection("cpList").get().then(function(querySnapshot) {

    querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      let id = Number(doc.id);

      cpList[doc.id] = new Array;
      cpList[doc.id].push(doc.id);
      cpList[doc.id].push(doc.data()["rarity"]);
      cpList[doc.id].push(doc.data()["cost"]);
      cpList[doc.id].push(doc.data()["name"]);
      cpList[doc.id].push(doc.data()["hpMin"]);
      cpList[doc.id].push(doc.data()["hpMax"]);
      cpList[doc.id].push(doc.data()["atkMin"]);
      cpList[doc.id].push(doc.data()["atkMax"]);
      cpList[doc.id].push(doc.data()["abilityMin"]);
      cpList[doc.id].push(doc.data()["abilityMax"]);
      cpList[doc.id].push(doc.data()["comment"]);
      cpList[doc.id].push(doc.data()["attackUp"]);
      cpList[doc.id].push(doc.data()["npDamageUp"]);
      cpList[doc.id].push(doc.data()["damageUp"]);
      cpList[doc.id].push(doc.data()["specialAttackUp"]);
      cpList[doc.id].push(doc.data()["busterUp"]);
      cpList[doc.id].push(doc.data()["quickUp"]);
      cpList[doc.id].push(doc.data()["artsUp"]);
      cpList[doc.id].push(doc.data()["criticalDamageUp"]);
      cpList[doc.id].push(doc.data()["starGenerationUp"]);
      cpList[doc.id].push(doc.data()["starGatherUp"]);
      cpList[doc.id].push(doc.data()["getStar"]);
      cpList[doc.id].push(doc.data()["invincibleIgnore"]);
      cpList[doc.id].push(doc.data()["setDebuff"]);
      cpList[doc.id].push(doc.data()["defenseUp"]);
      cpList[doc.id].push(doc.data()["damageCut"]);
      cpList[doc.id].push(doc.data()["specialDefenseUp"]);
      cpList[doc.id].push(doc.data()["setGuts"]);
      cpList[doc.id].push(doc.data()["invincible"]);
      cpList[doc.id].push(doc.data()["resistDebuff"]);
      cpList[doc.id].push(doc.data()["DebuffIgnore"]);
      cpList[doc.id].push(doc.data()["hpRegeneration"]);
      cpList[doc.id].push(doc.data()["healUp"]);
      cpList[doc.id].push(doc.data()["maxHpUp"]);
      cpList[doc.id].push(doc.data()["getNpCharge"]);
      cpList[doc.id].push(doc.data()["getNpUp"]);
      cpList[doc.id].push(doc.data()["npRegeneration"]);
      cpList[doc.id].push(doc.data()["targetGatherUp"]);
      cpList[doc.id].push(doc.data()["npChargeCountUp"]);
      cpList[doc.id].push(doc.data()["exit"]);
      cpList[doc.id].push(doc.data()["rewardUp"]);
    });
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });
  return cpList;
}

// 効果カテゴリーをdbから取得
function getAbilityTypeList(){
  let abilityTypeList = new Array;
  db.collection("abilityTypeList").get().then(function(querySnapshot) {

    querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      let id = Number(doc.id);
      
      abilityTypeList[id] = new Array(id, doc.data()["name"], doc.data()["label"]);
      // abilityTypeList[id].push(id);
      // abilityTypeList[id].push(doc.data()["name"]);
      // abilityTypeList[id].push(doc.data()["label"]);
    });
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });
  console.log("abilityTypeList(生成):", abilityTypeList);
  console.log("abilityTypeList[1] => ", abilityTypeList[1]);
  return abilityTypeList;
}

// 概念礼装アイコンIDをdbから取得
function getCpIconIds(){
  let cpIconIds = new Array;
  db.collection("cpIconIds").get().then(function(querySnapshot) {

    querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());

      cpIconIds[doc.id] = new Array;
      cpIconIds[doc.id].push(doc.id);
      cpIconIds[doc.id].push(doc.data()["path"]);
      cpIconIds[doc.id].push(doc.data()["googleDriveId"]);
    });
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });
  return cpIconIds;
}