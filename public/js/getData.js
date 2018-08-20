

// 概念礼装リストをdbから取得
function getCpList(){
  let cpList = new Array;
  let docId = 0;
  db.collection("cpList").get().then(function(querySnapshot) {

    querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      
      for (let i = 0 + (400 * docId); i < Object.keys(doc.data()).length + (400 * docId); i++) {
        if (i != 0) {
          //console.log("doc.data()[i]:" + doc.data()[i]);
          cpList[i] = new Array(
            doc.data()[i]["id"],
            doc.data()[i]["rarity"],
            doc.data()[i]["cost"],
            doc.data()[i]["name"],
            doc.data()[i]["hpMin"],
            doc.data()[i]["hpMax"],
            doc.data()[i]["atkMin"],
            doc.data()[i]["atkMax"],
            doc.data()[i]["abilityMin"],
            doc.data()[i]["abilityMax"],
            doc.data()[i]["comment"],
            doc.data()[i]["attackUp"],
            doc.data()[i]["npDamageUp"],
            doc.data()[i]["damageUp"],
            doc.data()[i]["specialAttackUp"],
            doc.data()[i]["busterUp"],
            doc.data()[i]["quickUp"],
            doc.data()[i]["artsUp"],
            doc.data()[i]["criticalDamageUp"],
            doc.data()[i]["starGenerationUp"],
            doc.data()[i]["starGatherUp"],
            doc.data()[i]["getStar"],
            doc.data()[i]["invincibleIgnore"],
            doc.data()[i]["setDebuff"],
            doc.data()[i]["defenseUp"],
            doc.data()[i]["damageCut"],
            doc.data()[i]["specialDefenseUp"],
            doc.data()[i]["setGuts"],
            doc.data()[i]["invincible"],
            doc.data()[i]["resistDebuff"],
            doc.data()[i]["DebuffIgnore"],
            doc.data()[i]["hpRegeneration"],
            doc.data()[i]["healUp"],
            doc.data()[i]["maxHpUp"],
            doc.data()[i]["getNpCharge"],
            doc.data()[i]["getNpUp"],
            doc.data()[i]["npRegeneration"],
            doc.data()[i]["targetGatherUp"],
            doc.data()[i]["npChargeCountUp"],
            doc.data()[i]["exit"],
            doc.data()[i]["rewardUp"]
          );
        }
      }
      docId++;
    });
    console.log("cpList:" + cpList);
    console.log("success!! db => cpList");
    return cpList;
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });
}

// 効果カテゴリーをdbから取得
function getAbilityTypeList(){
  let abilityTypeList = new Array;
  db.collection("abilityTypeList").get().then(function(querySnapshot) {

    querySnapshot.forEach(function(doc) {
      for (let i = 1; i <= Object.keys(doc.data()).length; i++) {
        abilityTypeList[i] = new Array(doc.data()[i]["id"], doc.data()[i]["name"], doc.data()[i]["label"]);
      }
    });
    console.log("abilityTypeList(生成):", abilityTypeList);
    console.log("abilityTypeList[1] => ", abilityTypeList[1]);
    console.log("success!! db => abilityTypeList");
    return abilityTypeList;
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });
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