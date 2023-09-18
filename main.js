//          ------------- Global Variables ---------------          //

let pages = {
    home:{},
    character: {},
    location: {},
    episode: {}
}

const domElements = {
    pagesContainer: document.getElementsByClassName('headerDivisorLeft1'),
    subPagesOperatorContainer: document.getElementsByClassName('headerDivisorLeft2'),

    subPages: document.getElementsByClassName('subPages'),
    mainContainer: document.getElementById('main'),
    searchInput: document.getElementsByClassName('baseInput'),
    body: document.getElementById('body'),
    logo: document.getElementById('logo'),
    headerContainer: document.getElementById('header'),
    episodeContainer: document.getElementsByClassName("episodeContainer"),
    detailsCharacters: document.getElementsByClassName('detailsCharacters')
}

const subPagesOperators = {
    actualPage: () => {
        for (let element in pages) {

            if (pages[element].isSelected) {
                return pages[element].name;
            }
        }
    },
    subPagesCap: 6
}

//          ------------- Classes declarations ---------------          //

class page {
    constructor(name, isSelected, data, lastSubPageActive) {
            this.name = name,
            this.isSelected = isSelected,
            this.data = data,
            this._lastSubPageActive = lastSubPageActive
    }
    get lastSubPageActive() {
        return this._lastSubPageActive;
    }
    set lastSubPageActive(value) {
        let pagesData = this.data.info.pages

        if (typeof value === 'number' && value < 1) {
            this._lastSubPageActive = 1;
        } else if (typeof value === 'number' && value > pagesData - 1) {
            this._lastSubPageActive = pagesData

        } else {
            this._lastSubPageActive = value;
        }
    }
};

//          ------------- Initial functions ---------------          //
async function getData() {

    pages.home = new page('home', false, [], 0)
    await fetch("https://rickandmortyapi.com/api/character")
        .then(response => response.json())
        .then(json => pages.character = new page('character', false, json, 1))

    await fetch("https://rickandmortyapi.com/api/location")
        .then(response => response.json())
        .then(json => pages.location = new page('location', false, json, 1))

    await fetch("https://rickandmortyapi.com/api/episode")
        .then(response => response.json())
        .then(json => pages.episode = new page('episode', false, json, 1))
}

//          ------------- Tools ---------------          //

//HAY QUE VER DONDE PONER ESTA FUNCION
let displayHome = pages => {
    domElements.body.innerHTML = ''
    domElements.body.className = 'background'

    let mainHome = document.createElement('main')
    mainHome.className = 'x-space-evenly'
    domElements.body.appendChild(mainHome)

    for (let prop in pages) {
        let text
        let positionClass
        let delayClass
        let id
        
        if (prop == 'character') {
            text = 'All the series character info';
            positionClass = 'col m3 offset-m8 s6 offset-s4';
            id= 'character'
        } else if (prop == 'episode') {
            text = 'Lalalalala';
            positionClass = 'col m3 offset-m1 s6';
            delayClass = 'delay-1'
            id= 'episode'
        } else if (prop == 'location') {
            text = 'Planets, dimensions and more';
            positionClass = 'col m3 offset-m5 s6 offset-s5';
            delayClass = 'delay-2'
            id= 'location'
        } else if (prop == 'home'){
            continue
        } else {
            console.log('error en el if')
        }
    
        //armo la fila y el html de cada categoria
        let row = document.createElement('div')
        row.className = 'row'
        row.innerHTML = `
        <div class="${positionClass}" >
                <div class="flip-card square-container">
                    <div class="flip-card-inner">
                        <div class="flip-card-front round-border neon-border valign-wrapper ${delayClass}" id="${id}">
                            <h2 class="h2-resized center-align">${prop}</h2>
                        </div>
                        <div class="flip-card-back round-border neon-border">
                            <p class="center-align small-text">${text}.</p>
                            <a class="goToButton" target="${prop}">Go!</a>
                        </div>
                    </div>
                </div>
        </div>`
        mainHome.appendChild(row)
    }
}

const tools = {

    //with setupInitialGlobal, we'll be able to catch caché data for reloading with parameters
    setupInitialGlobalVariables: (title, lastSubPageSelected) => {
        for (let page in pages) {
            if (pages[page].hasOwnProperty('isSelected') && page === title) {
                pages[page].isSelected = true
                if (page != 'home') {
                pages[page].lastSubPageActive = lastSubPageSelected
                }  
            }
        }
        title == 'home' ? displayHome(pages) : console.log('error en el setupinitial')
    },

    calculateSubPagesToDisplay: (selectedSubPage, lastExistingSubPage) => {

        let firstRenderedSubPage;
        let lastRenderedSubPage;

        if (lastExistingSubPage <= subPagesOperators.subPagesCap) {
            firstRenderedSubPage = 1;
            lastRenderedSubPage = lastExistingSubPage;
        }

        else if (selectedSubPage <= lastExistingSubPage - 3) {
            firstRenderedSubPage = selectedSubPage - 3
            lastRenderedSubPage = firstRenderedSubPage + subPagesOperators.subPagesCap
        }
        else {
            selectedSubPage = lastExistingSubPage - 3
            firstRenderedSubPage = selectedSubPage - 3
            lastRenderedSubPage = firstRenderedSubPage + subPagesOperators.subPagesCap
        }
        return { firstRenderedSubPage, lastRenderedSubPage }
    },

    displaySubPages: (selectedSubPage, lastExistingSubPage) => {
        
        if (selectedSubPage < 4){
            selectedSubPage = 4
        }else if (selectedSubPage>lastExistingSubPage-3){
            selectedSubPage = lastExistingSubPage-3
        }
        let subPagesToDisplay = tools.calculateSubPagesToDisplay(selectedSubPage, lastExistingSubPage);
        
        //console.log(domElements.headerContainer)

        domElements.dinamicSubPagesContainer[0].innerHTML = '';

        for (let i = subPagesToDisplay.firstRenderedSubPage; i <= subPagesToDisplay.lastRenderedSubPage; i++) {

            let element = document.createElement('a');
            element.classList.add('subPages');
            element.innerText = i;
            domElements.dinamicSubPagesContainer[0].appendChild(element);
        }
    },

    displayMainPage: (selectedSubPage) => {

        let element = document.createElement('section');
        let paragraph = document.createElement('p');
        paragraph.style.marginLeft = "350px"
        paragraph.style.marginTop = "200px"
        paragraph.innerText = `Estás en la página ${selectedSubPage} de ${subPagesOperators.actualPage()}`;

        element.classList.add('section');
        element.appendChild(paragraph)

        domElements.mainContainer.innerHTML = ''
        domElements.mainContainer.appendChild(element)
    },

    updateScreen:(selectedSubPage, lastSubPageAvailable)=>{
        tools.displayMainPage(selectedSubPage,lastSubPageAvailable)
        tools.displaySubPages(selectedSubPage,lastSubPageAvailable)
    }
}

//          ------------- Listeners ---------------          //

async function initApp() {
    await getData();

    //acá iría un request a los caches para pasar como parámetros iniciales a setUpInitialGlobalVariable

        tools.setupInitialGlobalVariables('home',1);
        
        displayHome(pages)
        
        //renderEpisodes();
}

initApp()

/*--------------------------------search----------------------------------- */

function searchFilter() {

}

//ACA VA LO DE CARLA 


//esto renderiza el navbar
let displayNavbar = () => {
    domElements.headerContainer.innerHTML = `    
    <div class="logoSection">
            <image id="logo" src="./media/RickMortyLogo8-2.png" alt="Logo"></image>

        </div>

        <div class="navSection">

            <div class="headerContent">
                <div class="headerDivisorLeft1">

                    <a href="#" class="pageButtons" >Character</a>
                    <a id="locationButton" href="#" class="pageButtons">Location</a>
                    <a href="#" class="pageButtons">Episode</a>
                </div>
                <div class="headerDivisorRight1">
                    <div class="inputDiv">
                        <a class="search">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" width="20" height="20">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </a>
                        <div class="input-field">
                            <input placeholder="Search" class="baseInput" type="text" aria-label="searchInput">
                          </div>
                    </div>
                    <div id="burger">Burger</div>    
                </div>
            </div>

            <div class="headerContent">
                <div class="headerDivisorLeft2">
                    <a href="#" class="subPages"><</a>
                    <div id="subPagesContainer">
                    </div>

                    <a href="#" class="subPages">></a>
                  
                  
                    <!--  <a href="#" class="subPages"> < </a>
                    <a href="#" class="subPages"> 1 </a>
                    <a href="#" class="subPages"> 2 </a>
                    <a href="#" class="subPages"> 3 </a>
                    <a href="#" class="subPages"> 4 </a>
                    <a href="#" class="subPages"> 5 </a>
                    <a href="#" class="subPages"> > </a>-->
                </div>
                <div class="headerDivisorRight2">
                </div>
                <div class="headerDivisorRight1Bottom">
                        <div class="inputDiv">
                            <a class="search">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" width="20" height="20">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </a>
                            <div class="input-field">
                                <input placeholder="Search" class="baseInput" type="text" aria-label="searchInput">
                              </div>
                        </div>
                        <div id="burger">Burger</div>    
                </div>
            </div>
        </div>
    `

    // let prueba = document.getElementById('subPagesContainer');
    // domElements.dinamicSubPagesContainer = prueba;
    // console.log(domElements)

}




function createEpisodeCard(item) {
    const itemElement = document.createElement("div");
    itemElement.classList.add("episodeCard");

    itemElement.innerHTML = `
        <h4 class="heading">${item.name}</h4>
        <p class="dateTime">${item.air_date}</p>
        <h5 class="heading">${item.episode}</h5>
        <button class="btn" value="${item.id}"  >INFO</button>
    `;
    return itemElement;

    // onclick="detailsTrigger()"
}

function renderEpisodes() {

    domElements.mainContainer.innerHTML = 
    `<div class="episodeContainer"> 
    </div> `

    let episodes = pages.episode.data.results;
    
    episodes.forEach((item) => {
        const itemElement = createEpisodeCard(item);
        // console.log(item)
        
        domElements.episodeContainer[0].appendChild(itemElement);
        
    });

    
}


function crearCharacter(item) {
    const itemElement = document.createElement("div");
    itemElement.classList.add("character");

    itemElement.innerHTML = `
        <img alt="" class="photoCharacter" src="${item.image}" >
        <p class="subTitles">${item.name}</p>
    `;
    return itemElement;
}

function renderEpisodesDetails(characters,episode) {

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

    const itemElement = document.getElementsByClassName("detailsCharacters");

    console.log(characters)
    characters.forEach((item) => {
        const itemElement = crearCharacter(item);
        console.log(item)
        console.log(domElements.detailsCharacters)
        domElements.detailsCharacters[0].appendChild(itemElement);
    });
}


document.addEventListener('DOMContentLoaded', (e) => {
    // Aquí configura event listeners
        
       
        document.body.addEventListener('click', async (e) => {
            if (e.target && e.target.classList.contains("btn")) {
                // Se hizo clic en un botón "INFO" dentro de cualquier elemento
                // que cumple con el selector ".btn"
                
                const btn = e.target;
                
                    let episodes = pages.episode.data.results;
                    const episode = episodes.find((episode) => episode.id === parseInt(btn.value));
                    
                    if (episode) {
                        const characterData = await Promise.all(episode.characters.map((characterUrl) =>
                            fetch(characterUrl).then((response) => response.json())
                        ));
                
                        renderEpisodesDetails(characterData, episode);
                    }
                
            }

            console.log(e.target)
            console.log(e.target.classList.contains("headerDivisorLeft1"))
            if (e.target && e.target.classList.contains("pageButtons")){

                let targetText = e.target.text.toLowerCase();
                let actualPage = subPagesOperators.actualPage();
        
                if (targetText) {
            
                    let newPageData = pages[targetText].data
                    let subPageDisplaying = pages[targetText].lastSubPageActive
                    console.log(pages[actualPage])
                    pages[actualPage].isSelected = false
                    pages[targetText].isSelected = true
            
                    tools.updateScreen(subPageDisplaying, newPageData.info.pages)
                }
            
            }
        
            if (e.target && e.target.classList.contains("headerDivisorLeft2")){
            
                let actualPage = pages[subPagesOperators.actualPage()]
                let actualPageData = actualPage.data;
                let totalSubPages = actualPageData.info.pages
                let selectedSubPage = parseInt(e.target.text);
                let prevSubPage = actualPage.lastSubPageActive - 1
                let nextSubPage = actualPage.lastSubPageActive + 1
            
                switch (e.target.text) {
                    case '<':
                        actualPage.lastSubPageActive = prevSubPage
                        tools.updateScreen(actualPage.lastSubPageActive, actualPageData.info.pages)
            
                    break;
                    case '>':
                        actualPage.lastSubPageActive = nextSubPage
                        tools.updateScreen(actualPage.lastSubPageActive, actualPageData.info.pages)
                    break;
                    default:
                        actualPage.lastSubPageActive = selectedSubPage
                        if (subPagesOperators.subPagesCap < totalSubPages && e.target.text) {
                            tools.updateScreen(selectedSubPage, totalSubPages);
                        } else if (e.target.text) {
                            tools.displayMainPage(selectedSubPage)
                            console.log()
                        }
                    break;
                }
            }
        
            if (e.target && e.target.classList.contains("baseInput")){
        
            let query = e.target.value.toLowerCase().trim();
            e.target.value = ''
            searchFilter(query)
            }

            
            // console.log(typeof e.target.target)
            //pendientee a capturar la etiqueta

            if (!e.target.target){} 
            else {        
                domElements.mainContainer.innerHTML= '';
                displayNavbar();


                let selectPage = e.target.target;
                

                for(let page in pages){
                    if(pages[page].name === selectPage){

                        // console.log( pages[page] )
                        tools.updateScreen(pages[page].lastSubPageActive, pages[page].data.info.pages )
                    }
                }}
                
        });
});
