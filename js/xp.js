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
	console.log(incLevel);
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
