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
			$("#xpBarModal").empty()
			var quizid = url.split('=')[1]
			quizStuff.quizId = quizid;
			$.post("../api/isLegit.php", {
				nick : nick,
				quizid : quizStuff.quizId,
			},function(haveTaken){
				haveTaken = JSON.parse(haveTaken);
				quizStuff.taken = haveTaken["count(*)"];
				if (haveTaken["count(*)"] != 0) {
					$("#seeResultsButtonHider").show();
				}
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
					$("#quizCreator").attr('onClick', 'users_profile("'+quizStuff.quizInfo[0]["quizCreator"]+'");');
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
			$.post("../api/getComments.php", {
				quizid : quizid,
			}, function(comments){
				comments = JSON.parse(comments);
				$.get("../inc/commentBox.html", function(commentBox){
					console.log(comments)
					for (var i = 0; comments.length > i; i++) {
						commentBoxHTML = $.parseHTML(commentBox);
						$(commentBoxHTML).find(".commentNick").text(comments[i]['nick'])
						$(commentBoxHTML).find(".commentNick").attr('onClick', 'users_profile("'+comments[i]["nick"]+'");');
						$(commentBoxHTML).find(".commentComment").text(comments[i]['comment'])
						$(commentBoxHTML).find(".commentDate").text(comments[i]['time'])
						$(".allComments").append(commentBoxHTML)
					}
				})
				
			})
		})
	}
	}, delayInMilliseconds);
	};
	})(window.history);


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