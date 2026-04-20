export class Command {
  constructor(editor) {
    this.editor = editor;
    this.executed = false;
  }

  execute() {
    throw new Error('execute() must be implemented');
  }

  undo() {
    throw new Error('undo() must be implemented');
  }

  redo() {
    return this.execute();
  }
}
