const dataEpisodes = []

export function displayEpisodes(subpageData, domElements) {

    domElements.mainContainer.innerHTML = "";
    let arrayToDisplay = ""
    for (var i = 0; i < subpageData.length; i++) {
        let episode = subpageData[i]
        arrayToDisplay += ` <div class = "episodeCard">
        <h4 class="heading">${episode.name}</h4>
        <p class="dateTime">${episode.air_date}</p>
        <h5 class="heading">${episode.episode}</h5>
        <button class="btn btnInfo" value="${episode.id}" >INFO</button>
        </div>
        `
    }

    let elementtoDisplay = document.createElement("div")
    elementtoDisplay.className = "episodeContainer"
    elementtoDisplay.innerHTML = arrayToDisplay
    domElements.mainContainer.appendChild(elementtoDisplay)

    let buttonInfo = Array.from(document.getElementsByClassName('btn btnInfo'))
    buttonInfo.forEach((button) => {
        button.onclick = async () => {

            const episode = subpageData.find((episode) => episode.id === parseInt(button.value));

            if (episode) {
                const characterData = await Promise.all(episode.characters.map((characterUrl) =>
                    fetch(characterUrl).then((response) => response.json())
                ));

                renderEpisodesDetails(characterData, episode, domElements);
            }
        }
    });



    function renderEpisodesDetails(characters, episode, domElements) {

        domElements.mainContainer.innerHTML = "";
        domElements.mainContainer.innerHTML =
        `<div class="detailsContainer"> 
            <div class="episodeCard"> 
                 <h4 class="heading">${episode.name}</h4>
                 <p class="dateTime">${episode.air_date}</p> 
                 <h5 class="heading">${episode.episode}</h5>
            </div> 
            <div class="detailsCharacters">
            </div>
        </div> `

        let arrayToDisplay = ""

        for (var i = 0; i < characters.length; i++) {
            let character = characters[i]
            arrayToDisplay += 
            ` <div class = "character">
                <img alt="" class="photoCharacter" src='${character.image}' >
                <p class="subTitles">${character.name}</p>
            </div>
            `
        }

        let elementtoDisplay = document.querySelector(".detailsCharacters");
        elementtoDisplay.innerHTML = arrayToDisplay;

  
        // domElements.mainContainer.appendChild(elementtoDisplay)

        // characters.forEach((item) => {
        //     const itemElement = crearCharacter(item);
        //     domElements.detailsCharacters[0].appendChild(itemElement);
        // });

        // let elementtoDisplay = document.getElementsByClassName("detailsCharacters");
        
        // for (var i = 0; i < subpageData.length; i++) {
        //     let episode = subpageData[i]
        //     arrayToDisplay += ` <div class = "episodeCard">
        //     <h4 class="heading">${episode.name}</h4>
        //     <p class="dateTime">${episode.air_date}</p>
        //     <h5 class="heading">${episode.episode}</h5>
        //     <button class="btn btnInfo" value="${episode.id}" >INFO</button>
        //     </div>
        //     `
        // }
    
    // function crearCharacter(item) {
    //     const itemElement = document.createElement("div");
    //     itemElement.classList.add("character");

    //     itemElement.innerHTML = `
    //         <img alt="" class="photoCharacter" src="${item.image}" >
    //         <p class="subTitles">${item.name}</p>
    //     `;
    //     return itemElement;
    // }



        
    }
}



