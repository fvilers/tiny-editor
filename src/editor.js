import { createToolbar } from './toolbar';

export const transformToEditor = editor => {
  // Indicate that the element is editable
  editor.setAttribute('contentEditable', true);

  // Add a custom class
  editor.className = '__editor';

  // Create a toolbar
  const toolbar = createToolbar();
  editor.insertAdjacentElement('beforebegin', toolbar);
};
