import { BaseShape } from '../../core/models/base-shape';

interface IDrawStrategy<T extends BaseShape> {
  draw: (context: CanvasRenderingContext2D, shape: T) => void
}

export type { IDrawStrategy };
