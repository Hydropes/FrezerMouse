//импортируем нужные классы
import { StockDefenition } from "./stockDefenition.js";
import { Contour } from "./contour.js";
import { GcodeLinear } from "./gcode.js";
//Определение переменных из html-шаблона
const canvas = document.querySelector(".right__drawField");
const context = canvas.getContext("2d");
let flagMouse = document.querySelector("#byMouse");
let flagZ= document.querySelector("#zTable");
let li = document.querySelector(".contoursList");

//Определение системных переменных
let w = canvas.clientWidth;
let h = canvas.clientHeight;
canvas.width = w;
canvas.height = h;
let mouse = { x: 0, y: 0 };
let draw = false;
let counter = 0;
let flagButton = false;
let cont = [];
let stock = undefined;
let gCode = undefined;
//Определение обработчиков событий
canvas.addEventListener("mousedown", function (e) {
  if (flagMouse.checked == true && flagButton == true) {
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;

    //Рисование
    context.beginPath();
    context.moveTo(mouse.x, mouse.y);

    //Передача данных экземпляру класса
    cont[counter] = new Contour(counter, context);
    cont[counter].setStock(stock);
    cont[counter].id = counter;
    cont[counter].setPointsByPx(mouse.x, mouse.y);

    draw = true;
  }
});

canvas.addEventListener("mousemove", function (e) {
  if (draw == true) {
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;

    //Рисование
    context.lineWidth = 0.5;
    context.strokeStyle = "black";
    context.lineTo(mouse.x, mouse.y);
    context.stroke();

    //Передача данных экземпляру класса
    cont[counter].setPointsByPx(mouse.x, mouse.y);
  }
});

canvas.addEventListener("mouseup", function (e) {
  if (flagMouse.checked == true && flagButton == true) {
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;

    //Рисование
    context.lineTo(mouse.x, mouse.y);
    context.stroke();
    context.closePath();

    // выведение элементов отдельного контура на поле:
    const contours = document.querySelector("#contours");
    const newLi = document.createElement("div");
    newLi.className = "__contour";
    newLi.id = counter;
    newLi.textContent = `контур №${counter + 1}`;
    contours.appendChild(newLi);

    //Присвоение точек экземпляру класса Contour:
    cont[counter].setPointsByPx(mouse.x, mouse.y);
    cont[counter].transformPoints();
    cont[counter].setViewHTML(newLi);

    //Запись координат в массив

    //Слушатель события наведения мышки на объект списка
    cont[counter].li.addEventListener("mouseover", function (e) {
      context.reDraw(counter, e.target.id);
    });

    cont[counter].li.addEventListener("mouseout", function () {
      context.reDraw(counter);
    });
    counter++;
    draw = false;
  }
});

//Добавляем метод перерисовки для контекста
context.reDraw = (ctr, redCtr = -1, lw = 0.5) => {
  context.clearRect(0, 0, w, h);
  stock.drawMe();
  stock.drawLsk();

  for (let i = 0; i < ctr; i++) {
    context.lineWidth = lw;
    context.strokeStyle = "black";
    if (i == redCtr) {
      context.strokeStyle = "red";
    }
    context.beginPath();
    context.moveTo(cont[i].arrPx[0], cont[i].arrPx[1]);
    cont[i].arrPx.forEach((el) => {
      context.lineTo(el[0], el[1]);
      context.stroke();
    });
    context.closePath();
  }
};

//Скромная валидация на пустые строки;)
let inputFields = document.querySelectorAll("._params-input");
let btnAddStock = document.querySelector("#defenitionStock");
for (let key of inputFields) {
  key.addEventListener("input", checkInputFill);
  function checkInputFill() {
    if (key.value.length === 0) {
      key.classList.add("emptyfield");
      btnAddStock.disabled = true;
    } else {
      key.classList.remove("emptyfield");
      btnAddStock.disabled = false;
    }
  }
}

//Кнопка Задать заготовку
document.querySelector("#defenitionStock").addEventListener("click", (e) => {
  stock = new StockDefenition(
    0,
    context,
    document.querySelector("#stockWidth").value,
    document.querySelector("#stockHeight").value
  );

  stock.setStartPoint(canvas.width, canvas.height);
  stock.drawMe();
  stock.drawLsk();

  flagButton = true;
});


// Кнопка отмены
document.querySelector("#cancel").addEventListener("click", (e) => {
  if (counter) {
    counter -= 1;
    let contours = document.querySelector("#contours");
    contours.removeChild(document.getElementById(counter));
    context.reDraw(counter);
  }
});

//Кнопка Очистить поле
document.querySelector("#clearField").addEventListener("click", (e) => {
  if (counter) {
    let contours = document.querySelector("#contours");
    for (let i = 0; i < counter; i++) {
      contours.removeChild(document.getElementById(String(i)));
    }
  }
  cont = [];
  context.clearRect(0, 0, w, h);
  counter = 0;
  flagButton = false;
});

//Кнопка формирования G-code
document.querySelector("#getGcode").addEventListener("click", (e) => {
  if(counter){
let zOnTable = flagZ.checked ? true : false;
let thickness = parseFloat(document.querySelector("#stockThickness").value);
let rotations = parseInt(document.querySelector("#rotations").value);
let feed = parseInt(document.querySelector("#feed").value);
let w = parseInt(document.querySelector("#stockWidth").value)
let h = parseInt(document.querySelector("#stockHeight").value);
let CNC_type = document.querySelector("#selectorCNC").value;
gCode = new GcodeLinear(
  counter,
  "ngc",
  cont,
  zOnTable,
  thickness,
  rotations,
  feed,
  w,
  h,
  CNC_type
);
gCode.formMe();
  }else{
    alert('Пожалуйста, нарисуйте контуры')
  }
  
});




