function doResults(resultsUser){
	$.post("../api/getFirstResults.php", {
			nick : resultsUser,
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
						if (firstResults[0][index]['answer'] == firstResults[1][index]['answer']) {
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
}



	$(document).on("click", "#showLeaderboardButton", function(){
	$("#xpAndResultsContainer").load("results.html")
		$("#showLeaderboardButton").hide();
		$.post("../api/getLeaderboard.php", {
			quizid : quizStuff.quizInfo[0]["qKey"]
		}, 
		function(leaderboard){
			leaderboard = JSON.parse(leaderboard)
			$.get("../inc/leaderboardBox.html", function(leaderboardBox){

				for (var i = 0; i < leaderboard.length; i++) {
					leaderHTML = $.parseHTML(leaderboardBox);
					$(leaderHTML).find("#leaderNick").attr('onClick', 'load_prev_results_for("'+(leaderboard[i]["nick"]+'");'));
					$(leaderHTML).find("#leaderNick").text(leaderboard[i]["nick"]);
					$(leaderHTML).find("#leaderboardScore").text(leaderboard[i]["score"]);
					$(leaderHTML).find("#leaderPlace").text(i+1)
					if (i == 0) {
						$(leaderHTML).find("#leaderPlace").attr("class", "firstPlace");
						$(leaderHTML).find("#leaderNick").attr("class", "firstPlace");
						$(leaderHTML).find("#leaderboardScore").attr("class", "firstPlaceRight");
					}
					if (i == 1) {
						$(leaderHTML).find("#leaderPlace").attr("class", "secondPlaceLeft");
						$(leaderHTML).find("#leaderNick").attr("class", "secondPlace");
						$(leaderHTML).find("#leaderboardScore").attr("class", "secondPlaceRight");
					}
					if (i == 2) {
						$(leaderHTML).find("#leaderPlace").attr("class", "thirdPlaceLeft");
						$(leaderHTML).find("#leaderNick").attr("class", "thirdPlace");
						$(leaderHTML).find("#leaderboardScore").attr("class", "thirdPlaceRight");
					}

					

					$("#leaderboardList").append(leaderHTML);
					quizStuff.score = 0;
					quizStuff.right = 0;
					quizStuff.wrong = 0;
				}
			})
		})
	})



function load_prev_results(){
	$("#mainContent").load("prevResults.html", function(){
		doResults(nick);
	})
}

function load_prev_results_for(userResults){
	$("#mainContent").load("prevResults.html", function(){
		$("#someonesResults").text(userResults + '\'s Results')
		doResults(userResults);
	})
}


	$(document).on("click", ".rightExpand", function(){
		$(this).closest('.boxBox').css({width : "180%", transition: "all .2s ease-in-out"});
		$(this).closest('.boxBox').find("#resultAnswer").hide();
		$(this).closest('.boxBox').find("#resultRightAnswer").hide();
		$(this).closest('.boxBox').find("#resultWrongAnswer").hide();
		$(this).closest('.boxBox').find(".resultsContainer").show();
	})

	$(document).on("mouseenter", ".rightExpand", function(){
		$(this).closest('.boxBox').css({boxShadow: "0px 0px 12px 0px rgba(0,0,0,0.75)", zIndex : '10', transform: "scale(1.1)", transition: "all .2s ease-in-out"})
	})

	$(document).on("mouseleave", ".rightExpand", function(){
		$(this).closest('.boxBox').css({width : "100%", boxShadow: "none", zIndex : '0', transform: "scale(1)", transition: "all .2s ease-in-out"});
		$(this).closest('.boxBox').find("#resultAnswer").show();
		$(this).closest('.boxBox').find("#resultRightAnswer").show();
		$(this).closest('.boxBox').find("#resultWrongAnswer").show();
		$(this).closest('.boxBox').find(".resultsContainer").hide();
		$(this).closest('.boxBox').find(".innerResultBox").animate({scrollTop: 0}, 'slow');
	})


	$(document).on("click", ".leftExpand", function(){
		$(this).closest('.boxBox').css({width : "180%", left: "-80%", transition: "all .2s ease-in-out"});
		$(this).closest('.boxBox').find("#resultAnswer").hide();
		$(this).closest('.boxBox').find("#resultRightAnswer").hide();
		$(this).closest('.boxBox').find("#resultWrongAnswer").hide();
		$(this).closest('.boxBox').find(".resultsContainer").show();
	})

	$(document).on("mouseenter", ".leftExpand", function(){
		$(this).closest('.boxBox').css({boxShadow: "0px 0px 12px 0px rgba(0,0,0,0.75)", zIndex : '10', transform: "scale(1.1)", transition: "all .2s ease-in-out"})
	})

	$(document).on("mouseleave", ".leftExpand", function(){
		$(this).closest('.boxBox').css({width : "100%", left: "0", boxShadow: "none", zIndex : '0', transform: "scale(1)", transition: "all .2s ease-in-out"});
		$(this).closest('.boxBox').find("#resultAnswer").show();
		$(this).closest('.boxBox').find("#resultRightAnswer").show();
		$(this).closest('.boxBox').find("#resultWrongAnswer").show();
		$(this).closest('.boxBox').find(".resultsContainer").hide();
		$(this).closest('.boxBox').find(".innerResultBox").animate({scrollTop: 0}, 'slow');
	})


	$(document).on("click", "#seeResultsButton", function(){
		window.history.pushState("object or string", "Title", "?quizResults=" + quizStuff.quizId);
		load_prev_results();
		console.log("HI")
	})

	$(document).on("click", "#backToQuizzesButton", function(){
		loadQuizes();
	})