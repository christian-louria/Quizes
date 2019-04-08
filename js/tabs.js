function make_quiz(e, quizName){
	$("#usernameTitle").show();
	var quizID = e;
	window.history.pushState("object or string", "Title", "?editquiz="+quizID);
}

function users_profile(userProf){
	$("#usernameTitle").show();
	if (userProf == nick) {
		loadProfile();
		return;
	}
	window.history.pushState("object or string", "Title", "?profile="+userProf);
	$("#mainContent").load("someonesProfile.html", function(){
		$("#usernameTitle").hide();
		$.post("../api/getProfile.php", {
			nick : userProf
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
			$("#profileName").text(profileInfo[0]['nick']);
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
					$(html).find(".quizCreatorBoxText").text(quizes[i]["quizCreator"])
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
				$(html).find(".quizCreatorBoxText").text(quizes[i]["quizCreator"])
				$(html).find(".quizNameBox").text(quizes[i]["quizName"])
				$(html).attr('onClick', 'take_quiz('+quizes[i]["qKey"]+');')
				$(html).find(".quizNum").attr("id", quizes[i]["qKey"])
				$(html).find(".quizCreatorBoxText").attr('onClick', 'users_profile("'+quizes[i]["quizCreator"]+'");')			
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
				$(html).find(".quizCreatorBoxText").text(quizes[i]["quizCreator"])
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
					$(html).find(".quizCreatorBoxText").text(quizes[i]["quizCreator"])
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



$(document).on("click", "#quizCreatorBoxText", function(){
	console.log("here")
	usersPage = $(this).closest("#quizCreatorBoxText").text()
	console.log(usersPage)
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

	$(document).on("click", "#makeQuizTab", function(){
	window.history.pushState('forward', null, './makeQuiz');
	loadMakeQuiz();
})
