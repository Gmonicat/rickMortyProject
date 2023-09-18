const dataCharacters = []

export function displayCharacters(subpageData,domElements){
    console.log("iniciando display characters")
    console.log(domElements.mainContainer)
    let arrayToDisplay=""
    for (var i = 0; i < subpageData.length;i++){
        let character = subpageData[i]
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
                        <p>Number of episodes seen: ${character.episode.length+1}</p>
                    </div>
                    <div class="card-action">
                            <a class = "compareButton" target="${character.id}" >compare characteres</a>
                    </div>
                </div>
            </div>
        `
    }

    let elementtoDisplay = document.createElement("div")
    elementtoDisplay.className = "row"
    elementtoDisplay.innerHTML = arrayToDisplay
    domElements.mainContainer.appendChild(elementtoDisplay)

        
}