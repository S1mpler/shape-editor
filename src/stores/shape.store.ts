import { makeAutoObservable } from 'mobx';
import BasePolygon from '../core/models/base-polygon';

class ShapeStore {
  private shapes: BasePolygon[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addShape(shape: BasePolygon): void {
    this.shapes.unshift(shape);
  }

  getShapes(): BasePolygon[] {
    return this.shapes;
  }

  updateShape(updatedShape: BasePolygon): void {
    this.shapes = this.shapes.map((shape) => shape.id === updatedShape.id
      ? updatedShape
      : shape
    );
  }
}

export default ShapeStore;
