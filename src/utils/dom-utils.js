export class DOMUtils {
  static isTextNode(node) {
    return node.nodeType === Node.TEXT_NODE;
  }

  static isElementNode(node) {
    return node.nodeType === Node.ELEMENT_NODE;
  }

  static getParentElement(node) {
    if (this.isTextNode(node)) {
      return node.parentElement;
    }
    return node;
  }

  static isDescendantOf(node, ancestor) {
    let current = node;
    while (current) {
      if (current === ancestor) {
        return true;
      }
      current = current.parentNode;
    }
    return false;
  }

  static getCommonAncestor(node1, node2) {
    let ancestors1 = new Set();
    let current = node1;
    
    while (current) {
      ancestors1.add(current);
      current = current.parentNode;
    }
    
    current = node2;
    while (current) {
      if (ancestors1.has(current)) {
        return current;
      }
      current = current.parentNode;
    }
    
    return null;
  }

  static splitTextNode(textNode, offset) {
    if (!this.isTextNode(textNode) || offset === 0) {
      return textNode;
    }
    
    if (offset >= textNode.length) {
      return textNode.nextSibling;
    }
    
    const parent = textNode.parentNode;
    const beforeText = textNode.textContent.substring(0, offset);
    const afterText = textNode.textContent.substring(offset);
    
    const beforeNode = document.createTextNode(beforeText);
    const afterNode = document.createTextNode(afterText);
    
    parent.replaceChild(beforeNode, textNode);
    parent.insertBefore(afterNode, beforeNode.nextSibling);
    
    return afterNode;
  }

  static wrapRangeWithTag(range, tagName, attributes = {}) {
    const wrapper = document.createElement(tagName);
    
    for (const [key, value] of Object.entries(attributes)) {
      wrapper.setAttribute(key, value);
    }
    
    const contents = range.extractContents();
    wrapper.appendChild(contents);
    range.insertNode(wrapper);
    
    return wrapper;
  }

  static unwrapElement(element) {
    const parent = element.parentNode;
    const childNodes = Array.from(element.childNodes);
    
    for (const child of childNodes) {
      parent.insertBefore(child, element);
    }
    
    parent.removeChild(element);
  }

  static hasStyle(element, property, value) {
    const style = window.getComputedStyle(element);
    return style.getPropertyValue(property) === value;
  }

  static hasClass(element, className) {
    return element.classList && element.classList.contains(className);
  }

  static isInlineElement(element) {
    const inlineTags = [
      'span', 'b', 'strong', 'i', 'em', 'u', 's', 'strike', 'del',
      'a', 'code', 'sub', 'sup', 'mark', 'small', 'big', 'font'
    ];
    return inlineTags.includes(element.tagName.toLowerCase());
  }

  static isBlockElement(element) {
    const blockTags = [
      'p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'pre', 'blockquote', 'section', 'article'
    ];
    return blockTags.includes(element.tagName.toLowerCase());
  }

  static getPreviousSiblingElement(node) {
    let current = node.previousSibling;
    while (current && !this.isElementNode(current)) {
      current = current.previousSibling;
    }
    return current;
  }

  static getNextSiblingElement(node) {
    let current = node.nextSibling;
    while (current && !this.isElementNode(current)) {
      current = current.nextSibling;
    }
    return current;
  }

  static cloneNodeWithContent(node) {
    return node.cloneNode(true);
  }

  static replaceNode(oldNode, newNode) {
    const parent = oldNode.parentNode;
    parent.replaceChild(newNode, oldNode);
  }

  static insertAfter(newNode, referenceNode) {
    const parent = referenceNode.parentNode;
    parent.insertBefore(newNode, referenceNode.nextSibling);
  }

  static insertBefore(newNode, referenceNode) {
    const parent = referenceNode.parentNode;
    parent.insertBefore(newNode, referenceNode);
  }

  static removeNode(node) {
    const parent = node.parentNode;
    if (parent) {
      parent.removeChild(node);
    }
  }

  static getTextNodesInRange(range) {
    const textNodes = [];
    const walker = document.createTreeWalker(
      range.commonAncestorContainer,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    let node;
    while ((node = walker.nextNode())) {
      const nodeRange = document.createRange();
      nodeRange.selectNodeContents(node);
      
      if (range.intersectsNode(node)) {
        textNodes.push(node);
      }
    }

    return textNodes;
  }

  static splitRangeBoundaries(range) {
    const startContainer = range.startContainer;
    const endContainer = range.endContainer;
    const startOffset = range.startOffset;
    const endOffset = range.endOffset;

    let newStartContainer = startContainer;
    let newEndContainer = endContainer;
    let newStartOffset = startOffset;
    let newEndOffset = endOffset;

    const isSameContainer = startContainer === endContainer;

    if (this.isTextNode(startContainer) && startOffset > 0) {
      newStartContainer = this.splitTextNode(startContainer, startOffset);
      newStartOffset = 0;
      
      if (isSameContainer) {
        newEndContainer = newStartContainer;
        newEndOffset = endOffset - startOffset;
      }
    }

    if (this.isTextNode(newEndContainer) && newEndOffset > 0 && newEndOffset < newEndContainer.length) {
      this.splitTextNode(newEndContainer, newEndOffset);
      newEndOffset = newEndContainer.length;
    }

    const newRange = document.createRange();
    
    if (newStartContainer.parentNode) {
      newRange.setStart(newStartContainer, newStartOffset);
    } else {
      newRange.setStart(startContainer, startOffset);
    }
    
    if (newEndContainer.parentNode) {
      newRange.setEnd(newEndContainer, newEndOffset);
    } else {
      newRange.setEnd(endContainer, endOffset);
    }

    return newRange;
  }
}
