import { Command } from './command';
import { DOMUtils } from '../utils/dom-utils';

export class BlockFormatCommand extends Command {
  constructor(editor, tagName) {
    super(editor);
    this.tagName = tagName;
    this.savedState = null;
    this.savedSelection = null;
  }

  execute() {
    const selectionManager = this.editor.selectionManager;
    const range = selectionManager.getCurrentRange();
    
    if (!range) {
      return false;
    }

    this.savedSelection = selectionManager.saveSelection();
    this.savedState = this.saveBlockState(range);

    this.applyBlockFormat(range);

    this.executed = true;
    return true;
  }

  undo() {
    if (!this.executed || !this.savedState) {
      return;
    }

    this.restoreBlockState(this.savedState);
    
    if (this.savedSelection) {
      this.editor.selectionManager.restoreSelection(this.savedSelection);
    }
  }

  applyBlockFormat(range) {
    const blockElements = this.getBlockElementsInRange(range);

    for (const block of blockElements) {
      this.changeBlockTag(block, this.tagName);
    }
  }

  getBlockElementsInRange(range) {
    const blocks = [];
    const startBlock = this.getParentBlock(range.startContainer);
    const endBlock = this.getParentBlock(range.endContainer);

    if (startBlock === endBlock) {
      if (startBlock) {
        blocks.push(startBlock);
      }
    } else {
      const commonAncestor = DOMUtils.getCommonAncestor(startBlock, endBlock);
      const walker = document.createTreeWalker(
        commonAncestor,
        NodeFilter.SHOW_ELEMENT,
        {
          acceptNode: (node) => {
            return DOMUtils.isBlockElement(node) ? 
              NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
          }
        },
        false
      );

      let node;
      let foundStart = false;
      while ((node = walker.nextNode())) {
        if (node === startBlock) {
          foundStart = true;
        }
        if (foundStart) {
          blocks.push(node);
        }
        if (node === endBlock) {
          break;
        }
      }
    }

    return blocks;
  }

  getParentBlock(node) {
    let current = DOMUtils.getParentElement(node);
    while (current && current !== this.editor) {
      if (DOMUtils.isBlockElement(current)) {
        return current;
      }
      current = current.parentNode;
    }
    return null;
  }

  changeBlockTag(element, newTagName) {
    if (element.tagName.toLowerCase() === newTagName.toLowerCase()) {
      return;
    }

    const newElement = document.createElement(newTagName);
    
    Array.from(element.attributes).forEach(attr => {
      newElement.setAttribute(attr.name, attr.value);
    });

    while (element.firstChild) {
      newElement.appendChild(element.firstChild);
    }

    element.parentNode.replaceChild(newElement, element);
  }

  saveBlockState(range) {
    const blocks = this.getBlockElementsInRange(range);
    return blocks.map(block => ({
      element: block,
      tagName: block.tagName.toLowerCase(),
      outerHTML: block.outerHTML,
      path: this.getNodePath(block)
    }));
  }

  restoreBlockState(savedState) {
    for (const state of savedState.reverse()) {
      const element = this.getNodeFromPath(state.path);
      if (element) {
        const temp = document.createElement('div');
        temp.innerHTML = state.outerHTML;
        DOMUtils.replaceNode(element, temp.firstChild);
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

export class AlignCommand extends Command {
  constructor(editor, alignment) {
    super(editor);
    this.alignment = alignment;
    this.savedState = null;
    this.savedSelection = null;
  }

  execute() {
    const selectionManager = this.editor.selectionManager;
    const range = selectionManager.getCurrentRange();
    
    if (!range) {
      return false;
    }

    this.savedSelection = selectionManager.saveSelection();
    this.savedState = this.saveAlignmentState(range);

    this.applyAlignment(range);

    this.executed = true;
    return true;
  }

  undo() {
    if (!this.executed || !this.savedState) {
      return;
    }

    this.restoreAlignmentState(this.savedState);
    
    if (this.savedSelection) {
      this.editor.selectionManager.restoreSelection(this.savedSelection);
    }
  }

  applyAlignment(range) {
    const blocks = this.getBlockElementsInRange(range);

    for (const block of blocks) {
      block.style.textAlign = this.alignment;
    }
  }

  getBlockElementsInRange(range) {
    const blocks = [];
    const startBlock = this.getParentBlock(range.startContainer);
    const endBlock = this.getParentBlock(range.endContainer);

    if (startBlock === endBlock) {
      if (startBlock) {
        blocks.push(startBlock);
      }
    } else {
      const commonAncestor = DOMUtils.getCommonAncestor(startBlock, endBlock);
      const walker = document.createTreeWalker(
        commonAncestor,
        NodeFilter.SHOW_ELEMENT,
        {
          acceptNode: (node) => {
            return DOMUtils.isBlockElement(node) ? 
              NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
          }
        },
        false
      );

      let node;
      let foundStart = false;
      while ((node = walker.nextNode())) {
        if (node === startBlock) {
          foundStart = true;
        }
        if (foundStart) {
          blocks.push(node);
        }
        if (node === endBlock) {
          break;
        }
      }
    }

    return blocks;
  }

  getParentBlock(node) {
    let current = DOMUtils.getParentElement(node);
    while (current && current !== this.editor) {
      if (DOMUtils.isBlockElement(current)) {
        return current;
      }
      current = current.parentNode;
    }
    return null;
  }

  saveAlignmentState(range) {
    const blocks = this.getBlockElementsInRange(range);
    return blocks.map(block => ({
      element: block,
      textAlign: block.style.textAlign || '',
      path: this.getNodePath(block)
    }));
  }

  restoreAlignmentState(savedState) {
    for (const state of savedState) {
      const element = this.getNodeFromPath(state.path);
      if (element) {
        if (state.textAlign) {
          element.style.textAlign = state.textAlign;
        } else {
          element.style.removeProperty('textAlign');
        }
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

export class ListCommand extends Command {
  constructor(editor, listType) {
    super(editor);
    this.listType = listType;
    this.savedState = null;
    this.savedSelection = null;
  }

  execute() {
    const selectionManager = this.editor.selectionManager;
    const range = selectionManager.getCurrentRange();
    
    if (!range) {
      return false;
    }

    this.savedSelection = selectionManager.saveSelection();
    this.savedState = this.saveListState(range);

    this.toggleList(range);

    this.executed = true;
    return true;
  }

  undo() {
    if (!this.executed || !this.savedState) {
      return;
    }

    this.restoreListState(this.savedState);
    
    if (this.savedSelection) {
      this.editor.selectionManager.restoreSelection(this.savedSelection);
    }
  }

  toggleList(range) {
    const blocks = this.getBlockElementsInRange(range);
    const isInList = blocks.some(block => this.isInList(block));

    if (isInList) {
      this.removeList(blocks);
    } else {
      this.createList(blocks);
    }
  }

  getBlockElementsInRange(range) {
    const blocks = [];
    const startBlock = this.getParentBlock(range.startContainer);
    const endBlock = this.getParentBlock(range.endContainer);

    if (startBlock === endBlock) {
      if (startBlock) {
        blocks.push(startBlock);
      }
    } else {
      const commonAncestor = DOMUtils.getCommonAncestor(startBlock, endBlock);
      const walker = document.createTreeWalker(
        commonAncestor,
        NodeFilter.SHOW_ELEMENT,
        {
          acceptNode: (node) => {
            return DOMUtils.isBlockElement(node) ? 
              NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
          }
        },
        false
      );

      let node;
      let foundStart = false;
      while ((node = walker.nextNode())) {
        if (node === startBlock) {
          foundStart = true;
        }
        if (foundStart) {
          blocks.push(node);
        }
        if (node === endBlock) {
          break;
        }
      }
    }

    return blocks;
  }

  getParentBlock(node) {
    let current = DOMUtils.getParentElement(node);
    while (current && current !== this.editor) {
      if (DOMUtils.isBlockElement(current)) {
        return current;
      }
      current = current.parentNode;
    }
    return null;
  }

  isInList(element) {
    let current = element;
    while (current && current !== this.editor) {
      if (current.tagName === 'UL' || current.tagName === 'OL') {
        return true;
      }
      current = current.parentNode;
    }
    return false;
  }

  createList(blocks) {
    if (blocks.length === 0) return;

    const list = document.createElement(this.listType);
    const firstBlock = blocks[0];
    const parent = firstBlock.parentNode;

    parent.insertBefore(list, firstBlock);

    for (const block of blocks) {
      const li = document.createElement('li');
      
      if (block.tagName === 'P' || block.tagName === 'DIV') {
        while (block.firstChild) {
          li.appendChild(block.firstChild);
        }
      } else {
        li.appendChild(block);
      }

      list.appendChild(li);
      
      if (block.parentNode === parent) {
        parent.removeChild(block);
      }
    }
  }

  removeList(blocks) {
    for (const block of blocks) {
      let li = block;
      while (li && li.tagName !== 'LI') {
        li = li.parentNode;
      }

      if (li && li.tagName === 'LI') {
        const list = li.parentNode;
        
        const p = document.createElement('p');
        while (li.firstChild) {
          p.appendChild(li.firstChild);
        }

        list.parentNode.insertBefore(p, list);
        
        if (li.parentNode === list) {
          list.removeChild(li);
        }

        if (list.children.length === 0) {
          list.parentNode.removeChild(list);
        }
      }
    }
  }

  saveListState(range) {
    const blocks = this.getBlockElementsInRange(range);
    return blocks.map(block => ({
      element: block,
      outerHTML: block.outerHTML,
      path: this.getNodePath(block)
    }));
  }

  restoreListState(savedState) {
    for (const state of savedState.reverse()) {
      const element = this.getNodeFromPath(state.path);
      if (element) {
        const temp = document.createElement('div');
        temp.innerHTML = state.outerHTML;
        DOMUtils.replaceNode(element, temp.firstChild);
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

export class IndentCommand extends Command {
  constructor(editor, isIndent) {
    super(editor);
    this.isIndent = isIndent;
    this.savedState = null;
    this.savedSelection = null;
  }

  execute() {
    const selectionManager = this.editor.selectionManager;
    const range = selectionManager.getCurrentRange();
    
    if (!range) {
      return false;
    }

    this.savedSelection = selectionManager.saveSelection();
    this.savedState = this.saveIndentState(range);

    this.applyIndent(range);

    this.executed = true;
    return true;
  }

  undo() {
    if (!this.executed || !this.savedState) {
      return;
    }

    this.restoreIndentState(this.savedState);
    
    if (this.savedSelection) {
      this.editor.selectionManager.restoreSelection(this.savedSelection);
    }
  }

  applyIndent(range) {
    const blocks = this.getBlockElementsInRange(range);

    for (const block of blocks) {
      const currentMargin = parseInt(block.style.marginLeft || '0', 10);
      const indentAmount = 40;

      if (this.isIndent) {
        block.style.marginLeft = (currentMargin + indentAmount) + 'px';
      } else {
        block.style.marginLeft = Math.max(0, currentMargin - indentAmount) + 'px';
      }
    }
  }

  getBlockElementsInRange(range) {
    const blocks = [];
    const startBlock = this.getParentBlock(range.startContainer);
    const endBlock = this.getParentBlock(range.endContainer);

    if (startBlock === endBlock) {
      if (startBlock) {
        blocks.push(startBlock);
      }
    } else {
      const commonAncestor = DOMUtils.getCommonAncestor(startBlock, endBlock);
      const walker = document.createTreeWalker(
        commonAncestor,
        NodeFilter.SHOW_ELEMENT,
        {
          acceptNode: (node) => {
            return DOMUtils.isBlockElement(node) ? 
              NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
          }
        },
        false
      );

      let node;
      let foundStart = false;
      while ((node = walker.nextNode())) {
        if (node === startBlock) {
          foundStart = true;
        }
        if (foundStart) {
          blocks.push(node);
        }
        if (node === endBlock) {
          break;
        }
      }
    }

    return blocks;
  }

  getParentBlock(node) {
    let current = DOMUtils.getParentElement(node);
    while (current && current !== this.editor) {
      if (DOMUtils.isBlockElement(current)) {
        return current;
      }
      current = current.parentNode;
    }
    return null;
  }

  saveIndentState(range) {
    const blocks = this.getBlockElementsInRange(range);
    return blocks.map(block => ({
      element: block,
      marginLeft: block.style.marginLeft || '0px',
      path: this.getNodePath(block)
    }));
  }

  restoreIndentState(savedState) {
    for (const state of savedState) {
      const element = this.getNodeFromPath(state.path);
      if (element) {
        element.style.marginLeft = state.marginLeft;
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

export class RemoveFormatCommand extends Command {
  constructor(editor) {
    super(editor);
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
    this.savedState = this.saveFormatState(range);

    this.removeFormat(range);

    this.executed = true;
    return true;
  }

  undo() {
    if (!this.executed || !this.savedState) {
      return;
    }

    this.restoreFormatState(this.savedState);
    
    if (this.savedSelection) {
      this.editor.selectionManager.restoreSelection(this.savedSelection);
    }
  }

  removeFormat(range) {
    const textNodes = DOMUtils.getTextNodesInRange(range);

    for (const textNode of textNodes) {
      this.stripInlineFormatting(textNode);
    }
  }

  stripInlineFormatting(textNode) {
    let current = textNode.parentNode;
    const inlineTags = ['strong', 'em', 'u', 's', 'strike', 'del', 'a', 'code', 'sub', 'sup', 'mark', 'font', 'span'];

    while (current && current !== this.editor) {
      if (inlineTags.includes(current.tagName.toLowerCase())) {
        const nextParent = current.parentNode;
        DOMUtils.unwrapElement(current);
        current = nextParent;
      } else {
        current = current.parentNode;
      }
    }
  }

  saveFormatState(range) {
    const textNodes = DOMUtils.getTextNodesInRange(range);
    return textNodes.map(node => ({
      node: node,
      parentHTML: node.parentElement.outerHTML,
      path: this.getNodePath(node.parentElement)
    }));
  }

  restoreFormatState(savedState) {
    for (const state of savedState) {
      const element = this.getNodeFromPath(state.path);
      if (element) {
        const temp = document.createElement('div');
        temp.innerHTML = state.parentHTML;
        DOMUtils.replaceNode(element, temp.firstChild);
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
