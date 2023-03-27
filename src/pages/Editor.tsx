import { ReactElement, useContext } from 'react';
import ClosestDistanceTool from '../core/tools/closest-distance.tool';
import MoveTool from '../core/tools/move.tool';
import SelectionTool from '../core/tools/selection.tool';
import Canvas from '../components/Canvas';
import Toolbar from '../components/Toolbar';
import { StoreContext } from '../context/store.context';

function EditorPage(): ReactElement {
  const { toolStore } = useContext(StoreContext);

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

  return (
    <>
      <div data-testid="editor-page" className='w-screen h-screen relative'>
        <div className='absolute z-10 top-1/2 -translate-y-1/2 left-10'>
          <Toolbar />
        </div>
        <Canvas width={canvasResolution.width} height={canvasResolution.height} onInit={onCanvasInit} />
      </div>
    </>
  );
}

export default EditorPage;
