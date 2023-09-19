let charactersToCompare = []

    async function getLastSeenEp (episodeUrl) {
        const response = await fetch(`${episodeUrl}`)
        const json = await response.json()
        return json
    }

export async function displayCharacters(subpageData,domElements){
    let arrayToDisplay = ""
    domElements.mainContainer.innerHTML = ''
    console.log(subpageData)
    for (var i = 0; i < subpageData.length;i++){
        let character = subpageData[i]
        let lastSeenEpisode = await getLastSeenEp(character.episode[character.episode.length-1])        
        let characterImageUrl = character.image;
        let characterName = character.name
        let data = lastSeenEpisode.result
        let characterImgDivisor
        let content
       /* let cardsContainer = document.createElement('div');
        cardsContainer.className = "cardsContainer";
        domElements.mainContainer.appendChild(cardsContainer);

        content = `<span style="margin-bot:20px;">${character.name}</span> 
                    <p>${character.status} - ${character.gender}</p>  
                    <p>${character.location.name}</p> 
                    <p>${lastSeenEpisode.name}</p>
                    <a class = "compareButton" target="${character.id}" style="background:black;height:100%;width:100%;" > Compare Character </a>
                    `

        addCard(character.name,content,cardsContainer,characterImageUrl)*/

        characterImgDivisor = `<div class="cardImage" style="height:200px;background-image: url('${characterImageUrl}');background-size:cover;background-position:center">
        </div>`
            arrayToDisplay += `
            <div id="card" class="col s6 m3 l2" style="height:100%;">
                    ${characterImgDivisor}
                    <div class="card-content" style="background:red;display:flex;flex-direction:column;justify-content:center;align-items:center;">
                        <span class=card-title">${character.name}</span>
                        <p>${character.status} - ${character.gender}</p>
                        <p>Last known location: ${character.location.name}</p>
                        <p>Last seen in episode: ${lastSeenEpisode.name}</p>
                    </div>
                    <div class="card-action">
                            <a class = "compareButton" target="${character.id}" style="background:black;height:100%;width:100%;" > Compare Character </a>
                    </div>
            </div>
        `



    
        
        
        let compareButton =  Array.from(document.getElementsByClassName('compareButton'))
        compareButton.forEach((button) => {
        button.onclick = () => {
           let charInArray = charactersToCompare.find((char) => char == button.target)
           charInArray ? charactersToCompare.splice(charactersToCompare.indexOf(charInArray), 1) : charactersToCompare.push(button.target)
           createCharImg(button.target)
           compareButton.innerText = 'not compare this character'
     }
    })

    }

    let elementtoDisplay = document.createElement("div")
    elementtoDisplay.className = "row"
    elementtoDisplay.innerHTML = arrayToDisplay
    
    domElements.mainContainer.appendChild(elementtoDisplay)
    let cardImage = document.getElementsByClassName('card-image')
        console.log(cardImage)
        
        cardImage.forEach((img)=>{
            cardImage.style.backgroundImage()
        })
        
}   

function addCard(cardTitle,cardContent,cardsContainer,image){
    //style="height:200px;"
    let cardElement = document.createElement('div');
    cardElement.className = "col s12 m8 l4 xl";
    cardElement.classList.add('card2')

    cardElement.innerHTML= `
    <div class="cardTitle2">
        <h1 class="textTitle1">${cardTitle}</h1>
    </div>
    <div class="cardContent2" style="display:flex;flex-direction:column; ">${cardContent}

    </div>
    </div>
`

    cardsContainer.appendChild(cardElement)
}