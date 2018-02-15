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
    
    html += "<li>";  
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
            });
        } 
    });
});

/*----END FIREBASE----*/


$(document).ready( function() {
    $("#name").fadeIn("slow");
})

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
                });
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