export class SelectionManager {
  constructor(editor) {
    this.editor = editor;
  }

  saveSelection() {
    const selection = window.getSelection();
    if (selection.rangeCount === 0) {
      return null;
    }

    const range = selection.getRangeAt(0);
    
    if (!this.editor.contains(range.startContainer) && !this.editor.contains(range.endContainer)) {
      return null;
    }

    return {
      startContainer: range.startContainer,
      startOffset: range.startOffset,
      endContainer: range.endContainer,
      endOffset: range.endOffset,
      collapsed: range.collapsed
    };
  }

  restoreSelection(savedSelection) {
    if (!savedSelection) {
      return false;
    }

    const selection = window.getSelection();
    const range = document.createRange();

    try {
      range.setStart(savedSelection.startContainer, savedSelection.startOffset);
      range.setEnd(savedSelection.endContainer, savedSelection.endOffset);
      
      selection.removeAllRanges();
      selection.addRange(range);
      
      return true;
    } catch (e) {
      console.warn('Failed to restore selection:', e);
      return false;
    }
  }

  getCurrentRange() {
    const selection = window.getSelection();
    if (selection.rangeCount === 0) {
      return null;
    }
    return selection.getRangeAt(0);
  }

  getSelectedText() {
    const range = this.getCurrentRange();
    return range ? range.toString() : '';
  }

  isSelectionInEditor() {
    const range = this.getCurrentRange();
    if (!range) return false;
    
    return this.editor.contains(range.startContainer) || 
           this.editor.contains(range.endContainer);
  }

  collapseToStart() {
    const range = this.getCurrentRange();
    if (range) {
      range.collapse(true);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  collapseToEnd() {
    const range = this.getCurrentRange();
    if (range) {
      range.collapse(false);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
}
