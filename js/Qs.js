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
$.getScript("js/signin.js");

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
});