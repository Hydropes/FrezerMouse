export class StockDefenition {
  constructor(id, contx, width, height) {
    this.id = id;
    this.context = contx;
    this.width_mm = parseFloat(width);
    this.height_mm = parseFloat(height);
    this.mmToPx = 1;
    this.pxToMm = 1;;
   
  }
  setStartPoint(w, h) {
    if (this.width_mm / w > this.height_mm / h) {
      this.mmToPx = (0.95 * w) / this.width_mm;
    } else {
      this.mmToPx = (0.95 * h) / this.height_mm;
    }
    this.pxToMm = 1 / this.mmToPx;
    this.width_px = this.mmToPx * this.width_mm;
    this.height_px = this.mmToPx * this.height_mm;
    this.x0 = (w - this.width_px) / 2;
    this.y0 = (h + this.height_px) / 2;
  }
  setStyleLines(i = 0.5, c = "black") {
    this.context.lineWidth = i;
    this.context.strokeStyle = c;
  }
  _drawLine(x0, y0, x1, y1, i, c) {
    this.setStyleLines(i, c);
    this.context.beginPath();
    this.context.moveTo(x0, y0);
    this.context.lineTo(x1, y1);
    this.context.closePath();
    this.context.stroke();
  }
  _drawRect(x0, y0, w, h, i, c) {
    this.context.beginPath();
    this.context.rect(x0, y0, w, h);
    this.context.closePath();
    this.context.stroke();
  }
  drawLsk() {
    this._drawLine(this.x0, this.y0, this.x0 + 30, this.y0, 2, "red");
    this._drawLine(this.x0, this.y0, this.x0, this.y0 - 30, 2, "green");
  }
  drawMe(i = 1, c = "blue") {
    this.setStyleLines(i, c);
    this._drawRect(
      this.x0,
      this.y0 - this.height_px,
      this.width_px,
      this.height_px
    );
  }
}
