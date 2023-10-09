
async function search(input,pages,domElements){

    let data = await generateData(pages)

    let foundObjects = findObjectByName(data,input)
    console.log(foundObjects)
}

async function generateData(pages){
    let array = []
    for(let page in pages){

        let pageName = pages[page].name
        
        if(pageName != 'home'){
            let totalSubPages = pages[page].data.info.pages
            


            let iterationInfo = await extractSubPageData(pageName,totalSubPages)
            array.push(iterationInfo)
            
        }
    }
    return (array)
}
let extractSubPageData = async (name,totalSubPages)=>{
    let result = []
    for (let i = 1; i <= totalSubPages; i++){

        switch(name){
            case 'character':
                await fetch(`https://rickandmortyapi.com/api/character?page=${i}`)
                    .then(answer => answer.json())
                    .then(json => json.results.forEach((el)=>{
                        let array = []
                        result.push(el)
                    }))
            break;
            case 'location':

                await fetch(`https://rickandmortyapi.com/api/location?page=${i}`)
                    .then(response => response.json())
                    .then(json => json.results.forEach((el)=>{
                        result.push(el)
                    }))
            break;
            case 'episode': 
                await fetch(`https://rickandmortyapi.com/api/episode?page=${i}`)
                    .then(response => response.json())
                    .then(json => json.results.forEach((el)=>{
                        result.push(el)
                    }))
            break;
        }
    }
    return result
}  

function findObjectByName(arrayOfArrays, nameToFind) {
    
    let input = nameToFind.toLowerCase().trim()
    
    for (const subArray of arrayOfArrays){
        let foundObjects = subArray.filter(obj => {return obj.name.toLowerCase().trim().includes(input)});
        if(foundObjects.length>0){
            return foundObjects
        } else{
            return ('No matching objects')
        }
    }
}



export {search}