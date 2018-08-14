const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);


/* //////////////////////////////////////////////////////////////

 firestore test

////////////////////////////////////////////////////////////// */

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();

function getSF(){
  var docRef = db.collection("cities").doc("SF");

  docRef.get().then(function(doc) {
      if (doc.exists) {
          console.log("Document data:", doc.data());
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
}


function getCities(){
  db.collection("cities").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());

        var id = doc.id;
        var capital = doc.data()["capital"];
        var country = doc.data()["country"];
        var name = doc.data()["name"];
        var population = doc.data()["population"];
        
        var txt = document.getElementById("area").textContent;
        document.getElementById("area").insertAdjacentHTML('beforeend', "|" + id + "|" + capital + "|" + country + "|" + name + "|" + population + "|<br>");
        // document.getElementById("area").innerHTML = txt + "|" + id + "|" + capital + "|" + country + "|" + name + "|" + population + "|<br>"
        
        console.log("txt:", document.getElementById("area").textContent);
    });
  });
}

function clearArea() {
    document.getElementById("area").innerHTML = "";
}


