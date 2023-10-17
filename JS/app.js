//configs
let currentColor = "";
let positionForm = []
let currentForm = ""
let currentEjeLine = "horizontal"; 
let currentEjeL = "horizontal"; 
let currentEjeZ = "horizontal"; 


// document.addEventListener("DOMContentLoaded", function() {
//     var audio = document.getElementById("miAudio");
//     audio.play();
//   });
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
    currentEjeLine = "horizontal"; 
    currentEjeL = "horizontal"; 
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

//gravedad v1.1
const gravity2 = (blockLimit) =>{
    
    for (let i = blockLimit[0]-1; i >= 0; i--){
        if (container.children[i].classList.contains("active") && !container.children[i + 10].classList.contains("active")) {
            container.children[i + 10].classList.add(container.children[i].classList[1])
            container.children[i].classList.remove(container.children[i].classList[1])
            container.children[i].classList.remove("active")
            container.children[i + 10].classList.add("active")
        }
    }
}

document.addEventListener("click",(e)=>{
    container.children[e.target.id].classList.add("active")
    container.children[e.target.id].classList.add("block-blue")
})


//destruyendo linea de bloques
const destroyBlocksLine = ()=>{
    let countBlocks = 0; 
    let blocks = []
    for (const item of container.children) {
        if (item.classList.contains("active")) {
            blocks.push(item.id)
            if (blocks[0] % 10 === 0) {
                countBlocks++
                if (countBlocks == 10) {
                    console.log(blocks);
                    blocks.forEach(e => {
                        container.children[e].className = "";
                        container.children[e].classList.add("box");  
                    });
                    gravity2(blocks)
                    countBlocks = 0;
                    blocks = []
                }
            }else{
                blocks = []
            }
            
        }else{
            countBlocks = 0;
            blocks= [];
        }
    }
}

const lineInterval = setInterval(() => {

    if (currentForm == "square" || currentForm == "z") {
        if (positionForm[3] >= 190 || positionForm[3] >= 199 || container.children[positionForm[0] + 10].classList.contains(`active`) || container.children[positionForm[3] + 10].classList.contains(`active`)|| container.children[positionForm[2] + 10].classList.contains(`active`) || container.children[positionForm[1] + 10].classList.contains(`active`) || container.children[positionForm[0] + 10].classList.contains(`active`)) {
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
}, 1000);    

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
//rotacion
const rotateR = (x1, x2, y1, y2)=>{
    positionForm[0] += x1;
    positionForm[1] += x2;
    positionForm[3] -= y1;
    positionForm[4] -= y2;
}
const rotateL = (x1, x2, y1, y2)=>{
    positionForm [0] -= x1
    positionForm [1] -= x2
    positionForm [3] += y1
    positionForm [4] += y2
}

const rotateZ = (x1,x2,x3) => {
    positionForm [0] += x1
    positionForm [1] += x2
    positionForm [3] += x3
}
const rotateZV = (x1,x2,x3) => {
    positionForm [0] -= x1
    positionForm [1] -= x2
    positionForm [3] -= x3
}


const rotate = (x1, x2, y1, y2 )=>{
    positionForm.forEach(e => {
        container.children[e].classList.remove(`${currentColor}`);
    });

    if (currentForm == "l" ) {
        if (currentEjeL == "horizontal" || currentEjeL == "vertical") {
            console.log(currentEjeL);

            rotateR(x1, x2, y1, y2)
            if (currentEjeL == "vertical") {
                currentEjeL = "horizontal1"
            }else{
                currentEjeL = "vertical"
            }
    
        } else if(currentEjeL == "vertical1" || currentEjeL == "horizontal1"){
            rotateL(x1, x2, y1, y2)
            if (currentEjeL == "horizontal1") {
                currentEjeL = "vertical1"
            }else{
                currentEjeL = "horizontal"
            }
        }
    }else if (currentForm == "z"){
        if (currentEjeZ == "horizontal") {
            rotateZ(x1,x2,y2)
            currentEjeZ = "vertical"
            console.log(currentEjeZ);
        } else if (currentEjeZ == "vertical") {
            rotateZV(x1,x2,y2)
            currentEjeZ = "horizontal"
            console.log(currentEjeZ);
        }
    }else{
        if (currentEjeLine == "horizontal") {
            rotateR(x1, x2, y1, y2)
            currentEjeLine = "vertical"
    
        } else if(currentEjeLine == "vertical"){
            rotateL(x1, x2, y1, y2)
            currentEjeLine = "horizontal"
        }
    }
    


    positionForm.forEach(e => {
        container.children[e].classList.add(`${currentColor}`);
    });

}

document.addEventListener("keydown",(e)=>{

    if (currentForm == "square" || currentForm == "z") {
        if (e.key == "ArrowRight") {
            if (positionForm[3] % 10 === 9 || container.children[positionForm[3] + 1].classList.contains(`active`)|| container.children[positionForm[2] + 1].classList.contains(`active`) || container.children[positionForm[1] + 1].classList.contains(`active`) || container.children[positionForm[0] + 1].classList.contains(`active`)) {  
            }else{
                rightMove()
            }
        
        }else if(e.key == "ArrowLeft"){
            if (positionForm[0] % 10 === 0|| container.children[positionForm[3] - 1].classList.contains(`active`)|| container.children[positionForm[2] - 1].classList.contains(`active`) || container.children[positionForm[1] - 1].classList.contains(`active`) || container.children[positionForm[0] - 1].classList.contains(`active`)) {            
            }else {        
                leftMove()
            }
        }else if(e.key == "ArrowDown"){
            if (positionForm[4] >= 180 || positionForm[3] >= 189 || container.children[positionForm[3] + 10].classList.contains(`active`) || container.children[positionForm[2] + 10].classList.contains(`active`) || container.children[positionForm[1] + 10].classList.contains(`active`) || container.children[positionForm[0] + 10].classList.contains(`active`)){
            }else{
                downMove()
            }
        }else if(e.key == "ArrowUp"){

        if(currentForm == "z" ){
            if (currentEjeZ == "horizontal"  && !container.children[positionForm[0] + 1].classList.contains("active") && !container.children[positionForm[1] + 9].classList.contains("active") && !container.children[positionForm[3] + 8].classList.contains("active")) {
                rotate(1,9,0,8)                
            }else if(currentEjeZ == "vertical" && positionForm[0] % 10 !== 9 && !container.children[positionForm[0] - 1].classList.contains("active") && !container.children[positionForm[1] - 9].classList.contains("active") && !container.children[positionForm[3] - 8].classList.contains("active")){
                rotate(1,9,0,8)
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
        }else if(e.key == "ArrowUp"){
            if (currentForm == "line") {
                if (currentEjeLine == "horizontal" && positionForm[0] % 10 !== 0 && positionForm[0] % 10 !== 1 && positionForm[0] % 10 !==8  && positionForm[0] % 10 !== 9 && !container.children[positionForm[0] + 18].classList.contains("active") && !container.children[positionForm[1] + 9].classList.contains("active") && !container.children[positionForm[3] - 9].classList.contains("active") && !container.children[positionForm[4] - 18].classList.contains("active")){
                    rotate(18,9,8,19)
                }else if (currentEjeLine == "vertical"){
                    rotate(18,9,8,19)
                }                
            }else if(currentForm == "l" ){
                if (currentEjeL == "horizontal"  && positionForm[0] % 10 !== 0 && positionForm[0] % 10 !== 1 && positionForm[0] % 10 !==8  && positionForm[4] % 10 !== 9&& !container.children[positionForm[0] + 18].classList.contains("active") && !container.children[positionForm[1] + 9].classList.contains("active") && !container.children[positionForm[3] - 9].classList.contains("active") && !container.children[positionForm[4] - 18].classList.contains("active")) {
                    console.log("object");
                    rotate(18,9,9,20)
                } else if (currentEjeL == "vertical" && !container.children[positionForm[0] + 22].classList.contains("active") && !container.children[positionForm[1] + 11].classList.contains("active") && !container.children[positionForm[3] - 11].classList.contains("active") && !container.children[positionForm[4] - 2].classList.contains("active")){
                    rotate(22,11,11,2)
                }else if (currentEjeL == "horizontal1" && positionForm[0] % 10 !==8  && positionForm[0] % 10 !== 9 && !container.children[positionForm[0] - 18].classList.contains("active") && !container.children[positionForm[1] - 9].classList.contains("active") && !container.children[positionForm[3] + 9].classList.contains("active") && !container.children[positionForm[4] + 20].classList.contains("active")){
                    rotate(18,9,9,20)
                }else if (currentEjeL == "vertical1"){
                    rotate(22,11,11,2)
                }
            }

        }
    }


})