import { useEffect, useState } from 'react';
import Drawer from '../drawer';

const useDrawer = (context: CanvasRenderingContext2D | null): { drawer: Drawer | null } => {
  const [drawer, setDrawer] = useState<Drawer | null>(null);

  useEffect(() => {
    if (!context) return;
    const newDrawer = new Drawer(context);
    setDrawer(newDrawer);

    return () => {
      setDrawer(null);
    };
  }, [context]);

  return { drawer };
};

export { useDrawer };
