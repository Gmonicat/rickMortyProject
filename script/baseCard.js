function displayCards(subpageData,domElements){
    
    
    let cardsContainer = document.createElement('div');
    cardsContainer.className = "cardsContainer";
    domElements.mainContainer.appendChild(cardsContainer);

    let title
    let content1
    let content2
    let content3
    let content4
    let content

    for (let i = 0; i < subpageData.length;i++){
        
        title = subpageData[i].name
        content1 = subpageData[i].dimension
        content2= subpageData[i].type
        content3= subpageData[i].residents
        content4=subpageData[i].created
        content = `<p style="margin-bot:20px;">${content1}</p> <p>${content2}</p>  <p>${content3.length}</p> <p>${content4}</p>`
        addCard(title,content,cardsContainer)

    }   
}

function addCard(cardTitle,cardContent,cardsContainer){

    let cardElement = document.createElement('div');
    cardElement.className = "col s12 m8 l4 xl card custom-card"
    cardElement.innerHTML= `
    <div class="cardTitle">
        <h1 class="textTitle1">${cardTitle}</h1>
    </div>
    <div class="cardContent" style="display:flex;flex-direction:column; ">${cardContent}

    </div>
    </div>
`

    cardsContainer.appendChild(cardElement)
}
export{addCard,displayCards};

