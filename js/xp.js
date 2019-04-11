function showXP(xpperc){
	$("#xp-increase-fx").css("display","inline-block");
	$("#xp-bar-fill").css("box-shadow",/*"0px 0px 15px #06f,*/ "-5px 0px 10px #fff inset");
	setTimeout(function(){
		$("#xp-bar-fill").css("-webkit-transition","all 2s ease");
		$("#xp-bar-fill").css("width",""+xpperc+"%");
	},100);
	setTimeout(function(){$(".xp-increase-glow1").fadeOut(500);
  	$(".xp-increase-glow2").fadeOut(500);
  	$(".xp-increase-glow3").fadeOut(500);
  	},2000);
}

function levelCalculator(xpTotal){
	level = 1;
	return levelRecursion(xpTotal, level);
}

function levelRecursion(xpTotal, level){
	if (xpTotal - (level * 50) < 0) {
		return level
	}
	xpTotal = xpTotal - (level * 50);
	level++;
	return levelRecursion(xpTotal, level)
}

function levelSpill(xpTotal, xpGained){
	return (levelCalculator(xpTotal + xpGained) - levelCalculator(xpTotal))
}

function levelTotalToRecursion(levelLeft, level, xpTo){
	if (levelLeft == 0) {
		return xpTo
	}
	xpTo += level * 50;
	level++;
	levelLeft--;
	return levelTotalToRecursion(levelLeft, level, xpTo)
}

function levelTotalTo(levelLeft){
	xpTo = 0;
	level = 1;
	return levelTotalToRecursion(levelLeft, level, xpTo)
}

function levelPercentage(xpTotal){
	return ((xpTotal - levelTotalTo(levelCalculator(xpTotal) - 1)) /
	 (levelTotalTo(levelCalculator(xpTotal)) - levelTotalTo(levelCalculator(xpTotal) - 1)) * 100)
}

function recusiveXP(spill, xpPerc, xpIncrease, xpAmmount, incLevel, completed){
	if (spill == -1) {
		completed();
		return;
	}
	else if (spill > 0){
		xpStop = 100;
	}
	else {
		xpStop = levelPercentage(xpAmmount + xpIncrease);
	}
	$("#xp-bar-fill").animate({width: ""+xpPerc+"%",boxShadow: "-5px 0px 10px #fff inset"}, {duration : 0, complete : function(){
		incLevel++;
		xpPerc = 0;
		spill--;
		if (spill == -1) {
			
		}
		$("#xp-bar-fill").animate({width : ""+xpStop+"%"}, {duration : 2000, complete : function(){
			if (spill > -1) {
				// $("#confetti").animate({opacity : "1"}, {duration : 1, complete : function(){
				// 	$("#confetti").animate({opacity : "1"}, {duration : 1000, complete : function(){
				// 		$("#confetti").animate({opacity : "0"}, {duration : 200})
				// 	}})
				// }})
				$("#confetti").animate({top : "100%", bottom : "-100%"}, {duration : 3000, complete : function(){
					$("#confetti").animate({top : "-100%", bottom : "100%"} , {duration : 1})
				}})
				$("#account-bar-level").text("Level: " + (incLevel - 1));
				$("#account-bar-next-level").text(incLevel);
			}
			recusiveXP(spill, xpPerc, xpIncrease, xpAmmount, incLevel, completed)
		}
	})
	}
})
}

function increaseXP(xpAmmount, xpIncrease, completed){
	$("#xp-bar-fill").css("box-shadow",/*"0px 0px 15px #06f,*/ "-5px 0px 10px #fff inset");
	$("#xp-increase-fx").css("display","inline-block");
	var xpPerc = levelPercentage(xpAmmount); //Strating percent
	var spill = levelSpill(xpAmmount, xpIncrease);
	var incLevel = levelCalculator(usersXP) + 1;
	recusiveXP(spill, xpPerc, xpIncrease, xpAmmount, incLevel, completed);
}


$(document).on("click", "#blur", function(){
	
	
	$(".xpModalContainer").animate({top : "-610px"}, {duration : 500, complete : function(){
		$(".xpModalContainer").animate({opacity : "1"}, {duration : 1})
		$(".xpModalContainer").hide()
	}})
	
	$("#blur").animate({opacity : "0"}, {duration : 200, complete : function(){
		$("#blur").hide()
	}})


	// un-lock scroll position
	var html = jQuery('html');
	var scrollPosition = html.data('scroll-position');
	html.css('overflow', html.data('previous-overflow'));
	window.scrollTo(scrollPosition[0], scrollPosition[1])
})


$(document).on("click", "#catchupXP", function(){


	$("#catchupXPHider").animate({height : "0px"}, {duration: 1000})
	$("#catchupXP").animate({top : "-70px"}, {duration: 1000, complete : function(){
		$("#catchupXP").hide();
	}})

	

	$.post("../api/getCreatorXp.php", {
		nick : nick,
	}, function(creatorXp){
		creatorXp = JSON.parse(creatorXp);
		
		// lock scroll position, but retain settings for later
		var scrollPosition = [
		  self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
		  self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
		];
		var html = jQuery('html'); // it would make more sense to apply this to body, but IE7 won't have that
		html.data('scroll-position', scrollPosition);
		html.data('previous-overflow', html.css('overflow'));
		html.css('overflow', 'hidden');
		window.scrollTo(scrollPosition[0], scrollPosition[1]);

		$(".xpModalContainer").show()
		$(".xpModalContainer").animate({opacity : "1"}, {duration : 1})
		$(".xpModalContainer").animate({top : "100px"}, {duration : 500})
		$("#blur").show()
		$("#blur").animate({opacity : "1"}, {duration : 200})
		


			var quickP = levelPercentage(usersXP);

			$("#xp-bar-fill").css("box-shadow",/*"0px 0px 15px #06f,*/ "-5px 0px 10px #fff inset");
			$("#xp-bar-fill").animate({width : ""+quickP+"%"}, {duration : 2000});

			$("#xpUp").text("+ "+500);
			$("#account-bar-level").text("Level: " + (levelCalculator(usersXP)));
			$("#account-bar-next-level").text(levelCalculator(usersXP) + 1);

			dropDown(creatorXp)

	})
})

function dropDown(creatorXp){
	$.get("../inc/creatorBox.html", function(creatorBox){
		dropDownRecursion(creatorXp, 0, creatorBox)
	})
}


function dropDownRecursion(creatorXp, index, creatorBox){
	if (index >= creatorXp.length) {
		$(".creatorTotalNumber").animate({top : "100px"}, {duration : 1000, complete : function(){
			increaseXP(usersXP, 500, function(){
				usersXP += 500;
				
					$("#xpToNext").text("To next: " + (levelTotalTo(levelCalculator(usersXP)) - usersXP));
					$("#xpToNext").animate({top : "0px", opacity : "1"}, {duration : 1000});
				
			})	
		}})
		return;
	}
	creatorBoxHTML = $.parseHTML(creatorBox);
	//console.log(creatorXp[index]['quizid'])
	
	
	$(creatorBoxHTML).find(".creatorNick").text(creatorXp[index]['taker']);
	$(creatorBoxHTML).find(".creatorXP").text(creatorXp[index]['xp']);
	$(creatorBoxHTML).find(".creatorQuiz").text(creatorXp[index]['quizName']);
	$(".creatorQuizList").append(creatorBoxHTML);

	$(".creatorTotalNumber").text((parseInt($(".creatorTotalNumber").text()) + creatorXp[index]['xp']))
	$(creatorBoxHTML).animate({opacity : "1", top : "0px"}, {duration : 1000, complete : function(){
		dropDownRecursion(creatorXp, index + 1, creatorBox)
	}})
}





