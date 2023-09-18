let charactersToCompare = []

    async function getLastSeenEp (episodeUrl) {
        const response = await fetch(`${episodeUrl}`)
        const json = await response.json()
        return json
    }

export async function displayCharacters(subpageData,domElements){
    let arrayToDisplay = ""
    domElements.mainContainer.innerHTML = ''
    console.log(arrayToDisplay)

    for (var i = 0; i < subpageData.length;i++){
        let character = subpageData[i]
        let lastSeenEpisode = await getLastSeenEp(character.episode[character.episode.length-1])
        console.log(lastSeenEpisode)

        let data = lastSeenEpisode.result
        console.log(data)
        arrayToDisplay += ` 
            <div class="col s3">
                <div class="card">
                    <div class="card-image">
                        <img src='${character.image}' alt='Imagen de ${character.name}' />
                    </div>
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
            </div>
        `

        let compareButton =  Array.from(document.getElementsByClassName('compareButton'))
        compareButton.forEach((button) => {
        button.onclick = () => {
           let charInArray = charactersToCompare.find((char) => char == button.target)
           charInArray ? charactersToCompare.splice(charactersToCompare.indexOf(charInArray), 1) : charactersToCompare.push(button.target)
           console.log(button.target)
           createCharImg(button.target)
           compareButton.innerText = 'not compare this character'
     }
    })

    }

    console.log(arrayToDisplay)
    let elementtoDisplay = document.createElement("div")
    elementtoDisplay.className = "row"
    elementtoDisplay.innerHTML = arrayToDisplay
    domElements.mainContainer.appendChild(elementtoDisplay)

        
}