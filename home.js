export let displayHome = (pages,domElements) => {


    for (let prop in pages) {

        let text
        let positionClass
        let delayClass

        if (prop == 'character') {
            text = 'All the series character info';
            positionClass = 'col m3 offset-m8 s6 offset-s4'
        } else if (prop == 'episode') {
            text = 'Lalalalala';
            positionClass = 'col m3 offset-m1 s6'
            delayClass = 'delay-1'
        } else if (prop == 'location') {
            text = 'Planets, dimensions and more';
            positionClass = 'col m3 offset-m5 s6 offset-s5'
            delayClass = 'delay-2'  
        } else if (prop == 'home'){
            continue
        } else {
            console.log('error en el if')
        }
    
        //armo la fila y el html de cada categoria
        let row = document.createElement('div')
        row.className = 'row'
        row.innerHTML = `
        <div class="${positionClass}">
                <div class="flip-card square-container">
                    <div class="flip-card-inner">
                        <div class="flip-card-front round-border neon-border valign-wrapper ${delayClass}">
                            <h2 class="h2-resized center-align">${prop}</h2>
                        </div>
                        <div class="flip-card-back round-border neon-border">
                            <p class="center-align small-text">${text}.</p>
                            <a class="goToButton" target="${prop}">Go!</a>
                        </div>
                    </div>
                </div>
            </div>`
        //let main = domElements.mainContainer
        //console.log(domElements.mainContainer)
        main.className = 'x-space-evenly'
        domElements.mainContainer.appendChild(row);
    }
}