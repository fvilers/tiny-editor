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
      return { before: textNode, after: null };
    }
    
    if (offset >= textNode.length) {
      return { before: textNode, after: textNode.nextSibling };
    }
    
    const parent = textNode.parentNode;
    const beforeText = textNode.textContent.substring(0, offset);
    const afterText = textNode.textContent.substring(offset);
    
    const beforeNode = document.createTextNode(beforeText);
    const afterNode = document.createTextNode(afterText);
    
    parent.replaceChild(beforeNode, textNode);
    parent.insertBefore(afterNode, beforeNode.nextSibling);
    
    return { before: beforeNode, after: afterNode };
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
    if (!parent) return;
    
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
    if (parent) {
      parent.replaceChild(newNode, oldNode);
    }
  }

  static insertAfter(newNode, referenceNode) {
    const parent = referenceNode.parentNode;
    if (parent) {
      parent.insertBefore(newNode, referenceNode.nextSibling);
    }
  }

  static insertBefore(newNode, referenceNode) {
    const parent = referenceNode.parentNode;
    if (parent) {
      parent.insertBefore(newNode, referenceNode);
    }
  }

  static removeNode(node) {
    const parent = node.parentNode;
    if (parent) {
      parent.removeChild(node);
    }
  }

  static getTextNodesInRange(range) {
    const textNodes = [];
    
    if (!range) return textNodes;

    const startContainer = range.startContainer;
    const endContainer = range.endContainer;
    const startOffset = range.startOffset;
    const endOffset = range.endOffset;

    if (startContainer === endContainer && this.isTextNode(startContainer)) {
      if (startOffset < endOffset || startOffset === 0 && endOffset === startContainer.length) {
        textNodes.push(startContainer);
      }
      return textNodes;
    }

    if (this.isTextNode(startContainer)) {
      if (startOffset < startContainer.length) {
        textNodes.push(startContainer);
      }
    }

    const walker = document.createTreeWalker(
      range.commonAncestorContainer,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    let node;
    let passedStart = !this.isTextNode(startContainer);
    
    while ((node = walker.nextNode())) {
      if (node === startContainer || node === endContainer) {
        continue;
      }
      
      if (!passedStart) {
        if (node === startContainer) {
          passedStart = true;
        }
        continue;
      }

      if (this.isNodeInRange(node, range)) {
        textNodes.push(node);
      }
    }

    if (this.isTextNode(endContainer) && endOffset > 0) {
      if (endContainer !== startContainer) {
        textNodes.push(endContainer);
      }
    }

    return textNodes;
  }

  static isNodeInRange(node, range) {
    if (!node || !range) return false;
    
    const nodeRange = document.createRange();
    try {
      nodeRange.selectNodeContents(node);
      
      const nodeStart = nodeRange.compareBoundaryPoints(Range.START_TO_START, range);
      const nodeEnd = nodeRange.compareBoundaryPoints(Range.END_TO_END, range);
      
      return !(nodeEnd < 0 || nodeStart > 0);
    } catch (e) {
      return false;
    }
  }

  static splitRangeBoundaries(range) {
    if (!range) return range;

    const startContainer = range.startContainer;
    const endContainer = range.endContainer;
    const startOffset = range.startOffset;
    const endOffset = range.endOffset;

    let finalStartContainer = startContainer;
    let finalEndContainer = endContainer;
    let finalStartOffset = startOffset;
    let finalEndOffset = endOffset;

    if (startContainer === endContainer && this.isTextNode(startContainer)) {
      const textNode = startContainer;
      const text = textNode.textContent;
      
      if (startOffset === 0 && endOffset === text.length) {
        const newRange = document.createRange();
        newRange.setStart(textNode, 0);
        newRange.setEnd(textNode, text.length);
        return newRange;
      }

      let beforeNode = textNode;
      let middleNode = null;
      let afterNode = null;

      if (startOffset > 0) {
        const beforeText = text.substring(0, startOffset);
        const remainingText = text.substring(startOffset);
        
        beforeNode = document.createTextNode(beforeText);
        middleNode = document.createTextNode(remainingText);
        
        const parent = textNode.parentNode;
        parent.replaceChild(beforeNode, textNode);
        parent.insertBefore(middleNode, beforeNode.nextSibling);
      } else {
        middleNode = textNode;
      }

      const middleLength = middleNode.textContent.length;
      const relativeEndOffset = startOffset > 0 ? (endOffset - startOffset) : endOffset;

      if (relativeEndOffset < middleLength) {
        const middleText = middleNode.textContent.substring(0, relativeEndOffset);
        const afterText = middleNode.textContent.substring(relativeEndOffset);
        
        const newMiddle = document.createTextNode(middleText);
        afterNode = document.createTextNode(afterText);
        
        const parent = middleNode.parentNode;
        parent.replaceChild(newMiddle, middleNode);
        parent.insertBefore(afterNode, newMiddle.nextSibling);
        
        middleNode = newMiddle;
      }

      finalStartContainer = middleNode;
      finalEndContainer = middleNode;
      finalStartOffset = 0;
      finalEndOffset = middleNode.textContent.length;
    } else {
      if (this.isTextNode(startContainer) && startOffset > 0) {
        const beforeText = startContainer.textContent.substring(0, startOffset);
        const afterText = startContainer.textContent.substring(startOffset);
        
        const beforeNode = document.createTextNode(beforeText);
        const afterNode = document.createTextNode(afterText);
        
        const parent = startContainer.parentNode;
        parent.replaceChild(beforeNode, startContainer);
        parent.insertBefore(afterNode, beforeNode.nextSibling);
        
        finalStartContainer = afterNode;
        finalStartOffset = 0;
      }

      if (this.isTextNode(endContainer) && endOffset < endContainer.textContent.length) {
        const beforeText = endContainer.textContent.substring(0, endOffset);
        const afterText = endContainer.textContent.substring(endOffset);
        
        const beforeNode = document.createTextNode(beforeText);
        const afterNode = document.createTextNode(afterText);
        
        const parent = endContainer.parentNode;
        parent.replaceChild(beforeNode, endContainer);
        parent.insertBefore(afterNode, beforeNode.nextSibling);
        
        finalEndContainer = beforeNode;
        finalEndOffset = beforeNode.textContent.length;
      }
    }

    const newRange = document.createRange();
    
    if (finalStartContainer.parentNode) {
      newRange.setStart(finalStartContainer, finalStartOffset);
    } else {
      newRange.setStart(startContainer, startOffset);
    }
    
    if (finalEndContainer.parentNode) {
      newRange.setEnd(finalEndContainer, finalEndOffset);
    } else {
      newRange.setEnd(endContainer, endOffset);
    }

    return newRange;
  }
}
