export class GcodeLinear {
  static START_LINE1 = "G0 G90 G17 G54 G94 G40 G80";
  static DEEP_CUT = 0.2;
  static SAVE_NEAR = 0.7;
  static END_LINE = "M30";

  constructor(
    name,
    ext,
    arrCont,
    zTable = true,
    zThick = 100,
    rotations = 1000,
    feed = 50,
    w,
    h,
    CNC_type
  ) {
    this.name = name;
    this.ext = ext;
    this.arrCont = arrCont;
    (this.zTable = zTable),
      (this.zThick = parseFloat(zThick.toFixed(2))),
      (this.rotations = rotations),
      (this.feed = feed),
      (this.text = []),
      (this.zCut = 0 - GcodeLinear.DEEP_CUT),
      (this.zSafe = 30 + this.zThick);
    if (this.zTable) {
      this.zCut += this.zThick;
    }
    (this.stockW = w), (this.stockH = h);
    this.cnc = CNC_type;
  }
  createTemplate() {
    this.text.push(`(created for ${this.cnc})`);
    this.text.push(`(programm #${this.name})`);
    this.text.push(`(material size = ${this.stockW}x${this.stockH})`);
    this.text.push(GcodeLinear.START_LINE1);
    this.text.push(`G0 Z${this.zSafe}`);
    this.text.push(`M03 S${this.rotations}`);
    this.arrCont.forEach((el) => {
      this.text.push(`(contour #${el.id + 1})`);
      this.text.push(`G0 X${el.arrMm[0][0]} Y${el.arrMm[0][1]}`);
      this.text.push(`G0 Z${(this.zCut + GcodeLinear.SAVE_NEAR).toFixed(2)}`);
      this.text.push(`G1 Z${this.zCut} F${this.feed / 5}`);
      this.text.push(`G1 X${el.arrMm[1][0]} Y${el.arrMm[1][1]} F${this.feed}`);
      for (let i = 2; i < el.arrMm.length; i++) {
        this.text.push(`X${el.arrMm[i][0]} Y${el.arrMm[i][1]} `);
      }
      this.text.push(`G0 Z${this.zSafe}`);
    });
    this.text.push(GcodeLinear.END_LINE);
  }
  async formMe() {
    this.createTemplate();
    const res = await fetch("/writeFile/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.name,
        ext: this.ext,
        text: this.text,
      }),
    });
  }
}
