$(document).on("click", "#selectorModalButton", function(){
	getPicModal()
})



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


$(document).on("mouseenter", "#picContainer", function(){
		$(".hideChangeButton").show();
	})



	$(document).on("mouseleave", "#picContainer", function(){
		$(".hideChangeButton").hide();
	})

	$(document).on("click", "#editBioButton", function(){

		var bio = $("#myBio").text();
		$("#myBio").hide();
		$.get("../inc/bioBox.html", function(bioBox){
			var bioBox = $.parseHTML(bioBox);
			$(bioBox).find("#bioEdit").val(bio);
			$("#editBioContainer").html(bioBox);
		})
	})

	$(document).on("click", "#saveBioButton", function(){
		var newBio = $("#bioEdit").val();
		$.post("../api/updateBio.php", {
			newBio : newBio,
			nick : nick
		});
		$("#editBioContainer").empty()
		$("#myBio").text(newBio);
		$("#myBio").show();
	})