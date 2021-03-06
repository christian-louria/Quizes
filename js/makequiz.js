$(document).on("click", "#addQuiz", function(){
	if (nick == null) {
		$("#makeQuizError").text("Must log in to create a quiz");
	}
	else{
		var $form = $(this).parent().parent().parent().parent().children();
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
			var $form = $(this).parent().parent().parent().parent().children();
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


$(document).on("click", "#addQuestion", function(){
	var $form = $( this ).parent().parent().parent().parent().children();
	question = $form.find( "input[name='question']" ).val(),
	q1 = $form.find( "input[name='q1']" ).val();
	q2 = $form.find( "input[name='q2']" ).val();
	q3 = $form.find( "input[name='q3']" ).val();
	q4 = $form.find( "input[name='q4']" ).val();
	q1hint = $form.find( "input[name='q1hint']" ).val();
	q2hint = $form.find( "input[name='q2hint']" ).val();
	q3hint = $form.find( "input[name='q3hint']" ).val();
	q4hint = $form.find( "input[name='q4hint']" ).val();

	answer = $form.find( 'input[name=q]:checked').attr("id");
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
		q1hint: q1hint,
		q2hint: q2hint,
		q3hint: q3hint,
		q4hint: q4hint,
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


$(document).on('click', '.deleteQuestion', function(){
	questkey = $(".deleteQuestion").attr("id")
	$.post("api/deleteQuestion.php", {
		questkey : questkey
	})

	var quizid = $(".quizId").attr("id")
	
	quiz_page(parseInt(quizid));
})

$(document).on("click", "#tobbleHints", function(){
	$(".hintWidth").show()
})


$(document).on("click", ".updateQuestion", function(){
	questkey = $(".updateQuestion").attr("id")
	var $form = $( this ).parent().parent().parent().parent().children();
	let question = $form.find( "input[name='question']" ).val();
	let q1 = $form.find( "input[name='q1']" ).val();
	let q2 = $form.find( "input[name='q2']" ).val();
	let q3 = $form.find( "input[name='q3']" ).val();
	let q4 = $form.find( "input[name='q4']" ).val();

	let q1hint = $form.find( "input[name='q1hint']" ).val();
	let q2hint = $form.find( "input[name='q2hint']" ).val();
	let q3hint = $form.find( "input[name='q3hint']" ).val();
	let q4hint = $form.find( "input[name='q4hint']" ).val();

	let answer = $form.find( 'input[name=q]:checked').attr("id")

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
		q1hint: q1hint,
		q2hint: q2hint,
		q3hint: q3hint,
		q4hint: q4hint,
	}, function(hi){

		var quizid = $(".quizId").attr("id")
		
		quiz_page(parseInt(quizid));
	})
}
})