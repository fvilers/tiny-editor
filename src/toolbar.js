import { createSelect } from './select';
import { createButton } from './button';
import { createIcon } from './icon';
import { createInput } from './input';

export const createToolbar = execCommand => {
  const toolbar = document.createElement('div');
  toolbar.className = '__toolbar';

  // Styles
  toolbar.insertAdjacentElement(
    'beforeend',
    createSelect(
      'formatblock',
      'Styles',
      [
        { value: 'h1', text: 'Title 1' },
        { value: 'h2', text: 'Title 2' },
        { value: 'h3', text: 'Title 3' },
        { value: 'h4', text: 'Title 4' },
        { value: 'h5', text: 'Title 5' },
        { value: 'h6', text: 'Title 6' },
        { value: 'p', text: 'Paragraph', selected: true },
        { value: 'pre', text: 'Preformatted' }
      ],
      execCommand
    )
  );

  // Font
  toolbar.insertAdjacentElement(
    'beforeend',
    createSelect(
      'fontname',
      'Font',
      [
        { value: 'serif', text: 'Serif', selected: true },
        { value: 'sans-serif', text: 'Sans Serif' },
        { value: 'monospace', text: 'Monospace' },
        { value: 'cursive', text: 'Cursive' },
        { value: 'fantasy', text: 'Fantasy' }
      ],
      execCommand
    )
  );

  // Bold
  toolbar.insertAdjacentElement(
    'beforeend',
    createButton('bold', 'Bold', createIcon('fas fa-bold'), execCommand)
  );

  // Italic
  toolbar.insertAdjacentElement(
    'beforeend',
    createButton('italic', 'Italic', createIcon('fas fa-italic'), execCommand)
  );

  // Underline
  toolbar.insertAdjacentElement(
    'beforeend',
    createButton(
      'underline',
      'Underline',
      createIcon('fas fa-underline'),
      execCommand
    )
  );

  // Text color
  toolbar.insertAdjacentElement(
    'beforeend',
    createInput('forecolor', 'Text color', 'color', execCommand)
  );

  return toolbar;
};
