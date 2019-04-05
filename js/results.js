
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
					$(leaderHTML).find("#leaderNick").text(leaderboard[i]["nick"]);
					$(leaderHTML).find("#leaderboardScore").text(leaderboard[i]["score"]);
					$(leaderHTML).find("#leaderPlace").text(i+1)
					if (i == 0) {
						$(leaderHTML).find("#leaderPlace").attr("id", "firstPlace");
						$(leaderHTML).find("#leaderNick").attr("id", "firstPlace");
						$(leaderHTML).find("#leaderboardScore").attr("id", "firstPlaceRight");
					}
					if (i == 1) {
						$(leaderHTML).find("#leaderPlace").attr("id", "secondPlaceLeft");
						$(leaderHTML).find("#leaderNick").attr("id", "secondPlace");
						$(leaderHTML).find("#leaderboardScore").attr("id", "secondPlaceRight");
					}
					if (i == 2) {
						$(leaderHTML).find("#leaderPlace").attr("id", "thirdPlaceLeft");
						$(leaderHTML).find("#leaderNick").attr("id", "thirdPlace");
						$(leaderHTML).find("#leaderboardScore").attr("id", "thirdPlaceRight");
					}
					$("#leaderboardList").append(leaderHTML);
					quizStuff.score = 0;
					quizStuff.right = 0;
					quizStuff.wrong = 0;
				}
			})
		})
	})

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