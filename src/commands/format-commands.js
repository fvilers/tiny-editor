import { Command } from './command';
import { DOMUtils } from '../utils/dom-utils';

export class InlineFormatCommand extends Command {
  constructor(editor, tagName, styleProperty, styleValue) {
    super(editor);
    this.tagName = tagName;
    this.styleProperty = styleProperty;
    this.styleValue = styleValue;
    this.savedState = null;
    this.savedSelection = null;
  }

  execute() {
    const selectionManager = this.editor.selectionManager;
    const range = selectionManager.getCurrentRange();
    
    if (!range || range.collapsed) {
      return false;
    }

    this.savedSelection = selectionManager.saveSelection();
    this.savedState = this.saveRangeState(range);

    if (this.isActive()) {
      this.removeFormat(range);
    } else {
      this.applyFormat(range);
    }

    this.executed = true;
    return true;
  }

  undo() {
    if (!this.executed || !this.savedState) {
      return;
    }

    this.restoreRangeState(this.savedState);
    
    if (this.savedSelection) {
      this.editor.selectionManager.restoreSelection(this.savedSelection);
    }
  }

  applyFormat(range) {
    const splitRange = DOMUtils.splitRangeBoundaries(range);
    const textNodes = DOMUtils.getTextNodesInRange(splitRange);

    for (const textNode of textNodes) {
      if (this.styleProperty && this.styleValue) {
        this.applyStyleToNode(textNode);
      } else {
        this.applyTagToNode(textNode);
      }
    }
  }

  removeFormat(range) {
    const textNodes = DOMUtils.getTextNodesInRange(range);

    for (const textNode of textNodes) {
      if (this.styleProperty && this.styleValue) {
        this.removeStyleFromNode(textNode);
      } else {
        this.removeTagFromNode(textNode);
      }
    }
  }

  applyTagToNode(textNode) {
    const parent = textNode.parentNode;
    const wrapper = document.createElement(this.tagName);
    parent.replaceChild(wrapper, textNode);
    wrapper.appendChild(textNode);
  }

  removeTagFromNode(textNode) {
    let current = textNode.parentNode;
    while (current && current !== this.editor) {
      if (current.tagName && current.tagName.toLowerCase() === this.tagName) {
        DOMUtils.unwrapElement(current);
        break;
      }
      current = current.parentNode;
    }
  }

  applyStyleToNode(textNode) {
    const parent = DOMUtils.getParentElement(textNode);
    
    if (parent.tagName.toLowerCase() === 'span' && 
        parent.getAttribute('style')) {
      parent.style[this.styleProperty] = this.styleValue;
    } else {
      const span = document.createElement('span');
      span.style[this.styleProperty] = this.styleValue;
      const textNodeParent = textNode.parentNode;
      textNodeParent.replaceChild(span, textNode);
      span.appendChild(textNode);
    }
  }

  removeStyleFromNode(textNode) {
    let current = textNode.parentNode;
    while (current && current !== this.editor) {
      if (current.style && current.style[this.styleProperty] === this.styleValue) {
        current.style.removeProperty(this.styleProperty);
        if (current.tagName.toLowerCase() === 'span' && !current.getAttribute('style')) {
          DOMUtils.unwrapElement(current);
        }
        break;
      }
      current = current.parentNode;
    }
  }

  isActive() {
    const selection = window.getSelection();
    if (selection.rangeCount === 0) return false;

    const range = selection.getRangeAt(0);
    const textNodes = DOMUtils.getTextNodesInRange(range);

    if (textNodes.length === 0) return false;

    return textNodes.every(node => this.isNodeFormatted(node));
  }

  isNodeFormatted(textNode) {
    let current = textNode.parentNode;
    while (current && current !== this.editor) {
      if (this.styleProperty && this.styleValue) {
        if (current.style && current.style[this.styleProperty] === this.styleValue) {
          return true;
        }
      } else {
        if (current.tagName && current.tagName.toLowerCase() === this.tagName) {
          return true;
        }
      }
      current = current.parentNode;
    }
    return false;
  }

  saveRangeState(range) {
    const textNodes = DOMUtils.getTextNodesInRange(range);
    return textNodes.map(node => ({
      node: node,
      html: node.parentElement.outerHTML,
      parentPath: this.getNodePath(node.parentElement)
    }));
  }

  restoreRangeState(savedState) {
    for (const state of savedState) {
      const parent = this.getNodeFromPath(state.parentPath);
      if (parent) {
        const temp = document.createElement('div');
        temp.innerHTML = state.html;
        DOMUtils.replaceNode(parent, temp.firstChild);
      }
    }
  }

  getNodePath(node) {
    const path = [];
    let current = node;
    while (current && current !== this.editor) {
      const parent = current.parentNode;
      const index = Array.from(parent.childNodes).indexOf(current);
      path.unshift(index);
      current = parent;
    }
    return path;
  }

  getNodeFromPath(path) {
    let current = this.editor;
    for (const index of path) {
      if (current.childNodes[index]) {
        current = current.childNodes[index];
      } else {
        return null;
      }
    }
    return current;
  }
}

export class BoldCommand extends InlineFormatCommand {
  constructor(editor) {
    super(editor, 'strong');
  }
}

export class ItalicCommand extends InlineFormatCommand {
  constructor(editor) {
    super(editor, 'em');
  }
}

export class UnderlineCommand extends InlineFormatCommand {
  constructor(editor) {
    super(editor, 'u');
  }
}

export class ForeColorCommand extends InlineFormatCommand {
  constructor(editor, color) {
    super(editor, 'span', 'color', color);
  }
}

export class BackColorCommand extends InlineFormatCommand {
  constructor(editor, color) {
    super(editor, 'span', 'backgroundColor', color);
  }
}
