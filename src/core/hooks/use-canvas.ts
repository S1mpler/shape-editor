import { useRef, useEffect, MutableRefObject, useState } from 'react';

interface CanvasRefAndContext {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>
  ctx: CanvasRenderingContext2D | null
}

const useCanvas = (): CanvasRefAndContext => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      setCtx(context);
    }
  }, []);

  return { canvasRef, ctx };
};

export { useCanvas };
