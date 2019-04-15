$(document).on("click", ".picSelectorSize", function(){
	$("#selectorButtonPos").show();
	$("#selectorPic").attr("src", $(this).attr("src"));

})

$(document).on("click", "#updatePic", function(){
	let picUrl = $("#selectorPic").attr("src");
	$.post("../api/updatePicUrl.php", {
		nick : nick,
		url : picUrl,
	})

	$(".picSelectorHider").animate({top : "-610px"}, {duration : 500, complete : function(){
		$(".picSelectorHider").animate({opacity : "1"}, {duration : 1})
		$(".picSelectorHider").hide()
	}})
	
	$("#blur").animate({opacity : "0"}, {duration : 200, complete : function(){
		$("#blur").hide()
	}})
	loadProfile()


	// un-lock scroll position
	var html = jQuery('html');
	var scrollPosition = html.data('scroll-position');
	html.css('overflow', html.data('previous-overflow'));
	window.scrollTo(scrollPosition[0], scrollPosition[1])

})


function getPicModal(){
	$.get("../inc/profilePicSelector.html", function(profilePicSelector){
		let html = $.parseHTML(profilePicSelector);

		$(".picSelectorHider").html(html)
		$(".picSelectorHider").show()
		$(".picSelectorHider").animate({opacity : "1"}, {duration : 1})
		$(".picSelectorHider").animate({top : "100px"}, {duration : 500})
		$("#blur").show()
		$("#blur").animate({opacity : "1"}, {duration : 200})
		$(".selectorNick").html(nick)
	})
}

function login(username){
	$.post("api/checkLogin.php", {
		username : username,
	}, function(userInfo){
		userInfo = JSON.parse(userInfo)
		localStorage.setItem("username", userInfo[0]["username"]);
		nick = userInfo[0]["nick"];
		username = userInfo[0]["username"];
		usersXP = userInfo[0]["xp"]
		if (userInfo[0]['profilePic'] == null || userInfo[0]['profilePic'] == '') {
				// lock scroll position, but retain settings for later
			var scrollPosition = [
			  self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
			  self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
			];
			var html = jQuery('html'); // it would make more sense to apply this to body, but IE7 won't have that
			html.data('scroll-position', scrollPosition);
			html.data('previous-overflow', html.css('overflow'));
			html.css('overflow', 'hidden');
			window.scrollTo(scrollPosition[0], scrollPosition[1]);

			getPicModal()
			

		}
		$("#usernameTitle").text(nick);
		$.get("../inc/signOutBox.html", function(signOutBox){
			var signOutBox = $.parseHTML(signOutBox);
			$(signOutBox).find("#usernameOut").text(username)
			$(".signinBoxWrapper").html(signOutBox);
		})
		$("#profileTab").css("background-color", "transparent");
		$(document).on("mouseenter", "#profileTab", function(){
			$("#profileTab").css("background-color", "#B2B2B2")
		})
		$(document).on("mouseleave", "#profileTab", function(){
			$("#profileTab").css("background-color", "transparent")
		})
	})
}



$('#username').bind("enterKey",function(e){
	var $form = $( this ).parent().parent().parent().parent().children();
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
			localStorage.setItem("username", userInfo[0]["username"]);
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



$(document).on("click", "#signinMobile", function(){
	var $form = $( this ).parent().parent().children();
	username = $form.find( "input[name='usernameMobile']" ).val(),
	$.post("api/checkLogin.php", {
		username : username
	}, function(userInfo){
		userInfo = JSON.parse(userInfo)

		if (!userInfo) {
			$("#signinError").text("WAit a minUte... Who are you??")
		}
		else{
			localStorage.setItem("username", userInfo[0]["username"]);
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



$(document).on("click", "#signin", function(){
	var $form = $( this ).parent().parent().parent().parent().children();
	username = $form.find( "input[name='username']" ).val(),
	$.post("api/checkLogin.php", {
		username : username
	}, function(userInfo){
		userInfo = JSON.parse(userInfo)

		if (!userInfo) {
			$("#signinError").text("WAit a minUte... Who are you??")
		}
		else{
			localStorage.setItem("username", userInfo[0]["username"]);
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


$(document).on("keyup", "#username", function(e){
	if(e.keyCode == 13)
	{
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
				localStorage.setItem("username", userInfo[0]["username"]);
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
	}
})


$(document).on("click", "#makeAccount", function(){
	var $form = $( this ).parent().parent().parent().parent().children();
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