import { CommandHistory } from './command-history';
import { 
  BoldCommand, 
  ItalicCommand, 
  UnderlineCommand, 
  ForeColorCommand,
  BackColorCommand 
} from './format-commands';
import { 
  BlockFormatCommand, 
  AlignCommand, 
  ListCommand, 
  IndentCommand,
  RemoveFormatCommand
} from './block-commands';

export class CommandExecutor {
  constructor(editor, selectionManager) {
    this.editor = editor;
    this.selectionManager = selectionManager;
    this.commandHistory = new CommandHistory(100);
  }

  executeCommand(command) {
    const savedSelection = this.selectionManager.saveSelection();
    
    if (command.execute()) {
      this.commandHistory.push(command);
      
      if (savedSelection) {
        this.selectionManager.restoreSelection(savedSelection);
      }
      
      return true;
    }
    
    return false;
  }

  bold() {
    return this.executeCommand(new BoldCommand(this.editor));
  }

  italic() {
    return this.executeCommand(new ItalicCommand(this.editor));
  }

  underline() {
    return this.executeCommand(new UnderlineCommand(this.editor));
  }

  foreColor(color) {
    return this.executeCommand(new ForeColorCommand(this.editor, color));
  }

  backColor(color) {
    return this.executeCommand(new BackColorCommand(this.editor, color));
  }

  formatBlock(tagName) {
    return this.executeCommand(new BlockFormatCommand(this.editor, tagName));
  }

  justifyLeft() {
    return this.executeCommand(new AlignCommand(this.editor, 'left'));
  }

  justifyCenter() {
    return this.executeCommand(new AlignCommand(this.editor, 'center'));
  }

  justifyRight() {
    return this.executeCommand(new AlignCommand(this.editor, 'right'));
  }

  justifyFull() {
    return this.executeCommand(new AlignCommand(this.editor, 'justify'));
  }

  insertOrderedList() {
    return this.executeCommand(new ListCommand(this.editor, 'ol'));
  }

  insertUnorderedList() {
    return this.executeCommand(new ListCommand(this.editor, 'ul'));
  }

  indent() {
    return this.executeCommand(new IndentCommand(this.editor, true));
  }

  outdent() {
    return this.executeCommand(new IndentCommand(this.editor, false));
  }

  removeFormat() {
    return this.executeCommand(new RemoveFormatCommand(this.editor));
  }

  undo() {
    if (this.commandHistory.canUndo()) {
      const command = this.commandHistory.undo();
      return command !== null;
    }
    return false;
  }

  redo() {
    if (this.commandHistory.canRedo()) {
      const command = this.commandHistory.redo();
      return command !== null;
    }
    return false;
  }

  canUndo() {
    return this.commandHistory.canUndo();
  }

  canRedo() {
    return this.commandHistory.canRedo();
  }

  clearHistory() {
    this.commandHistory.clear();
  }

  execCommand(commandId, value) {
    switch (commandId.toLowerCase()) {
      case 'bold':
        return this.bold();
      case 'italic':
        return this.italic();
      case 'underline':
        return this.underline();
      case 'forecolor':
        return this.foreColor(value);
      case 'backcolor':
        return this.backColor(value);
      case 'formatblock':
        return this.formatBlock(value);
      case 'justifyleft':
        return this.justifyLeft();
      case 'justifycenter':
        return this.justifyCenter();
      case 'justifyright':
        return this.justifyRight();
      case 'justifyfull':
        return this.justifyFull();
      case 'insertorderedlist':
        return this.insertOrderedList();
      case 'insertunorderedlist':
        return this.insertUnorderedList();
      case 'indent':
        return this.indent();
      case 'outdent':
        return this.outdent();
      case 'removeformat':
        return this.removeFormat();
      case 'undo':
        return this.undo();
      case 'redo':
        return this.redo();
      default:
        console.warn(`Unknown command: ${commandId}`);
        return false;
    }
  }
}
