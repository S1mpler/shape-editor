import { shapeStore } from '../../context/store.context';
import { Canvas } from '../../core/decorators/canvas.decorator';
import { OnClean } from '../../core/decorators/on-clean.decorator';
import { Tool } from '../../core/decorators/tool.decorator';
import BasePolygon from '../../core/models/base-polygon';
import BaseTool from '../../core/models/base-tool';
import IPoint from '../../core/models/point.interface';
import { getCanvasMousePosition } from '../../core/utils/helpers/canvas-helper-functions';
import { isPointInPolygon } from '../../core/utils/helpers/geometry-helper-functions';

@Tool({
  name: 'Move',
  icon: 'move',
  description: 'Move a shape'
})
class MoveTool extends BaseTool {
  private readonly shapeStore = shapeStore;
  private isDragging = false;
  private draggingShape: BasePolygon | null = null;
  private initialClickPosition: IPoint | null = null;

  @OnClean()
  public cleanState(): void {
    this.isDragging = false;
    this.draggingShape = null;
    this.initialClickPosition = null;
  }

  @Canvas('mousedown')
  public handleMouseDown(event: MouseEvent, ctx: CanvasRenderingContext2D): void {
    const clickPoint = getCanvasMousePosition(event, this.canvas);

    const shape = this.getShapeAtPosition(clickPoint);
    if (!shape) {
      return;
    }

    this.isDragging = true;
    this.draggingShape = shape;

    this.initialClickPosition = {
      x: clickPoint.x - this.draggingShape.vertices[0].x,
      y: clickPoint.y - this.draggingShape.vertices[0].y
    };
  }

  @Canvas('mousemove')
  public handleMouseMove(event: MouseEvent): void {
    if (!this.isDragging || !this.draggingShape || !this.initialClickPosition) {
      return;
    }

    const mousePoint = getCanvasMousePosition(event, this.canvas);

    const deltaX = mousePoint.x - this.initialClickPosition.x - this.draggingShape.vertices[0].x;
    const deltaY = mousePoint.y - this.initialClickPosition.y - this.draggingShape.vertices[0].y;

    for (const vertex of this.draggingShape.vertices) {
      vertex.x += deltaX;
      vertex.y += deltaY;
    }

    this.shapeStore.updateShape(this.draggingShape);
  }

  @Canvas('mouseup')
  public handleMouseUp(): void {
    if (!this.isDragging || !this.draggingShape) {
      return;
    }
    this.isDragging = false;
    this.shapeStore.updateShape(this.draggingShape);
    this.draggingShape = null;
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

export default MoveTool;
