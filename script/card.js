function addCard(cardTitle,cardContent){

    let cardsContainer = document.getElementById("cardsContainer");




    let cardElement = document.createElement('div');
    cardElement.className = "col s12 m6 l4 xl card custom-card"
    cardElement.innerHTML= `
    <div class="cardTitle">
        <h1 class="textTitle1">${cardTitle}</h1>
    </div>
    <div class="cardContent">
        <p>${cardContent}</p>
    </div>
    </div>
`

    cardsContainer.appendChild(cardElement)
}
export{addCard};

