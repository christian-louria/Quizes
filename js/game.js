function check_answer(e){
	e = e || window.event;
	var targ = e.target || e.srcElement;
	if ($(targ).children().length > 0 ){
		targ = $(targ).children()
	}
	else{
		targ = $(targ)
	}
	var answer = targ.attr("id").charAt(0);
	// $("#susp")[0].pause();
	// $("#susp")[0].currentTime = 0;
	// $("#drop")[0].play();
	if (quizStuff.prevGuess > 0) {
		display_next(quizStuff.prevGuess);
	}
	else {
		display_next(answer);
	}
}

function display_next(answer){
	if (!(guessed)) {

		$("#"+quizStuff.quizQuestions[questionCounter]["answer"]+"button").addClass("right")
		$("#"+quizStuff.quizQuestions[questionCounter]["answer"]+"button").addClass("forceHover")


		if (quizStuff.quizQuestions[questionCounter]["q1help"] != null) {
			$("#post1").text(quizStuff.quizQuestions[questionCounter]["q1help"])
		}
		if (quizStuff.quizQuestions[questionCounter]["q2help"] != null) {
			$("#post2").text(quizStuff.quizQuestions[questionCounter]["q2help"])
		}
		if (quizStuff.quizQuestions[questionCounter]["q3help"] != null) {
			$("#post3").text(quizStuff.quizQuestions[questionCounter]["q3help"])
		}
		if (quizStuff.quizQuestions[questionCounter]["q4help"] != null) {
			$("#post4").text(quizStuff.quizQuestions[questionCounter]["q4help"])
		}

		$(".allignPost").animate({opacity : "1", top : "0"}, {duration : 500})
		

		if (answer == quizStuff.quizQuestions[questionCounter]["answer"]) {
			quizStuff.score += 100;
			quizStuff.right++;
			$("#score").text("Score: " + quizStuff.score)
			$.post("../api/guessCorrect.php", {
				nick, nick
			})

		}
		else {
			$("#"+answer+"button").addClass("wrong")
			$("#"+answer+"button").addClass("forceHover")
			
			//$("#"+answer+"button").addClass("btnWrong")
			quizStuff.wrong++;
			$.post("../api/guessWrong.php", {
				nick, nick
			})
		}
		if (questionCounter + 1 == quizStuff.quizQuestions.length) {
			$(".nextQuestion").show()
			$(".upNextAction").attr("id", "endQuiz")
			$("#upNext").text("Upload Results")
		}
		else {
			$(".nextQuestion").show()
			//$(".nextQuestion").attr("id", "nextQuestion")
			$("#upNext").text("Next Question")
			$(".upNextAction").attr('onClick', 'next_question();');
		}
		guessed = true;
		if (quizStuff.taken == 0 && quizStuff.prevGuess == 0) {
			$.post("../api/addGuessed.php", {
				nick : nick,
				question : quizStuff.quizQuestions[questionCounter].questKey,
				answer : answer,
				quizid : quizStuff.quizId,
			})
		}
	}
}

function next_question(){
	$("#post1").text(" ")
	$("#post2").text(" ")
	$("#post3").text(" ")
	$("#post4").text(" ")
	$(".allignPost").css({opacity : "0", top : "10px"})


	// $("#drop")[0].pause();
	// $("#susp")[0].play();
	// $("#drop")[0].currentTime = 0;

	$(".nextQuestion").hide()
	//$(".upNextAction").removeAttr("id", "nextQuestion")
	$(".upNextAction").removeAttr('onClick', 'next_question();');
	$(".btn-quiz").removeClass("right")
	$(".btn-quiz").removeClass("wrong")
	$(".btn-quiz").removeClass("forceHover")
	questionCounter++;
	guessed = false;
	$("#questionWords").text(quizStuff.quizQuestions[questionCounter]["question"])
	$("#1").text(quizStuff.quizQuestions[questionCounter]["q1"])
	$("#2").text(quizStuff.quizQuestions[questionCounter]["q2"])
	$("#3").text(quizStuff.quizQuestions[questionCounter]["q3"])
	$("#4").text(quizStuff.quizQuestions[questionCounter]["q4"])
	$("#questionNumber").text("Question: " + (questionCounter + 1));
	if (quizStuff.taken == 0) {
		$.post("../api/getGuessed.php",{
			nick : nick,
			question : quizStuff.quizQuestions[questionCounter].questKey,
		}, function(prevGuess){
			prevGuess = JSON.parse(prevGuess);
			quizStuff.prevGuess = prevGuess['answer'];
		})
	}
}
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
$(document).on("click", "#addComment", function(){
	var $form = $( this ).parent().parent().parent().parent().children();
	comment = $form.find( "input[name='newComment']" ).val();
	if (comment == null) {
		return;
	}
	$.post("../api/addComment.php", {
		nick : nick, 
		quizid : quizStuff.quizId,
		comment : comment,
	}, function(){
		$.get("../inc/commentBox.html", function(commentBox){
			commentBoxHTML = $.parseHTML(commentBox);
			$(commentBoxHTML).find(".commentNick").text(nick);
			$(commentBoxHTML).find(".commentComment").text(comment);

			$(".allComments").append(commentBoxHTML)
		})
	})
})



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
		$.post("../api/updateCreatorXP.php", {
			creator : quizStuff.quizInfo[0]["quizCreator"],
			xp : (quizStuff.quizQuestions.length * 10),
			quizName : quizStuff.quizInfo[0]['quizName'],
			taker : nick,
		})
		guessed = false;
		$("#mainContent").load("quizXPandRe.html", function(){
			console.log(usersXP)
			var quickP = levelPercentage(usersXP);
			$("#xp-bar-fill").css("box-shadow",/*"0px 0px 15px #06f,*/ "-5px 0px 10px #fff inset");
			$("#xp-bar-fill").animate({width : ""+quickP+"%"}, {duration : 2000});
			$("#resultsCorrect").text(quizStuff.right);
			$("#resultsWrong").text(quizStuff.wrong);
			$("#xpUp").text("+ "+ XP);
			$("#account-bar-level").text("Level: " + (levelCalculator(usersXP)));
			$("#account-bar-next-level").text(levelCalculator(usersXP) + 1);

			$("#resultsCorrect").animate({top: "0px",opacity: "1"}, {duration : 1000, complete : function(){
				$("#resultsWrong").animate({top: "0px",opacity: "1"}, {duration : 1000, complete : function(){
					$("#xpUp").animate({top : "0px", opacity : "1"}, {duration : 2000, complete : function(){
						$("#xpUp").animate({top : "150px"}, {duration : 1000, complete : function(){
							increaseXP(usersXP, XP, function(){
								usersXP += XP;
								$("#xpToNext").text("To next: " + (levelTotalTo(levelCalculator(usersXP)) - usersXP));
								$("#xpToNext").animate({top : "0px", opacity : "1"}, {duration : 1000})
							})	
						}})
					}})	
				}})
			}});
		});
	})

	
	$(document).on("click", "#startQuiz", function(){
		if (nick == null) {
			$("#startError").text("Must log in.")
		}
		else{
			$.post("../api/isLegit.php", {
				nick : nick,
				quizid : quizStuff.quizId,
			},function(haveTaken){
				haveTaken = JSON.parse(haveTaken);
				quizStuff.taken = haveTaken["count(*)"];
			});
			quizStuff.taker = nick;
			quizStuff.score = 0;
			quizStuff.right = 0;
			quizStuff.wrong = 0;
			subbmited = false;
			guessed = false;
			$("#mainContent").load("takeQuiz.html", function(){
				questionCounter = 0;
				$("#score").text("Score: 0")
				if (quizStuff.quizQuestions.length == 0) {
					$("#questionNumber").text("No Questions :(")
				}
				else {
					$("#questionWords").text(quizStuff.quizQuestions[questionCounter]["question"])
					$("#questionNumber").text("Question: " + 1);
					$("#1").text(quizStuff.quizQuestions[questionCounter]["q1"])
					$("#2").text(quizStuff.quizQuestions[questionCounter]["q2"])
					$("#3").text(quizStuff.quizQuestions[questionCounter]["q3"])
					$("#4").text(quizStuff.quizQuestions[questionCounter]["q4"])
					//$("#susp")[0].play();
					if (quizStuff.taken == 0) {
						$.post("../api/getGuessed.php",{
							nick : nick,
							question : quizStuff.quizQuestions[questionCounter].questKey,
						}, function(prevGuess){
							prevGuess = JSON.parse(prevGuess);
							quizStuff.prevGuess = prevGuess['answer'];
						})
					}
				}
			})
		}
	})