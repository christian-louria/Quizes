let username;
let nick;
var guessed = false;
var subbmited = false;
var quizStuff = {
	score : 0,
	currentQuestion : 0,
	quizQuestions : [], 
	quizInfo : [],
	taker : null,
	taken : 0,
	right : 0,
	wrong : 0,
}
var usersXP = 0;
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
			quizStuff.right++;
			$("#score").text("Score: " + quizStuff.score)
			$.post("../api/guessCorrect.php", {
				nick, nick
			})

		}
		else {
			$("#"+answer).addClass("wrong")
			quizStuff.wrong++;
			$.post("../api/guessWrong.php", {
				nick, nick
			})
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
	$("#usernameTitle").show();
	var quizID = e;
	window.history.pushState("object or string", "Title", "?editquiz="+quizID);
}

function quiz_page(e){
	$("#usernameTitle").show();
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
	$("#usernameTitle").show();
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
	$("#usernameTitle").show();
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
	$("#usernameTitle").show();
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



function showXP(xpperc){
	$("#xp-increase-fx").css("display","inline-block");
	$("#xp-bar-fill").css("box-shadow",/*"0px 0px 15px #06f,*/ "-5px 0px 10px #fff inset");
	setTimeout(function(){
		$("#xp-bar-fill").css("-webkit-transition","all 2s ease");
		$("#xp-bar-fill").css("width",""+xpperc+"%");
	},100);
	setTimeout(function(){$(".xp-increase-glow1").fadeOut(500);
  	$(".xp-increase-glow2").fadeOut(500);
  	$(".xp-increase-glow3").fadeOut(500);
  	},2000);
}


function recusiveXP(spill, xpPerc, xpIncrease, xpAmmount, completed){
	if (spill == -1) {
		// setTimeout(function(){
		// 	$(".xp-increase-glow1").fadeOut(500);
		//   	$(".xp-increase-glow2").fadeOut(500);
		//   	$(".xp-increase-glow3").fadeOut(500);
	 //  	},1000);
	 completed();
	 return;
	}
	if (xpIncrease + xpPerc > 99) {
		xpStop = 100;
	}

	else {
		xpStop =  (xpAmmount % 100) + (xpIncrease);
	}
	$("#xp-bar-fill").animate({width: ""+xpPerc+"%",boxShadow: "-5px 0px 10px #fff inset"}, {duration : 0, complete : function(){
		xpChange = xpIncrease - 100;
		xpPerc = 0;
		spill--;
		$("#xp-bar-fill").animate({width : ""+xpStop+"%"}, {duration : 2000, complete : function(){
			recusiveXP(spill, xpPerc, xpChange, xpAmmount, completed)
		}
	})
	}
})
}

function increaseXP(xpAmmount, xpIncrease, completed){
	$("#xp-bar-fill").css("box-shadow",/*"0px 0px 15px #06f,*/ "-5px 0px 10px #fff inset");
	$("#xp-increase-fx").css("display","inline-block");
	var xpPerc = xpAmmount % 100; //Strating percent
	var spill = Math.trunc((xpAmmount % 100 + xpIncrease) / 100);
	recusiveXP(spill, xpPerc, xpIncrease, xpAmmount, completed);
}

function loadProfile(){
	$("#mainContent").load("profile.html");	
	$("#usernameTitle").hide();

	$.post("../api/getProfile.php", {
		nick : nick
	}, function(profileInfo){

		profileInfo = JSON.parse(profileInfo);
		if (profileInfo[0]["bio"] != null) {
			$("#myBio").text(profileInfo[0]["bio"]);
		}
		var playerXP = profileInfo[0]["xp"]
		var xpperc = playerXP % 100;
		var level = Math.trunc(playerXP / 100);
		$("#account-bar-level").text("Level: " + level);
		$("#account-bar-next-level").text(level + 1)

		$("#myXP").text(profileInfo[0]["xp"])
		$("#myCorrectAnswers").text(profileInfo[0]["correctAnswers"]);
		$("#myWrongAnswers").text(profileInfo[0]["wrongAnswers"]);
		$("#myLongestStreak").text(profileInfo[0]["highestStreak"]);
		$("#myPrecentage").text(Math.trunc((profileInfo[0]["correctAnswers"]) /
			(profileInfo[0]["wrongAnswers"] + profileInfo[0]["correctAnswers"]) * 100) + "%");
		$("#profileName").text(nick);
		if (profileInfo[0]["profilePic"] == null) {
			$("#profilePic").prepend("<img id='profilePic' src=uploads/profilePics/pic.png />");
		} else {
			$("#profilePic").prepend("<img id='profilePic' src="+profileInfo[0]["profilePic"]+" />");

		}
		showXP(xpperc);
	})
	$.post("../api/getMyQuizes.php", {
		nick : nick,
	}, function(quizes){
		quizes = JSON.parse(quizes);
		$.get("../inc/quizBox.html", function(quizBoxhtml){
			$("#myTotalQuizes").text(quizes.length)
			for (var i = 0; i < quizes.length; i++) {
				var html = $.parseHTML(quizBoxhtml);
				$(html).find(".questionAmmount").text(quizes[i][0])
				$(html).find(".quizCreatorBox").text(quizes[i]["quizCreator"])
				$(html).find(".quizNameBox").text(quizes[i]["quizName"])
				$(html).find(".quizNum").attr("id", quizes[i]["qKey"])
				$(html).attr('onClick', 'take_quiz('+quizes[i]["qKey"]+');');

				(function(tempHtml){
					$.get("../inc/editButton.html", function(button){
						var button = $.parseHTML(button)
						$(tempHtml).find(".canEdit").append(button)
					})						
				})(html);	

				$("#myQuizList").append(html);
			}
		})
	})
}



function loadMakeQuiz(){
	$("#usernameTitle").show();
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
				released = quizInfo[0]["released"];
				if (released == 0) {
					$("#uploadContainer").load("inc/uploadButton.html");
				}
				else if (released == 1){
					$("#uploadContainer").load("inc/unuploadButton.html");
				}

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
			$.post("api/isLegit.php", {
				nick : nick,
				quizid : quizid,
			},function(haveTaken){
				haveTaken = JSON.parse(haveTaken);
				quizStuff.taken = haveTaken["count(*)"]
			});
			$.post("api/getQuestions.php", {
				quizid : quizid,
			},
			function(quizQuestionsjsn){
				quizQuestionsjsn = JSON.parse(quizQuestionsjsn)
				quizStuff.quizQuestions = quizQuestionsjsn
				quizStuff.taker = nick;
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


$(document).ready(function(){
	$(document).on("submit", "#changeProfilePicForm", function(e) {
		e.preventDefault();

		$("#hiddenNick").val(nick);
		$.ajax({
			url: '/api/updateProfilePic.php',
			type: 'POST',
			data: new FormData($('#changeProfilePicForm')[0]),
			cache: false,
			contentType: false,
			processData: false,
		});

		setTimeout(
			function() 
			{
				loadProfile()
			}, 1000);
	});

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
				setTimeout(
					function() 
					{
						loadProfile()
					}, 1000);
			}
			else if (url.includes("makeQuiz")) {
				loadMakeQuiz();
			}
		});
	}


	$(document).on("click", "#endQuiz", function(){
		var XP = 0;
		if (quizStuff.taken > 0) {
			XP += ((quizStuff.right * 20) + (quizStuff.wrong * 4))
		}
		else {
			XP += ((quizStuff.right * 100) + (quizStuff.wrong * 20))
			$.post("api/uploadScore.php", {
				taker : quizStuff.taker, 
				score : quizStuff.score, 
				quizKey : quizStuff.quizInfo[0]["qKey"],
			})
		}
		$.post("api/updateXp.php", {
			nick : nick,
			XP : XP,
		})
		console.log(XP)
		guessed = false;
		$("#mainContent").load("quizXPandRe.html", function(){
			$("#account-bar-level").text("Level: " + Math.floor(usersXP / 100));
			$("#account-bar-next-level").text(Math.floor(usersXP / 100) + 1)
			increaseXP(usersXP, XP, function(){
				// XP = 0;
			})


			
		});

	})
		
		// $("#mainContent").load("results.html")
		
		// $.post("../api/getLeaderboard.php", {
		// 	quizid : quizStuff.quizInfo[0]["qKey"]
		// }, 
		// function(leaderboard){
		// 	leaderboard = JSON.parse(leaderboard)
		// 	$.get("../inc/leaderboardBox.html", function(leaderboardBox){

		// 		for (var i = 0; i < leaderboard.length; i++) {
		// 			leaderHTML = $.parseHTML(leaderboardBox)
		// 			$(leaderHTML).find("#leaderNick").text(leaderboard[i]["nick"])
		// 			$(leaderHTML).find("#leaderboardScore").text(leaderboard[i]["score"])
		// 			$(leaderHTML).find("#leaderPlace").text(i+1)
		// 			if (i == 0) {
		// 				$(leaderHTML).find("#leaderPlace").attr("id", "firstPlace")
		// 				$(leaderHTML).find("#leaderNick").attr("id", "firstPlace")
		// 				$(leaderHTML).find("#leaderboardScore").attr("id", "firstPlaceRight")
		// 			}
		// 			if (i == 1) {
		// 				$(leaderHTML).find("#leaderPlace").attr("id", "secondPlaceLeft")
		// 				$(leaderHTML).find("#leaderNick").attr("id", "secondPlace")
		// 				$(leaderHTML).find("#leaderboardScore").attr("id", "secondPlaceRight")
		// 			}
		// 			if (i == 2) {
		// 				$(leaderHTML).find("#leaderPlace").attr("id", "thirdPlaceLeft")
		// 				$(leaderHTML).find("#leaderNick").attr("id", "thirdPlace")
		// 				$(leaderHTML).find("#leaderboardScore").attr("id", "thirdPlaceRight")
		// 			}
		// 			$("#leaderboardList").append(leaderHTML)
		// 			quizStuff.score = 0;
		// 			quizStuff.right = 0;
		// 			quizStuff.wrong = 0;
		// 		}
		// 	})

		// })
	// })

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
	///////////////////////////

	$(document).on("mouseenter", "#picContainer", function(){
		$("#changeProfilePicForm").css('visibility', 'visible');
	})

	$(document).on("mouseleave", "#picContainer", function(){
		$("#changeProfilePicForm").css('visibility', 'hidden');
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
			}, 1000);
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