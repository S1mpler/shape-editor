
# Shape Editor
Author @S1mpler (Stanislav Dior)

**DEMO** https://shape-editor.vercel.app/

**Shape Editor**  is an intuitive demo application designed for drawing and manipulating pre-defined shapes with the help of an array of tools. To create a shape, click the corresponding button located at the bottom of the toolbar. Manipulate the shape by selecting the appropriate tool situated at the top of the toolbar. Each toolbar item features a tooltip that elucidates its function. To output information about the drawn shapes to the console, click the "Print to console" button in the top right corner of the page.

## Tech stack
TypeScript, React, MobX, Tailwind, HTML5 Canvas


# Run locally

Install dependencies:
```
npm install
```

Run the application:
```
npm run start
```

# Shape Editor System Design

This document outlines the system design for the Shape Editor application, focusing on its main components and their responsibilities.

## 1. Editor Component

The `Editor` component serves as the root of the application (index route), managing the state of available tools while rendering the toolbar and canvas. Tools are defined and initialized within the `Editor` component to prevent unnecessary re-creation during each render. When a tool is selected, it is activated.

## 2. Canvas Component

Responsible for rendering the canvas and managing the shapes' state, the `Canvas` component is a MobX observer. This means it will re-render whenever the state of the shapes is altered. Additionally, it oversees the rendering of shapes on the canvas utilizing a `Drawer`.

## 3. Drawer Class

The `Drawer` class is in charge of rendering shapes on the canvas. By calling the `draw` method of a shape, the `Drawer` class enables its rendering on the canvas. The shape's `draw` method is responsible for rendering the shape according to the corresponding draw strategy.

## 4. Shape Class Hierarchy

The `BaseShape` class acts as the foundation for all shapes, encompassing essential properties for each shape. Extending the `BaseShape` class, the `BasePolygon` class includes the `vertices` property, an array of vertices that define the shape. Furthermore, it specifies a draw strategy and contains a `draw` method to render the shape on the canvas with the designated draw strategy.

To create a new shape, develop a new class extending the `BasePolygon` class and assign the `vertices` property to the array of vertices. The `BasePolygon` class features a `draw` method that renders the shape on the canvas using the appropriate draw strategy. Additionally, apply the `@Shape` decorator to the class to register all shape-related metadata.


Here is a basic example of a new shape:
```typescript
@Shape({
  name: 'Rectangle',
  description: 'A rectangle shape',
  icon: 'rectangle',
  color: '#76b1e8'
})
class Rectangle extends BasePolygon {
  vertices: IPoint[] = [] as IPoint[];

  constructor() {
    super();
    this.createVertices(SPAWN_POINT);
  }

  createVertices(position: IPoint): void {
    this.vertices = [
      { x: position.x - 100, y: position.y - 50 },
      { x: position.x + 100, y: position.y - 50 },
      { x: position.x + 100, y: position.y + 50 },
      { x: position.x - 100, y: position.y + 50 }
    ];
  }
}
```

## 5. Tool Class Hierarchy

The `BaseTool` class serves as the foundation for all tools, encompassing essential properties and functions for each tool. This class defines functions for registering and unregistering canvas event handlers. Two method decorators, `@Canvas` and `@OnClean`, can be utilized within the `@Tool` class.

### 5.1 `@Canvas` Decorator

The `@Canvas([eventName])` decorator binds the event handler to the canvas, supplying the event and canvas context as arguments to the event handler function.

### 5.2 `@OnClean` Decorator

The `@OnClean` decorator registers a function to be executed when a tool is deselected. This decorator is valuable for cleaning up the canvas after tool deselection. Since a new tool instance is never created, the `@OnClean` decorator serves as the sole method for cleaning the canvas and the internal tool's state after deselection.


Here is a basic example of a new tool:
```typescript
// ...
import { shapeStore } from '../../context/store.context';

@Tool({
  name: 'Show distance',
  icon: 'distance-between',
  description: 'Show distance between two points'
})
class DistanceTool extends BaseTool {
  private readonly shapeStore = shapeStore;
  private point1: IPoint | null = null;
  private point2: IPoint | null = null;

  @OnClean()
  public cleanState(): void {
    this.point1 = null;
    this.point2 = null;
  }

  @Canvas('mousedown')
  public handleClick(event: MouseEvent, ctx: CanvasRenderingContext2D): void {
    // Set the first point
  }

  @Canvas('mousemove')
  public handleMouseMove(event: MouseEvent, ctx: CanvasRenderingContext2D): void {
    // Show the distance between the first point and the current mouse position

    // Call this.redrawShapes(this.shapeStore.getShapes())
    // to redraw the shapes and triger the canvas re-render
  }

  @Canvas('mouseup')
  public handleMouseUp(event: MouseEvent, ctx: CanvasRenderingContext2D): void {
    // Set the second point
    // Draw the distance line with text between the first and the second point
  }
}
```

# Strengths and Areas for Improvement

## Strengths
- Exceptional tool design: The `@Tool` decorator enables developers to specify basic tool information, simplifying the process of adding new tools. Create a new class that extends the `BaseTool` class and use `@Canvas([eventName])` to bind the event handler to the canvas. When a tool is deselected, its event handlers are automatically unbound from the canvas.

- Outstanding polygon shape design: The `@Shape` decorator allows developers to set basic tool information, making it easy to add new shapes. Create a new class that extends the `BasePolygon` class and assign the `vertices` property to the array of vertices. The `BasePolygon` class contains a `draw` method that renders the shape on the canvas using the corresponding draw strategy.

- Shape serialization: MobX enables seamless application state serialization with constant access to the most recent data.

- Engaging and challenging assignment that stimulated cognitive abilities and fueled interest in visual editor development.

- Established a basic CI/CD pipeline using GitHub Actions & Vercel, providing a demo of the application without the need for local execution.

## Areas for Improvement
- Insufficient time to set up tests: Jest and React Testing Library would be employed to test components and application state.

- Limited shape handling capabilities: The editor can manage any vertex-based shape, but not shapes with holes, radius-based shapes, and similar complexities.

- Initial plan to use `three.js` with `react/fiber` was abandoned due to inadequate information about employing `three.js` for a basic 2D environment. HTML5 Canvas was chosen as it meets the application's requirements without necessitating extensive calculations or space/object manipulations.

## Novel Approaches
- First-time use of MobX, which is simpler than Redux and requires considerably less boilerplate code.

- Full utilization of decorators, which proved effective in adding metadata to classes and methods, despite their potential to reduce code readability.
