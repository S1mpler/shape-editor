abstract class BaseShape {
  readonly id: string;
  name: string;
  description: string;
  color: string;
  icon: string;

  constructor(name?: string, icon?: string, description?: string, color?: string) {
    this.id = crypto.randomUUID();
    this.name = name ?? '';
    this.icon = icon ?? '';
    this.description = description ?? '';
    this.color = color ?? '';
  }
}

export { BaseShape };
