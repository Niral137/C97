
//ADD YOUR FIREBASE LINKS HERE
var firebaseConfig = {
  apiKey: "AIzaSyCbaviI6BAg0sCo-MsfOYwiM8fGZf1Gnmg",
  authDomain: "greetingbot-mfwl.firebaseapp.com",
  databaseURL: "https://greetingbot-mfwl-default-rtdb.firebaseio.com",
  projectId: "greetingbot-mfwl",
  storageBucket: "greetingbot-mfwl.appspot.com",
  messagingSenderId: "640891812878",
  appId: "1:640891812878:web:d7697def4dba9d5f93105f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome " + user_name; 

function addRoom()
{
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
    purpose : "Adding Room Name"
  });

  localStorage.setItem("room_name", room_name);
  window.location="kwitter_page.html";
}
function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      //Start code
      console.log("roomname - "+ Room_names);
      row = "<div class='room_name' id=" + Room_names + " onclick = 'redirectToRoomName(this.id)'> #" + Room_names + "</div> <hr>";
      document.getElementById("output").innerHTML += row;
      //End code
      });});}
getData();

function redirectToRoomName(name)
{
console.log(name);
localStorage.setItem("room_name", name);
window.location="kwitter_page.html";
}

function logout()
{
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location ="index.html";
}

