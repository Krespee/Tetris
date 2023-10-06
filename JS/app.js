//configs
let currentColor = "";
let positionForm = []
let currentForm = ""

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
const forms = ["line", "square", "l", "z"];
const randomForm = forms =>{
    let numRandom = Math.floor(Math.random()*4);
    currentForm = forms[numRandom]
    return forms[numRandom]
}

//añadiendo gravedad
const gravity = () =>{
    for (let i = 0; i <= 20; i++) {
        for (const item of container.children) {
            if (item.classList.contains("active")) {
    
                if (item.id <= 189) {
                    while (!container.children[Number(item.id) + 10].classList.contains("active")) {
                        container.children[Number(item.id) + 10].classList.add(item.classList[1])
                        container.children[Number(item.id)].classList.remove(item.classList[1]);
                    }
                }
    
            }
        }
    }
}
//creacion de bloques

const createBlock5 = (color) =>{
    if (container.children[positionForm[3] + 10].classList.contains(`active`)|| container.children[positionForm[2] + 10].classList.contains(`active`) || container.children[positionForm[1] + 10].classList.contains(`active`) || container.children[positionForm[0] + 10].classList.contains(`active`)) {
        alert("perdiste")
        clearInterval(lineInterval)
        
    }else{
        positionForm.forEach(e => {
            container.children[e].classList.add(`${color}`);
        });
    }
}


//Elegir bloque y color al azar y llamar a la funcion que crea el bloque
const createBlock = (color, form) =>{
    if (form == "line") {
        positionForm = [4,14,24,34,44]
        createBlock5(color)
    }else if(form == "square"){
        positionForm = [4,5,14,15]
        createBlock5(color)
    }else if(form == "l"){
        positionForm = [4,14,24,34,35]
        createBlock5(color)
    }else if(form == "z"){
        positionForm = [4,5,15,16]
        createBlock5(color)
    }
}

createBlock(randomColor(colors), randomForm(forms))

//movimiento Y
const moveY = () =>{
    positionForm.forEach(e=>{
        container.children[e].classList.remove(`${currentColor}`);
    })
    positionForm = positionForm.map(value => value + 10);
    positionForm.forEach(e=>{
        container.children[e].classList.add(`${currentColor}`);
    })
}


//añadiendo colision con la clase active
const colision = () =>{
    positionForm.forEach(e=>{
        container.children[e].classList.add(`active`);
    })
}

//destruyendo linea de bloques
const destroyBlocksLine = ()=>{
    let countBlocks = 0; 
    let blocks = []
    for (const item of container.children) {
        if (item.classList.contains("active")) {
            countBlocks++
            blocks.push(item.id)
            if (countBlocks == 10) {
                blocks.forEach(e => {
                    container.children[e].className = "";
                    container.children[e].classList.add("box");  
                });
                countBlocks = 0;
            }
        }else{
            countBlocks = 0;
            blocks= [];
        }
    }
    gravity()
}

const lineInterval = setInterval(() => {

    if (currentForm == "square" || currentForm == "z") {
        if (positionForm[3] >= 190 || positionForm[3] >= 199 || container.children[positionForm[3] + 10].classList.contains(`active`)|| container.children[positionForm[2] + 10].classList.contains(`active`) || container.children[positionForm[1] + 10].classList.contains(`active`) || container.children[positionForm[0] + 10].classList.contains(`active`)) {
            colision()
            createBlock(randomColor(colors), randomForm(forms))
            destroyBlocksLine()
        } else {
            moveY()
        }
    } else if( currentForm == "line"|| currentForm == "l") {
        if (positionForm[4] >= 190 || positionForm[4] >= 199 || container.children[positionForm[4] + 10].classList.contains(`active`) || container.children[positionForm[3] + 10].classList.contains(`active`)|| container.children[positionForm[2] + 10].classList.contains(`active`) || container.children[positionForm[1] + 10].classList.contains(`active`) || container.children[positionForm[0] + 10].classList.contains(`active`)) {
            colision()
            createBlock(randomColor(colors),randomForm(forms) )
            destroyBlocksLine()
    
        }else{
            moveY()
        }
    }
    
}, 200);    

//movimiento X


const rightMove =()=>{
    positionForm.forEach(e=>{
        container.children[e].classList.remove(`${currentColor}`);
    })
    positionForm = positionForm.map(value => value + 1);
    positionForm.forEach(e=>{
        container.children[e].classList.add(`${currentColor}`);
    })
}
const leftMove =()=>{
    positionForm.forEach(e=>{
        container.children[e].classList.remove(`${currentColor}`);
    })
    positionForm = positionForm.map(value => value - 1);
    positionForm.forEach(e=>{
        container.children[e].classList.add(`${currentColor}`);
    })
}
const downMove =()=>{
    positionForm.forEach(e=>{
        container.children[e].classList.remove(`${currentColor}`);
    })
    positionForm = positionForm.map(value => value + 10);
    positionForm.forEach(e=>{
        container.children[e].classList.add(`${currentColor}`);
    })
}

document.addEventListener("keydown",(e)=>{

    if (currentForm == "square" || currentForm == "z") {
        if (positionForm[0] % 10 === 9 || positionForm[3] % 10 === 9 || container.children[positionForm[3] + 1].classList.contains(`active`)|| container.children[positionForm[2] + 1].classList.contains(`active`) || container.children[positionForm[1] + 1].classList.contains(`active`) || container.children[positionForm[0] + 1].classList.contains(`active`)) {
            
        } else {
            if (e.key == "ArrowRight") {
                if (positionForm[0] % 10 === 9 || container.children[positionForm[3] + 1].classList.contains(`active`)|| container.children[positionForm[2] + 1].classList.contains(`active`) || container.children[positionForm[1] + 1].classList.contains(`active`) || container.children[positionForm[0] + 1].classList.contains(`active`)) {  
                }else{
                    rightMove()
                }
        
            }else if(e.key == "ArrowLeft"){
                if (positionForm[0] % 10 === 0|| container.children[positionForm[3] - 1].classList.contains(`active`)|| container.children[positionForm[2] - 1].classList.contains(`active`) || container.children[positionForm[1] - 1].classList.contains(`active`) || container.children[positionForm[0] - 1].classList.contains(`active`)) {
                    
                }else {        
                    leftMove()
                }
        
            }else if(e.key == "ArrowDown"){
                if (positionForm[4] >= 180 || positionForm[3] >= 189||container.children[positionForm[3] + 10].classList.contains(`active`)) {
                }else{
                    downMove()
                }
        
            }
        }

    } else if(currentForm == "line" || currentForm == "l"){
        if (e.key == "ArrowRight") {
            if (positionForm[0] % 10 === 9 || positionForm[4] % 10 === 9 ||container.children[positionForm[4] + 1].classList.contains(`active`) || container.children[positionForm[3] + 1].classList.contains(`active`)|| container.children[positionForm[2] + 1].classList.contains(`active`) || container.children[positionForm[1] + 1].classList.contains(`active`) || container.children[positionForm[0] + 1].classList.contains(`active`)) {  
            }else{
                rightMove()
            }
    
        }else if(e.key == "ArrowLeft"){
            if (positionForm[0] % 10 === 0|| container.children[positionForm[4] - 1].classList.contains(`active`) || container.children[positionForm[3] - 1].classList.contains(`active`)|| container.children[positionForm[2] - 1].classList.contains(`active`) || container.children[positionForm[1] - 1].classList.contains(`active`) || container.children[positionForm[0] - 1].classList.contains(`active`)) {
                
            }else {        
                leftMove()
            }
    
        }else if(e.key == "ArrowDown"){
            if (positionForm[4] >= 180 || positionForm[4] >= 189||container.children[positionForm[4] + 10].classList.contains(`active`)) {
            }else{
                downMove()
            }
    
        }
    }


})