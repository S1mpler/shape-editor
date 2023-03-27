import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { StoreContext } from '../context/store.context';
import { useCanvas } from '../core/hooks/use-canvas';
import { useDrawer } from '../core/hooks/use-drawer';

interface IProps {
  width: number
  height: number
  onInit: (canvas: HTMLCanvasElement) => void
}

const CanvasView: React.FC<IProps> = ({ width, height, onInit }: IProps) => {
  const { shapeStore } = useContext(StoreContext);
  const { canvasRef, ctx } = useCanvas();
  const { drawer } = useDrawer(ctx);
  const shapes = shapeStore.getShapes().slice();

  drawer?.drawShapes(shapes);

  useEffect(() => {
    if (!ctx || !canvasRef?.current) { return; }

    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
    onInit(canvas);
  }, [ctx]);

  return (
    <>
      <canvas ref={canvasRef} className='w-screen h-screen' ></canvas>
    </>
  );
};

export default observer(CanvasView);
