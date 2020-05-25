console.log('Test ok');

(function() {
	'use strict';

	/* code van instructiebutton & window */
	let modal = document.getElementById('pop1');
	let instructionForm = document.getElementById('instruction__form');
	let btnInstructie = document.getElementById('btnInstructie');
	let btnBegrepen = document.getElementById('btnOk');
	let modalLost = document.getElementById('pop2'); /* code van lost window*/

	// code voor een geluidje als er geklikt wordt op een kaart.
	let dir = './resources/sounds/';
	let playlist = [ 
	'3f', 
	'2c', 
	'3g',
	'2d',
	'4d',
	'3a',
	'2a',
	'4f'
	];

	// niet eigen-code: voor geluidjes **
	let playlistIndex = 0;
	let ext = '.wav';
	let audio = new Audio();


	// code spel in grote lijnen geïnspireerd op bron***
	let cards = document.querySelectorAll('.card');
	let hascardtwisted = false;
	let firstcard, secondcard;
	let lockboard = false;
	let STEPS = 18;
	let counter = document.querySelector('.steps');



	// functie dat de hide instructie modal aanmaakt
	function hideModal(){
		modal.classList.add('hide-modal');
	}

	// functie, wanneer er op de instructie button geklikt wordt
	btnInstructie.addEventListener('click', function(){
		modal.classList.remove('hide-modal');

	}); 

 	//hide instructie window  
 	btnBegrepen.addEventListener('click', function(){
 		hideModal();
 	});


 	// functie flipcard 
 	let flipcard = function() {
 		if (lockboard === true) return;	
 		if (this === firstcard) return;

 		this.classList.add('flip')

 		if(!hascardtwisted) 
 		{
		// eerste click
		hascardtwisted = true;
		firstcard = this;

		return;
	}

	else 
	{
	// tweede click
	secondcard = this;
	checkMatch();
}
}


let checkMatch = function () {

	countMoves();

	//match kaarten
	let match = (firstcard.dataset.subject === secondcard.dataset.subject)
	
	match ? cardsDisable() : cardsUnflip();

}

let cardsDisable = function () {
		// match: true
		firstcard.removeEventListener('click', flipcard);
		secondcard.removeEventListener('click', flipcard);
		secondcard.classList.add('match');
		firstcard.classList.add('match');

		ResetBoard();		

	}


	let cardsUnflip = function () {
		lockboard = true;

		setTimeout(() => {
	// geen match
	firstcard.classList.remove('flip');
	secondcard.classList.remove('flip');
	ResetBoard();

}, 900);
	}

	// vastklikken van de gematchte kaarten
	let ResetBoard = function () {

		[hascardtwisted, lockboard ] = [false, false];
		[firstcard, secondcard ] = [null, null];
	}

	let Newgame = function () {		
		cards.forEach(card => {

			let rnd = Math.floor(Math.random() * 16);
			card.style.order = rnd;
		});
	}

	// nieuw spel button
	btnRandom.addEventListener('click' , function() {
		location.reload();
	});

	window.addEventListener('load', function() {
		Newgame();


	});

	let countMoves = function() {
		STEPS--;
		counter.innerHTML = ('Aantal clicks: ' + STEPS);

		if (STEPS == 0)              
			modalLost.classList.add('popup');
		
	}


	cards.forEach(card =>  card.addEventListener('click', flipcard))


	/* klikfunctie: geluidje telkens er op een kaartje geklikt wordt*/
	cards.forEach(card =>  card.addEventListener('click', function() {

    	// niet eigen code**
    	if(playlistIndex == (playlist.length - 1)){
    		playlistIndex = 0;
    	} else {
    		playlistIndex++;	
    	}
    	audio.src = dir+playlist[playlistIndex]+ext;
    	audio.play();



    }));
	

})();

/* 
bronnen:
** https://www.developphp.com/video/JavaScript/Audio-Playlist-Array-Tutorial
*** https://www.freecodecamp.org/news/vanilla-javascript-tutorial-build-a-memory-game-in-30-minutes-e542c4447eae/?source=rss----336d898217ee---4
**** https://www.w3schools.com/howto/howto_css_flip_card.asp 

*/

