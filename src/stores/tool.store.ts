import { makeAutoObservable } from 'mobx';
import BaseTool from '../core/models/base-tool';

class ToolStore {
  private tools: BaseTool[] = [];
  private selectedTool: BaseTool | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getTools(): BaseTool[] {
    return this.tools;
  }

  getSelectedTool(): BaseTool | null {
    return this.selectedTool;
  }

  setTools(...tools: BaseTool[]): void {
    this.tools = tools;
    this.unselectTool();
  }

  selectTool(tool: BaseTool): void {
    // TODO: optimize this and remove unselectTool() function
    this.unselectTool();
    this.selectedTool = tool;
    this.selectedTool.bindEventListeners();
  }

  unselectTool(): void {
    if (this.selectedTool) {
      this.selectedTool.clean();
      this.selectedTool.removeEventListeners();
    }
    this.selectedTool = null;
  }
}

export default ToolStore;
