import { ShapeIconType } from './icon.type';

abstract class BaseShape {
  readonly id: string;
  name: string;
  description: string;
  color: string;
  icon: ShapeIconType | null;

  constructor(name?: string, icon?: ShapeIconType, description?: string, color?: string) {
    this.id = crypto.randomUUID();
    this.name = name ?? '';
    this.icon = icon ?? null;
    this.description = description ?? '';
    this.color = color ?? '';
  }
}

export { BaseShape };
