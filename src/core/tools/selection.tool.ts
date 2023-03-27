
import { shapeStore } from '../../context/store.context';
import { Canvas } from '../../core/decorators/canvas.decorator';
import { OnClean } from '../../core/decorators/on-clean.decorator';
import { Tool } from '../../core/decorators/tool.decorator';
import Drawer from '../../core/drawer';
import BasePolygon from '../../core/models/base-polygon';
import BaseTool from '../../core/models/base-tool';
import IPoint from '../../core/models/point.interface';
import { getCanvasMousePosition } from '../../core/utils/helpers/canvas-helper-functions';
import { isPointInPolygon } from '../../core/utils/helpers/geometry-helper-functions';

@Tool({
  name: 'Selection',
  icon: 'selection',
  description: 'Select a shape'
})
class SelectionTool extends BaseTool {
  private readonly shapeStore = shapeStore;
  private selectedShape: BasePolygon | null = null;

  @OnClean()
  public cleanState(): void {
    this.selectedShape = null;
    this.redrawShapes(this.shapeStore.getShapes());
  }

  @Canvas('click')
  public handleClick(event: MouseEvent, ctx: CanvasRenderingContext2D): void {
    const drawer = new Drawer(ctx);

    const clickPoint = getCanvasMousePosition(event, this.canvas);
    const shape = this.getShapeAtPosition(clickPoint);

    if (!shape) {
      this.selectedShape = null;
      drawer.drawShapes(this.shapeStore.getShapes());
      return;
    }

    if (this.isTheSameShape(shape, this.selectedShape)) {
      return;
    }

    this.selectedShape = shape;
    drawer.drawShapes(this.shapeStore.getShapes());
    this.drawSelectionBox(ctx, this.selectedShape);
  }

  private isTheSameShape(shape1: BasePolygon | null, shape2: BasePolygon | null): boolean {
    return shape1?.id === shape2?.id;
  }

  private drawSelectionBox(ctx: CanvasRenderingContext2D, shape: BasePolygon): void {
    ctx.strokeStyle = '#0d4f91';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(shape.vertices[0].x, shape.vertices[0].y);
    for (let i = 1; i < shape.vertices.length; i++) {
      ctx.lineTo(shape.vertices[i].x, shape.vertices[i].y);
    }
    ctx.closePath();
    ctx.stroke();
  }

  private getShapeAtPosition(position: IPoint): BasePolygon | null {
    for (const shape of this.shapeStore.getShapes()) {
      if (isPointInPolygon(position, shape.vertices)) {
        return shape;
      }
    }

    return null;
  }
}

export default SelectionTool;
