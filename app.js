//checkboxes: name="choice"
//number entry: name="amount".

//for 12 input type=number calculations
var multiplierList = {amountNegTwo: "-2", amountNegOne: "-1", amountOne: "1", amountTwo: "2"};

var scoreResult = {
  jeepMaster: {
    title: "King of the Jeeps",
    desc: "You push your Jeep to the limits everyday! Whether it be down trees, rocks or water, nothing can stand in your way of getting from point A to point B as you make short work of any terrain in front of you. Every ding, dent and scratch is a badge of honor you wear proudly.",
    pic: "http://www.cjponyparts.com/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/k/c/kc91313_7.2685.jpg"
  },
  jeepRock: {
    title: "Jeep Rock-Crawling Expert",
    desc: "You and your fellow Jeep buddies take your Jeeps to the steepest mountains with the biggest rocks and see who can make it to the top of the hill. You’ve helped each other get your Jeeps right-side-up after a tumble down the hill. You’re prepared to make quick repairs to your Jeep, whether it is with Duct tape or quick welds, just so you can keep trying to get to the top of the hill.",
    pic: "http://www.cjponyparts.com/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/h/l/hla110_4.2616.jpg"
  },
  jeepOffroad: {
    title: "Jeep Off-Roading Guide",
    desc: "On weekends you find yourself with your Jeep buddies riding the trails and exploring the unknown. You mainly drive with the top and doors off, whether running errands or on the trails. A little mud or water doesn’t bother you at all.",
    pic: "http://www.cjponyparts.com/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/1/1/1123226_2.2612.jpg"
  },
  jeepTrail: {
    title: "Jeep Trail Rider",
    desc: "You added some accessories to your Jeep that aren’t found on other SUVs. Even though your Jeep may be clean, you occasionally enjoy driving it with the top or doors off. Sometimes you’ll take the path less traveled and explore some dirt roads.",
    pic: "http://www.cjponyparts.com/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/k/c/kc366_2.2685.jpg"
  },
  jeepDaily: {
    title: "Jeep Daily Driver",
    desc: "You use your Jeep to get to and from work or to shuffle the family around on weekends. It’s kept clean and rarely leaves asphalt except for the occasional gravel driveway. The only difference between you and drivers of other SUV models, is the fact that you’re driving a Jeep.",
    pic: "http://vibemotorsports.com/store/image/data/wheels/xo/tokyo/matte-black/jeep/jeep-grand-cherokee-xo-tokyo-matte-black-wheels-01.jpg"
  }  
};

function displayScore(result, score) {
  $("#score").text(score);
  $("#jeepTitle").text(result.title);
  $("#explanation").text(result.desc);
  $("#resultPic").prop("src", result.pic)
  $(".twitter").prop("href", "https://twitter.com/intent/tweet?text=I am a " + result.title + " based on CJ's Jeep Score Calculator. Check out cjponyparts.com to find your Jeep score.");
}

$(document).ready(function() {
  //calculates the score
  function getScore(){
    var score = 0;
    var explanation = "";
    var twitter = "https://twitter.com/intent/tweet?text=";

    //calculates the score from the checkboxes
    $("input[type=checkbox]:checked").each(function() {
      score += parseInt($(this).attr("value"));
    });

    //calculates the score from the selection boxes
    $("select :selected").each(function() {
      score += parseInt($(this).val());
    });

    //calculates the score from number input boxes
    $("input[type=number]").each(function() {
      var multiplier = $(this).attr("name");
      var num = $(this).val();
      if (num == "") {
        num = 0;
        $(this).val(num);
      }
      score += parseInt(multiplierList[multiplier]) * parseInt(num);
    }); 
    
    if (score < 0){
      displayScore(scoreResult.jeepDaily, score);      
    } 
    else if (score >= 0 && score <= 50) {
      displayScore(scoreResult.jeepTrail, score);      
    }
    else if (score > 50 && score <=100) {
      displayScore(scoreResult.jeepOffroad, score);
    }
    else if (score > 100 && score <= 150) {
      displayScore(scoreResult.jeepRock, score);
    }
    else if (score > 150 ) {
      displayScore(scoreResult.jeepMaster, score);
    }
  } //end of getScore
    
  //user clicked a checkbox
  $("input[type=checkbox]").change(function() {
    getScore();
  });  
  //user seleted an option from the drop down
  $("select").change(function() {
    getScore();
  });  
  //user entered a number
  $("input[type=number]").change(function() {
    getScore();  
  });  
  //disables mousewheel spinning on number input
  $("input[type=number]").on("focus", function(e) {
    $(this).on("mousewheel.disableScroll", function(e) {
      e.preventDefault();
    })
  });
});


//Previous and Next Button functionality
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties to animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
	
	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
	
	//show the next fieldset
	next_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({
        'transform': 'scale('+scale+')',
        'position': 'absolute'
      });
			next_fs.css({'left': left, 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});
