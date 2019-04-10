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
$.getScript("js/makequiz.js");
$.getScript("js/signin.js", function(){
	if (localStorage.getItem("username") != null) {
		login(localStorage.getItem("username"))
	}
});

function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}

$(document).ready(function(){
	window.history.pushState('forward', null, './home');
	$.getJSON("api/getQuizesRecent.php", function(quizes){
		$.get("../inc/quizBox.html", function(quizBoxhtml){
			for (var i = 0; i < quizes.length; i++) {
				var html = $.parseHTML(quizBoxhtml);
				$(html).find(".questionAmmount").text(quizes[i][0])
				$(html).find(".quizCreatorBoxText").text(quizes[i]["quizCreator"])
				$(html).find(".quizNameBox").text(quizes[i]["quizName"])
				$(html).attr('onClick', 'take_quiz('+quizes[i]["qKey"]+');')
				$(html).find(".quizNum").attr("id", quizes[i]["qKey"]);
				$(html).find(".quizCreatorBoxText").attr('onClick', 'users_profile("'+quizes[i]["quizCreator"]+'");');

				(function(tempHtml) { 
					$.post("../api/getMyScore.php", {
						nick : nick,
						quizid : quizes[i]["qKey"],
					}, function(score){
						score = $.parseJSON(score);
						if (score == null) {
							$(tempHtml).find(".recentScore").text("- - - -");
						}
						else{
							$(tempHtml).find(".recentScore").text(score["score"]);
						}
					});
				}(html));

				
				$("#quizList").append(html);
			}
		})
	})
	$.getJSON("api/getRecentPlayer.php", function(players){
		$.get("../inc/playerBox.html", function(playerBox){
			for (var i = 0; i < players.length; i++){
				var html = $.parseHTML(playerBox);
				$(html).find(".playerName").text(players[i]['nick']);
				$(html).attr('onClick', 'users_profile("'+players[i]["nick"]+'");');
				$(html).find(".playerPic").prepend("<img class='playerPicPhoto' src="+players[i]["profilePic"]+" />");


				$("#recentPlayers").append(html);
			}

		})
	})

});