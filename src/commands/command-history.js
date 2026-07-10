export class CommandHistory {
  constructor(maxHistorySize = 100) {
    this.undoStack = [];
    this.redoStack = [];
    this.maxHistorySize = maxHistorySize;
  }

  push(command) {
    this.undoStack.push(command);
    this.redoStack = [];

    if (this.undoStack.length > this.maxHistorySize) {
      this.undoStack.shift();
    }
  }

  canUndo() {
    return this.undoStack.length > 0;
  }

  canRedo() {
    return this.redoStack.length > 0;
  }

  undo() {
    if (!this.canUndo()) {
      return null;
    }

    const command = this.undoStack.pop();
    command.undo();
    this.redoStack.push(command);

    return command;
  }

  redo() {
    if (!this.canRedo()) {
      return null;
    }

    const command = this.redoStack.pop();
    command.redo();
    this.undoStack.push(command);

    return command;
  }

  clear() {
    this.undoStack = [];
    this.redoStack = [];
  }
}
