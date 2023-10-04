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
    if (container.children[positionLine[3] + 10].classList.contains(`active`)|| container.children[positionLine[2] + 10].classList.contains(`active`) || container.children[positionLine[1] + 10].classList.contains(`active`) || container.children[positionLine[0] + 10].classList.contains(`active`)) {
        alert("perdiste")
        clearInterval(lineInterval)
        
    }else{
        positionLine.forEach(e => {
            container.children[e].classList.add(`${color}`);
        });
    }

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
    let countBlocks = 1; 
    let blocks = []
    if (positionLine[4] >= 190 || positionLine[4] >= 199 || container.children[positionLine[4] + 10].classList.contains(`active`) || container.children[positionLine[3] + 10].classList.contains(`active`)|| container.children[positionLine[2] + 10].classList.contains(`active`) || container.children[positionLine[1] + 10].classList.contains(`active`) || container.children[positionLine[0] + 10].classList.contains(`active`)) {
        for (const item of container.children) {
            if (item.classList.contains("active")) {
                countBlocks++
                blocks.push(item.id)
                if (countBlocks == 10) {
                    blocks.forEach(e => {
                        container.children[e].classList.remove();
                        container.children[e].classList.add("box");
                    });
                    countBlocks = 1;
                }
            }else{
                countBlocks = 1;
                blocks= [];
            }

        }

        positionLine.forEach(e=>{
            container.children[e].classList.add(`active`);
        })
        positionLine = [4,14,24,34,44]
        createLine(randomColor(colors))
    }else{
        moveY()
    }
}, 1000);    

//movimiento X

document.addEventListener("keydown",(e)=>{

    if (e.key == "ArrowRight") {
        if (positionLine[0] % 10 === 9 || container.children[positionLine[4] + 1].classList.contains(`active`) || container.children[positionLine[3] + 1].classList.contains(`active`)|| container.children[positionLine[2] + 1].classList.contains(`active`) || container.children[positionLine[1] + 1].classList.contains(`active`) || container.children[positionLine[0] + 1].classList.contains(`active`)) {
            
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
        if (positionLine[0] % 10 === 0|| container.children[positionLine[4] - 1].classList.contains(`active`) || container.children[positionLine[3] - 1].classList.contains(`active`)|| container.children[positionLine[2] - 1].classList.contains(`active`) || container.children[positionLine[1] - 1].classList.contains(`active`) || container.children[positionLine[0] - 1].classList.contains(`active`)) {
            
        }else {        
            positionLine.forEach(e=>{
            container.children[e].classList.remove(`${currentColor}`);
        })
        positionLine = positionLine.map(value => value - 1);
        positionLine.forEach(e=>{
            container.children[e].classList.add(`${currentColor}`);

        })
    }

    }else if(e.key == "ArrowDown"){
        if (positionLine[4] >= 180 || positionLine[4] >= 189||container.children[positionLine[4] + 10].classList.contains(`active`)) {
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