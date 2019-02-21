let username;
let nick;
var guessed = false;
var subbmited = false;
var quizStuff = {
	score : 0,
	currentQuestion : 0,
	quizQuestions : [], 
	quizInfo : [],
	taker : null
}
var createQuestionNumber = 1;

function check_answer(e){
	e = e || window.event;
	var targ = e.target || e.srcElement;
	if ($(targ).children().length > 0 ){
		targ = $(targ).children()
	}
	else{
		targ = $(targ)
	}
	var answer = targ.attr("id")

	if (!guessed) {
		$(".answerBox").removeClass("answerHover");
		$(".answerBox").unbind('mouseenter').unbind('mouseleave')
		//$(".answerBox").off('hover');

		$("#"+quizStuff.quizQuestions[counter]["answer"]).addClass("correct")
		if (answer == quizStuff.quizQuestions[counter]["answer"]) {
			quizStuff.score += 100;
			$("#score").text("Score: " + quizStuff.score)

		}
		else {
			$("#"+answer).addClass("wrong")
		}
		if (counter + 1 == quizStuff.quizQuestions.length) {
			$(".nextQuestion").attr("id", "endQuiz")
			$(".nextQuestion").text("Upload Results")
		}
		else {
			$(".nextQuestion").attr("id", "nextQuestion")
			$(".nextQuestion").text("Next Question")
			$(".nextQuestion").attr('onClick', 'next_question();');
		}
	}
	guessed = true;
}


function next_question(){
	$(".answerBox").addClass("answerHover");
	$(".nextQuestion").empty()
	$(".nextQuestion").removeAttr("id", "nextQuestion")
	$(".nextQuestion").removeAttr('onClick', 'next_question();');
	$(".answerBox").removeClass("correct")
	$(".answerBox").removeClass("wrong")
	counter++;
	guessed = false;
	$("#questionWords").text(quizStuff.quizQuestions[counter]["question"])
	$("#1").text(quizStuff.quizQuestions[counter]["q1"])
	$("#2").text(quizStuff.quizQuestions[counter]["q2"])
	$("#3").text(quizStuff.quizQuestions[counter]["q3"])
	$("#4").text(quizStuff.quizQuestions[counter]["q4"])
}


function make_quiz(e, quizName){
	var quizID = e;
	window.history.pushState("object or string", "Title", "?editquiz="+quizID);
}

function quiz_page(e){
	if (!e) var e = window.event;
	e.cancelBubble = true;
	if (e.stopPropagation) e.stopPropagation();
	if (Number.isInteger(e)) {
		quizID = e
		window.history.pushState("object or string", "Title", "?editquiz="+quizID);
		return;
	}
	e = e || window.event;
	var targ = e.target || e.srcElement;
	targ = $(targ)
	var quizID = targ.parent().parent().parent().parent().attr("id");
	window.history.pushState("object or string", "Title", "?editquiz="+quizID);
};

function take_quiz(e){
	e = e || window.event;
	var targ = e.target || e.srcElement;
	if (typeof e == 'number') {
		quizID = e;
	}
	window.history.pushState("object or string", "Title", "?takequiz="+quizID);
}

function edit_question(e){
	e = e || window.event;
	var targ = e.target || e.srcElement;
	if (targ.nodeType == 3) {
		targ = targ.parentNode;
	}
	if ($(targ).children().length > 0 ){
		targ = $(targ).children()
	}
	else{
		targ = $(targ)
	}
	targ = (targ.parent())
	var questionID = targ.attr("id")
	window.history.pushState("object or string", "Title", "?editquestion="+questionID);
}

function loadIndex(){
	$("#mainContent").load("home.html");
	$.getJSON("api/getQuizesRecent.php", function(quizes){
		$.get("../inc/quizBox.html", function(quizBoxhtml){
			for (var i = 0; i < quizes.length; i++) {
				var html = $.parseHTML(quizBoxhtml);
				$(html).find(".questionAmmount").text(quizes[i][0])
				$(html).find(".quizCreatorBox").text(quizes[i]["quizCreator"])
				$(html).find(".quizNameBox").text(quizes[i]["quizName"])
				$(html).find(".quizNum").attr("id", quizes[i]["qKey"])
				$(html).attr('onClick', 'take_quiz('+quizes[i]["qKey"]+');')
				$("#quizList").append(html);
			}
		})
	})
}

function loadQuizes(){
	$("#mainContent").load("quizes.html");
	$.getJSON("../api/getQuizes.php", function(quizes){
		$.get("../inc/quizBox.html", function(quizBoxhtml){
			for (var i = 0; i < quizes.length; i++) {
				var html = $.parseHTML(quizBoxhtml);
				$(html).find(".questionAmmount").text(quizes[i][0])
				$(html).find(".quizCreatorBox").text(quizes[i]["quizCreator"])
				$(html).find(".quizNameBox").text(quizes[i]["quizName"])
				$(html).find(".quizNum").attr("id", quizes[i]["qKey"])
				$(html).attr('onClick', 'take_quiz('+quizes[i]["qKey"]+');')
				if (nick == quizes[i]["quizCreator"]) {
					(function(tempHtml){
						$.get("../inc/editButton.html", function(button){
							var button = $.parseHTML(button)
							$(tempHtml).find(".canEdit").append(button)
						})						
					}(html));	
				}	
				$("#allQuizList").append(html);
			}
		})
	})
}

function loadProfile(){
	$("#mainContent").load("profile.html");
}

function loadMakeQuiz(){
	$("#mainContent").load("makeQuiz.html");
}

(function(history){
	var pushState = history.pushState;
	history.pushState = function(state) {
		if (typeof history.onpushstate == "function") {
			history.onpushstate({state: state});
		}
		pushState.apply(history, arguments);
		var delayInMilliseconds = 1;
		setTimeout(function() {
			url = window.location.href


////////////////////////////////////
if (url.includes("editquiz")) {
	$("#mainContent").load("quiz.html", function(){
		var quizid = url.split('=')[1]
		$(".quizNum").attr("id", quizid)

		$.post("../api/getQuiz.php", {
			quizid: quizid
		}, function(quizInfo){
			quizInfo = JSON.parse(quizInfo)
				$(".quizNum").attr("id", quizid)
				$("#quizName").text(quizInfo[0]["quizName"])
				$.post("api/getQuestions.php", {
					quizid : quizid,
				},
				function(quizQuestions){
					quizQuestions = JSON.parse(quizQuestions)
					var questionDisplay = quizQuestions.length + 1;
					$("#questionNumberDisplay").text("Question " + questionDisplay)
					$.get("../inc/questionEditBox.html", function(editBox){
						for (var i = 0; i < quizQuestions.length; i++) {
							var html = $.parseHTML(editBox);
							$(html).attr("id", quizQuestions[i]["questKey"])
							$(html).find(".questionQuestion").text(quizQuestions[i]["question"])
							$(html).find(".questionNumber").text(i + 1)
							$("#questionList").append(html);
						}
					})
				})
			})

	})
}
/////////////////////////////////////////
else if (url.includes("editquestion")) {
	$("#currentEditQuestion").load("editQuestion.html", function(){
		var questionid = url.split('=')[1];
		$(".currentEditQuestionBox").removeClass("currentEditQuestionBox")
		$("#"+questionid).addClass("currentEditQuestionBox")
		$.post("api/getQuestion.php", {
			questionid : questionid
		},
		function(question){
			question = JSON.parse(question)
			
			$("#"+question[0]["answer"]).attr('checked', true);
			$(".quizId").attr("id", question[0]["quizNum"])
			$("#question").val(question[0]["question"])
			$("#q1").val(question[0]["q1"])
			$("#q2").val(question[0]["q2"])
			$("#q3").val(question[0]["q3"])
			$("#q4").val(question[0]["q4"])
			$(".deleteQuestion").attr("id", question[0]["questKey"])
			$(".updateQuestion").attr("id", question[0]["questKey"])
		})
	})
}


///////////////////////////////////
else if (url.includes("takequiz")) {
	$("#mainContent").load("quizStart.html", function(){
		var quizid = url.split('=')[1]
		$.post("api/getQuestions.php", {
			quizid : quizid,
		},
		function(quizQuestionsjsn){
			quizQuestionsjsn = JSON.parse(quizQuestionsjsn)
			quizStuff.quizQuestions = quizQuestionsjsn
			quizStuff.taker = nick
			$.post("api/getQuiz.php", {
				quizid : quizid,
			},
			function(quizInfojsn){
				quizInfojsn = JSON.parse(quizInfojsn)
				quizStuff.quizInfo = quizInfojsn

				$("#questionAmmount").text("Questions: " + quizStuff.quizQuestions.length)
				$("#quizCreator").text(quizStuff.quizInfo[0]["quizCreator"])
				$("#quizName").text(quizStuff.quizInfo[0]["quizName"])

				$.post("../api/getLeaderboard.php", {
					quizid : quizid
				}, 
				function(leaderboard){
					leaderboard = JSON.parse(leaderboard)
					$.get("../inc/leaderboardBox.html", function(leaderboardBox){
						if (leaderboard.length == 0) {
							$("#leaderboardList").append("No Results...")
						}
						for (var i = 0; i < leaderboard.length; i++) {
							leaderHTML = $.parseHTML(leaderboardBox)
							$(leaderHTML).find("#leaderNick").text(leaderboard[i]["nick"])
							$(leaderHTML).find("#leaderboardScore").text(leaderboard[i]["score"])
							$(leaderHTML).find("#leaderPlace").text(i+1)
							if (i == 0) {
								$(leaderHTML).find("#leaderPlace").attr("id", "firstPlace")
								$(leaderHTML).find("#leaderNick").attr("id", "firstPlace")
								$(leaderHTML).find("#leaderboardScore").attr("id", "firstPlaceRight")
							}
							if (i == 1) {
								$(leaderHTML).find("#leaderPlace").attr("id", "secondPlaceLeft")
								$(leaderHTML).find("#leaderNick").attr("id", "secondPlace")
								$(leaderHTML).find("#leaderboardScore").attr("id", "secondPlaceRight")
							}
							if (i == 2) {
								$(leaderHTML).find("#leaderPlace").attr("id", "thirdPlaceLeft")
								$(leaderHTML).find("#leaderNick").attr("id", "thirdPlace")
								$(leaderHTML).find("#leaderboardScore").attr("id", "thirdPlaceRight")
							}
							$("#leaderboardList").append(leaderHTML)
						}
					})
					
				})

			})
		})
	})
}
}, delayInMilliseconds);
};
})(window.history);

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////




$(document).ready(function(){

	$(window).on("beforeunload", function(e) {
//            ^^^
  window.location.assign("tianquiz.herokuapp.com")
  return;
});


	window.history.pushState('forward', null, './home');
	$.getJSON("api/getQuizesRecent.php", function(quizes){
		$.get("../inc/quizBox.html", function(quizBoxhtml){
			console.log("HI")
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



	if (window.history && window.history.pushState) {
		$(window).on('popstate', function() {
			url = window.location.href
			if (url.includes("home")){
				loadIndex();
			}
			else if (url.includes("quizList")) {
				loadQuizes();
			}
			else if (url.includes("profile")) {
				loadProfile();
			}
			else if (url.includes("makeQuiz")) {
				loadMakeQuiz();
			}
		});
	}


	$(document).on("click", "#endQuiz", function(){
		guessed = false;	
		$("#mainContent").load("results.html")
		$.post("api/uploadScore.php", {
			taker : quizStuff.taker, 
			score : quizStuff.score, 
			quizKey : quizStuff.quizInfo[0]["qKey"],
		})
		$.post("../api/getLeaderboard.php", {
			quizid : quizStuff.quizInfo[0]["qKey"]
		}, 
		function(leaderboard){
			leaderboard = JSON.parse(leaderboard)
			$.get("../inc/leaderboardBox.html", function(leaderboardBox){

				for (var i = 0; i < leaderboard.length; i++) {
					leaderHTML = $.parseHTML(leaderboardBox)
					$(leaderHTML).find("#leaderNick").text(leaderboard[i]["nick"])
					$(leaderHTML).find("#leaderboardScore").text(leaderboard[i]["score"])
					$(leaderHTML).find("#leaderPlace").text(i+1)
					if (i == 0) {
						$(leaderHTML).find("#leaderPlace").attr("id", "firstPlace")
						$(leaderHTML).find("#leaderNick").attr("id", "firstPlace")
						$(leaderHTML).find("#leaderboardScore").attr("id", "firstPlaceRight")
					}
					if (i == 1) {
						$(leaderHTML).find("#leaderPlace").attr("id", "secondPlaceLeft")
						$(leaderHTML).find("#leaderNick").attr("id", "secondPlace")
						$(leaderHTML).find("#leaderboardScore").attr("id", "secondPlaceRight")
					}
					if (i == 2) {
						$(leaderHTML).find("#leaderPlace").attr("id", "thirdPlaceLeft")
						$(leaderHTML).find("#leaderNick").attr("id", "thirdPlace")
						$(leaderHTML).find("#leaderboardScore").attr("id", "thirdPlaceRight")
					}
					$("#leaderboardList").append(leaderHTML)
					quizStuff.score = 0;
				}
			})

		})
	})

	$(document).on("click", "#startQuiz", function(){
		if (nick == null) {
			$("#startError").text("Must log in.")
		}
		else{
			quizStuff.taker = nick;
			quizStuff.score = 0;
			subbmited = false;
			$("#mainContent").load("takeQuiz.html", function(){
				counter = 0;
				$("#score").text("Score: 0")
				if (quizStuff.quizQuestions.length == 0) {
					$("#questionNumber").text("No Questions :(")
				}
				else {
					$("#questionWords").text(quizStuff.quizQuestions[counter]["question"])
					$("#1").text(quizStuff.quizQuestions[counter]["q1"])
					$("#2").text(quizStuff.quizQuestions[counter]["q2"])
					$("#3").text(quizStuff.quizQuestions[counter]["q3"])
					$("#4").text(quizStuff.quizQuestions[counter]["q4"])
				}
			})
		}
	})

	$(document).on("click", "#homeTab", function(){
		window.history.pushState('forward', null, './home');
		loadIndex();
	})

	$(document).on("click", "#profileTab", function(){
		window.history.pushState('forward', null, './profile');
		loadProfile();
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
		}
		else{
			nick = userInfo[0]["nick"];
			username = userInfo[0]["username"];
			$("#usernameTitle").text(nick);
			$("#signinError").text(" ");
			$("#signInOrOut").load("inc/signOutBox.html");
		}
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
			$("#usernameTitle").text(nick);
			$("#signinError").text(" ");
			$("#signInOrOut").load("inc/signOutBox.html");
		}
		$("#username").val('');
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
				nick = userInfo[0]["nick"];
				username = userInfo[0]["username"];
			}
		})
	}

})

});