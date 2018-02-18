var username;
/*----FIREBASE----*/

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDNv-p1Ayz4AurFdZg8Fqqzr6Tta5bJ1Xg",
    authDomain: "chat-party-17.firebaseapp.com",
    databaseURL: "https://chat-party-17.firebaseio.com",
    projectId: "chat-party-17",
    storageBucket: "chat-party-17.appspot.com",
    messagingSenderId: "1046962591401"
};

firebase.initializeApp(config);
var database = firebase.database();
var messages = database.ref().child("messages");

function sendMessage(messageText, username) {
    var newMessageRef = messages.push();
    newMessageRef.set({
        username: username,
        message: messageText,
    });
}

function constructHTML(message) {
    var html = "";
    var username = $("#username").html();
    
    html += "<li class='leftMessage'>";  
    html += '<div>';
    html += '<p><span class="user">'+message.username+'</span></p>';
    html += '<p><span class="message">'+message.message+'</span></p>';
    html += '</div>';
    html += '</li>';
    return html;
}

messages.on("child_added", function(snap) {
    snap.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        var childData = childSnapshot.val;
    });
    
    $('#messages').append(constructHTML(snap.val()));
    $("li").each(function() {
        if($(this).find(".user").html() == username) {
            $(this).css({
                "margin-left":"auto",
                "text-align":"right",
                "background-color":"#ff2688",
            }).addClass("rightMessage");
        } 
    });
});

/*----END FIREBASE----*/


$(document).ready( function() {
    $("#name").fadeIn("slow");
});

function scrollToBottom() {
    var height = 0;
    $('ul li').each(function(i, value){
        height += parseInt($(this).height());
    });

    height += '';

    $('.page-content').animate({scrollTop: height});
}

$(document).keypress(function(e) {
    if(e.which == 13 && $("#name").val() != "") {
        username = $("#name").val().toLowerCase();
        $("#username").html(username);
        $("#name").fadeOut().promise().then(function(){
           $("#username").fadeIn("slow"); 
        });
        //$(".footer").slideDown();
        $(".chatBox").slideDown();
        
        $("li").each(function() {
            if($(this).find(".user").html() == username) {
                $(this).css({
                    "margin-left":"auto",
                    "text-align":"right",
                    "background-color":"#ff2688",
                }).addClass("rightMessage");
            } 
        });
        $(".page-content").animate({opacity:"1.0"})
        scrollToBottom();
    } 
    
    if(e.which == 13 && $("#chatInput").val() != "") {
        var messageText = $("#chatInput").val();
        sendMessage(messageText, username);
        $("#chatInput").val("");
    }
});


var colors = new Array(
  [62,35,255],
  [60,255,60],
  [255,35,98],
  [45,175,230],
  [255,0,255],
  [255,128,0]);

var step = 0;
//color table indices for: 
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0,1,2,3];

//transition speed
var gradientSpeed = 0.002;

function updateGradient()
{
  
  if ( $===undefined ) return;
  
var c0_0 = colors[colorIndices[0]];
var c0_1 = colors[colorIndices[1]];
var c1_0 = colors[colorIndices[2]];
var c1_1 = colors[colorIndices[3]];

var istep = 1 - step;
var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
var color1 = "rgb("+r1+","+g1+","+b1+")";

var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
var color2 = "rgb("+r2+","+g2+","+b2+")";

 $('.gradient').css({
   background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
    background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
    
 $('.leftMessage').css({background: color1});
 $('.rightMessage').css({background: color2});
  
  step += gradientSpeed;
  if ( step >= 1 )
  {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];
    
    //pick two new target color indices
    //do not pick the same as the current one
    colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    
  }
}

setInterval(updateGradient,10);