export class Contour{
    static X0 = 0;
    static Y0 = 0;
    constructor(id, contx){
        this.id = id;
        this.arrPx = [];
        this.arrMm = [];
        this.context = contx
        this.li = undefined
    }
    setStock(stk){
        if (stk){
            this.stock = stk
            this.pxToMm = stk.pxToMm
        }
        else{
            console.log('error');
        }

    }
    setPointsByPx(x, y){
        this.arrPx.push([x, y])
        
    }
    getPoints(){
        return this.arrPx
    }
    transformPoints(){
       this.arrMm = this.arrPx.map((el) => [
         parseFloat(((el[0] - this.stock.x0) * this.pxToMm).toFixed(3)),
         parseFloat(((this.stock.y0 - el[1]) * this.pxToMm).toFixed(3))
       ]);
    }
    setViewHTML(li){
        this.li =li
    }
    
   
}