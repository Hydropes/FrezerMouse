// import { canvas, context, w, h } from './drawingStock.js'
let canvas = document.querySelector('.right__drawField'),
    context = canvas.getContext("2d"),
    w = canvas.clientWidth,
    h = canvas.clientHeight;
canvas.width = w;
canvas.height = h;
let mouse = { x: 0, y: 0 };
let draw = false;
let coords = {
    x: 0,
    y: 0
}
let counter = 0;
let arrCoords = [];
let flagMouse =  document.querySelector("input[name=sir]");
let li = document.querySelector('.contoursList');
let flagButton =false;




canvas.addEventListener("mousedown", function (e) {
    console.log(e);
    if (flagMouse.checked == true && flagButton == true){
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        draw = true;
        context.beginPath();
        context.moveTo(mouse.x, mouse.y);
        counter++;
    }  

});

canvas.addEventListener("mousemove", function (e) {

    if (draw == true) {

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        context.strokeStyle = "black";
        context.lineTo(mouse.x, mouse.y);
        context.lineWidth = 1;
        context.stroke();
        arrCoords.push([mouse.x, mouse.y]);    
    }
});

canvas.addEventListener("mouseup", function (e) {
    if (flagMouse.checked == true && flagButton == true) {
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
    context.lineTo(mouse.x, mouse.y);
    context.stroke();
    context.closePath();
    draw = false;

    // выведение элементов отдельного контура

    const newLi = document.createElement('li');
    newLi.className = "contour"
    newLi.textContent = `контур №${counter}`;
    const contours = document.querySelector('#contours');
    contours.appendChild(newLi);
    
      //Запись координат в массив
      

    let objContour = {
        id: counter,
        arrOfPointsX: [],
        arrOfPointsY: [],
        li: newLi
    }
    for (let i = 0; i < arrCoords.length; i++) {
        objContour.arrOfPointsX[i] = arrCoords[i][0];
        objContour.arrOfPointsY[i] = arrCoords[i][1];
    }
    
    arrCoords.splice(0, arrCoords.length);
    console.log(objContour.arrOfPointsX);
        console.log(objContour.arrOfPointsY);
      //Слушатель события наведения мышки на объект списка
        objContour.li.addEventListener('mouseover', function () {
            console.log(objContour.id);
            console.log(objContour.arrOfPointsX.length);
            context.beginPath();
            for (let i = 0; i < objContour.arrOfPointsX.length; i++)
            {
                context.strokeStyle = "red";
                context.lineWidth = 1;
                context.lineTo(objContour.arrOfPointsX[i], objContour.arrOfPointsY[i]);
            }
            context.stroke();
            context.closePath();
            
        })

        objContour.li.addEventListener('mouseout', function () {
            context.beginPath();
            for (let i = 0; i < objContour.arrOfPointsX.length; i++) {
                context.strokeStyle = "black";
                context.lineWidth = 1;
                context.lineTo(objContour.arrOfPointsX[i], objContour.arrOfPointsY[i]);
                
            }
            context.stroke();
            context.closePath();
        })
};
});


let stock = {
    rectW: document.querySelector('#stockWidth').value,
    rectH: document.querySelector('#stockHeight').value,
}
let coordSys = {
    x0: 0,
    y0: 0
}
//Проверка заполнения полей
let inputFields = document.querySelectorAll("._params-input");
let btnAddStock = document.querySelector('#defenitionStock')
for (let key of inputFields) {
    key.addEventListener('input', checkInputFill);
    function checkInputFill() {
        if (key.value.length === 0) {
            key.classList.add('emptyfield');
            btnAddStock.disabled = true;
        }
        else {
            key.classList.remove('emptyfield');
            btnAddStock.disabled = false;
        }
    }
}
// inputFields.addEventListener('input', checkInputFill);




function solveStock() {
    
    stock.rectW = document.querySelector('#stockWidth').value;
    stock.rectH = document.querySelector('#stockHeight').value;
    if (stock.rectW / w > stock.rectH / h) {
        stock.coeff = 0.95 * w / stock.rectW;
    } else {
        stock.coeff = 0.95 * h / stock.rectH;
    }
    stock.x0 = (w - stock.rectW * stock.coeff) / 2;
    stock.y0 = (h - stock.rectH * stock.coeff) / 2;
    return stock;
}

function drawStock() {
    flagButton = true;
    canvas.Width = w;
    canvas.Height = h;
    solveStock();
    coordSys.x0 = stock.x0;
    coordSys.y0 = stock.y0 + stock.rectH * stock.coeff;
    context.beginPath();
    context.rect(stock.x0, stock.y0, stock.rectW * stock.coeff, stock.rectH * stock.coeff);
    context.closePath();
    context.lineWidth = 1;
    context.strokeStyle = "blue";
    context.stroke();
//Y
    context.beginPath();
    context.moveTo(coordSys.x0, coordSys.y0);
    context.lineTo(coordSys.x0, coordSys.y0 - 30);
    context.closePath();
    context.lineWidth = 3;
    context.strokeStyle = "green";
    context.stroke();
//X
    context.beginPath();
    context.moveTo(coordSys.x0, coordSys.y0);
    context.lineTo(coordSys.x0 + 30, coordSys.y0);
    context.closePath();
    context.strokeStyle = "red";
    context.stroke();
}
function convertToGcode(){
    if (counter>0){
        console.log();

    }else{
        alert("Нарисуй хоть чё нить, ну")
    }
}

// let mouseIMG = document.querySelector('.__mouse')

// let timerId =setInterval(() => {
//         if (mouseIMG.style.left ==-100 +'px'){
//             mouseIMG.style.left = 1800 +'px';
        
//         } else{
//             mouseIMG.style.left = -100 + 'px';
//         }
        
//     }, 8100);








