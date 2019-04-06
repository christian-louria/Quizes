let username;
let nick;
var guessed = false;
var subbmited = false;
var quizStuff = {
	score : 0,
	quizQuestions : [], 
	quizInfo : [],
	taker : null,
	taken : 0,
	right : 0,
	wrong : 0,
	prevAnswer : 0,
	quizId : 0,
}
var usersXP = 0;
var createQuestionNumber = 1;

$.getScript("js/tabs.js");
$.getScript("js/xp.js");
$.getScript("js/history.js");
$.getScript("js/game.js");
$.getScript("js/profile.js");
$.getScript("js/results.js");
$.getScript("js/confetti.js");

$(document).ready(function(){
	window.history.pushState('forward', null, './home');
	$.getJSON("api/getQuizesRecent.php", function(quizes){
		$.get("../inc/quizBox.html", function(quizBoxhtml){
			for (var i = 0; i < quizes.length; i++) {
				var html = $.parseHTML(quizBoxhtml);
				$(html).find(".questionAmmount").text(quizes[i][0])
				$(html).find(".quizCreatorBox").text(quizes[i]["quizCreator"])
				$(html).find(".quizNameBox").text(quizes[i]["quizName"])
				$(html).attr('onClick', 'take_quiz('+quizes[i]["qKey"]+');')
				$(html).find(".quizNum").attr("id", quizes[i]["qKey"])				
				$("#quizList").append(html);
			}
		})
	})

	$(document).on("click", "#homeTab", function(){
		window.history.pushState('forward', null, './home');
		loadIndex();
	})

	$(document).on("click", "#profileTab", function(){
		if (nick == null) {
			return;
		}
		window.history.pushState('forward', null, './profile');
		setTimeout(
			function() 
			{
				loadProfile()
			}, 500);
	})

	$(document).on("click", "#takeQuizTab", function(){
		window.history.pushState('forward', null, './quizList');
		loadQuizes();
	})

//Add quizpage
//////////////////////////////////////////////////////////////////
$(document).on("click", "#addQuiz", function(){
	if (nick == null) {
		$("#makeQuizError").text("Must log in to create a quiz");
	}
	else{
		var $form = $(this).parent().parent().children();
		var quizName = $form.find( "input[name='createQuizName']" ).val();
		if (typeof quizName === 'undefined') {
			$("#makeQuizError").text("Quiz has gotta have a name");
		}
		else{
			quizCreator = nick;
			$.post("api/addQuiz.php",{
				addchanges: "again",
				quizCreator: quizCreator,
				quizName: quizName,
			}, function(addedQuiz){
				addedQuiz = JSON.parse(addedQuiz)
				make_quiz(addedQuiz[0]["qKey"], quizName)

			})
		}
	}
});

$(document).on("keyup", '#createQuizName', function(e) { 
	if(e.keyCode == 13)
	{
		if (nick == null) {
			$("#makeQuizError").text("Must log in to create a quiz");
		}
		else{
			var $form = $(this).parent().parent().children();
			quizName = $form.find( "input[name='createQuizName']" ).val();
			quizCreator = nick;
			$.post("api/addQuiz.php",{
				addchanges: "again",
				quizCreator: quizCreator,
				quizName: quizName,
			}, function(addedQuiz){
				addedQuiz = JSON.parse(addedQuiz)
				
				
				quiz_page(addedQuiz[0]["qKey"])
			})
		}
	}
});
///////////////////////////////////////////////////







$(document).on("click", "#addQuestion", function(){
	var $form = $( this ).parent().parent().children();
	question = $form.find( "input[name='question']" ).val(),
	q1 = $form.find( "input[name='q1']" ).val(),
	q2 = $form.find( "input[name='q2']" ).val(),
	q3 = $form.find( "input[name='q3']" ).val(),
	q4 = $form.find( "input[name='q4']" ).val(),
	answer = $form.find( 'input[name=q]:checked').attr("id"),
	quizNum = $form.find( "div[class='quizNum']" ).attr("id");

	if (question == null || q1 == null || q2 == null 
		|| q3 == null || q4 == null || answer == null){
		$(".error").text("all fields must be filled in")
}
else{
	url = $form.attr( "action" );
	$.post( "api/addQuestion.php", { 
		addchanges: "again",
		question: question,
		q1: q1,
		q2: q2,
		q3: q3,
		q4: q4,
		answer: answer,
		quizNum: quizNum,
	})
	url = window.location.href
	var quizid = url.split('=')[1]
	window.history.pushState("object or string", "Title", "?editquiz="+quizid);
}
});



$(document).on("click", "#uploadButton", function(){
	quizNum = url.split('=')[1]
	$.post('api/releaseQuiz.php', {
		quizNum : quizNum
	})
	url = window.location.href
	var quizid = url.split('=')[1]
	window.history.pushState("object or string", "Title", "?editquiz="+quizid);
})

$(document).on("click", "#unuploadButton", function(){
	quizNum = url.split('=')[1]
	$.post('api/unreleaseQuiz.php', {
		quizNum : quizNum
	})
	url = window.location.href
	var quizid = url.split('=')[1]
	window.history.pushState("object or string", "Title", "?editquiz="+quizid);
})


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

$(document).on("click", "#makeQuizTab", function(){
	window.history.pushState('forward', null, './makeQuiz');
	loadMakeQuiz();
})

$(document).on('click', '.deleteQuestion', function(){
	questkey = $(".deleteQuestion").attr("id")
	$.post("api/deleteQuestion.php", {
		questkey : questkey
	})
})

$(document).on("click", ".updateQuestion", function(){
	
	questkey = $(".updateQuestion").attr("id")
	var $form = $( this ).parent().parent().children();
	question = $form.find( "input[name='question']" ).val(),
	q1 = $form.find( "input[name='q1']" ).val(),
	q2 = $form.find( "input[name='q2']" ).val(),
	q3 = $form.find( "input[name='q3']" ).val(),
	q4 = $form.find( "input[name='q4']" ).val(),
	answer = $form.find( 'input[name=q]:checked').attr("id")

	if (question == null || q1 == null || q2 == null 
		|| q3 == null || q4 == null || answer == null){
		$(".error").text("all fields must be filled in")
}
else{
	url = $form.attr( "action" );
	$.post( "api/updateQuestion.php", { 
		question: question,
		q1: q1,
		q2: q2,
		q3: q3,
		q4: q4,
		answer: answer,
		questkey: questkey,
	}, function(hi){

		var quizid = $(".quizId").attr("id")
		
		quiz_page(parseInt(quizid));
	})
}
})


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
});