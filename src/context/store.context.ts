import { createContext } from 'react';
import ShapeStore from '../stores/shape.store';
import ToolStore from '../stores/tool.store';

interface IStoreContext {
  toolStore: ToolStore
  shapeStore: ShapeStore
}

const toolStore = new ToolStore();
const shapeStore = new ShapeStore();

export const StoreContext = createContext<IStoreContext>({
  toolStore,
  shapeStore
});

export { toolStore, shapeStore };
