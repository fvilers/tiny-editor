import { createToolbar } from './toolbar';

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
  editor.insertAdjacentElement('beforebegin', toolbar);
};
