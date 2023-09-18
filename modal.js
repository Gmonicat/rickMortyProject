export function createModal (domElements) {
let charModal = document.createElement('div')
charModal.className = 'modal light-green-text'
charModal.id = 'modalChar'
charModal.innerHTML = `
    <div class="modal-content" id='modal-content'>
        <h4>Character Compare</h4>
        <div class="row">
            <div class="col s12">
                <table class="responsive-table" id="charTable">
                    <thead>
                        <tr>
                            <th>Character</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Gender</th>
                            <th>Origin</th>
                            <th>Species</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat" id="clearCharButton">Clear</a>
        <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
    </div>
`
//esto inserta el modal

console.log(domElements.charContainer)
domElements.charContainer[0].appendChild(charModal)
let charTableBody = document.createElement('tbody')
charTableBody.id = 'charTableBody'
let charTable = document.getElementById('charTable')
charTable.appendChild(charTableBody)
domElements.charContainer.appendChild('a')

}

export let compareCharacters = () => {
        
        console.log(charactersToCompare)

        if (charactersToCompare.length == 0) {
            charModal.innerHTML = `
            <div class="modal-content" id='modal-content'>
            <h4>Nothing here to compare!</h3>
            </div>`
        } else {

        charTableBody.innerHTML = ''
        let characterData = data.character[0].results
        charactersToCompare.forEach((character) => {
            let charToCompare = characterData.find((id) => id.id == character)
            let charTableRow = document.createElement('tr')
            charTableRow.innerHTML = `
                <td class="smallCharImg"> Aca va la imagen</td>
                <td>${charToCompare.name}</td>
                <td>${charToCompare.status}</td>
                <td>${charToCompare.gender}</td>
                <td class="originCell" >${charToCompare.origin.name}</td>
                <td>${charToCompare.species}</td>
        `
        // if (charToCompare.origin.name != 'unknow') {
        //     let originCell = document.getElementsByClassName('originCell')
        //     console.log(originCell)
        //     let locationLink = document.createElement('a')
        //     locationLink.href = `${charToCompare.origin.link}`
        //     locationLink.innerText = '>'
        //     originCell.appendChild(locationLink)

        // }
        
            // let charImg = document.getElementsByClassName('smallCharImg')
            // console.log(charImg)
            // charImg.style.backgroundImage = `url('${charToCompare.image}')`
            // console.log(charTableRow)
            
            charTableBody.appendChild(charTableRow)
        
    })
}

}

// //logos de personajes para mostrar
// let charList = document.getElementById('charList')
// console.log(charList)

// let createCharImg = charId => {
//         let characterData = data.character[0].results
//         let charToDisplay = characterData.find((id) => id.id == charId)
//         let charListImg = document.createElement('li')
//         charListImg.className = 'roundSmallImg'
//         charListImg.style.backgroundImage = `url('${charToDisplay.image}')`
//         charList.appendChild(charListImg)
//         console.log(charList)
    
// }

// let clearChar = () => {  
//     charactersToCompare = []
//     charList.innerHTML = ''
//   }

// let clearCharButton = document.getElementById('clearCharButton')
//     clearCharButton.onclick = () => {
//     clearChar()
// }

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  });
