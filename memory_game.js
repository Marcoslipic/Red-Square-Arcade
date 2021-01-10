const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard, secondCard;


cards.forEach(card => card.addEventListener('click', flipCard))

function flipCard(){
    this.classList.toggle('flip');
    
    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
    } else {
        hasFlippedCard = false;
        secondCard = this;

        if(firstCard.dataset.framework === secondCard.dataset.framework){
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
        } else {
            setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
        }, 1500)
    }
}
}

setTimeout(function(){location.reload()}, 5000)