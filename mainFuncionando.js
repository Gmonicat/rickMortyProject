//          ------------- Global Variables ---------------          //
import {navBar} from './navBar.js'
import { displayHome } from './home.js'

let pages = {
    home:{},
    character: {},
    location: {},
    episode: {}
}
let getElementsToDisplay={
    character: async (actualPage)=>{
        let subPageToDisplay = pages[actualPage].lastSubPageActive
        
        const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${subPageToDisplay}`)
        const json = await response.json()
        return json
    },

    location:async (actualPage)=>{

        let subPageToDisplay = pages[actualPage].lastSubPageActive
        const response = await fetch(`https://rickandmortyapi.com/api/location?page=${subPageToDisplay}`)
        const json = await response.json()
        //const result = resolvedObject[]
        return json
    },

    episode: async (actualPage)=>{
        let subPageToDisplay = pages[actualPage].lastSubPageActive
        const response = await fetch(`https://rickandmortyapi.com/api/episode?page=${subPageToDisplay}`)
        const json = await response.json()
        return json
    }
}

const domElements = {
    mainContainer: document.getElementById('main'),
    body: document.getElementById('body'),
    header: document.getElementById('header'),
    //navBar dom Els
    pagesContainer: {},
    subPagesOperatorContainer: {},
    dinamicSubPagesContainer: {},
    subPages: {},
    searchInput: {},
    logo: {},

    //episode dom Els
    episodeContainer: {},
    detailsCharacters: {},
}

const subPagesOperators = {
    actualPage: () => {
        for (let element in pages) {
            if (pages[element].isSelected) {
                
                return pages[element].name;;
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


const tools = {
    setupNavbarDOMElements : ()=>{
        let navbar = document.getElementsByClassName('navSection')
        if (navbar !== null){
            domElements.logo = document.getElementById('logo'),
        domElements.pagesContainer = document.getElementsByClassName('headerDivisorLeft1'),
        
        domElements.subPagesOperatorContainer = document.getElementsByClassName('headerDivisorLeft2'),
        domElements.dinamicSubPagesContainer = document.getElementsByClassName('subPagesContainer')
        domElements.subPages = document.getElementsByClassName('subPages')
        domElements.searchInput =  document.getElementsByClassName('baseInput')

        domElements.subPagesOperatorContainer[0].addEventListener('click', (e) => {
            let actualPage = pages[subPagesOperators.actualPage()]
            let actualPageData = actualPage.data;
            let totalSubPages = actualPageData.info.pages
            let selectedSubPage = parseInt(e.target.text);
            let prevSubPage = actualPage.lastSubPageActive - 1
            let nextSubPage = actualPage.lastSubPageActive + 1

            switch (e.target.text) {
                case '<':
                    actualPage.lastSubPageActive = prevSubPage
                    tools.updateScreen(actualPage.lastSubPageActive, actualPageData.info.pages,actualPage.name)
                break;
                case '>':
                    actualPage.lastSubPageActive = nextSubPage
                    tools.updateScreen(actualPage.lastSubPageActive, actualPageData.info.pages,actualPage.name)
                break;
                default:
                    actualPage.lastSubPageActive = selectedSubPage
                    if (subPagesOperators.subPagesCap < totalSubPages && e.target.text) {
                        tools.updateScreen(selectedSubPage, totalSubPages,actualPage.name);
                    } else if (e.target.text) {
                        tools.displayMainPage(actualPage.name)
                    }
                break;
            }
                })

        domElements.pagesContainer[0].addEventListener('click', (e) => {

            let targetText = e.target.text.toLowerCase();
            let actualPage = subPagesOperators.actualPage();
            

            if (targetText) {
        
                let newPageData = pages[targetText].data
                let subPageDisplaying = pages[targetText].lastSubPageActive
                pages[actualPage].isSelected = false
                pages[targetText].isSelected = true
                
                console.log(targetText)
                tools.updateScreen(subPageDisplaying, newPageData.info.pages,targetText)
                
            }
        
        })
        }
        
    },
    setupHomeDOMElements:()=>{
        domElements.mainContainer.addEventListener('click', async (e) => {
           
           
           let pageToDisplay = e.target.target
           let subpageToDisplay = pages[pageToDisplay].lastSubPageActive
           let lastSubPg = pages[pageToDisplay].data.info.pages 
           tools.updateScreen(subpageToDisplay,lastSubPg,pageToDisplay)
           
           })
    },
  
    setupInitialGlobalVariables: (title, lastSubPageSelected) => {
        for (let page in pages) {
            if (page == title) {
                pages[page].isSelected = true
                if (page != 'home') {
                pages[page].lastSubPageActive = lastSubPageSelected
                }  
            }
        }
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
        
        if(domElements.dinamicSubPagesContainer[0]){
            domElements.dinamicSubPagesContainer[0].innerHTML = '';
        }
        

        for (let i = subPagesToDisplay.firstRenderedSubPage; i <= subPagesToDisplay.lastRenderedSubPage; i++) {

            let element = document.createElement('a');
            element.classList.add('subPages');
            element.innerText = i;
            domElements.dinamicSubPagesContainer[0].appendChild(element);
        }
    },

    displayMainPage: async (selectedPage) => {
        let subPage = pages[selectedPage].lastSubPageActive
        let data
        switch (selectedPage){
            case 'character':
                const characterData = await getElementsToDisplay.character(selectedPage)
                data =  characterData.results
                console.log(data)

            break;

            case 'episode':
                const episodeData= await getElementsToDisplay.episode(selectedPage)
                data =  episodeData.results
                console.log(data)
                renderEpisodes(data)
            break;
            case 'location':
                const locationData= await getElementsToDisplay.location(selectedPage)
                data =  locationData.results
                console.log(data)
            break;
        }
            



        /*let element = document.createElement('section');
        let paragraph = document.createElement('p');
        paragraph.style.marginLeft = "350px"
        paragraph.style.marginTop = "200px"
        paragraph.innerText = `Estás en la página ${selectedSubPage} de ${subPagesOperators.actualPage()}`;

        element.classList.add('section');
        element.appendChild(paragraph)

        domElements.mainContainer.innerHTML = ''
        domElements.mainContainer.appendChild(element)*/
    },

    updateScreen:(selectedSubPage, lastSubPageAvailable, selectedPage)=>{
        if (selectedPage != 'home'){
            tools.displayNavbar()
            
            tools.displayMainPage(selectedPage)
            tools.displaySubPages(selectedSubPage,lastSubPageAvailable)
        }else{
        
            displayHome(pages,domElements)
            tools.setupHomeDOMElements()
        }
    },

    displayNavbar: () => {
        domElements.body.innerHTML = navBar 
        tools.setupNavbarDOMElements();
    }
}

//          ------------- Listeners ---------------          //

async function initApp() {
    await getData();
    
    //acá iría un request a los caches para pasar como parámetros iniciales a setUpInitialGlobalVariable
    let pageInitSelected = 'character'
    let subPageInitSelected = 1
    tools.setupInitialGlobalVariables(pageInitSelected,subPageInitSelected);
    displayHome(pages,domElements)
    
    tools.setupHomeDOMElements()
    //tools.updateScreen(subPageInitSelected,39,pageInitSelected)
    //
}

initApp()

/*--------------------------------search----------------------------------- */

// domElements.searchInput[0].addEventListener('change', (e) => {

//     let query = e.target.value.toLowerCase().trim();
//     e.target.value = ''
//     searchFilter(query)
// })


//ACA VA LO DE CARLA 


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

function renderEpisodes(data) {

    domElements.mainContainer.innerHTML = 
    `<div class="episodeContainer"> 
    </div> `

    //let episodes = pages.episode.data.results;
    data.forEach((item) => {
        const itemElement = createEpisodeCard(item);
        
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

    characters.forEach((item) => {
        const itemElement = crearCharacter(item);
        domElements.detailsCharacters[0].appendChild(itemElement);
    });
}

/*document.addEventListener('DOMContentLoaded', (e) => {

        
            domElements.searchInput[0].addEventListener('change', (e) => {
        
            let query = e.target.value.toLowerCase().trim();
            e.target.value = ''
            searchFilter(query)
            })
        
        });*/



// function detailsTrigger(){
    
//     // // if (domElements.episodeContainer){}
//     // let episodes = pages.episode.data.results;
//     console.log(episodes)
//     if (e.target && e.target.classList.contains("btn")) {
//         Se hizo clic en un botón "INFO"
//         const btn = e.target;
//         const episode = episodes.find((episode) => episode.id === parseInt(btn.value));
//         if (episode) {
//             const characterData = await Promise.all(episode.characters.map((characterUrl) =>
//                 fetch(characterUrl).then((response) => response.json())
//             ));

//             renderEpisodesDetails(characterData, episode);
//         }
//     }

// }