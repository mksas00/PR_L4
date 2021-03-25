
let preQuestions = null;

fetch('https://quiztai.herokuapp.com/api/quiz')
    	.then(resp => resp.json())
    	.then(resp => {
        	   preQuestions = resp;
                setQuestion(index);
    	});

let next = document.querySelector('.next');
let previous = document.querySelector('.previous');

let question = document.querySelector('.question');
let question_number = document.querySelector('#index');
let answers = document.querySelectorAll('.list-group-item');

let pointsElem = document.querySelector('.score');
let restart = document.querySelector('.restart');
let index = 0;
let points = 0;


function setQuestion(index)
{
	
	
	//question_number.innerText=index+1;
	question.innerHTML=preQuestions[index].question;
	
	answers[0].innerHTML=preQuestions[index].answers[0];
	answers[1].innerHTML=preQuestions[index].answers[1];
	answers[2].innerHTML=preQuestions[index].answers[2];
	answers[3].innerHTML=preQuestions[index].answers[3];
	
	if(preQuestions[index].answers.length === 2)
	{
		answers[2].style.display = 'none';
		answers[3].style.display = 'none';
		
	}
	else
	{
		answers[2].style.display = 'block';
		answers[3].style.display = 'block';
	}
	
	cleanAnswers();
	
}

function cleanAnswers(){
	for (let i=0; i<answers.length; i++){
		answers[i].classList.remove('correct');
		answers[i].classList.remove('incorrect');
	}
}


for (let i = 0; i < answers.length; i++) {
    answers[i].addEventListener('click', doAction);
}

next.addEventListener('click', function(){
	index++;
	if(index>=preQuestions.length)
	{
	list.style.display='none';
	results.style.display='block';
	userScorePoint.innerHTML=points;
	let game = localStorage.getItem('game');
	let average;
	if(game!=null)
	{
		average = localStorage.getItem('average');
		average = (average * game + points) / ++game;
	}
	else
	{
		game =1;
		average=points;
	}
	localStorage.setItem('games',game);
	localStorage.setItem('average',average);
	averageScore.innerHTML=average;
	
	}
	else{
	setQuestion(index);	
	activateAnswers();
	}
})


previous.addEventListener('click', function(){
	if(index>0){
	index--;
	setQuestion(index);

	}
})

function activateAnswers()
{
	for(let i=0;i<answers.length;i++)
	{
		answers.addEventListener('click',doAction)
	}
}

function markCorrect(elem)
{
	elem.classList.add('correct');
}

function markInCorrect(elem)
{
	elem.classList.add('incorrect');
	
}

function disableAnswers()
{
	for(let i=0;i<answers.length;i++)
	{
		answers.removeEventListener('click',doAction)
	}
}


function doAction(event) {
    //event.target - Zwraca referencję do elementu, do którego zdarzenie zostało pierwotnie wysłane.
    if (event.target.innerHTML === preQuestions[index].correct_answer) {
        points++;
        pointsElem.innerText = points;
        markCorrect(event.target);
    }
    else {
        markInCorrect(event.target);
    }
    disableAnswers();
}



restart.addEventListener('click', function (event) {
    event.preventDefault();

    index = 0;
    points = 0;
    let userScorePoint = document.querySelector('.score');
    userScorePoint.innerHTML = points;
    setQuestion(index);
    activateAnswers();
    list.style.display = 'block';
    results.style.display = 'none';
});




