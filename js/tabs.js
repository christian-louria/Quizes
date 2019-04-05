
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

function load_prev_results(){
	$("#mainContent").load("prevResults.html", function(){
		$.post("../api/getFirstResults.php", {
			nick : nick,
			quizid : quizStuff.quizId,
		}, function(firstResults){
			firstResults = JSON.parse(firstResults);
			$.get('../inc/boxBox.html', function(boxBoxhtmo){
				prevScore = 0;
				for (var i = 0; firstResults[0].length > i; i++) {
					boxBox = $.parseHTML(boxBoxhtmo);
					// debugger;
					
					(function(tempHtml, index){
						//console.log(tempHtml)
						if (firstResults[0][i]['answer'] == firstResults[1][i]['answer']) {
							$.get("../inc/correctBox.html", function(correctBox){
								prevScore += 100;
								correctBox = $.parseHTML(correctBox);
								$(correctBox).find("#resultQuestionNumber").html("Question " + (index + 1));
								$(correctBox).find("#resultQuestion").html(firstResults[1][index]['question'])
								$(correctBox).find("#resultAnswer").html(firstResults[1][index]["q" +
								 firstResults[0][index]['answer']])
								$(correctBox).find("#1").text(quizStuff.quizQuestions[index]["q1"])
								$(correctBox).find("#2").text(quizStuff.quizQuestions[index]["q2"])
								$(correctBox).find("#3").text(quizStuff.quizQuestions[index]["q3"])
								$(correctBox).find("#4").text(quizStuff.quizQuestions[index]["q4"])
								$(correctBox).find("#" + firstResults[1][index]['answer']).css({backgroundColor : "green", color : "white"})
								$(tempHtml[0]).append(correctBox)
								$("#scoreResult").html("Score: " + prevScore);
								if (index % 4 < 2) {
									$(tempHtml[0]).addClass("rightExpand");
								}
								else {
									$(tempHtml[0]).addClass("leftExpand");
								}
							})							
						}
						else {
							$.get('../inc/wrongBox.html', function(wrongBox){
								wrongBox = $.parseHTML(wrongBox);
								$(wrongBox).find("#resultQuestionNumber").html("Question " + (index + 1));
								$(wrongBox).find("#resultQuestion").html(firstResults[1][index]['question'])
								$(wrongBox).find("#resultWrongAnswer").html(firstResults[1][index]["q" +
								 firstResults[0][index]['answer']])
								$(wrongBox).find("#resultRightAnswer").html(firstResults[1][index]["q" +
								 firstResults[1][index]['answer']])
								$(wrongBox).find("#1").text(quizStuff.quizQuestions[index]["q1"])
								$(wrongBox).find("#2").text(quizStuff.quizQuestions[index]["q2"])
								$(wrongBox).find("#3").text(quizStuff.quizQuestions[index]["q3"])
								$(wrongBox).find("#4").text(quizStuff.quizQuestions[index]["q4"])
								$(wrongBox).find("#" + firstResults[0][index]['answer']).css({backgroundColor : "red", color : "white"})
								$(wrongBox).find("#" + firstResults[1][index]['answer']).css({backgroundColor : "green", color : "white"})
								$(tempHtml[0]).append(wrongBox)
								if (index % 4 < 2) {
									$(tempHtml[0]).addClass("rightExpand");
								}
								else {
									$(tempHtml[0]).addClass("leftExpand");
								}
							})
						}

					})(boxBox, i);
					$("#quizResultsName").text(quizStuff.quizInfo[0]['quizName'])
					$("#prevAnswersWrapper").append(boxBox);
					

				}
			})


		})
	})
}

function loadProfile(){
	$("#mainContent").load("profile.html", function(){
		$("#usernameTitle").hide();
		$.post("../api/getProfile.php", {
			nick : nick
		}, function(profileInfo){

			profileInfo = JSON.parse(profileInfo);
			if (profileInfo[0]["bio"] != null) {
				$("#myBio").text(profileInfo[0]["bio"]);
			}
			var playerXP = profileInfo[0]["xp"]
			var xpperc = levelPercentage(playerXP);
			var level = levelCalculator(playerXP);
			$("#account-bar-level").text("Level: " + level);
			$("#account-bar-next-level").text(level + 1);
			$("#xpToNext").text("To next: " + (levelTotalTo(levelCalculator(playerXP)) - playerXP));
			$("#xpToNext").animate({top : "0px", opacity : "1"}, {duration : 1000});
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
			// increaseXP(3528, 2000, function(){
			// 	//usersXP += XP;
			// })
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
	});	
}

function loadMakeQuiz(){
	$("#usernameTitle").show();
	$("#mainContent").load("makeQuiz.html");
}
