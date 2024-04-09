// Definição do Construtor
const state = {

   // Vistas associadas com as classes de CSS
    view: {
        squares: document.querySelectorAll(".square"),        
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score'),
        live: document.querySelector('#lives'),
    },

    // Valores associadas com as classes de CSS
    values: {
        timerId: null,
        countDownTimerId: null,        
        gameVelocity: 1000,
        gameTime: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        currentLive: 5,
    },    
};


// Função de Conta Regresiva do tempo do jogo.
function countDown(){    
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0){ 

        clearInterval(state.values.countDownTimerId);
        clearInterval(state.values.timerId);        
        state.values.currentLive--;
        //state.view.live.textContent = `x${state.values.currentLive}`;//
        state.view.live.textContent = state.values.currentLive;


        if(state.values.currentLive <= 0){ 
            gameOver();
        } else {
            playSound("die");
            endSwal();
        }        
    }
}


// Função de Continuação do jogo.
function continueGame(){  
    state.values.currentTime = 60;
    state.view.timeLeft.textContent = state.values.currentTime;
    state.values.timerId = null;
    state.values.countDownTimerId = null;
    state.values.result = 0;
    state.view.score.textContent = state.values.result;
    
    moveEnemy();
    countTime();
}


// Função de sons do jogo.
function playSound(nomeAudio) {
    let audio = new Audio(`./src/sounds/${nomeAudio}.mp3`);
    audio.volume = 0.4;
    audio.play();
}


// Função movimento Aleatoria do enemigo
function randomSquare(){    
    state.view.squares.forEach((square) => {
        square.classList.remove('enemy');
    });

    let randomNumber = Math.floor(Math.random()*9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add('enemy');
    state.values.hitPosition = randomSquare.id;
}


function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}


function countTime(){    
    state.values.countDownTimerId= setInterval(countDown, state.values.gameTime);   
}


// Função de escuta que espera por uma ação.
function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener('mousedown', () => {
            if(square.id === state.values.hitPosition){
                state.values.result += 100;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
        });
    })
}

// Função de finalizaçaõ do jogo.
function gameOver(){
    var imageUrl='./src/images/gameover2.png';
    playSound("gameover");
    swal({
      title: 'Game Over, Good Job!',
      text: 'Yours Points Was -> ' + state.values.result,
      icon: imageUrl
    })
    .then(()=>{
        window.location.reload();
    })
  }


// Função de finalizaçaõ do tempo.
function endSwal(){
    var imageUrl='./src/images/time2.png';
    /*playSound("die");*/
    swal.fire({
      title: 'Oops, Your Time is Finish, Play Again!',
      text: 'Yours Points Was -> ' + state.values.result,
      icon: imageUrl
    })
    .then(()=>{
        continueGame();
    })
  }

  
// Função Principal do App.
function main(){
moveEnemy();
countTime();
addListenerHitBox();
}

// Corpo de App.
main();