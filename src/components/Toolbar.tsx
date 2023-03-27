import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { StoreContext } from '../context/store.context';
import BasePolygon from '../core/models/base-polygon';
import BaseTool from '../core/models/base-tool';
import Hexagon from '../core/shapes/hexagon.shape';
import Square from '../core/shapes/square.shape';
import Triangle from '../core/shapes/triangle.shape';
import Icon from './Icon';

const ToolbarView: React.FC = () => {
  const { toolStore, shapeStore } = useContext(StoreContext);
  const tools = toolStore.getTools();
  const selectedTool = toolStore.getSelectedTool();

  const onSelectToolHandler = (tool: BaseTool): void => {
    if (selectedTool?.name === tool.name) {
      toolStore.unselectTool();
    } else {
      toolStore.selectTool(tool);
    }
  };

  const onAddShapeHandler = (shape: BasePolygon): void => {
    shapeStore.addShape(shape);
  };

  return (
    <div className='flex flex-col w-16 py-4 shadow-md rounded-md bg-white'>
      <ul className='flex flex-col items-center'>
        {tools.map((tool, index) => {
          const isSelected = selectedTool?.name === tool.name;
          return (
            <li className='relative my-3 h-10 w-full flex justify-center items-center' key={index}>
              <button
                className={`flex justify-center items-center w-full h-full after:w-1 after:h-full after:top-0 after:right-0 after:absolute after:rounded-sm after:transition ${isSelected ? 'after:bg-blue-300 hover:after:bg-blue-400' : 'hover:after:bg-gray-300'}`}
                onClick={() => { onSelectToolHandler(tool); }}>
                <Icon name={tool.icon} />
              </button>
            </li>
          );
        })}
      </ul >

      <ul className='flex flex-col items-center mt-8'>
        <li className='relative my-3 w-full h-10 flex justify-center items-center'>
          <button onClick={() => { onAddShapeHandler(new Triangle()); }}>
            <Icon name="triangle" />
          </button>
        </li>
        <li className='relative my-3 w-full h-10 flex justify-center items-center'>
          <button onClick={() => { onAddShapeHandler(new Square()); }}>
            <Icon name="square" />
          </button>
        </li>
        <li className='relative my-3 w-full h-10 flex justify-center items-center'>
          <button onClick={() => { onAddShapeHandler(new Hexagon()); }}>
            <Icon name="hexagon" />
          </button>
        </li>
      </ul>
    </div >
  );
};

export default observer(ToolbarView);
