import { BEFORE_BEGIN, NO } from "./constants";
import { createToolbar } from "./toolbar";
import { SelectionManager } from "./selection";
import { CommandExecutor } from "./commands";
import { DOMUtils } from "./utils";

const rgbToHex = (color) => {
  const digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);
  if (!digits) {
    return color;
  }
  const red = parseInt(digits[2]);
  const green = parseInt(digits[3]);
  const blue = parseInt(digits[4]);
  const rgb = blue | (green << 8) | (red << 16);

  return digits[1] + "#" + rgb.toString(16).padStart(6, "0");
};

const queryCommandState = (editor, commandId) => {
  const selection = window.getSelection();
  if (selection.rangeCount === 0) return false;

  const range = selection.getRangeAt(0);
  
  if (!editor.contains(range.startContainer) && !editor.contains(range.endContainer)) {
    return false;
  }

  const textNodes = DOMUtils.getTextNodesInRange(range);
  if (textNodes.length === 0) return false;

  switch (commandId.toLowerCase()) {
    case "bold":
      return textNodes.every(node => isNodeFormattedWithTag(node, "strong") || isNodeFormattedWithTag(node, "b"));
    case "italic":
      return textNodes.every(node => isNodeFormattedWithTag(node, "em") || isNodeFormattedWithTag(node, "i"));
    case "underline":
      return textNodes.every(node => isNodeFormattedWithTag(node, "u") || isNodeFormattedWithStyle(node, "textDecoration", "underline"));
    default:
      return false;
  }
};

const isNodeFormattedWithTag = (textNode, tagName) => {
  let current = textNode.parentNode;
  while (current && current !== null) {
    if (current.tagName && current.tagName.toLowerCase() === tagName.toLowerCase()) {
      return true;
    }
    current = current.parentNode;
  }
  return false;
};

const isNodeFormattedWithStyle = (textNode, styleProperty, styleValue) => {
  let current = textNode.parentNode;
  while (current && current !== null) {
    if (current.style && current.style[styleProperty] === styleValue) {
      return true;
    }
    current = current.parentNode;
  }
  return false;
};

const queryCommandValue = (editor, commandId) => {
  const selection = window.getSelection();
  if (selection.rangeCount === 0) return "";

  const range = selection.getRangeAt(0);
  
  if (!editor.contains(range.startContainer) && !editor.contains(range.endContainer)) {
    return "";
  }

  const textNodes = DOMUtils.getTextNodesInRange(range);
  if (textNodes.length === 0) return "";

  switch (commandId.toLowerCase()) {
    case "formatblock":
      return getBlockTag(textNodes[0]);
    case "forecolor":
      return getTextColor(textNodes[0]);
    case "fontname":
      return getFontName(textNodes[0]);
    default:
      return "";
  }
};

const getBlockTag = (textNode) => {
  let current = DOMUtils.getParentElement(textNode);
  while (current && current !== null) {
    if (DOMUtils.isBlockElement(current)) {
      return current.tagName.toLowerCase();
    }
    current = current.parentNode;
  }
  return "p";
};

const getTextColor = (textNode) => {
  let current = DOMUtils.getParentElement(textNode);
  while (current && current !== null) {
    if (current.style && current.style.color) {
      return current.style.color;
    }
    current = current.parentNode;
  }
  const computedStyle = window.getComputedStyle(textNode.parentElement);
  return computedStyle.color;
};

const getFontName = (textNode) => {
  let current = DOMUtils.getParentElement(textNode);
  while (current && current !== null) {
    if (current.style && current.style.fontFamily) {
      return current.style.fontFamily;
    }
    current = current.parentNode;
  }
  const computedStyle = window.getComputedStyle(textNode.parentElement);
  return computedStyle.fontFamily;
};

export const transformToEditor = (editor) => {
  editor.setAttribute("contentEditable", true);
  editor.className = "__editor";

  const selectionManager = new SelectionManager(editor);
  const commandExecutor = new CommandExecutor(editor, selectionManager);

  editor.selectionManager = selectionManager;
  editor.commandExecutor = commandExecutor;

  const execCommand = (commandId, value) => {
    editor.focus();
    commandExecutor.execCommand(commandId, value);
    updateActiveState();
  };

  const toolbar = createToolbar(editor.dataset, execCommand);
  editor.insertAdjacentElement(BEFORE_BEGIN, toolbar);

  const updateActiveState = () => {
    const toolbarSelects = toolbar.querySelectorAll("select[data-command-id]");
    for (const select of toolbarSelects) {
      const value = queryCommandValue(editor, select.dataset.commandId);
      const option = Array.from(select.options).find(
        (option) => option.value.toLowerCase() === value.toLowerCase()
      );
      select.selectedIndex = option ? option.index : -1;
    }

    const toolbarButtons = toolbar.querySelectorAll("button[data-command-id]");
    for (const button of toolbarButtons) {
      const active = queryCommandState(editor, button.dataset.commandId);
      button.classList.toggle("active", active);
    }

    const inputButtons = toolbar.querySelectorAll("input[data-command-id]");
    for (const input of inputButtons) {
      const value = queryCommandValue(editor, input.dataset.commandId);
      input.value = rgbToHex(value);
    }
  };

  if (editor.dataset.autofocus !== NO) {
    editor.focus();
  }

  editor.addEventListener("keydown", updateActiveState);
  editor.addEventListener("keyup", updateActiveState);
  editor.addEventListener("click", updateActiveState);
  toolbar.addEventListener("click", updateActiveState);

  editor.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "z") {
      e.preventDefault();
      if (e.shiftKey) {
        commandExecutor.redo();
      } else {
        commandExecutor.undo();
      }
      updateActiveState();
    }
  });

  editor.__tinyEditorAPI = {
    selectionManager,
    commandExecutor,
    execCommand,
    queryCommandState: (commandId) => queryCommandState(editor, commandId),
    queryCommandValue: (commandId) => queryCommandValue(editor, commandId),
  };
};
