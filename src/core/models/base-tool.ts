/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import 'reflect-metadata';
import BasePolygon from './base-polygon';
import ITool from './tool.interface';
import { ToolIconType } from './icon.type';
import Drawer from '../drawer';

abstract class BaseTool implements ITool {
  id: string;
  name: string;
  icon: ToolIconType | null;
  description: string;
  canvas: HTMLCanvasElement;
  private readonly drawer: Drawer;
  private readonly context: CanvasRenderingContext2D;
  private readonly eventListeners: Map<keyof HTMLElementEventMap, (event: Event) => void>;

  constructor(canvas: HTMLCanvasElement, name?: string, icon?: ToolIconType, description?: string) {
    this.id = crypto.randomUUID();
    this.name = name ?? '';
    this.icon = icon ?? null;
    this.description = description ?? '';
    this.canvas = canvas;
    this.context = canvas.getContext('2d')!;
    this.drawer = new Drawer(this.context);
    this.eventListeners = new Map();
  }

  public clean(): void {
    const onCleanMethodKey = Reflect.getMetadata('onClean', this) as string | undefined;
    if (onCleanMethodKey) {
      // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
      const onCleanMethod = (this as any)[onCleanMethodKey] as Function;
      if (typeof onCleanMethod === 'function') {
        onCleanMethod.call(this);
      }
    }
  }

  redrawShapes(shapes: BasePolygon[]): void {
    this.drawer.drawShapes(shapes);
  }

  bindEventListeners(): void {
    let currentProto = Object.getPrototypeOf(this);
    while (currentProto && currentProto !== BaseTool.prototype) {
      for (const key of Object.getOwnPropertyNames(currentProto)) {
        if (this._isPropertyKey(key)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const method = (this as any)[key];
          const eventName = Reflect.getMetadata('event', this, key) as keyof HTMLElementEventMap | undefined;
          if (eventName && typeof method === 'function') {
            const boundMethod = (event: Event): void => {
              method.call(this, event, this.context);
            };
            this.canvas.addEventListener(eventName, boundMethod);
            this.eventListeners.set(eventName, boundMethod);
          }
        }
      }
      currentProto = Object.getPrototypeOf(currentProto);
    }
  }

  removeEventListeners(): void {
    for (const [event, listener] of Array.from(this.eventListeners)) {
      this.canvas.removeEventListener(event, listener);
    }

    this.eventListeners.clear();
  }

  private _isPropertyKey(value: string): value is keyof BaseTool {
    const baseToolProperties = [
      ...Object.getOwnPropertyNames(BaseTool.prototype),
      'canvas',
      'context',
      'eventListeners'
    ];
    return !baseToolProperties.includes(value);
  }
}

export default BaseTool;
