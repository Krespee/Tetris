const container = document.querySelector(".container");

const createBox = () =>{
    const fragment = document.createDocumentFragment()
    for (let i = 0; i < 200; i++) {
        let box = document.createElement("DIV");
        box.classList.add("box");
        fragment.appendChild(box)
    }
    container.appendChild(fragment)
}

createBox()

//colores
const colors = ["block-blue","block-red","block-green","block-yellow","block-white"]
const randomColor = colors =>{
    return colors[Math.floor(Math.random()*5)]
}
//formas
const forms = ["line", "square", "l", "smallsquare"];
const randomForm = forms =>{
    return forms[Math.floor(Math.random()*4)]
}

//creacion de bloques
let positionLine = [4,14,24,34,44]

const createLine = (color) =>{
    positionLine.forEach(e => {
        container.children[e].classList.add(`${color}`);
    });
}

createLine("block-blue")

const createBlock = (color, form) =>{
    if (form == "line") {
        createLine(color)
    }
}

//movimiento Y

setInterval(() => {
    // container.children[positionLine[0]].classList.remove(`block-blue`);
    // positionLine[0] += 10;
    // positionLine[4] += 10;
    // container.children[positionLine[4]].classList.add(`block-blue`);
    positionLine.forEach(e=>{
        container.children[e].classList.remove(`block-blue`);
    })

    positionLine = positionLine.map(value => value + 10);
    console.log(positionLine);

    positionLine.forEach(e=>{
        container.children[e].classList.add(`block-blue`);
    })
    
}, 1000);    

//movimiento X

document.addEventListener("keydown",(e)=>{
    if (e.key == "ArrowRight") {
        positionLine.forEach(e=>{
            container.children[e].classList.remove(`block-blue`);
        })
        positionLine = positionLine.map(value => value +
             1);
        positionLine.forEach(e=>{
            container.children[e].classList.add(`block-blue`);
        })
    }else if(e.key == "ArrowLeft"){
        positionLine.forEach(e=>{
            container.children[e].classList.remove(`block-blue`);
        })
        positionLine = positionLine.map(value => value - 1);
        positionLine.forEach(e=>{
            container.children[e].classList.add(`block-blue`);
        })
    }else if(e.key == "ArrowDown"){
        positionLine.forEach(e=>{
            container.children[e].classList.remove(`block-blue`);
        })
        positionLine = positionLine.map(value => value + 10);
        positionLine.forEach(e=>{
            container.children[e].classList.add(`block-blue`);
        })
    }
})