export function changeButtonText (charactersToCompare, button) {
    if (charactersToCompare.length <= 2) {
        if (button.text == 'compare character') {
            button.text = 'not compare this character'
        } else {
            button.text = 'compare character'
        }
    }   
}

export function createCharImg (character) {
        let characterData = data.character[0].results
        let charToDisplay = characterData.find((id) => id.id == charId)
        let charListImg = document.createElement('li')
        charListImg.className = 'roundSmallImg'
        charListImg.style.backgroundImage = `url('${charToDisplay.image}')`
        charList.appendChild(charListImg)   
}

export function compareCharacters (charactersToCompare, domElements, character, data) {

    if (charactersToCompare.length >= 3) {
        alert('no puede comparar mas de 3 personajes')
    } else {
        let charInArray = charactersToCompare.find((char) => char == character)
    if (charInArray) {
        charactersToCompare.splice(charactersToCompare.indexOf(charInArray), 1)
    } else {
        charactersToCompare.push(character)
        
        let charImgDiv = document.createElement('img')
        charImgDiv.className = 'circle responsive-img smallImg'
        charImgDiv.src = `https://rickandmortyapi.com/api/character/avatar/${character}.jpeg` 
        domElements.charContainer[0].appendChild(charImgDiv)
    }
    
    let charToDisplay = []
    charactersToCompare.forEach((character) => {
        let charToCompare = data.results.find((i) => i.id == character)
        charToCompare ? charToDisplay.push(charToCompare) : console.log('error en el ternario')
              
    });

    domElements.charContainer[0].onclick = () => {
    domElements.mainContainer.innerHTML = ''
    let row = document.createElement('div')
    domElements.mainContainer.appendChild(row)
    row.className = 'row'
    charToDisplay.forEach((character) => {
        let div = document.createElement('div')
        div.className = 'col s3'
        div.innerHTML = 
        ` <div class="card">
            <div class="card-image">
                <img src='${character.image}' alt='Imagen de ${character.name}' />
            </div>
                <div class="card-content">
                    <span class=card-title">${character.name}</span>
                    <p>Status: ${character.status}</p>
                    <p>Gender: ${character.gender}</p>
                    <p>Species: ${character.species}</p>
                    <p>Origin: ${character.origin.name}</p>
                    <p>Last known location: ${character.location.name}</p>  
                </div>
            </div>
        </div>
        `
       
        row.appendChild(div)
        

    })  
    
    let clearCompareButton = document.createElement('button')
    clearCompareButton.className = 'btn'
    clearCompareButton.innerText = 'Clear Selection'
    row.appendChild(clearCompareButton)

    clearCompareButton.onclick = () => {
        charToDisplay = []
        row.innerHTML = ''
        domElements.charContainer[0].innerHTML = ''
    }

    }

    }   

}