export let canvas = document.getElementById("drawField"),
    context = canvas.getContext("2d"),
    w = canvas.width,
    h = canvas.height;
export function drawStock() {
    context.beginPath();
    context.rect(30, 20, 100, 90);
    context.closePath();
    context.strokeStyle = "aqua";
    context.stroke();
}
