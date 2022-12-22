//YOUR FIREBASE LINKS
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
    room_name = localStorage.getItem("room_name");

    function send()
    {
      msg= document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            u_name:user_name,
             message:msg,
             like:0
      });
      document.getElementById("msg").value= "";
    }

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
  console.log(firebase_message_id);
  console.log(message_data);

  u_name = message_data['u_name'];
  message = message_data['message'];
  like = message_data['like'];

  name_with_tag = "<h4> " + u_name + "<img class= 'user_tick' src = 'tick.png'> </h4>";

  message_with_tag = "<h4 class = 'message_h4'>" + message + "</h4>";

  like_button = "<button class = 'btn btn-warning' id= " + firebase_message_id + " value" + like + " onclick= 'updateLike(this.id)' >";

  span_with_tag = "<span class = 'glyphicon glyphicon-thumbs-up'> like: " + like + "</span> </button> <hr>";

  row = name_with_tag + message_with_tag + like_button + span_with_tag;
  document.getElementById("output").innerHTML += row;
//End code
      } });  }); }
getData();

function updateLike(message_id)
{
      console.log("Clicked on Like Button - " + message_id);
      button_id = message_id;
      likes= document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);

      firebase.database().ref(room_name).child(message_id).update({
            like : updated_likes
      
      });

}



function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location= "index.html";
}