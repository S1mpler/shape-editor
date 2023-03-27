import { ReactElement, useContext } from 'react';
import ClosestDistanceTool from '../core/tools/closest-distance.tool';
import MoveTool from '../core/tools/move.tool';
import SelectionTool from '../core/tools/selection.tool';
import Canvas from '../components/Canvas';
import Toolbar from '../components/Toolbar';
import { StoreContext } from '../context/store.context';
import { serializeShapes } from '../core/utils/serialization';

function EditorPage(): ReactElement {
  const { toolStore, shapeStore } = useContext(StoreContext);

  const canvasResolution = {
    width: 1000,
    height: 1000 * window.innerHeight / window.innerWidth
  };

  const onCanvasInit = (canvas: HTMLCanvasElement): void => {
    toolStore.setTools(
      new SelectionTool(canvas),
      new MoveTool(canvas),
      new ClosestDistanceTool(canvas)
    );
  };

  const handleSerialize = (): void => {
    console.log(serializeShapes(shapeStore.getShapes()));
  };

  return (
    <>
      <div data-testid="editor-page" className='w-screen h-screen relative'>
        <div className='absolute z-10 top-1/2 -translate-y-1/2 left-10'>
          <Toolbar />
        </div>
        <div className='absolute z-10 top-6 right-6'>
          <button className='px-5 py-2 border-blue-300 border rounded text-blue-400 hover:shadow-sm' onClick={handleSerialize}>
            Print to console
          </button>
        </div>
        <Canvas width={canvasResolution.width} height={canvasResolution.height} onInit={onCanvasInit} />
      </div>
    </>
  );
}

export default EditorPage;
