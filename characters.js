let charactersToCompare = []

    async function getLastSeenEp (episodeUrl) {
        const response = await fetch(`${episodeUrl}`)
        const json = await response.json()
        return json
    }

export async function displayCharacters(subpageData,domElements){
    let arrayToDisplay = ""
    domElements.mainContainer.innerHTML = '<div class="charactersContainer"></div>'
    
    
    for (var i = 0; i < subpageData.length;i++){
        let character = subpageData[i]
        let lastSeenEpisode = await getLastSeenEp(character.episode[character.episode.length-1])
        let characterImageUrl = character.image;
        let characterName = character.name
        let data = lastSeenEpisode.result
        let characterImgDivisor

        if(i==0 ||i==5|| i==10 || i==15){
            characterImgDivisor = `<div class="cardImage" style="height:200px;background-image: url('${characterImageUrl}');background-size:cover;background-position:center;margin-left:0">
        </div>`
            arrayToDisplay += `
            <div id="card" class="col s6 m3 l2 offset-s4">
                    ${characterImgDivisor}
                    <div class="card-content">
                        <span class=card-title">${character.name}</span>
                        <p>${character.status} - ${character.gender}</p>
                        <p>Last known location: ${character.location.name}</p>
                        <p>Last seen in episode: ${lastSeenEpisode.name}</p>
                    </div>
                    <div class="card-action">
                            <a class = "compareButton" target="${character.id}" >compare characteres</a>
                    </div>
            </div>
        `
        }else{
            characterImgDivisor = `<div class="cardImage" style="height:200px;background-image: url('${characterImageUrl}');background-size:cover;background-position:center">
        </div>`
            arrayToDisplay += `
            <div id="card" class="col s6 m3 l2">
                    ${characterImgDivisor}
                    <div class="card-content">
                        <span class=card-title">${character.name}</span>
                        <p>${character.status} - ${character.gender}</p>
                        <p>Last known location: ${character.location.name}</p>
                        <p>Last seen in episode: ${lastSeenEpisode.name}</p>
                    </div>
                    <div class="card-action">
                            <a class = "compareButton" target="${character.id}" >compare characteres</a>
                    </div>
            </div>
        `
        }


    
        
        
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