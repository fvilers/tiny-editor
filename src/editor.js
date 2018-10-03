import { createToolbar } from './toolbar';
import { BEFORE_BEGIN } from './constants';

export const findNodeByName = (nodes, name) =>
  nodes.find(node => node.nodeName.toLowerCase() === name);

export const findNodeByStyle = (nodes, styleProp, value) =>
  nodes.find(node => node.style[styleProp] === value);

const activeMatcher = {
  bold: nodes => !!findNodeByName(nodes, 'b'),
  italic: nodes => !!findNodeByName(nodes, 'i'),
  underline: nodes => !!findNodeByName(nodes, 'u'),
  justifyleft: nodes => !!findNodeByStyle(nodes, 'textAlign', 'left'),
  justifycenter: nodes => !!findNodeByStyle(nodes, 'textAlign', 'center'),
  justifyright: nodes => !!findNodeByStyle(nodes, 'textAlign', 'right'),
  insertorderedlist: nodes => !!findNodeByName(nodes, 'ol'),
  insertunorderedlist: nodes => !!findNodeByName(nodes, 'ul'),
  outdent: _ => false, // This command has no active state
  indent: _ => false, // This command has no active state
  removeFormat: _ => false // This command has no active state
};

export const transformToEditor = editor => {
  // Indicate that the element is editable
  editor.setAttribute('contentEditable', true);

  // Add a custom class
  editor.className = '__editor';

  // Set height
  editor.style.height = editor.dataset.height || '400px';

  // Create an exec command function
  const execCommand = (commandId, value) => {
    document.execCommand(commandId, false, value);
    editor.focus();
  };

  // Create a toolbar
  const toolbar = createToolbar(editor.dataset, execCommand);
  editor.insertAdjacentElement(BEFORE_BEGIN, toolbar);

  // Listen for events to detect where the caret is
  const updateActiveState = () => {
    const selection = document.getSelection();
    let current = selection.anchorNode;
    const nodes = [];

    while (current) {
      if (current.dataset && current.dataset.hasOwnProperty('tinyEditor')) {
        break;
      }

      if (current.nodeType === 1) {
        nodes.push(current);
      }

      current = current.parentNode;
    }

    // Notify toolbar buttons about active style
    const toolbarItems = toolbar.querySelectorAll('button[data-command-id]');
    for (const item of toolbarItems) {
      const active = activeMatcher[item.dataset.commandId](nodes);
      item.classList.toggle('active', active);
    }

    // Notify the styles drop down list
    const stylesList = toolbar.querySelector(
      "select[data-command-id='formatblock']"
    );
    if (stylesList) {
      // TODO: handle specific tag (h1->h6, pre, p) and tag combinations
      // (hx + bold in it doesn't render a <b> tag but <span style="font-weight: normal;">)
    }

    // Notify the font drop down list
    const fontList = toolbar.querySelector(
      "select[data-command-id='fontname']"
    );
    if (fontList) {
      const fontNode = findNodeByName(nodes, 'font');
      const value = fontNode && fontNode.face ? fontNomontrde.face : 'serif';
      fontList.selectedIndex = Array.from(fontList.options).find(
        option => option.value === value
      );
    }

    // Notify text color about the current color
    const textColor = toolbar.querySelector(
      "input[data-command-id='forecolor']"
    );
    if (textColor) {
      const fontNode = findNodeByName(nodes, 'font');
      textColor.value = fontNode && fontNode.color ? fontNode.color : '#000000';
    }
  };
  editor.addEventListener('keydown', updateActiveState);
  editor.addEventListener('keyup', updateActiveState);
  editor.addEventListener('click', updateActiveState);
  toolbar.addEventListener('click', updateActiveState);
};
