const dataEpisodes = []


export function displayEpisodes(subpageData,domElements){
    console.log("iniciando display episodes")
    console.log(domElements.mainContainer)
    let arrayToDisplay=""
    for (var i = 0; i < subpageData.length;i++){
        let episode = subpageData[i]
        arrayToDisplay +=  ` <div class>
        <h4 class="heading">${episode.name}</h4>
        <p class="dateTime">${episode.air_date}</p>
        <h5 class="heading">${episode.episode}</h5>
        <button class="btn" value="${episode.id}"  >INFO</button>
    `

    }

    let elementtoDisplay = document.createElement("div")
    elementtoDisplay.className = "episodeCard"
    elementtoDisplay.innerHTML = arrayToDisplay
    domElements.mainContainer.appendChild(elementtoDisplay)
        
}


// const tools = {
// displayEpisodeDetails:()=>{
//     domElements.detailsCharacters.addEventListener('click', async (e) => {
       
       
//        let pageToDisplay = e.target
//        if (!pageToDisplay) {
//        } else {
//         domElements.episodeContainer = document.getElementsByClassName('')

//        tools.updateScreen(subpageToDisplay,lastSubPg,pageToDisplay)
//         }
       


//         if (e.target && e.target.classList.contains("btn")) {
//             // Se hizo clic en un botón "INFO" dentro de cualquier elemento
//             // que cumple con el selector ".btn"
            
//             const btn = e.target;
            
//                 let episodes = pages.episode.data.results;
//                 const episode = episodes.find((episode) => episode.id === parseInt(btn.value));
                
//                 if (episode) {
//                     const characterData = await Promise.all(episode.characters.map((characterUrl) =>
//                         fetch(characterUrl).then((response) => response.json())
//                     ));
            
//                     renderEpisodesDetails(characterData, episode);
//                 }
            
//         }


//        })
//     }
// }












