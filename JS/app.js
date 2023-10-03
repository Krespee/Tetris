//configs
let currentColor = "";
let positionLine = [4,14,24,34,44]

//

const container = document.querySelector(".container");

const createBox = () =>{
    const fragment = document.createDocumentFragment()
    for (let i = 0; i < 200; i++) {
        let box = document.createElement("DIV");
        box.classList.add("box");
        box.id = i;
        fragment.appendChild(box)
    }
    container.appendChild(fragment)
}

createBox()



//colores
const colors = ["block-blue","block-red","block-green","block-yellow","block-white"]
const randomColor = colors =>{
    let numRandom = Math.floor(Math.random()*5);
    currentColor = colors[numRandom]
    return colors[numRandom]
}

//formas
const forms = ["line", "square", "l", "smallsquare"];
const randomForm = forms =>{
    return forms[Math.floor(Math.random()*4)]
}

//creacion de bloques

const createLine = (color) =>{
    positionLine.forEach(e => {
        container.children[e].classList.add(`${color}`);
    });
}

createLine(randomColor(colors))
// const createBlock = (color, form) =>{
//     if (form == "line") {
//         createLine(color)
//     }
// }

//movimiento Y
const moveY = () =>{
    positionLine.forEach(e=>{
        container.children[e].classList.remove(`${currentColor}`);
    })

    positionLine = positionLine.map(value => value + 10);

    positionLine.forEach(e=>{
        container.children[e].classList.add(`${currentColor}`);
    })
}

const lineInterval = setInterval(() => {
    moveY()
    if (positionLine[4] >= 190 || positionLine[4] >= 199 || container.children[positionLine[4] + 10].classList.contains(`${currentColor}`)) {
        positionLine = [4,14,24,34,44]
        createLine(randomColor(colors))
    }
}, 1000);    

//movimiento X

document.addEventListener("keydown",(e)=>{

    if (e.key == "ArrowRight") {
        if (positionLine[0] % 10 === 9) {
            
        }else{
            positionLine.forEach(e=>{
                container.children[e].classList.remove(`${currentColor}`);
            })
            positionLine = positionLine.map(value => value +
                 1);
            positionLine.forEach(e=>{
                container.children[e].classList.add(`${currentColor}`);
            })
        }

    }else if(e.key == "ArrowLeft"){
        if (positionLine[0] % 10 === 0) {
            
        }else {        positionLine.forEach(e=>{
            container.children[e].classList.remove(`${currentColor}`);
        })
        positionLine = positionLine.map(value => value - 1);
        positionLine.forEach(e=>{
            container.children[e].classList.add(`${currentColor}`);
        })
    }

    }else if(e.key == "ArrowDown"){
        if (positionLine[4] >= 180 || positionLine[4] >= 189||container.children[positionLine[4] + 20].classList.contains(`${currentColor}`)) {
        }else{
            positionLine.forEach(e=>{
                container.children[e].classList.remove(`${currentColor}`);
            })
            positionLine = positionLine.map(value => value + 10);
            positionLine.forEach(e=>{
                container.children[e].classList.add(`${currentColor}`);
            })
        }

    }
})