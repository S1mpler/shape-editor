import BasePolygon from './models/base-polygon';

class Drawer {
  private readonly _ctx: CanvasRenderingContext2D;

  constructor(_ctx: CanvasRenderingContext2D) {
    this._ctx = _ctx;
  }

  drawShape(shape: BasePolygon): void {
    shape.draw(this._ctx);
  }

  drawShapes(shapes: BasePolygon[]): void {
    this.cleanCanvas();
    shapes.forEach((shape) => { this.drawShape(shape); });
  }

  cleanCanvas(): void {
    this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
  }
}

export default Drawer;
