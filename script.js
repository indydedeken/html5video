var video = document.getElementById("video");

function blueBG() {
	$('.container').css("background", "#0099CC");
}

function blackBG() {
	$('.container').css("background", "#000000");
}

function getSpeed() {
	document.getElementById("vitesse").innerHTML = video.playbackRate;
}

function faster() {
		var video = document.getElementById("video");
		var speed = video.playbackRate;
		
		if(speed <= 1.5) {
			video.playbackRate += 0.5;
			$('#log').append("Plus vite !<br />");
		}
		getSpeed();
		return false;
}

function slower() {
	var video = document.getElementById("video");
	var speed = video.playbackRate;
	
	if(speed >= 0.5) {
		video.playbackRate -= 0.5;
		$('#log').append("Plus lentement !<br />");
	}
	getSpeed();
	
	return false;
}

function defaultSpeed() {
	var speed = video.playbackRate;
	video.playbackRate = 1;
	if(speed != 1) {
		getSpeed();
		$('#log').append("Retour à la vitesse normal.<br />");
	}
}

function getMark() {
	if(typeof localStorage!='undefined' && localStorage.length > 0) {
		$('#log').append("Retour au marqueur<br />");
		video.currentTime = localStorage.getItem('mark');
	}
}

$(function() {

	var video = document.getElementById("video");
	//initialisation de la vitesse (pas automatiquement sur Firefox12)
	video.playbackRate = 1;
	
	/* chargement de la video : uniquement FF */
	video.addEventListener("load", function() {
		$("#log").append("Chargement de la vidéo...<br />");
	});
	
	/* lecture */ 
	video.addEventListener("play", function() {
		blackBG();
		$("#log").append("Démarage de la lecture<br />");
	});
	
	/* pendant la lecture */
	video.addEventListener("playing", function(){
		blackBG();
		$("#log").append("lecture...<br />");
	});

	/* pause */
	video.addEventListener("pause", function() {
		var speed = video.currentTime.toFixed(2);
		
		document.getElementById("pause").innerHTML = speed;
		//alert("Vous en êtes à " + video.currentTime.toFixed(2) + " sec.");
		blueBG();
		$("#log").append("Pause de la vidéo (" + speed + ")<br />");
	});
	
	/* a la fin de vidéo */
	video.addEventListener("ended", function() {
		document.getElementById("pause").innerHTML = 0;
		blueBG();
		$('#log').append("Voilà, c'est fini !<br />");
	});
	
	$("#mark").click(function() {
		var instant = video.currentTime;
		
		if(typeof localStorage!='undefined') {
			localStorage.setItem('mark', instant);
			$("#instant").css("display", "inline-block");
		}
	});
	
	/* barre de chargement */
	video.addEventListener('timeupdate', function() {
		var position = parseInt((video.currentTime/video.duration)*100);
		$("#timeline").attr("value", position);
	});
	
	document.getElementById("timeline").addEventListener('click', function() {
		var pos = event.offsetX/event.target.clientWidth;
		video.currentTime = pos*video.duration;
	});
});