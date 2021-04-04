var selectedShape;
const content = document.getElementById('contentArea');
const buttonArea = document.getElementById('buttonArea');

const shapeValues = Object.freeze({
    shape: 'shape',
    circle: 'circle', 
    leaf: 'leaf',
    leaf1: 'leaf1'
})

function createSquareButton(){
    let button = document.createElement('input');
    button.type = "button";
    button.classList.add(shapeValues.shape);
    button.addEventListener('click', function(){ buttonEventHandler(shapeValues.shape); });
    buttonArea.append(button);
}

function createCircleButton(){
    let button = document.createElement('input');
    button.type = "button";
    button.classList.add(shapeValues.shape,shapeValues.circle);
    button.addEventListener('click', function(){ buttonEventHandler(shapeValues.circle); });
    buttonArea.append(button);
}

function createLeafButton(){
    let button = document.createElement('input');
    button.type = "button";
    button.classList.add(shapeValues.shape, shapeValues.leaf);
    button.addEventListener('click', function(){ buttonEventHandler(shapeValues.leaf); });
    buttonArea.append(button);
}

function createLeaf1Button(){
    let button = document.createElement('input');
    button.type = "button";
    button.classList.add(shapeValues.shape,shapeValues.leaf1);
    button.addEventListener('click', function(){ buttonEventHandler(shapeValues.leaf1); });
    buttonArea.append(button);
}
 
function buttonEventHandler(shape){
    selectedShape = shape;
}

function submitEventHandler(){
    let number = document.getElementById('number').value;

    for(let i = 0; i < number; i++)
    {
        let br = document.createElement('br');
        content.append(br);
        for (let j = 0; j < number; j++)
        {
            let shape = document.createElement('div');
            shape.classList.add(shapeValues.shape, selectedShape);
            shape.style.backgroundColor = getRandomColor();
            content.append(shape);
        }
    }
}

function clearEventHandler(){
    content.innerHTML = "";
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


document.addEventListener("DOMContentLoaded", createSquareButton);
document.addEventListener("DOMContentLoaded", createCircleButton);
document.addEventListener("DOMContentLoaded", createLeafButton);
document.addEventListener("DOMContentLoaded", createLeaf1Button);
document.getElementById("submit").addEventListener('click', submitEventHandler);
document.getElementById("clear").addEventListener('click', clearEventHandler);

