$('#username').bind("enterKey",function(e){
	var $form = $( this ).parent().parent().children();
	username = $form.find( "input[name='username']" ).val(),
	$.post("api/checkLogin.php", {
		username : username
	}, function(userInfo){
		userInfo = JSON.parse(userInfo)

		if (!userInfo) {
			$("#signinError").text("WAit a minUte... Who are you??")
			return;
		}
		else{
			nick = userInfo[0]["nick"];
			username = userInfo[0]["username"];
			usersXP = userInfo[0]["xp"]
			$("#usernameTitle").text(nick);
			$("#signinError").text(" ");
			$.get("../inc/signOutBox.html", function(signOutBox){
				var signOutBox = $.parseHTML(signOutBox);
				$(signOutBox).find("#usernameOut").text(username)
				$(".signinBoxWrapper").html(signOutBox);
			})
		}
	})
	$("#profileTab").css("background-color", "transparent");
	$(document).on("mouseenter", "#profileTab", function(){
		$("#profileTab").css("background-color", "#B2B2B2")
	})
	$(document).on("mouseleave", "#profileTab", function(){
		$("#profileTab").css("background-color", "transparent")
	})
	$("#username").val('');
});



$(document).on("click", "#signin", function(){
	var $form = $( this ).parent().parent().children();
	username = $form.find( "input[name='username']" ).val(),
	$.post("api/checkLogin.php", {
		username : username
	}, function(userInfo){
		userInfo = JSON.parse(userInfo)

		if (!userInfo) {
			$("#signinError").text("WAit a minUte... Who are you??")
		}
		else{
			nick = userInfo[0]["nick"];
			username = userInfo[0]["username"];
			usersXP = userInfo[0]['xp'];
			$("#usernameTitle").text(nick);
			$("#signinError").text(" ");
			$.get("../inc/signOutBox.html", function(signOutBox){
				var signOutBox = $.parseHTML(signOutBox);
				$(signOutBox).find("#usernameOut").text(username)
				$(".signinBoxWrapper").html(signOutBox);
			})
		}
		$("#profileTab").css("background-color", "transparent");
		$(document).on("mouseenter", "#profileTab", function(){
			$("#profileTab").css("background-color", "#B2B2B2")
		})
		$(document).on("mouseleave", "#profileTab", function(){
			$("#profileTab").css("background-color", "transparent")
		})
		$("#username").val('');
	})
})

$(document).on("click", "#signOutButton", function(){
	nick = null;
	username = null;
	$(".signinBoxWrapper").load("../inc/signInBox.html")
	$("#usernameTitle").text("Guest");
	$("#profileTab").css("background-color", "gray");
	$(document).on("mouseenter", "#profileTab", function(){
		$("#profileTab").css("background-color", "gray")
	})
	$(document).on("mouseleave", "#profileTab", function(){
		$("#profileTab").css("background-color", "gray")
	})
})


$('#username').keyup(function(e){
	if(e.keyCode == 13)
	{
		$(this).trigger("enterKey");
	}
});


$(document).on("click", "#makeAccount", function(){
	var $form = $( this ).parent().parent().children();
	makeUser = $form.find( "input[name='makeUsername']" ).val();
	makeNick = $form.find( "input[name='makeNick']" ).val();
	
	
	if (makeUser == null || makeNick == null) {
		
	}
	else {
		$.post("api/makeAccount.php", {
			makeUser : makeUser,
			makeNick : makeNick,
		}, function(userInfo){
			userInfo = JSON.parse(userInfo)

			if (!userInfo) {
				
			}
			else{
				$("#createSuccess").text("Account created successfully, now login")
				$form.find( "input[name='makeUsername']" ).val("");
				$form.find( "input[name='makeNick']" ).val("");
			}
		})
	}

})